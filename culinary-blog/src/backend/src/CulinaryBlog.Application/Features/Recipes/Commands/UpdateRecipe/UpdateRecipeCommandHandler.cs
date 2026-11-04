using CulinaryBlog.Application.Common.Exceptions;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Commands;

public sealed class UpdateRecipeCommandHandler : IRequestHandler<UpdateRecipeCommand, Recipe>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public UpdateRecipeCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<Recipe> Handle(UpdateRecipeCommand request, CancellationToken cancellationToken)
    {
        var recipe = await _unitOfWork.Recipes.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new RecipeNotFoundException(request.Id);

        // 1. Kiểm tra Concurrency Token nếu client truyền lên
        if (request.RowVersion.HasValue && request.RowVersion.Value > 0 && recipe.RowVersion != request.RowVersion.Value)
        {
            throw new ConcurrencyConflictException("Recipe was updated by another user. Please reload and try again.");
        }

        // 2. Resource-based Authorization (FR-BKE-009): Chỉ Tác giả hoặc Admin mới được sửa
        var currentUserId = _currentUserService.UserId;
        var isAdmin = _currentUserService.IsInRole("Admin");

        if (!isAdmin && recipe.AuthorId != currentUserId)
        {
            throw new ForbiddenAccessException("Bạn không có quyền sửa công thức này.");
        }

        // 3. Kiểm tra Slug trùng lặp
        if (!string.Equals(recipe.Slug, request.Slug, StringComparison.OrdinalIgnoreCase) &&
            await _unitOfWork.Recipes.SlugExistsAsync(request.Slug, request.Id, cancellationToken))
        {
            throw new RecipeSlugConflictException(request.Slug);
        }

        // 4. Cập nhật thông tin
        recipe.UpdateDetails(
            title: request.Title,
            slug: request.Slug,
            description: request.Description,
            instructions: request.Instructions,
            prepTime: request.PrepTime,
            cookTime: request.CookTime,
            servings: request.Servings,
            difficulty: request.Difficulty,
            categoryId: request.CategoryId);

        if (request.Nutrition is not null)
        {
            recipe.SetNutrition(request.Nutrition);
        }

        // 5. Lưu xuống DB với xử lý bắt lỗi DbUpdateConcurrencyException
        try
        {
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateConcurrencyException)
        {
            throw new ConcurrencyConflictException("Recipe was updated by another user. Please reload and try again.");
        }

        return recipe;
    }
}

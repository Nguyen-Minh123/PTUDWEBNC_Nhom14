using CulinaryBlog.Application.Common.Exceptions;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Commands.UpdateRecipe;

/// <summary>
/// Xử lý cập nhật Recipe.
/// Lưu ý:
/// - Handler này chỉ cập nhật dữ liệu core của recipe.
/// - RecipeImage không cập nhật ở đây vì đó là use case riêng.
/// - Concurrency được xử lý bằng RowVersion.
/// </summary>
public sealed class UpdateRecipeCommandHandler
    : IRequestHandler<UpdateRecipeCommand, RecipeDto>
{
    private readonly IApplicationDbContext _db;
    private readonly ICurrentUserService _currentUser;

    /// <summary>
    /// Khởi tạo handler với DbContext abstraction và current user service.
    /// </summary>
    public UpdateRecipeCommandHandler(
        IApplicationDbContext db,
        ICurrentUserService currentUser)
    {
        _db = db;
        _currentUser = currentUser;
    }

    /// <summary>
    /// Cập nhật Recipe theo Id và RowVersion.
    /// </summary>
    public async Task<RecipeDto> Handle(UpdateRecipeCommand request, CancellationToken cancellationToken)
    {
        // 1) Lấy recipe theo Id.
        var recipe = await _db.Recipes
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (recipe is null)
        {
            throw new KeyNotFoundException("Recipe not found.");
        }

        // 2) Kiểm tra request concurrency token.
        if (recipe.RowVersion != request.RowVersion)
        {
            throw new ConcurrencyConflictException(
                "Recipe was updated by another user. Please reload and try again.");
        }

        // 3) Kiểm tra concurrency token do client gửi lên.
        // Nếu entity hiện tại khác token của client => xung đột.
        if (recipe.RowVersion != request.RowVersion)
        {
            throw new ConcurrencyConflictException(
                "Recipe was updated by another user. Please reload and try again.");
        }

        // 4) Chỉ cho phép tác giả hoặc người có quyền hợp lệ thao tác.
        if (!CurrentUserAuthorization.CanManageRecipe(_currentUser, recipe.AuthorId))
        {
            throw new UnauthorizedAccessException("You do not have permission to update this recipe.");
        }

        // 5) Kiểm tra category tồn tại trước khi cập nhật.
        var categoryExists = await _db.Categories
            .AnyAsync(x => x.Id == request.CategoryId, cancellationToken);

        if (!categoryExists)
        {
            throw new KeyNotFoundException("Category not found.");
        }

        // 6) Cập nhật thông tin cốt lõi.
        recipe.UpdateDetails(
            request.Title,
            request.Slug ?? request.Title,
            request.Description,
            request.Instructions,
            request.PrepTime,
            request.CookTime,
            request.Servings,
            request.Difficulty,
            request.CategoryId);

        try
        {
            // 7) Lưu thay đổi xuống database.
            await _db.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateConcurrencyException)
        {
            throw new ConcurrencyConflictException(
                "Recipe was updated by another user. Please reload and try again.");
        }

        // 8) Đọc lại dữ liệu mới nhất sau save.
        var updatedRecipe = await _db.Recipes
            .AsNoTracking()
            .FirstAsync(x => x.Id == recipe.Id, cancellationToken);

        return new RecipeDto(
            updatedRecipe.Id,
            updatedRecipe.Title,
            updatedRecipe.Slug,
            updatedRecipe.Description,
            updatedRecipe.Instructions,
            updatedRecipe.PrepTime,
            updatedRecipe.CookTime,
            updatedRecipe.Servings,
            updatedRecipe.Difficulty,
            updatedRecipe.CategoryId,
            updatedRecipe.RowVersion);
    }
}
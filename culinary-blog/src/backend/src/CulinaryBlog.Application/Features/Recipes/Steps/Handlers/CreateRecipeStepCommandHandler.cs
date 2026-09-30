using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Features.Recipes.Steps.Commands;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Steps.Handlers;

/// <summary>
/// Xử lý tạo bước mới và tự động gán StepNumber = max + 1.
/// </summary>
public sealed class CreateRecipeStepCommandHandler
    : IRequestHandler<CreateRecipeStepCommand, RecipeStepDto>
{
    private readonly IApplicationDbContext _db;
    private readonly ICurrentUserService _currentUser;

    public CreateRecipeStepCommandHandler(
        IApplicationDbContext db,
        ICurrentUserService currentUser)
    {
        _db = db;
        _currentUser = currentUser;
    }

    public async Task<RecipeStepDto> Handle(
        CreateRecipeStepCommand request,
        CancellationToken cancellationToken)
    {
        // Lấy recipe để kiểm tra tồn tại và quyền sở hữu.
        var recipe = await _db.Recipes
            .FirstOrDefaultAsync(x => x.Id == request.RecipeId, cancellationToken);

        if (recipe is null)
            throw new KeyNotFoundException("Recipe not found.");

        if (!CanManageRecipe(recipe.AuthorId))
            throw new UnauthorizedAccessException("You do not have permission to manage this recipe.");

        // Tính StepNumber tự động: nếu chưa có step nào thì bắt đầu từ 1.
        var nextStepNumber = await _db.RecipeSteps
            .Where(x => x.RecipeId == request.RecipeId)
            .Select(x => (int?)x.StepNumber)
            .MaxAsync(cancellationToken) ?? 0;

        nextStepNumber += 1;

        // Tạo entity bước mới.
        var step = new RecipeStep(
            request.RecipeId,
            nextStepNumber,
            request.Title,
            request.Description,
            request.TimerMinutes,
            request.ImageUrl);

        // Add trực tiếp vào DbSet để tránh lỗi kiểu collection navigation.
        _db.RecipeSteps.Add(step);
        await _db.SaveChangesAsync(cancellationToken);

        return new RecipeStepDto(
            step.Id,
            step.RecipeId,
            step.StepNumber,
            step.Title,
            step.Description,
            step.TimerMinutes,
            step.ImageUrl);
    }

    private bool CanManageRecipe(string authorId)
    {
        // Nếu về sau bạn thêm IsAdmin vào current user service,
        // chỉ cần mở rộng logic tại đây.
        return string.Equals(_currentUser.UserId, authorId, StringComparison.Ordinal);
    }
}
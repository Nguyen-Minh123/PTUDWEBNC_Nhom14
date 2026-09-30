using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Features.Recipes.Steps.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Steps.Handlers;

/// <summary>
/// Xử lý cập nhật nội dung bước.
/// Không thay đổi StepNumber ở đây.
/// </summary>
public sealed class UpdateRecipeStepCommandHandler
    : IRequestHandler<UpdateRecipeStepCommand, RecipeStepDto>
{
    private readonly IApplicationDbContext _db;
    private readonly ICurrentUserService _currentUser;

    public UpdateRecipeStepCommandHandler(
        IApplicationDbContext db,
        ICurrentUserService currentUser)
    {
        _db = db;
        _currentUser = currentUser;
    }

    public async Task<RecipeStepDto> Handle(
        UpdateRecipeStepCommand request,
        CancellationToken cancellationToken)
    {
        // Kiểm tra recipe có tồn tại không.
        var recipe = await _db.Recipes
            .FirstOrDefaultAsync(x => x.Id == request.RecipeId, cancellationToken);

        if (recipe is null)
            throw new KeyNotFoundException("Recipe not found.");

        if (!CanManageRecipe(recipe.AuthorId))
            throw new UnauthorizedAccessException("You do not have permission to manage this recipe.");

        // Tìm bước thuộc đúng recipe.
        var step = await _db.RecipeSteps
            .FirstOrDefaultAsync(
                x => x.Id == request.StepId && x.RecipeId == request.RecipeId,
                cancellationToken);

        if (step is null)
            throw new KeyNotFoundException("Step not found.");

        // Cập nhật nội dung.
        step.UpdateDetails(
            step.StepNumber,
            request.Title,
            request.Description,
            request.TimerMinutes,
            request.ImageUrl);

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
        return string.Equals(_currentUser.UserId, authorId, StringComparison.Ordinal);
    }
}
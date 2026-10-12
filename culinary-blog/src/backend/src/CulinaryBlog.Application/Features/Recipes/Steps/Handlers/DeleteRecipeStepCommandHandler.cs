using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.Features.Recipes.Steps.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Steps.Handlers;

/// <summary>
/// Xử lý xóa bước và renumber lại toàn bộ StepNumber còn lại.
/// </summary>
public sealed class DeleteRecipeStepCommandHandler
    : IRequestHandler<DeleteRecipeStepCommand, Unit>
{
    private readonly IApplicationDbContext _db;
    private readonly ICurrentUserService _currentUser;

    public DeleteRecipeStepCommandHandler(
        IApplicationDbContext db,
        ICurrentUserService currentUser)
    {
        _db = db;
        _currentUser = currentUser;
    }

    public async Task<Unit> Handle(
        DeleteRecipeStepCommand request,
        CancellationToken cancellationToken)
    {
        // Kiểm tra recipe.
        var recipe = await _db.Recipes
            .FirstOrDefaultAsync(x => x.Id == request.RecipeId, cancellationToken);

        if (recipe is null)
            throw new KeyNotFoundException("Recipe not found.");

        if (!CurrentUserAuthorization.CanManageRecipe(_currentUser, recipe.AuthorId))
            throw new UnauthorizedAccessException("You do not have permission to manage this recipe.");

        // Tìm step cần xóa.
        var step = await _db.RecipeSteps
            .FirstOrDefaultAsync(
                x => x.Id == request.StepId && x.RecipeId == request.RecipeId,
                cancellationToken);

        if (step is null)
            throw new KeyNotFoundException("Step not found.");

        // Xóa step.
        _db.RecipeSteps.Remove(step);
        await _db.SaveChangesAsync(cancellationToken);

        // Lấy lại danh sách step còn lại theo StepNumber để renumber.
        var remainingSteps = await _db.RecipeSteps
            .Where(x => x.RecipeId == request.RecipeId)
            .OrderBy(x => x.StepNumber)
            .ToListAsync(cancellationToken);

        // Renumber lại từ 1..n để đảm bảo không bị hở số.
        for (var i = 0; i < remainingSteps.Count; i++)
        {
            remainingSteps[i].SetStepNumber(i + 1);
        }

        await _db.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    // private bool CanManageRecipe(string authorId)
    // {
    //     return string.Equals(_currentUser.UserId, authorId, StringComparison.Ordinal);
    // }
}
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Features.Recipes.Ingredients.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Ingredients.Handlers;

public sealed class UpdateRecipeIngredientCommandHandler
    : IRequestHandler<UpdateRecipeIngredientCommand, RecipeIngredientDto>
{
    private readonly IApplicationDbContext _db;
    private readonly ICurrentUserService _currentUser;

    public UpdateRecipeIngredientCommandHandler(
        IApplicationDbContext db,
        ICurrentUserService currentUser)
    {
        _db = db;
        _currentUser = currentUser;
    }

    public async Task<RecipeIngredientDto> Handle(
        UpdateRecipeIngredientCommand request,
        CancellationToken cancellationToken)
    {
        var recipe = await _db.Recipes
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == request.RecipeId, cancellationToken);

        if (recipe is null)
            throw new KeyNotFoundException("Recipe not found.");

        if (!CanManageRecipe(recipe.AuthorId))
            throw new UnauthorizedAccessException("You do not have permission to manage this recipe.");

        var ingredient = await _db.RecipeIngredients
            .FirstOrDefaultAsync(
                x => x.Id == request.IngredientId && x.RecipeId == request.RecipeId,
                cancellationToken);

        if (ingredient is null)
            throw new KeyNotFoundException("Ingredient not found.");

        ingredient.UpdateDetails(
            request.Name,
            request.Quantity,
            request.Unit,
            request.Notes,
            request.OrderIndex);

        await _db.SaveChangesAsync(cancellationToken);

        return new RecipeIngredientDto(
            ingredient.Id,
            ingredient.RecipeId,
            ingredient.Name,
            ingredient.Quantity ?? 0m,
            ingredient.Unit ?? string.Empty,
            ingredient.Notes,
            ingredient.OrderIndex);
    }

    private bool CanManageRecipe(string authorId)
    {
        return string.Equals(_currentUser.UserId, authorId, StringComparison.Ordinal);
    }
}
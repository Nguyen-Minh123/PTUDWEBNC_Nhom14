using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Ingredients.Commands;

public sealed record UpdateRecipeIngredientCommand(
    Guid RecipeId,
    Guid IngredientId,
    string Name,
    decimal Quantity,
    string Unit,
    string? Notes,
    int OrderIndex
) : IRequest<RecipeIngredientDto>;
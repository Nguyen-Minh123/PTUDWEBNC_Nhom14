using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Ingredients.Commands;

public sealed record CreateRecipeIngredientCommand(
    Guid RecipeId,
    string Name,
    decimal Quantity,
    string Unit,
    string? Notes,
    int OrderIndex
) : IRequest<RecipeIngredientDto>;
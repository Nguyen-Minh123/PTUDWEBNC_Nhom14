using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Ingredients.Commands;

public sealed record DeleteRecipeIngredientCommand(
    Guid RecipeId,
    Guid IngredientId
) : IRequest<Unit>;
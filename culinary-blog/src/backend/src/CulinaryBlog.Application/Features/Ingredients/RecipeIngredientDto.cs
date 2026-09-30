namespace CulinaryBlog.Application.Features.Recipes.Ingredients;

public sealed record RecipeIngredientDto(
    Guid Id,
    Guid RecipeId,
    string Name,
    decimal Quantity,
    string Unit,
    string? Notes,
    int OrderIndex);
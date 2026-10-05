namespace CulinaryBlog.Application.Features.Recipes;

public sealed record RecipeDto(
    Guid Id,
    string Title,
    string Description,
    Guid CategoryId,
    int PrepTimeMinutes,
    int CookTimeMinutes,
    int Servings,
    string Difficulty,
    string Instructions,
    byte[] RowVersion);
using CulinaryBlog.Domain.Entities;

namespace CulinaryBlog.Application.Features.Recipes;

public sealed record RecipeNutritionDto(
    decimal? Calories,
    decimal? Protein,
    decimal? Carbohydrates,
    decimal? Fat,
    decimal? Fiber,
    decimal? Sodium)
{
    public RecipeNutrition ToEntity() => new()
    {
        Calories = Calories,
        Protein = Protein,
        Carbohydrates = Carbohydrates,
        Fat = Fat,
        Fiber = Fiber,
        Sodium = Sodium
    };

    public static RecipeNutritionDto FromEntity(RecipeNutrition nutrition) => new(
        nutrition.Calories,
        nutrition.Protein,
        nutrition.Carbohydrates,
        nutrition.Fat,
        nutrition.Fiber,
        nutrition.Sodium);
}

public sealed record RecipeLifecycleDto(
    Guid Id,
    string Title,
    string Slug,
    string Description,
    string Instructions,
    int PrepTime,
    int CookTime,
    int Servings,
    RecipeDifficulty Difficulty,
    RecipeStatus Status,
    Guid CategoryId,
    string AuthorId,
    DateTimeOffset CreatedAt,
    DateTimeOffset? UpdatedAt,
    DateTimeOffset? PublishedAt,
    RecipeNutritionDto Nutrition)
{
    public static RecipeLifecycleDto FromEntity(Recipe recipe) => new(
        recipe.Id,
        recipe.Title,
        recipe.Slug,
        recipe.Description,
        recipe.Instructions,
        recipe.PrepTime,
        recipe.CookTime,
        recipe.Servings,
        recipe.Difficulty,
        recipe.Status,
        recipe.CategoryId,
        recipe.AuthorId,
        recipe.CreatedAt,
        recipe.UpdatedAt,
        recipe.PublishedAt,
        RecipeNutritionDto.FromEntity(recipe.Nutrition));
}

public sealed record RecipeLifecyclePageDto(
    IReadOnlyList<RecipeLifecycleDto> Items,
    int TotalCount,
    int Page,
    int PageSize);
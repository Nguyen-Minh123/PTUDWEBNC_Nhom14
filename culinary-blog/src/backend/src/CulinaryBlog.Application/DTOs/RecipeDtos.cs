using CulinaryBlog.Domain.Entities;

namespace CulinaryBlog.Application.DTOs;

public record RecipeSummaryDto(
    Guid Id,
    string Title,
    string Slug,
    string Description,
    int PrepTime,
    int CookTime,
    int Servings,
    RecipeDifficulty Difficulty,
    RecipeStatus Status,
    Guid CategoryId,
    string AuthorId,
    DateTime CreatedAt,
    DateTime? UpdatedAt
);

public record RecipeDetailDto(
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
    DateTime CreatedAt,
    DateTime? UpdatedAt,
    CategoryDto? Category,
    List<RecipeStepDto> Steps,
    List<RecipeIngredientDto> Ingredients,
    List<RecipeImageDto> Images
);

public record CategoryDto(Guid Id, string Name, string Slug, string Description);

public record RecipeStepDto(Guid Id, int StepNumber, string Title, string Description, int? TimerMinutes, string? ImageUrl);

public record RecipeIngredientDto(Guid Id, string Name, decimal? Quantity, string? Unit, string? Notes, int OrderIndex);

public record RecipeImageDto(Guid Id, string OriginalUrl, string? MediumUrl, string? ThumbnailUrl, string? AltText, bool IsPrimary, int OrderIndex);

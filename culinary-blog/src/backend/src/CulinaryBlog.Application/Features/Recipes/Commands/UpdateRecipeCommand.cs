using CulinaryBlog.Domain.Entities;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Commands;

/// <summary>
/// Command cập nhật Recipe có hỗ trợ Concurrency Token (RowVersion).
/// </summary>
public sealed record UpdateRecipeCommand(
    Guid Id,
    string Title,
    string Slug,
    string Description,
    string Instructions,
    int PrepTime,
    int CookTime,
    int Servings,
    RecipeDifficulty Difficulty,
    Guid CategoryId,
    RecipeNutrition? Nutrition = null,
    uint? RowVersion = null
) : IRequest<Recipe>;

/// <summary>
/// DTO trả về sau khi cập nhật (dành cho client cần RowVersion mới).
/// </summary>
public sealed record RecipeDto(
    Guid Id,
    string Title,
    string Slug,
    string Description,
    string Instructions,
    int PrepTime,
    int CookTime,
    int Servings,
    RecipeDifficulty Difficulty,
    Guid CategoryId,
    uint RowVersion);

using CulinaryBlog.Domain.Entities;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Commands.UpdateRecipe;

/// <summary>
/// Command cập nhật Recipe.
/// RowVersion là token đồng thời để tránh ghi đè dữ liệu cũ.
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
    uint RowVersion
) : IRequest<RecipeDto>;

/// <summary>
/// DTO trả về sau khi cập nhật.
/// Client nên giữ RowVersion mới nhất cho lần sửa tiếp theo.
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
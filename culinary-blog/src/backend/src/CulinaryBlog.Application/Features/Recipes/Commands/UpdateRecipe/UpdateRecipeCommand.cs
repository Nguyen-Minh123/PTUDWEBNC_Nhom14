using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Commands.UpdateRecipe;

/// <summary>
/// Command cập nhật thông tin Recipe.
/// RowVersion dùng để kiểm tra concurrency (optimistic concurrency).
/// </summary>
public sealed record UpdateRecipeCommand(
    Guid Id,
    string Title,
    string Description,
    Guid CategoryId,
    int PrepTimeMinutes,
    int CookTimeMinutes,
    int Servings,
    string Difficulty,
    string Instructions,
    byte[] RowVersion
) : IRequest<RecipeDto>;
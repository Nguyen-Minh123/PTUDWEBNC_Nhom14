namespace CulinaryBlog.Application.Features.Recipes.Images;

/// <summary>
/// Dữ liệu trả về cho một ảnh công thức.
/// </summary>
public sealed record RecipeImageDto(
    Guid Id,
    Guid RecipeId,
    string OriginalUrl,
    string? MediumUrl,
    string? ThumbnailUrl,
    string? AltText,
    bool IsPrimary,
    int OrderIndex);
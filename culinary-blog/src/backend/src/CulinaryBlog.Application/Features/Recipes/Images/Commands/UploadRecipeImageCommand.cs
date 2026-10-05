using MediatR;
using Microsoft.AspNetCore.Http;

namespace CulinaryBlog.Application.Features.Recipes.Images.Commands;

/// <summary>
/// Command upload ảnh mới cho một recipe.
/// </summary>
public sealed record UploadRecipeImageCommand(
    Guid RecipeId,
    IFormFile File,
    string? AltText,
    int OrderIndex
) : IRequest<RecipeImageDto>;
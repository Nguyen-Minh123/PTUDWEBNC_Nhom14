using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Images.Commands;

/// <summary>
/// Command xóa một ảnh khỏi recipe.
/// </summary>
public sealed record DeleteRecipeImageCommand(
    Guid RecipeId,
    Guid ImageId
) : IRequest<Unit>;
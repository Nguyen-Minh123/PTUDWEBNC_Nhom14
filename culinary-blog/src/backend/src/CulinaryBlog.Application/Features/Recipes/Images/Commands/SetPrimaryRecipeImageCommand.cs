using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Images.Commands;

/// <summary>
/// Command đặt một ảnh làm ảnh chính.
/// </summary>
public sealed record SetPrimaryRecipeImageCommand(
    Guid RecipeId,
    Guid ImageId
) : IRequest<RecipeImageDto>;
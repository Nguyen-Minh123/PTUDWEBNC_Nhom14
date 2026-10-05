using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Features.Recipes.Images.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Images.Handlers;

/// <summary>
/// Xử lý đặt một ảnh làm ảnh chính.
/// </summary>
public sealed class SetPrimaryRecipeImageCommandHandler
    : IRequestHandler<SetPrimaryRecipeImageCommand, RecipeImageDto>
{
    private readonly IApplicationDbContext _db;
    private readonly ICurrentUserService _currentUser;

    public SetPrimaryRecipeImageCommandHandler(
        IApplicationDbContext db,
        ICurrentUserService currentUser)
    {
        _db = db;
        _currentUser = currentUser;
    }

    public async Task<RecipeImageDto> Handle(
        SetPrimaryRecipeImageCommand request,
        CancellationToken cancellationToken)
    {
        var recipe = await _db.Recipes
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == request.RecipeId, cancellationToken);

        if (recipe is null)
            throw new KeyNotFoundException("Recipe not found.");

        if (!CanManageRecipe(recipe.AuthorId))
            throw new UnauthorizedAccessException("You do not have permission to manage this recipe.");

        var image = await _db.RecipeImages
            .FirstOrDefaultAsync(
                x => x.Id == request.ImageId && x.RecipeId == request.RecipeId,
                cancellationToken);

        if (image is null)
            throw new KeyNotFoundException("Image not found.");

        // Chỉ được phép có 1 ảnh chính cho mỗi recipe.
        foreach (var item in recipe.Images)
        {
            item.UnmarkAsPrimary();
        }

        image.MarkAsPrimary();

        await _db.SaveChangesAsync(cancellationToken);

        return new RecipeImageDto(
            image.Id,
            image.RecipeId,
            image.OriginalUrl,
            image.MediumUrl,
            image.ThumbnailUrl,
            image.AltText,
            image.IsPrimary,
            image.OrderIndex);
    }

    private bool CanManageRecipe(string authorId)
    {
        return string.Equals(_currentUser.UserId, authorId, StringComparison.Ordinal);
    }
}
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.Features.Recipes.Images.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Images.Handlers;

/// <summary>
/// Xử lý đặt một ảnh làm ảnh chính.
/// Quy tắc:
/// - Recipe phải tồn tại.
/// - Người dùng phải có quyền quản lý recipe.
/// - Ảnh phải thuộc về đúng recipe.
/// - Khi đặt ảnh mới làm primary, toàn bộ ảnh khác sẽ bị bỏ primary.
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
        // Load recipe kèm danh sách ảnh để kiểm tra ownership và cập nhật trạng thái primary trong cùng aggregate.
        var recipe = await _db.Recipes
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == request.RecipeId, cancellationToken);

        if (recipe is null)
        {
            throw new KeyNotFoundException("Recipe not found.");
        }

        // Chỉ author của recipe hoặc admin (nếu policy CurrentUserAuthorization hỗ trợ) mới được thao tác.
        if (!CurrentUserAuthorization.CanManageRecipe(_currentUser, recipe.AuthorId))
        {
            throw new UnauthorizedAccessException("You do not have permission to manage this recipe.");
        }

        // Tìm ảnh ngay trong collection của recipe để tránh query thừa và đảm bảo ảnh thuộc đúng aggregate.
        var image = recipe.Images.FirstOrDefault(x => x.Id == request.ImageId);

        if (image is null)
        {
            throw new KeyNotFoundException("Image not found.");
        }

        // Aggregate root chịu trách nhiệm giữ invariant:
        // chỉ có tối đa 1 ảnh chính tại một thời điểm.
        recipe.SetPrimaryImage(image);

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
}
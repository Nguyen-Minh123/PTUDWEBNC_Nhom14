using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.Features.Recipes.Images.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Images.Handlers;

/// <summary>
/// Xử lý xóa ảnh khỏi recipe.
/// Sau khi xóa, nếu ảnh bị xóa là ảnh chính thì ảnh đầu tiên còn lại sẽ được đặt làm primary.
/// </summary>
public sealed class DeleteRecipeImageCommandHandler
    : IRequestHandler<DeleteRecipeImageCommand, Unit>
{
    private readonly IApplicationDbContext _db;
    private readonly ICurrentUserService _currentUser;
    private readonly IFileStorageService _fileStorageService;

    public DeleteRecipeImageCommandHandler(
        IApplicationDbContext db,
        ICurrentUserService currentUser,
        IFileStorageService fileStorageService)
    {
        _db = db;
        _currentUser = currentUser;
        _fileStorageService = fileStorageService;
    }

    public async Task<Unit> Handle(
        DeleteRecipeImageCommand request,
        CancellationToken cancellationToken)
    {
        var recipe = await _db.Recipes
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == request.RecipeId, cancellationToken);

        if (recipe is null)
            throw new KeyNotFoundException("Recipe not found.");

        if (!CurrentUserAuthorization.CanManageRecipe(_currentUser, recipe.AuthorId))
            throw new UnauthorizedAccessException("You do not have permission to manage this recipe.");

        var image = await _db.RecipeImages
            .FirstOrDefaultAsync(
                x => x.Id == request.ImageId && x.RecipeId == request.RecipeId,
                cancellationToken);

        if (image is null)
            throw new KeyNotFoundException("Image not found.");

        var wasPrimary = image.IsPrimary;

        _db.RecipeImages.Remove(image);
        await _db.SaveChangesAsync(cancellationToken);

        // Sau khi xóa, nếu ảnh bị xóa là ảnh chính thì chọn ảnh đầu tiên còn lại làm ảnh chính.
        if (wasPrimary)
        {
            var remainingImages = await _db.RecipeImages
                .Where(x => x.RecipeId == request.RecipeId)
                .OrderBy(x => x.OrderIndex)
                .ToListAsync(cancellationToken);

            if (remainingImages.Count > 0)
            {
                remainingImages[0].MarkAsPrimary();
                await _db.SaveChangesAsync(cancellationToken);
            }
        }

        // Xóa file vật lý trên MinIO.
        // Nếu project của bạn đã có Hangfire wrapper/job queue,
        // hãy thay khối gọi trực tiếp này bằng enqueue background job.
        await DeleteFileIfNotEmptyAsync(image.OriginalUrl, cancellationToken);
        await DeleteFileIfNotEmptyAsync(image.MediumUrl, cancellationToken);
        await DeleteFileIfNotEmptyAsync(image.ThumbnailUrl, cancellationToken);

        return Unit.Value;
    }

    // private bool CanManageRecipe(string authorId)
    // {
    //     return string.Equals(_currentUser.UserId, authorId, StringComparison.Ordinal);
    // }

    private async Task DeleteFileIfNotEmptyAsync(string? fileUrl, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(fileUrl))
            return;

        // DeleteAsync trong SRS là idempotent: file không tồn tại thì không ném lỗi.
        await _fileStorageService.DeleteAsync(fileUrl, cancellationToken);
    }
}
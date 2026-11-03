using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.Features.Recipes.Images.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Images.Handlers;

/// <summary>
/// Xử lý xóa ảnh khỏi recipe.
/// Trình tự:
/// 1) Kiểm tra recipe tồn tại.
/// 2) Kiểm tra quyền sở hữu.
/// 3) Tìm ảnh cần xóa.
/// 4) Xóa metadata ảnh khỏi database.
/// 5) Nếu ảnh bị xóa là ảnh chính, gán ảnh còn lại đầu tiên làm primary.
/// 6) Xóa file vật lý trên MinIO.
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
        // Load recipe kèm ảnh để kiểm tra quyền và xử lý ảnh chính sau khi xóa.
        var recipe = await _db.Recipes
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == request.RecipeId, cancellationToken);

        if (recipe is null)
        {
            throw new KeyNotFoundException("Recipe not found.");
        }

        if (!CurrentUserAuthorization.CanManageRecipe(_currentUser, recipe.AuthorId))
        {
            throw new UnauthorizedAccessException("You do not have permission to manage this recipe.");
        }

        // Chỉ tìm trong collection của recipe để đảm bảo ảnh thuộc đúng aggregate.
        var image = recipe.Images.FirstOrDefault(x => x.Id == request.ImageId);

        if (image is null)
        {
            throw new KeyNotFoundException("Image not found.");
        }

        var wasPrimary = image.IsPrimary;

        // Chụp lại danh sách ảnh còn lại trước khi xóa để có thể reassign primary nếu cần.
        var remainingImages = recipe.Images
            .Where(x => x.Id != image.Id)
            .OrderBy(x => x.OrderIndex)
            .ToList();

        // Xóa entity khỏi DbContext.
        _db.RecipeImages.Remove(image);
        await _db.SaveChangesAsync(cancellationToken);

        // Nếu ảnh bị xóa là ảnh chính, chọn ảnh đầu tiên còn lại làm ảnh chính mới.
        if (wasPrimary && remainingImages.Count > 0)
        {
            var newPrimary = remainingImages[0];

            // Dùng aggregate rule để đảm bảo chỉ một ảnh chính.
            recipe.SetPrimaryImage(newPrimary);
            await _db.SaveChangesAsync(cancellationToken);
        }

        // Xóa file vật lý trên MinIO.
        // Nếu hệ thống đã có Hangfire/background jobs, có thể chuyển đoạn này sang job để tăng độ ổn định.
        await DeleteFileIfNotEmptyAsync(image.OriginalUrl, cancellationToken);
        await DeleteFileIfNotEmptyAsync(image.MediumUrl, cancellationToken);
        await DeleteFileIfNotEmptyAsync(image.ThumbnailUrl, cancellationToken);

        return Unit.Value;
    }

    /// <summary>
    /// Xóa file nếu URL hợp lệ.
    /// Hàm này được tách riêng để xử lý từng phiên bản ảnh (original / medium / thumbnail).
    /// </summary>
    private async Task DeleteFileIfNotEmptyAsync(string? fileUrl, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(fileUrl))
        {
            return;
        }

        // DeleteAsync nên idempotent: file không còn tồn tại thì không làm hỏng luồng chính.
        await _fileStorageService.DeleteAsync(fileUrl, cancellationToken);
    }
}
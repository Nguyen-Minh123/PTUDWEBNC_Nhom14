using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Commands.DeleteRecipe;

/// <summary>
/// Xử lý xóa Recipe.
/// - Xóa recipe trong database
/// - Xóa metadata ảnh theo cascade
/// - Dọn file vật lý trên MinIO theo danh sách URL đã lưu
/// </summary>
public sealed class DeleteRecipeCommandHandler
    : IRequestHandler<DeleteRecipeCommand, Unit>
{
    private readonly IApplicationDbContext _db;
    private readonly ICurrentUserService _currentUser;
    private readonly IFileStorageService _fileStorageService;

    public DeleteRecipeCommandHandler(
        IApplicationDbContext db,
        ICurrentUserService currentUser,
        IFileStorageService fileStorageService)
    {
        _db = db;
        _currentUser = currentUser;
        _fileStorageService = fileStorageService;
    }

    public async Task<Unit> Handle(DeleteRecipeCommand request, CancellationToken cancellationToken)
    {
        // Lấy recipe kèm ảnh để kiểm tra quyền và thu thập file cần xóa.
        var recipe = await _db.Recipes
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (recipe is null)
        {
            throw new KeyNotFoundException("Recipe not found.");
        }

        // Chỉ chủ sở hữu hoặc admin mới được xóa.
        if (!CurrentUserAuthorization.CanManageRecipe(_currentUser, recipe.AuthorId))
        {
            throw new UnauthorizedAccessException("You do not have permission to delete this recipe.");
        }

        // Gom tất cả URL file liên quan để dọn MinIO sau khi xóa DB.
        var fileUrls = recipe.Images
            .SelectMany(x => new[] { x.OriginalUrl, x.MediumUrl, x.ThumbnailUrl })
            .Where(url => !string.IsNullOrWhiteSpace(url))
            .Select(url => url!.Trim())
            .Distinct()
            .ToList();

        _db.Recipes.Remove(recipe);

        try
        {
            await _db.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateConcurrencyException)
        {
            throw new InvalidOperationException(
                "Recipe could not be deleted because it was modified by another user.");
        }

        // Best-effort delete file vật lý.
        // Nếu muốn retry tốt hơn, hãy chuyển sang Hangfire job.
        foreach (var fileUrl in fileUrls)
        {
            try
            {
                await _fileStorageService.DeleteAsync(fileUrl, cancellationToken);
            }
            catch
            {
                // Không làm hỏng response vì DB đã xóa xong.
                // Production nên log lỗi tại đây.
            }
        }

        return Unit.Value;
    }
}
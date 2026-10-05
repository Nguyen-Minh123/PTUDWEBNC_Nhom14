using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Features.Recipes.Images.Commands;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace CulinaryBlog.Application.Features.Recipes.Images.Handlers;

/// <summary>
/// Xử lý upload ảnh công thức lên object storage và lưu metadata vào database.
/// </summary>
public sealed class UploadRecipeImageCommandHandler
    : IRequestHandler<UploadRecipeImageCommand, RecipeImageDto>
{
    private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif"
    };

    private readonly IApplicationDbContext _db;
    private readonly ICurrentUserService _currentUser;
    private readonly IFileStorageService _fileStorageService;

    public UploadRecipeImageCommandHandler(
        IApplicationDbContext db,
        ICurrentUserService currentUser,
        IFileStorageService fileStorageService)
    {
        _db = db;
        _currentUser = currentUser;
        _fileStorageService = fileStorageService;
    }

    public async Task<RecipeImageDto> Handle(
        UploadRecipeImageCommand request,
        CancellationToken cancellationToken)
    {
        // Kiểm tra file hợp lệ.
        if (request.File is null || request.File.Length == 0)
            throw new ArgumentException("File không được rỗng.");

        // Tìm recipe để kiểm tra tồn tại và quyền sở hữu.
        var recipe = await _db.Recipes
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == request.RecipeId, cancellationToken);

        if (recipe is null)
            throw new KeyNotFoundException("Recipe not found.");

        if (!CanManageRecipe(recipe.AuthorId))
            throw new UnauthorizedAccessException("You do not have permission to manage this recipe.");

        // Validate MIME type theo SRS.
        if (!AllowedContentTypes.Contains(request.File.ContentType))
            throw new ArgumentException("MIME type không hợp lệ.");

        // Validate magic bytes trước khi upload.
        if (!await HasValidMagicBytesAsync(request.File, cancellationToken))
            throw new ArgumentException("File không hợp lệ.");

        // Tạo tên file duy nhất theo folder của recipe.
        // Ví dụ: recipes/{recipeId}/{guid}.jpg
        var extension = Path.GetExtension(request.File.FileName);
        if (string.IsNullOrWhiteSpace(extension))
            extension = GetDefaultExtension(request.File.ContentType);

        var fileName = $"recipes/{request.RecipeId}/{Guid.NewGuid()}{extension}";

        // Upload file bằng đúng chữ ký của IFileStorageService:
        // Stream, fileName, contentType, length.
        await using var uploadStream = request.File.OpenReadStream();
        var publicUrl = await _fileStorageService.UploadAsync(
            uploadStream,
            fileName,
            request.File.ContentType,
            request.File.Length,
            cancellationToken);

        // Ảnh đầu tiên của recipe sẽ tự động là ảnh chính.
        var isFirstImage = !recipe.Images.Any();

        // Nếu client không truyền orderIndex hợp lệ, cho vào cuối danh sách.
        var nextOrderIndex = recipe.Images.Any()
            ? recipe.Images.Max(x => x.OrderIndex) + 1
            : 0;

        var image = new RecipeImage(
            request.RecipeId,
            publicUrl,
            request.AltText,
            request.OrderIndex > 0 ? request.OrderIndex : nextOrderIndex,
            isPrimary: isFirstImage);

        _db.RecipeImages.Add(image);
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
        // Nếu sau này interface có IsAdmin thì thêm điều kiện OR ở đây.
        return string.Equals(_currentUser.UserId, authorId, StringComparison.Ordinal);
    }

    private static async Task<bool> HasValidMagicBytesAsync(IFormFile file, CancellationToken cancellationToken)
    {
        // Dùng stream riêng để kiểm tra chữ ký file.
        await using var stream = file.OpenReadStream();
        var buffer = new byte[16];
        var read = await stream.ReadAsync(buffer, cancellationToken);

        if (read < 4)
            return false;

        // JPEG: FF D8 FF
        if (buffer[0] == 0xFF && buffer[1] == 0xD8 && buffer[2] == 0xFF)
            return true;

        // PNG: 89 50 4E 47
        if (buffer[0] == 0x89 && buffer[1] == 0x50 && buffer[2] == 0x4E && buffer[3] == 0x47)
            return true;

        // WebP: RIFF....WEBP
        if (read >= 12 &&
            buffer[0] == (byte)'R' && buffer[1] == (byte)'I' && buffer[2] == (byte)'F' && buffer[3] == (byte)'F' &&
            buffer[8] == (byte)'W' && buffer[9] == (byte)'E' && buffer[10] == (byte)'B' && buffer[11] == (byte)'P')
        {
            return true;
        }

        // AVIF: ....ftypavif / ....ftypavis
        if (read >= 12 &&
            buffer[4] == (byte)'f' && buffer[5] == (byte)'t' && buffer[6] == (byte)'y' && buffer[7] == (byte)'p' &&
            ((buffer[8] == (byte)'a' && buffer[9] == (byte)'v' && buffer[10] == (byte)'i' && buffer[11] == (byte)'f') ||
             (buffer[8] == (byte)'a' && buffer[9] == (byte)'v' && buffer[10] == (byte)'i' && buffer[11] == (byte)'s')))
        {
            return true;
        }

        return false;
    }

    private static string GetDefaultExtension(string contentType)
    {
        return contentType.ToLowerInvariant() switch
        {
            "image/jpeg" => ".jpg",
            "image/png" => ".png",
            "image/webp" => ".webp",
            "image/avif" => ".avif",
            _ => ".bin"
        };
    }
}
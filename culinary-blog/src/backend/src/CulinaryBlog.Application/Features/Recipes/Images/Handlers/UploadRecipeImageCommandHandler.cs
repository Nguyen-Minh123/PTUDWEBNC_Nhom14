using System.Security.Cryptography;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.Features.Recipes.Images.Commands;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Images.Handlers;

/// <summary>
/// Xử lý upload ảnh công thức lên MinIO và lưu metadata vào database.
/// Thiết kế theo hướng:
/// - File thực lưu trên object storage.
/// - Database chỉ lưu metadata phục vụ truy vấn, hiển thị và tối ưu hóa.
/// </summary>
public sealed class UploadRecipeImageCommandHandler
    : IRequestHandler<UploadRecipeImageCommand, RecipeImageDto>
{
    // Theo SRS: chỉ chấp nhận 4 MIME type này.
    private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif"
    };

    // Theo SRS: kích thước file tối đa 5MB.
    private const long MaxFileSizeBytes = 5 * 1024 * 1024;

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

    /// <summary>
    /// Luồng chính:
    /// 1) Kiểm tra file đầu vào.
    /// 2) Tải recipe và kiểm tra quyền.
    /// 3) Kiểm tra MIME type + magic bytes.
    /// 4) Tính checksum SHA-256 để hỗ trợ kiểm tra toàn vẹn/dedupe.
    /// 5) Upload lên MinIO theo path chuẩn.
    /// 6) Lưu metadata ảnh vào CSDL.
    /// 7) Nếu là ảnh đầu tiên thì tự động set primary.
    /// </summary>
    public async Task<RecipeImageDto> Handle(
        UploadRecipeImageCommand request,
        CancellationToken cancellationToken)
    {
        ValidateFileOrThrow(request.File);

        // Load recipe kèm danh sách ảnh để:
        // - kiểm tra tồn tại
        // - kiểm tra quyền sở hữu
        // - xác định ảnh đầu tiên/OrderIndex
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

        // Đọc toàn bộ file vào memory stream vì:
        // - file bị giới hạn 5MB theo SRS
        // - cần đọc 2 lần: 1 lần tính checksum, 1 lần upload
        await using var bufferStream = new MemoryStream();
        await request.File.CopyToAsync(bufferStream, cancellationToken);

        if (bufferStream.Length == 0)
        {
            throw new ArgumentException("File không được rỗng.", nameof(request.File));
        }

        if (bufferStream.Length > MaxFileSizeBytes)
        {
            throw new ArgumentOutOfRangeException(nameof(request.File), "File vượt quá giới hạn 5MB.");
        }

        // Xác nhận chữ ký file thực sự khớp với loại ảnh được khai báo.
        if (!HasValidMagicBytes(bufferStream, request.File.ContentType))
        {
            throw new ArgumentException("File không hợp lệ hoặc không khớp MIME type.", nameof(request.File));
        }

        // Tính checksum SHA-256 để lưu metadata và hỗ trợ kiểm tra trùng lặp.
        var checksumSha256 = ComputeSha256(bufferStream);

        // Path lưu trên MinIO theo đúng tinh thần SRS:
        // recipes/{recipeId}/{uuid}.{ext}
        var objectKey = BuildObjectKey(request.RecipeId, request.File.ContentType);

        // URL công khai trả về từ object storage.
        // Lưu ý: backend chỉ cần biết URL/object key để phục vụ đọc/xóa ảnh.
        await using (var uploadStream = new MemoryStream(bufferStream.ToArray(), writable: false))
        {
            uploadStream.Position = 0;

            var publicUrl = await _fileStorageService.UploadAsync(
                uploadStream,
                objectKey,
                request.File.ContentType,
                uploadStream.Length,
                cancellationToken);

            // Ảnh đầu tiên của recipe sẽ tự động là ảnh chính.
            var isFirstImage = !recipe.Images.Any();

            // Nếu client chưa sắp xếp, đặt ảnh vào cuối danh sách.
            // Lưu ý: nếu muốn support "0 là hợp lệ", nên đổi OrderIndex trong command thành int?.
            var nextOrderIndex = recipe.Images.Any()
                ? recipe.Images.Max(x => x.OrderIndex) + 1
                : 0;

            var resolvedOrderIndex = request.OrderIndex > 0
                ? request.OrderIndex
                : nextOrderIndex;

            // Metadata ảnh: chỉ lưu thông tin cần cho hiển thị, quản trị và tối ưu truy vấn.
            // Width/Height để null nếu chưa có thư viện xử lý ảnh riêng.
            var image = new RecipeImage(
                recipeId: request.RecipeId,
                objectKey: objectKey,
                originalUrl: publicUrl,
                contentType: request.File.ContentType,
                fileSize: uploadStream.Length,
                checksumSha256: checksumSha256,
                altText: request.AltText,
                orderIndex: resolvedOrderIndex,
                isPrimary: isFirstImage,
                mediumUrl: null,
                thumbnailUrl: null,
                width: null,
                height: null,
                storageProvider: "MinIO");

            // Giữ invariant tại aggregate root.
            recipe.AddImage(image);

            // EF Core track entity con.
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
    }

    /// <summary>
    /// Kiểm tra đầu vào ở mức application layer.
    /// </summary>
    private static void ValidateFileOrThrow(IFormFile? file)
    {
        if (file is null)
        {
            throw new ArgumentNullException(nameof(file), "File is required.");
        }

        if (file.Length <= 0)
        {
            throw new ArgumentException("File không được rỗng.", nameof(file));
        }

        if (file.Length > MaxFileSizeBytes)
        {
            throw new ArgumentOutOfRangeException(nameof(file), "File vượt quá giới hạn 5MB.");
        }

        if (string.IsNullOrWhiteSpace(file.ContentType) || !AllowedContentTypes.Contains(file.ContentType))
        {
            throw new ArgumentException("MIME type không hợp lệ.", nameof(file));
        }
    }

    /// <summary>
    /// Tạo object key cho MinIO.
    /// </summary>
    private static string BuildObjectKey(Guid recipeId, string contentType)
    {
        var extension = GetDefaultExtension(contentType);
        return $"recipes/{recipeId}/{Guid.NewGuid():N}{extension}";
    }

    /// <summary>
    /// Suy ra extension từ MIME type để tránh tin extension do client cung cấp.
    /// </summary>
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

    /// <summary>
    /// Xác minh magic bytes để chống file giả mạo MIME type.
    /// </summary>
    private static bool HasValidMagicBytes(MemoryStream stream, string contentType)
    {
        var buffer = stream.ToArray();
        if (buffer.Length < 4)
        {
            return false;
        }

        // JPEG: FF D8 FF
        if (contentType.Equals("image/jpeg", StringComparison.OrdinalIgnoreCase))
        {
            return buffer[0] == 0xFF && buffer[1] == 0xD8 && buffer[2] == 0xFF;
        }

        // PNG: 89 50 4E 47
        if (contentType.Equals("image/png", StringComparison.OrdinalIgnoreCase))
        {
            return buffer[0] == 0x89 && buffer[1] == 0x50 && buffer[2] == 0x4E && buffer[3] == 0x47;
        }

        // WebP: RIFF....WEBP
        if (contentType.Equals("image/webp", StringComparison.OrdinalIgnoreCase))
        {
            return buffer.Length >= 12 &&
                   buffer[0] == (byte)'R' && buffer[1] == (byte)'I' && buffer[2] == (byte)'F' && buffer[3] == (byte)'F' &&
                   buffer[8] == (byte)'W' && buffer[9] == (byte)'E' && buffer[10] == (byte)'B' && buffer[11] == (byte)'P';
        }

        // AVIF: ....ftypavif / ....ftypavis
        if (contentType.Equals("image/avif", StringComparison.OrdinalIgnoreCase))
        {
            return buffer.Length >= 12 &&
                   buffer[4] == (byte)'f' && buffer[5] == (byte)'t' && buffer[6] == (byte)'y' && buffer[7] == (byte)'p' &&
                   ((buffer[8] == (byte)'a' && buffer[9] == (byte)'v' && buffer[10] == (byte)'i' && buffer[11] == (byte)'f') ||
                    (buffer[8] == (byte)'a' && buffer[9] == (byte)'v' && buffer[10] == (byte)'i' && buffer[11] == (byte)'s'));
        }

        return false;
    }

    /// <summary>
    /// Tính SHA-256 hash của file.
    /// </summary>
    private static string ComputeSha256(MemoryStream stream)
    {
        stream.Position = 0;

        using var sha256 = SHA256.Create();
        var hash = sha256.ComputeHash(stream);

        return Convert.ToHexString(hash).ToLowerInvariant();
    }
}

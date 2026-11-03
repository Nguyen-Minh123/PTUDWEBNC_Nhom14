using System.ComponentModel.DataAnnotations;
using CulinaryBlog.Domain.Common;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Ảnh minh họa của một Recipe.
/// Lớp này chỉ lưu metadata, còn file vật lý nằm trên MinIO.
/// </summary>
public class RecipeImage : BaseEntity
{
    private RecipeImage()
    {
    }

    /// <summary>
    /// Tạo mới metadata cho một ảnh recipe.
    /// </summary>
    public RecipeImage(
        Guid recipeId,
        string objectKey,
        string originalUrl,
        string contentType,
        long fileSize,
        string? checksumSha256 = null,
        string? altText = null,
        int orderIndex = 0,
        bool isPrimary = false,
        string? mediumUrl = null,
        string? thumbnailUrl = null,
        int? width = null,
        int? height = null,
        string storageProvider = "MinIO")
    {
        if (recipeId == Guid.Empty)
        {
            throw new ArgumentException("RecipeId cannot be empty.", nameof(recipeId));
        }

        RecipeId = recipeId;
        ObjectKey = NormalizeRequiredText(objectKey, 500, nameof(objectKey));
        OriginalUrl = NormalizeRequiredText(originalUrl, 500, nameof(originalUrl));
        ContentType = NormalizeRequiredText(contentType, 100, nameof(contentType));
        StorageProvider = NormalizeRequiredText(storageProvider, 50, nameof(storageProvider));

        if (fileSize <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(fileSize), "FileSize must be greater than 0.");
        }

        if (orderIndex < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(orderIndex), "OrderIndex cannot be negative.");
        }

        if (width is < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(width), "Width cannot be negative.");
        }

        if (height is < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(height), "Height cannot be negative.");
        }

        FileSize = fileSize;
        ChecksumSha256 = NormalizeOptionalText(checksumSha256, 64);
        AltText = NormalizeOptionalText(altText, 200);
        OrderIndex = orderIndex;
        IsPrimary = isPrimary;
        MediumUrl = NormalizeOptionalText(mediumUrl, 500);
        ThumbnailUrl = NormalizeOptionalText(thumbnailUrl, 500);
        Width = width;
        Height = height;
    }

    /// <summary>
    /// FK đến Recipe.
    /// </summary>
    public Guid RecipeId { get; private set; }

    /// <summary>
    /// Navigation property đến Recipe.
    /// </summary>
    public Recipe Recipe { get; private set; } = null!;

    /// <summary>
    /// Object key trên MinIO. Đây là định danh vật lý chuẩn.
    /// Ví dụ: recipes/{recipeId}/original/{uuid}.jpg
    /// </summary>
    [MaxLength(500)]
    public string ObjectKey { get; private set; } = string.Empty;

    /// <summary>
    /// URL công khai của ảnh gốc.
    /// </summary>
    [MaxLength(500)]
    public string OriginalUrl { get; private set; } = string.Empty;

    /// <summary>
    /// MIME type của file ảnh.
    /// </summary>
    [MaxLength(100)]
    public string ContentType { get; private set; } = string.Empty;

    /// <summary>
    /// Kích thước file tính theo bytes.
    /// </summary>
    public long FileSize { get; private set; }

    /// <summary>
    /// Hash SHA-256 của file để hỗ trợ dedupe và kiểm tra toàn vẹn.
    /// </summary>
    [MaxLength(64)]
    public string? ChecksumSha256 { get; private set; }

    /// <summary>
    /// URL ảnh medium.
    /// </summary>
    [MaxLength(500)]
    public string? MediumUrl { get; private set; }

    /// <summary>
    /// URL thumbnail.
    /// </summary>
    [MaxLength(500)]
    public string? ThumbnailUrl { get; private set; }

    /// <summary>
    /// Alt text cho accessibility.
    /// </summary>
    [MaxLength(200)]
    public string? AltText { get; private set; }

    /// <summary>
    /// Cờ xác định ảnh chính.
    /// </summary>
    public bool IsPrimary { get; private set; }

    /// <summary>
    /// Thứ tự hiển thị trong gallery.
    /// </summary>
    public int OrderIndex { get; private set; }

    /// <summary>
    /// Độ rộng ảnh gốc.
    /// </summary>
    public int? Width { get; private set; }

    /// <summary>
    /// Độ cao ảnh gốc.
    /// </summary>
    public int? Height { get; private set; }

    /// <summary>
    /// Tên provider lưu trữ, mặc định là MinIO.
    /// </summary>
    [MaxLength(50)]
    public string StorageProvider { get; private set; } = "MinIO";

    /// <summary>
    /// Cập nhật metadata ảnh.
    /// </summary>
    public void UpdateDetails(
        string objectKey,
        string originalUrl,
        string contentType,
        long fileSize,
        string? checksumSha256 = null,
        string? altText = null,
        int orderIndex = 0,
        bool isPrimary = false,
        string? mediumUrl = null,
        string? thumbnailUrl = null,
        int? width = null,
        int? height = null,
        string storageProvider = "MinIO")
    {
        if (fileSize <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(fileSize), "FileSize must be greater than 0.");
        }

        if (orderIndex < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(orderIndex), "OrderIndex cannot be negative.");
        }

        if (width is < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(width), "Width cannot be negative.");
        }

        if (height is < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(height), "Height cannot be negative.");
        }

        ObjectKey = NormalizeRequiredText(objectKey, 500, nameof(objectKey));
        OriginalUrl = NormalizeRequiredText(originalUrl, 500, nameof(originalUrl));
        ContentType = NormalizeRequiredText(contentType, 100, nameof(contentType));
        FileSize = fileSize;
        ChecksumSha256 = NormalizeOptionalText(checksumSha256, 64);
        AltText = NormalizeOptionalText(altText, 200);
        OrderIndex = orderIndex;
        IsPrimary = isPrimary;
        MediumUrl = NormalizeOptionalText(mediumUrl, 500);
        ThumbnailUrl = NormalizeOptionalText(thumbnailUrl, 500);
        Width = width;
        Height = height;
        StorageProvider = NormalizeRequiredText(storageProvider, 50, nameof(storageProvider));
    }

    /// <summary>
    /// Đánh dấu ảnh là ảnh chính.
    /// </summary>
    public void MarkAsPrimary() => IsPrimary = true;

    /// <summary>
    /// Bỏ đánh dấu ảnh chính.
    /// </summary>
    public void UnmarkAsPrimary() => IsPrimary = false;

    /// <summary>
    /// Cập nhật medium URL.
    /// </summary>
    public void SetMediumUrl(string? mediumUrl)
    {
        MediumUrl = NormalizeOptionalText(mediumUrl, 500);
    }

    /// <summary>
    /// Cập nhật thumbnail URL.
    /// </summary>
    public void SetThumbnailUrl(string? thumbnailUrl)
    {
        ThumbnailUrl = NormalizeOptionalText(thumbnailUrl, 500);
    }

    /// <summary>
    /// Cập nhật alt text.
    /// </summary>
    public void SetAltText(string? altText)
    {
        AltText = NormalizeOptionalText(altText, 200);
    }

    /// <summary>
    /// Cập nhật thứ tự hiển thị.
    /// </summary>
    public void SetOrderIndex(int orderIndex)
    {
        if (orderIndex < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(orderIndex), "OrderIndex cannot be negative.");
        }

        OrderIndex = orderIndex;
    }

    /// <summary>
    /// Chuẩn hóa chuỗi bắt buộc.
    /// </summary>
    private static string NormalizeRequiredText(string? value, int maxLength, string paramName)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException($"{paramName} cannot be empty.", paramName);
        }

        var normalized = value.Trim();

        if (normalized.Length > maxLength)
        {
            throw new ArgumentOutOfRangeException(
                paramName,
                $"The value of {paramName} exceeds the maximum length of {maxLength}.");
        }

        return normalized;
    }

    /// <summary>
    /// Chuẩn hóa chuỗi tùy chọn.
    /// </summary>
    private static string? NormalizeOptionalText(string? value, int maxLength)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var normalized = value.Trim();

        if (normalized.Length > maxLength)
        {
            throw new ArgumentOutOfRangeException(
                nameof(value),
                $"The value exceeds the maximum length of {maxLength}.");
        }

        return normalized;
    }
}
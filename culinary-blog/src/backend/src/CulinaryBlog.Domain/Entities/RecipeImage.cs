using System.ComponentModel.DataAnnotations;
using CulinaryBlog.Domain.Common;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Ảnh minh họa của một Recipe.
/// Lớp này chỉ lưu metadata, còn file vật lý nằm trên MinIO / Local Storage.
/// </summary>
public class RecipeImage : BaseEntity
{
    private RecipeImage()
    {
    }

    /// <summary>
    /// Constructor rút gọn tương thích ngược khi tạo ảnh từ URL có sẵn.
    /// </summary>
    public RecipeImage(
        Guid recipeId,
        string originalUrl,
        string? altText = null,
        int orderIndex = 0,
        bool isPrimary = false,
        string? mediumUrl = null,
        string? thumbnailUrl = null)
        : this(
            recipeId: recipeId,
            objectKey: originalUrl,
            originalUrl: originalUrl,
            contentType: "image/jpeg",
            fileSize: 1,
            checksumSha256: null,
            altText: altText,
            orderIndex: orderIndex,
            isPrimary: isPrimary,
            mediumUrl: mediumUrl,
            thumbnailUrl: thumbnailUrl,
            width: null,
            height: null,
            storageProvider: "MinIO")
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

    public Guid RecipeId { get; private set; }

    public Recipe Recipe { get; private set; } = null!;

    [MaxLength(500)]
    public string ObjectKey { get; private set; } = string.Empty;

    [MaxLength(500)]
    public string OriginalUrl { get; private set; } = string.Empty;

    [MaxLength(100)]
    public string ContentType { get; private set; } = string.Empty;

    public long FileSize { get; private set; }

    [MaxLength(64)]
    public string? ChecksumSha256 { get; private set; }

    [MaxLength(500)]
    public string? MediumUrl { get; private set; }

    [MaxLength(500)]
    public string? ThumbnailUrl { get; private set; }

    [MaxLength(200)]
    public string? AltText { get; private set; }

    public bool IsPrimary { get; private set; }

    public int OrderIndex { get; private set; }

    public int? Width { get; private set; }

    public int? Height { get; private set; }

    [MaxLength(50)]
    public string StorageProvider { get; private set; } = "MinIO";

    public void UpdateDetails(
        string originalUrl,
        string? altText = null,
        int orderIndex = 0,
        bool isPrimary = false,
        string? mediumUrl = null,
        string? thumbnailUrl = null)
    {
        OriginalUrl = NormalizeRequiredText(originalUrl, 500, nameof(originalUrl));
        if (string.IsNullOrWhiteSpace(ObjectKey))
        {
            ObjectKey = OriginalUrl;
        }
        AltText = NormalizeOptionalText(altText, 200);
        OrderIndex = orderIndex;
        IsPrimary = isPrimary;
        MediumUrl = NormalizeOptionalText(mediumUrl, 500);
        ThumbnailUrl = NormalizeOptionalText(thumbnailUrl, 500);
    }

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

    public void MarkAsPrimary() => IsPrimary = true;

    public void UnmarkAsPrimary() => IsPrimary = false;

    public void SetMediumUrl(string? mediumUrl)
    {
        MediumUrl = NormalizeOptionalText(mediumUrl, 500);
    }

    public void SetThumbnailUrl(string? thumbnailUrl)
    {
        ThumbnailUrl = NormalizeOptionalText(thumbnailUrl, 500);
    }

    public void SetAltText(string? altText)
    {
        AltText = NormalizeOptionalText(altText, 200);
    }

    public void SetOrderIndex(int orderIndex)
    {
        if (orderIndex < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(orderIndex), "OrderIndex cannot be negative.");
        }

        OrderIndex = orderIndex;
    }

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

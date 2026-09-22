using System.ComponentModel.DataAnnotations;
using CulinaryBlog.Domain.Common;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Ảnh minh họa của một Recipe.
/// Mỗi ảnh thuộc về một Recipe và có thể được đánh dấu là ảnh chính.
/// </summary>
public class RecipeImage : BaseEntity
{
    /// <summary>
    /// Constructor rỗng cho EF Core.
    /// </summary>
    private RecipeImage()
    {
    }

    /// <summary>
    /// Tạo một ảnh mới cho recipe.
    /// </summary>
    public RecipeImage(
        Guid recipeId,
        string originalUrl,
        string? altText = null,
        int orderIndex = 0,
        bool isPrimary = false,
        string? mediumUrl = null,
        string? thumbnailUrl = null)
    {
        if (recipeId == Guid.Empty)
        {
            throw new ArgumentException("RecipeId cannot be empty.", nameof(recipeId));
        }

        RecipeId = recipeId;
        OriginalUrl = NormalizeRequiredText(originalUrl, 500, nameof(originalUrl));
        AltText = NormalizeOptionalText(altText, 200);
        OrderIndex = orderIndex;
        IsPrimary = isPrimary;
        MediumUrl = NormalizeOptionalText(mediumUrl, 500);
        ThumbnailUrl = NormalizeOptionalText(thumbnailUrl, 500);
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
    /// URL ảnh gốc trên MinIO.
    /// </summary>
    [MaxLength(500)]
    public string OriginalUrl { get; private set; } = string.Empty;

    /// <summary>
    /// URL ảnh medium (800x600).
    /// Nullable nếu job sinh ảnh chưa chạy xong.
    /// </summary>
    [MaxLength(500)]
    public string? MediumUrl { get; private set; }

    /// <summary>
    /// URL ảnh thumbnail (300x300).
    /// Nullable nếu job sinh ảnh chưa chạy xong.
    /// </summary>
    [MaxLength(500)]
    public string? ThumbnailUrl { get; private set; }

    /// <summary>
    /// Alt text cho accessibility.
    /// </summary>
    [MaxLength(200)]
    public string? AltText { get; private set; }

    /// <summary>
    /// Ảnh chính của recipe.
    /// Chỉ nên có tối đa một ảnh chính cho mỗi recipe.
    /// </summary>
    public bool IsPrimary { get; private set; }

    /// <summary>
    /// Thứ tự hiển thị trong gallery.
    /// </summary>
    public int OrderIndex { get; private set; }

    /// <summary>
    /// Cập nhật thông tin ảnh.
    /// </summary>
    public void UpdateDetails(
        string originalUrl,
        string? altText = null,
        int orderIndex = 0,
        bool isPrimary = false,
        string? mediumUrl = null,
        string? thumbnailUrl = null)
    {
        OriginalUrl = NormalizeRequiredText(originalUrl, 500, nameof(originalUrl));
        AltText = NormalizeOptionalText(altText, 200);
        OrderIndex = orderIndex;
        IsPrimary = isPrimary;
        MediumUrl = NormalizeOptionalText(mediumUrl, 500);
        ThumbnailUrl = NormalizeOptionalText(thumbnailUrl, 500);
    }

    /// <summary>
    /// Đặt ảnh này làm ảnh chính.
    /// </summary>
    public void MarkAsPrimary()
    {
        IsPrimary = true;
    }

    /// <summary>
    /// Bỏ trạng thái ảnh chính.
    /// </summary>
    public void UnmarkAsPrimary()
    {
        IsPrimary = false;
    }

    /// <summary>
    /// Cập nhật URL ảnh medium.
    /// </summary>
    public void SetMediumUrl(string? mediumUrl)
    {
        MediumUrl = NormalizeOptionalText(mediumUrl, 500);
    }

    /// <summary>
    /// Cập nhật URL thumbnail.
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
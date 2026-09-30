using System.ComponentModel.DataAnnotations;
using CulinaryBlog.Domain.Common;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Danh mục công thức nấu ăn.
/// Category dùng để phân loại Recipe và hiển thị trên navigation.
/// </summary>
public class Category : BaseEntity
{
    private readonly List<Recipe> _recipes = new();

    /// <summary>
    /// Constructor rỗng cho EF Core.
    /// </summary>
    private Category()
    {
    }

    /// <summary>
    /// Tạo một Category mới.
    /// Slug sẽ được sinh tự động từ Name nếu không truyền vào.
    /// </summary>
    public Category(
        string name,
        string? slug = null,
        string? description = null,
        string? imageUrl = null,
        int orderIndex = 0)
    {
        Name = NormalizeRequiredText(name, 100, nameof(name));
        Slug = NormalizeSlug(slug ?? name, 120);
        Description = NormalizeOptionalText(description, int.MaxValue);
        ImageUrl = NormalizeOptionalText(imageUrl, 500);
        OrderIndex = orderIndex;
    }

    /// <summary>
    /// Tên danh mục.
    /// </summary>
    [MaxLength(100)]
    public string Name { get; private set; } = string.Empty;

    /// <summary>
    /// URL-friendly slug.
    /// </summary>
    [MaxLength(120)]
    public string Slug { get; private set; } = string.Empty;

    /// <summary>
    /// Mô tả danh mục.
    /// Nullable.
    /// </summary>
    public string? Description { get; private set; }

    /// <summary>
    /// Ảnh đại diện của danh mục.
    /// Nullable.
    /// </summary>
    [MaxLength(500)]
    public string? ImageUrl { get; private set; }

    /// <summary>
    /// Thứ tự hiển thị trên navigation.
    /// </summary>
    public int OrderIndex { get; private set; }

    /// <summary>
    /// Các recipe thuộc danh mục này.
    /// </summary>
    public IReadOnlyCollection<Recipe> Recipes => _recipes.AsReadOnly();

    /// <summary>
    /// Cập nhật thông tin danh mục.
    /// </summary>
    public void UpdateDetails(
        string name,
        string? slug = null,
        string? description = null,
        string? imageUrl = null,
        int orderIndex = 0)
    {
        Name = NormalizeRequiredText(name, 100, nameof(name));
        Slug = NormalizeSlug(slug ?? name, 120);
        Description = NormalizeOptionalText(description, int.MaxValue);
        ImageUrl = NormalizeOptionalText(imageUrl, 500);
        OrderIndex = orderIndex;
    }

    /// <summary>
    /// Đổi tên danh mục.
    /// </summary>
    public void Rename(string name)
    {
        Name = NormalizeRequiredText(name, 100, nameof(name));
        Slug = NormalizeSlug(name, 120);
    }

    /// <summary>
    /// Cập nhật mô tả danh mục.
    /// </summary>
    public void SetDescription(string? description)
    {
        Description = NormalizeOptionalText(description, int.MaxValue);
    }

    /// <summary>
    /// Cập nhật ảnh đại diện danh mục.
    /// </summary>
    public void SetImageUrl(string? imageUrl)
    {
        ImageUrl = NormalizeOptionalText(imageUrl, 500);
    }

    /// <summary>
    /// Cập nhật thứ tự hiển thị.
    /// </summary>
    public void SetOrderIndex(int orderIndex)
    {
        OrderIndex = orderIndex;
    }

    /// <summary>
    /// Gắn recipe vào category.
    /// </summary>
    public void AddRecipe(Recipe recipe)
    {
        if (recipe is null)
        {
            throw new ArgumentNullException(nameof(recipe));
        }

        if (!_recipes.Contains(recipe))
        {
            _recipes.Add(recipe);
        }
    }

    /// <summary>
    /// Gỡ recipe khỏi category.
    /// </summary>
    public void RemoveRecipe(Recipe recipe)
    {
        if (recipe is null)
        {
            throw new ArgumentNullException(nameof(recipe));
        }

        _recipes.Remove(recipe);
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

    private static string NormalizeSlug(string value, int maxLength)
    {
        var slug = NormalizeRequiredText(value, maxLength, nameof(value))
            .ToLowerInvariant()
            .Replace(' ', '-')
            .Replace('_', '-');

        while (slug.Contains("--", StringComparison.Ordinal))
        {
            slug = slug.Replace("--", "-", StringComparison.Ordinal);
        }

        return slug.Trim('-');
    }
}
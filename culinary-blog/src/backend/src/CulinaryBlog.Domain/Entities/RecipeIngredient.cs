using System.ComponentModel.DataAnnotations;
using CulinaryBlog.Domain.Common;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Nguyên liệu của một Recipe.
/// Mỗi nguyên liệu thuộc về một Recipe và được sắp xếp theo OrderIndex.
/// </summary>
public class RecipeIngredient : BaseEntity
{
    /// <summary>
    /// Constructor rỗng cho EF Core.
    /// </summary>
    private RecipeIngredient()
    {
    }

    /// <summary>
    /// Tạo một nguyên liệu mới cho recipe.
    /// </summary>
    public RecipeIngredient(
        Guid recipeId,
        string name,
        decimal? quantity = null,
        string? unit = null,
        string? notes = null,
        int orderIndex = 0)
    {
        if (recipeId == Guid.Empty)
        {
            throw new ArgumentException("RecipeId cannot be empty.", nameof(recipeId));
        }

        RecipeId = recipeId;
        Name = NormalizeRequiredText(name, 200, nameof(name));
        Quantity = quantity;
        Unit = NormalizeOptionalText(unit, 50);
        Notes = NormalizeOptionalText(notes, 500);
        OrderIndex = orderIndex;
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
    /// Tên nguyên liệu.
    /// </summary>
    [MaxLength(200)]
    public string Name { get; private set; } = string.Empty;

    /// <summary>
    /// Số lượng nguyên liệu.
    /// Nullable khi chỉ cần mô tả "vừa đủ".
    /// </summary>
    public decimal? Quantity { get; private set; }

    /// <summary>
    /// Đơn vị đo lường.
    /// </summary>
    [MaxLength(50)]
    public string? Unit { get; private set; }

    /// <summary>
    /// Ghi chú tùy chọn cho nguyên liệu.
    /// </summary>
    [MaxLength(500)]
    public string? Notes { get; private set; }

    /// <summary>
    /// Thứ tự hiển thị trong danh sách nguyên liệu.
    /// </summary>
    public int OrderIndex { get; private set; }

    /// <summary>
    /// Cập nhật thông tin nguyên liệu.
    /// </summary>
    public void UpdateDetails(
        string name,
        decimal? quantity = null,
        string? unit = null,
        string? notes = null,
        int orderIndex = 0)
    {
        Name = NormalizeRequiredText(name, 200, nameof(name));
        Quantity = quantity;
        Unit = NormalizeOptionalText(unit, 50);
        Notes = NormalizeOptionalText(notes, 500);
        OrderIndex = orderIndex;
    }

    /// <summary>
    /// Chỉ cập nhật tên nguyên liệu.
    /// </summary>
    public void Rename(string name)
    {
        Name = NormalizeRequiredText(name, 200, nameof(name));
    }

    /// <summary>
    /// Cập nhật số lượng.
    /// </summary>
    public void SetQuantity(decimal? quantity)
    {
        Quantity = quantity;
    }

    /// <summary>
    /// Cập nhật đơn vị.
    /// </summary>
    public void SetUnit(string? unit)
    {
        Unit = NormalizeOptionalText(unit, 50);
    }

    /// <summary>
    /// Cập nhật ghi chú.
    /// </summary>
    public void SetNotes(string? notes)
    {
        Notes = NormalizeOptionalText(notes, 500);
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
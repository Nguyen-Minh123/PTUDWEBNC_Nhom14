using System.ComponentModel.DataAnnotations;
using CulinaryBlog.Domain.Common;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Các bước thực hiện chi tiết của một Recipe.
/// Mỗi bước thuộc về một Recipe và được sắp xếp theo StepNumber.
/// </summary>
public class RecipeStep : BaseEntity
{
    /// <summary>
    /// Constructor rỗng cho EF Core.
    /// </summary>
    private RecipeStep()
    {
    }

    /// <summary>
    /// Tạo một bước mới cho recipe.
    /// </summary>
    public RecipeStep(
        Guid recipeId,
        int stepNumber,
        string title,
        string description,
        int? timerMinutes = null,
        string? imageUrl = null)
    {
        if (recipeId == Guid.Empty)
        {
            throw new ArgumentException("RecipeId cannot be empty.", nameof(recipeId));
        }

        if (stepNumber <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(stepNumber), "StepNumber must be greater than 0.");
        }

        RecipeId = recipeId;
        StepNumber = stepNumber;
        Title = NormalizeRequiredText(title, 200, nameof(title));
        Description = NormalizeRequiredText(description, int.MaxValue, nameof(description));
        TimerMinutes = timerMinutes;
        ImageUrl = NormalizeOptionalText(imageUrl, 500);
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
    /// Thứ tự bước trong recipe. Bắt đầu từ 1.
    /// </summary>
    public int StepNumber { get; private set; }

    /// <summary>
    /// Tên ngắn gọn của bước.
    /// </summary>
    [MaxLength(200)]
    public string Title { get; private set; } = string.Empty;

    /// <summary>
    /// Mô tả chi tiết bước thực hiện.
    /// </summary>
    public string Description { get; private set; } = string.Empty;

    /// <summary>
    /// Thời gian cho bước này, tính bằng phút.
    /// Nullable nếu không áp dụng.
    /// </summary>
    public int? TimerMinutes { get; private set; }

    /// <summary>
    /// Ảnh minh họa cho bước.
    /// Nullable nếu không có ảnh.
    /// </summary>
    [MaxLength(500)]
    public string? ImageUrl { get; private set; }

    /// <summary>
    /// Cập nhật nội dung bước.
    /// </summary>
    public void UpdateDetails(
        int stepNumber,
        string title,
        string description,
        int? timerMinutes = null,
        string? imageUrl = null)
    {
        if (stepNumber <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(stepNumber), "StepNumber must be greater than 0.");
        }

        StepNumber = stepNumber;
        Title = NormalizeRequiredText(title, 200, nameof(title));
        Description = NormalizeRequiredText(description, int.MaxValue, nameof(description));
        TimerMinutes = timerMinutes;
        ImageUrl = NormalizeOptionalText(imageUrl, 500);
    }

    /// <summary>
    /// Thay đổi thứ tự bước.
    /// </summary>
    public void SetStepNumber(int stepNumber)
    {
        if (stepNumber <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(stepNumber), "StepNumber must be greater than 0.");
        }

        StepNumber = stepNumber;
    }

    /// <summary>
    /// Cập nhật ảnh minh họa cho bước.
    /// </summary>
    public void SetImageUrl(string? imageUrl)
    {
        ImageUrl = NormalizeOptionalText(imageUrl, 500);
    }

    /// <summary>
    /// Xóa ảnh minh họa.
    /// </summary>
    public void ClearImage()
    {
        ImageUrl = null;
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
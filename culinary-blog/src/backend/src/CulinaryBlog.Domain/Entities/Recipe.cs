using System.ComponentModel.DataAnnotations;
using CulinaryBlog.Domain.Common;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Recipe là aggregate root của hệ thống.
/// Một Recipe thuộc về một Category và một Author,
/// đồng thời quản lý Steps, Ingredients, Images và Nutrition.
/// </summary>
public class Recipe : BaseEntity
{
    // Danh sách step của recipe, chỉ cho phép thao tác thông qua aggregate root.
    private readonly List<RecipeStep> _steps = new();

    // Danh sách nguyên liệu của recipe.
    private readonly List<RecipeIngredient> _ingredients = new();

    // Danh sách ảnh minh họa của recipe.
    private readonly List<RecipeImage> _images = new();

    /// <summary>
    /// Constructor rỗng cho EF Core.
    /// </summary>
    private Recipe()
    {
    }

    /// <summary>
    /// Khởi tạo một Recipe mới với dữ liệu bắt buộc.
    /// </summary>
    public Recipe(
        string title,
        string slug,
        string description,
        string instructions,
        int prepTime,
        int cookTime,
        int servings,
        RecipeDifficulty difficulty,
        Guid categoryId,
        string authorId,
        RecipeNutrition? nutrition = null)
    {
        Title = NormalizeRequiredText(title, 200, nameof(title));
        Slug = NormalizeSlug(slug ?? title, 220);
        Description = NormalizeDescription(description);
        Instructions = NormalizeRequiredText(instructions, nameof(instructions));

        if (prepTime <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(prepTime), "PrepTime must be greater than 0.");
        }

        if (cookTime < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(cookTime), "CookTime must be greater than or equal to 0.");
        }

        if (servings <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(servings), "Servings must be greater than 0.");
        }

        if (categoryId == Guid.Empty)
        {
            throw new ArgumentException("CategoryId cannot be empty.", nameof(categoryId));
        }

        if (string.IsNullOrWhiteSpace(authorId))
        {
            throw new ArgumentException("AuthorId cannot be empty.", nameof(authorId));
        }

        PrepTime = prepTime;
        CookTime = cookTime;
        Servings = servings;
        Difficulty = difficulty;
        CategoryId = categoryId;
        AuthorId = authorId.Trim();
        Status = RecipeStatus.Draft;

        // Nếu không truyền nutrition thì tạo mặc định để đảm bảo aggregate luôn nhất quán.
        Nutrition = nutrition ?? new RecipeNutrition();
    }

    /// <summary>
    /// Tiêu đề công thức.
    /// </summary>
    [MaxLength(200)]
    public string Title { get; private set; } = string.Empty;

    /// <summary>
    /// Slug dùng cho URL.
    /// </summary>
    [MaxLength(220)]
    public string Slug { get; private set; } = string.Empty;

    /// <summary>
    /// Mô tả ngắn cho recipe.
    /// </summary>
    [MaxLength(2000)]
    public string Description { get; private set; } = string.Empty;

    /// <summary>
    /// Nội dung hướng dẫn chi tiết.
    /// </summary>
    public string Instructions { get; private set; } = string.Empty;

    /// <summary>
    /// Thời gian chuẩn bị.
    /// </summary>
    public int PrepTime { get; private set; }

    /// <summary>
    /// Thời gian nấu.
    /// </summary>
    public int CookTime { get; private set; }

    /// <summary>
    /// Số phần ăn.
    /// </summary>
    public int Servings { get; private set; }

    /// <summary>
    /// Độ khó của recipe.
    /// </summary>
    public RecipeDifficulty Difficulty { get; private set; } = RecipeDifficulty.Easy;

    /// <summary>
    /// Trạng thái xuất bản.
    /// </summary>
    public RecipeStatus Status { get; private set; } = RecipeStatus.Draft;

    /// <summary>
    /// FK đến Category.
    /// </summary>
    public Guid CategoryId { get; private set; }

    /// <summary>
    /// FK đến Author.
    /// </summary>
    [MaxLength(450)]
    public string AuthorId { get; private set; } = string.Empty;

    /// <summary>
    /// Thời điểm xuất bản.
    /// </summary>
    public DateTimeOffset? PublishedAt { get; private set; }

    /// <summary>
    /// Thông tin dinh dưỡng của recipe.
    /// </summary>
    public RecipeNutrition Nutrition { get; private set; } = new();

    /// <summary>
    /// Danh sách step chỉ đọc.
    /// </summary>
    public IReadOnlyCollection<RecipeStep> Steps => _steps.AsReadOnly();

    /// <summary>
    /// Danh sách nguyên liệu chỉ đọc.
    /// </summary>
    public IReadOnlyCollection<RecipeIngredient> Ingredients => _ingredients.AsReadOnly();

    /// <summary>
    /// Danh sách ảnh chỉ đọc.
    /// </summary>
    public IReadOnlyCollection<RecipeImage> Images => _images.AsReadOnly();

    /// <summary>
    /// Cập nhật thông tin cốt lõi của recipe.
    /// Không cho đổi slug khi recipe đã được publish.
    /// </summary>
    public void UpdateDetails(
        string title,
        string slug,
        string description,
        string instructions,
        int prepTime,
        int cookTime,
        int servings,
        RecipeDifficulty difficulty,
        Guid categoryId)
    {
        EnsureSlugCanChange(slug);

        Title = NormalizeRequiredText(title, 200, nameof(title));
        Slug = NormalizeSlug(slug ?? title, 220);
        Description = NormalizeDescription(description);
        Instructions = NormalizeRequiredText(instructions, nameof(instructions));

        if (prepTime <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(prepTime), "PrepTime must be greater than 0.");
        }

        if (cookTime < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(cookTime), "CookTime must be greater than or equal to 0.");
        }

        if (servings <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(servings), "Servings must be greater than 0.");
        }

        if (categoryId == Guid.Empty)
        {
            throw new ArgumentException("CategoryId cannot be empty.", nameof(categoryId));
        }

        PrepTime = prepTime;
        CookTime = cookTime;
        Servings = servings;
        Difficulty = difficulty;
        CategoryId = categoryId;
    }

    /// <summary>
    /// Cập nhật Category cho recipe.
    /// </summary>
    public void SetCategory(Guid categoryId)
    {
        if (categoryId == Guid.Empty)
        {
            throw new ArgumentException("CategoryId cannot be empty.", nameof(categoryId));
        }

        CategoryId = categoryId;
    }

    /// <summary>
    /// Cập nhật Nutrition.
    /// </summary>
    public void SetNutrition(RecipeNutrition nutrition)
    {
        Nutrition = nutrition ?? throw new ArgumentNullException(nameof(nutrition));
    }

    /// <summary>
    /// Xuất bản recipe.
    /// Chỉ ghi PublishedAt lần đầu để giữ lịch sử publish ổn định.
    /// </summary>
    public void Publish(DateTimeOffset? publishedAt = null)
    {
        Status = RecipeStatus.Published;
        PublishedAt ??= publishedAt ?? DateTimeOffset.UtcNow;
    }

    /// <summary>
    /// Chuyển recipe sang trạng thái archived.
    /// </summary>
    public void Archive()
    {
        Status = RecipeStatus.Archived;
    }

    /// <summary>
    /// Thêm một step vào recipe.
    /// </summary>
    public void AddStep(RecipeStep step)
    {
        if (step is null)
        {
            throw new ArgumentNullException(nameof(step));
        }

        if (step.RecipeId != Id)
        {
            throw new InvalidOperationException("RecipeStep does not belong to this recipe.");
        }

        if (_steps.Any(x => x.StepNumber == step.StepNumber))
        {
            throw new InvalidOperationException($"StepNumber '{step.StepNumber}' already exists for this recipe.");
        }

        _steps.Add(step);
    }

    /// <summary>
    /// Xóa một step khỏi recipe.
    /// </summary>
    public void RemoveStep(RecipeStep step)
    {
        if (step is null)
        {
            throw new ArgumentNullException(nameof(step));
        }

        _steps.Remove(step);
    }

    /// <summary>
    /// Thêm nguyên liệu vào recipe.
    /// </summary>
    public void AddIngredient(RecipeIngredient ingredient)
    {
        if (ingredient is null)
        {
            throw new ArgumentNullException(nameof(ingredient));
        }

        if (ingredient.RecipeId != Id)
        {
            throw new InvalidOperationException("RecipeIngredient does not belong to this recipe.");
        }

        _ingredients.Add(ingredient);
    }

    /// <summary>
    /// Xóa nguyên liệu khỏi recipe.
    /// </summary>
    public void RemoveIngredient(RecipeIngredient ingredient)
    {
        if (ingredient is null)
        {
            throw new ArgumentNullException(nameof(ingredient));
        }

        _ingredients.Remove(ingredient);
    }

    /// <summary>
    /// Thêm ảnh vào recipe.
    /// Nếu ảnh mới được đánh dấu là ảnh chính thì hạ toàn bộ ảnh cũ xuống không còn là ảnh chính.
    /// </summary>
    public void AddImage(RecipeImage image)
    {
        if (image is null)
        {
            throw new ArgumentNullException(nameof(image));
        }

        if (image.RecipeId != Id)
        {
            throw new InvalidOperationException("RecipeImage does not belong to this recipe.");
        }

        if (_images.Any(x => x.Id == image.Id))
        {
            throw new InvalidOperationException("This image already exists in the recipe.");
        }

        if (image.IsPrimary)
        {
            foreach (var other in _images)
            {
                other.UnmarkAsPrimary();
            }
        }

        _images.Add(image);
    }

    /// <summary>
    /// Xóa ảnh khỏi recipe.
    /// </summary>
    public void RemoveImage(RecipeImage image)
    {
        if (image is null)
        {
            throw new ArgumentNullException(nameof(image));
        }

        var existing = _images.FirstOrDefault(x => x.Id == image.Id);
        if (existing is null)
        {
            return;
        }

        _images.Remove(existing);
    }

    /// <summary>
    /// Đặt một ảnh hiện có làm ảnh chính.
    /// Chỉ cho phép ảnh thuộc cùng recipe.
    /// </summary>
    public void SetPrimaryImage(RecipeImage image)
    {
        if (image is null)
        {
            throw new ArgumentNullException(nameof(image));
        }

        var existing = _images.FirstOrDefault(x => x.Id == image.Id);
        if (existing is null)
        {
            throw new InvalidOperationException("RecipeImage does not belong to this recipe.");
        }

        foreach (var other in _images)
        {
            other.UnmarkAsPrimary();
        }

        existing.MarkAsPrimary();
    }

    /// <summary>
    /// Kiểm tra slug mới có được phép thay đổi hay không.
    /// Khi recipe đã publish thì slug không được đổi nữa.
    /// </summary>
    private void EnsureSlugCanChange(string newSlug)
    {
        if (Status == RecipeStatus.Published &&
            !string.Equals(Slug, newSlug, StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("Slug cannot be changed after the recipe is published.");
        }
    }

    /// <summary>
    /// Chuẩn hóa chuỗi bắt buộc có giới hạn độ dài.
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
            throw new ArgumentOutOfRangeException(paramName, $"The value of {paramName} exceeds the maximum length of {maxLength}.");
        }

        return normalized;
    }

    /// <summary>
    /// Chuẩn hóa chuỗi bắt buộc nhưng không ràng buộc độ dài.
    /// </summary>
    private static string NormalizeRequiredText(string? value, string paramName)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException($"{paramName} cannot be empty.", paramName);
        }

        return value.Trim();
    }

    /// <summary>
    /// Chuẩn hóa mô tả.
    /// </summary>
    private static string NormalizeDescription(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Description cannot be empty.", nameof(value));
        }

        var normalized = value.Trim();

        if (normalized.Length > 2000)
        {
            throw new ArgumentOutOfRangeException(nameof(value), "Description cannot exceed 2000 characters.");
        }

        return normalized;
    }

    /// <summary>
    /// Chuẩn hóa slug thành dạng thân thiện URL.
    /// </summary>
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

/// <summary>
/// Thông tin dinh dưỡng của recipe.
/// </summary>
public sealed class RecipeNutrition
{
    public decimal? Calories { get; set; }
    public decimal? Protein { get; set; }
    public decimal? Carbohydrates { get; set; }
    public decimal? Fat { get; set; }
    public decimal? Fiber { get; set; }
    public decimal? Sodium { get; set; }
}

/// <summary>
/// Mức độ khó của recipe.
/// </summary>
public enum RecipeDifficulty
{
    Easy = 1,
    Medium = 2,
    Hard = 3,
    Expert = 4
}

/// <summary>
/// Trạng thái recipe.
/// </summary>
public enum RecipeStatus
{
    Draft = 0,
    Published = 1,
    Archived = 2
}
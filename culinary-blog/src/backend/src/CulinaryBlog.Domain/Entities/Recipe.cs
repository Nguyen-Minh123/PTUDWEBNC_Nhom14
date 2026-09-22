using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CulinaryBlog.Domain.Common;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Recipe là aggregate root của hệ thống.
/// Một Recipe thuộc về một Category và một Author,
/// đồng thời chứa các collection con như Steps, Ingredients, Images
/// và owned entity Nutrition.
/// </summary>
public class Recipe : BaseEntity
{
    private readonly List<RecipeStep> _steps = new();
    private readonly List<RecipeIngredient> _ingredients = new();
    private readonly List<RecipeImage> _images = new();

    /// <summary>
    /// Constructor rỗng cho EF Core.
    /// </summary>
    private Recipe()
    {
    }

    /// <summary>
    /// Khởi tạo một Recipe mới ở trạng thái Draft.
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
        Slug = NormalizeRequiredText(slug, 220, nameof(slug));
        Description = NormalizeDescription(description);
        Instructions = NormalizeRequiredText(instructions, int.MaxValue, nameof(instructions));

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

        AuthorId = NormalizeRequiredText(authorId, 450, nameof(authorId));

        PrepTime = prepTime;
        CookTime = cookTime;
        Servings = servings;
        Difficulty = difficulty;
        CategoryId = categoryId;
        Status = RecipeStatus.Draft;
        Nutrition = nutrition ?? new RecipeNutrition();
    }

    [MaxLength(200)]
    public string Title { get; private set; } = string.Empty;

    [MaxLength(220)]
    public string Slug { get; private set; } = string.Empty;

    public string Description { get; private set; } = string.Empty;

    public string Instructions { get; private set; } = string.Empty;

    public int PrepTime { get; private set; }

    public int CookTime { get; private set; }

    public int Servings { get; private set; }

    public RecipeDifficulty Difficulty { get; private set; } = RecipeDifficulty.Easy;

    public RecipeStatus Status { get; private set; } = RecipeStatus.Draft;

    public Guid CategoryId { get; private set; }

    [MaxLength(450)]
    public string AuthorId { get; private set; } = string.Empty;

    public DateTimeOffset? PublishedAt { get; private set; }

    /// <summary>
    /// Owned entity lưu thông tin dinh dưỡng.
    /// </summary>
    public RecipeNutrition Nutrition { get; private set; } = new();

    /// <summary>
    /// Các bước thực hiện chi tiết.
    /// </summary>
    public IReadOnlyCollection<RecipeStep> Steps => _steps.AsReadOnly();

    /// <summary>
    /// Danh sách nguyên liệu.
    /// </summary>
    public IReadOnlyCollection<RecipeIngredient> Ingredients => _ingredients.AsReadOnly();

    /// <summary>
    /// Danh sách hình ảnh minh họa.
    /// </summary>
    public IReadOnlyCollection<RecipeImage> Images => _images.AsReadOnly();

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
        Slug = NormalizeRequiredText(slug, 220, nameof(slug));
        Description = NormalizeDescription(description);
        Instructions = NormalizeRequiredText(instructions, int.MaxValue, nameof(instructions));

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

    public void Publish(DateTimeOffset? publishedAt = null)
    {
        Status = RecipeStatus.Published;
        PublishedAt ??= publishedAt ?? DateTimeOffset.UtcNow;
    }

    public void Archive()
    {
        Status = RecipeStatus.Archived;
    }

    public void SetNutrition(RecipeNutrition nutrition)
    {
        Nutrition = nutrition ?? throw new ArgumentNullException(nameof(nutrition));
    }

    public void SetCategory(Guid categoryId)
    {
        if (categoryId == Guid.Empty)
        {
            throw new ArgumentException("CategoryId cannot be empty.", nameof(categoryId));
        }

        CategoryId = categoryId;
    }

    private void EnsureSlugCanChange(string newSlug)
    {
        if (Status == RecipeStatus.Published &&
            !string.Equals(Slug, newSlug, StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("Slug cannot be changed after the recipe is published.");
        }
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
            throw new ArgumentOutOfRangeException(paramName, $"The value of {paramName} exceeds the maximum length of {maxLength}.");
        }

        return normalized;
    }

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
}

public sealed class RecipeNutrition
{
    public decimal? Calories { get; set; }

    public decimal? Protein { get; set; }

    public decimal? Carbohydrates { get; set; }

    public decimal? Fat { get; set; }

    public decimal? Fiber { get; set; }

    public decimal? Sodium { get; set; }

    public RecipeNutrition()
    {
    }

    public RecipeNutrition(
        decimal? calories,
        decimal? protein,
        decimal? carbohydrates,
        decimal? fat,
        decimal? fiber,
        decimal? sodium)
    {
        Calories = calories;
        Protein = protein;
        Carbohydrates = carbohydrates;
        Fat = fat;
        Fiber = fiber;
        Sodium = sodium;
    }
}

public enum RecipeDifficulty
{
    Easy = 1,
    Medium = 2,
    Hard = 3,
    Expert = 4
}

public enum RecipeStatus
{
    Draft = 0,
    Published = 1,
    Archived = 2
}
using System.ComponentModel.DataAnnotations;
using CulinaryBlog.Domain.Common;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Recipe là aggregate root của hệ thống.
/// Một Recipe thuộc về một Category và một Author,
/// đồng thời chứa Steps, Ingredients, Images và Nutrition.
/// </summary>
public class Recipe : BaseEntity
{
    private readonly List<RecipeStep> _steps = new();
    private readonly List<RecipeIngredient> _ingredients = new();
    private readonly List<RecipeImage> _images = new();

    private Recipe()
    {
    }

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
        Nutrition = nutrition ?? new RecipeNutrition();
    }

    [MaxLength(200)]
    public string Title { get; private set; } = string.Empty;

    [MaxLength(220)]
    public string Slug { get; private set; } = string.Empty;

    [MaxLength(2000)]
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

    public RecipeNutrition Nutrition { get; private set; } = new();

    public IReadOnlyCollection<RecipeStep> Steps => _steps.AsReadOnly();

    public IReadOnlyCollection<RecipeIngredient> Ingredients => _ingredients.AsReadOnly();

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

    public void SetCategory(Guid categoryId)
    {
        if (categoryId == Guid.Empty)
        {
            throw new ArgumentException("CategoryId cannot be empty.", nameof(categoryId));
        }

        CategoryId = categoryId;
    }

    public void SetNutrition(RecipeNutrition nutrition)
    {
        Nutrition = nutrition ?? throw new ArgumentNullException(nameof(nutrition));
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

    public void RemoveStep(RecipeStep step)
    {
        if (step is null)
        {
            throw new ArgumentNullException(nameof(step));
        }

        _steps.Remove(step);
    }

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

    public void RemoveIngredient(RecipeIngredient ingredient)
    {
        if (ingredient is null)
        {
            throw new ArgumentNullException(nameof(ingredient));
        }

        _ingredients.Remove(ingredient);
    }

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

        if (image.IsPrimary)
        {
            foreach (var other in _images)
            {
                other.UnmarkAsPrimary();
            }
        }

        _images.Add(image);
    }

    public void RemoveImage(RecipeImage image)
    {
        if (image is null)
        {
            throw new ArgumentNullException(nameof(image));
        }

        _images.Remove(image);
    }

    public void SetPrimaryImage(RecipeImage image)
    {
        if (image is null)
        {
            throw new ArgumentNullException(nameof(image));
        }

        if (image.RecipeId != Id)
        {
            throw new InvalidOperationException("RecipeImage does not belong to this recipe.");
        }

        foreach (var other in _images)
        {
            other.UnmarkAsPrimary();
        }

        image.MarkAsPrimary();
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

    private static string NormalizeRequiredText(string? value, string paramName)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException($"{paramName} cannot be empty.", paramName);
        }

        return value.Trim();
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

public sealed class RecipeNutrition
{
    public decimal? Calories { get; set; }
    public decimal? Protein { get; set; }
    public decimal? Carbohydrates { get; set; }
    public decimal? Fat { get; set; }
    public decimal? Fiber { get; set; }
    public decimal? Sodium { get; set; }
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
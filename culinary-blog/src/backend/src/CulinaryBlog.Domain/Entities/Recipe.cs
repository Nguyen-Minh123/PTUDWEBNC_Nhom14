namespace CulinaryBlog.Domain.Entities;

public class Recipe : BaseEntity
{
    private readonly List<RecipeIngredient> _ingredients = new();
    private readonly List<RecipeStep> _steps = new();

    private Recipe()
    {
    }

    public Recipe(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            throw new ArgumentException("Recipe title is required.", nameof(title));
        }

        Title = title.Trim();
    }

    public string Title { get; private set; } = null!;

    public string? Description { get; private set; }

    public bool IsPublished { get; private set; }

    public NutritionInfo NutritionInfo { get; private set; } = new();

    public IReadOnlyCollection<RecipeIngredient> Ingredients => _ingredients.AsReadOnly();

    public IReadOnlyCollection<RecipeStep> Steps => _steps.OrderBy(step => step.StepNumber).ToList().AsReadOnly();

    public void AddIngredient(string name, decimal? quantity = null, string? unit = null)
    {
        _ingredients.Add(new RecipeIngredient(name, quantity, unit));
    }

    public void RemoveIngredient(Guid ingredientId)
    {
        var ingredient = _ingredients.SingleOrDefault(item => item.Id == ingredientId);
        if (ingredient is not null)
        {
            _ingredients.Remove(ingredient);
        }
    }

    public RecipeStep AddStep(string instruction)
    {
        var step = new RecipeStep(_steps.Count + 1, instruction);
        _steps.Add(step);
        return step;
    }

    public RecipeStep InsertStep(int stepNumber, string instruction)
    {
        if (stepNumber < 1 || stepNumber > _steps.Count + 1)
        {
            throw new ArgumentOutOfRangeException(nameof(stepNumber));
        }

        _steps.Insert(stepNumber - 1, new RecipeStep(stepNumber, instruction));
        RenumberSteps();
        return _steps[stepNumber - 1];
    }

    public void RemoveStep(Guid stepId)
    {
        var step = _steps.SingleOrDefault(item => item.Id == stepId);
        if (step is not null)
        {
            _steps.Remove(step);
            RenumberSteps();
        }
    }

    public void Publish()
    {
        if (_ingredients.Count == 0)
        {
            throw new InvalidOperationException("A recipe must have at least one ingredient before publishing.");
        }

        if (_steps.Count == 0)
        {
            throw new InvalidOperationException("A recipe must have at least one step before publishing.");
        }

        IsPublished = true;
    }

    public void Unpublish()
    {
        IsPublished = false;
    }

    public void SetNutritionInfo(NutritionInfo nutritionInfo)
    {
        NutritionInfo = nutritionInfo ?? throw new ArgumentNullException(nameof(nutritionInfo));
    }

    private void RenumberSteps()
    {
        for (var index = 0; index < _steps.Count; index++)
        {
            _steps[index].SetStepNumber(index + 1);
        }
    }
}

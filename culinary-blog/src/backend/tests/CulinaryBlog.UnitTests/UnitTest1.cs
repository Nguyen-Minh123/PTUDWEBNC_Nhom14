using CulinaryBlog.Domain.Entities;

namespace CulinaryBlog.UnitTests;

public class RecipeDomainTests
{
    [Fact]
    public void Publish_requires_at_least_one_ingredient()
    {
        var recipe = new Recipe("Pho");
        recipe.AddStep("Boil the broth.");

        Assert.Throws<InvalidOperationException>(() => recipe.Publish());
    }

    [Fact]
    public void Publish_requires_at_least_one_step()
    {
        var recipe = new Recipe("Pho");
        recipe.AddIngredient("Rice noodles");

        Assert.Throws<InvalidOperationException>(() => recipe.Publish());
    }

    [Fact]
    public void Publish_succeeds_when_recipe_has_ingredient_and_step()
    {
        var recipe = new Recipe("Pho");
        recipe.AddIngredient("Rice noodles", null, null);
        recipe.AddStep("Boil the broth.");

        recipe.Publish();

        Assert.True(recipe.IsPublished);
    }

    [Fact]
    public void Insert_and_remove_step_keep_step_numbers_contiguous()
    {
        var recipe = new Recipe("Pho");
        var firstStep = recipe.AddStep("Prepare the broth.");
        recipe.AddStep("Add noodles.");

        var insertedStep = recipe.InsertStep(2, "Slice the herbs.");

        Assert.Equal(new[] { 1, 2, 3 }, recipe.Steps.Select(step => step.StepNumber));

        recipe.RemoveStep(insertedStep.Id);
        recipe.RemoveStep(firstStep.Id);

        Assert.Single(recipe.Steps);
        Assert.Equal(1, recipe.Steps.Single().StepNumber);
    }

    [Fact]
    public void Ingredient_quantity_and_unit_are_nullable()
    {
        var recipe = new Recipe("Pho");

        recipe.AddIngredient("Salt");

        var ingredient = Assert.Single(recipe.Ingredients);
        Assert.Null(ingredient.Quantity);
        Assert.Null(ingredient.Unit);
    }

    [Fact]
    public void Nutrition_info_contains_six_values()
    {
        var nutrition = new NutritionInfo(250, 12, 30, 8, 4, 6);

        Assert.Equal(250, nutrition.Calories);
        Assert.Equal(12, nutrition.Protein);
        Assert.Equal(30, nutrition.Carbohydrates);
        Assert.Equal(8, nutrition.Fat);
        Assert.Equal(4, nutrition.Fiber);
        Assert.Equal(6, nutrition.Sugar);
    }
}

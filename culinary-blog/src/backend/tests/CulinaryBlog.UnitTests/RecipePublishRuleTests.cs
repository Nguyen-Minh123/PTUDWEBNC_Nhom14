using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using CulinaryBlog.Domain.Common;

namespace CulinaryBlog.UnitTests;

public sealed class RecipePublishRuleTests
{
    [Fact]
    public void Publish_rejects_recipe_without_ingredients()
    {
        var recipe = CreateRecipe();
        recipe.AddStep(new RecipeStep(recipe.Id, 1, "Cook", "Cook the ingredients."));

        var exception = Assert.Throws<DomainException>(() => recipe.Publish());

        Assert.Equal(
            "A recipe must include at least one ingredient and one step before publishing.",
            exception.Message);
        Assert.Equal(RecipeStatus.Draft, recipe.Status);
        Assert.Null(recipe.PublishedAt);
    }

    [Fact]
    public void Publish_rejects_recipe_without_steps()
    {
        var recipe = CreateRecipe();
        recipe.AddIngredient(new RecipeIngredient(recipe.Id, "Rice"));

        Assert.Throws<DomainException>(() => recipe.Publish());
        Assert.Equal(RecipeStatus.Draft, recipe.Status);
        Assert.Null(recipe.PublishedAt);
    }

    [Fact]
    public void Publish_sets_status_and_timestamp_when_recipe_has_ingredients_and_steps()
    {
        var recipe = CreateRecipe();
        recipe.AddIngredient(new RecipeIngredient(recipe.Id, "Rice"));
        recipe.AddStep(new RecipeStep(recipe.Id, 1, "Cook", "Cook the rice."));
        var publishedAt = new DateTimeOffset(2026, 10, 22, 0, 0, 0, TimeSpan.Zero);

        recipe.Publish(publishedAt);

        Assert.Equal(RecipeStatus.Published, recipe.Status);
        Assert.Equal(publishedAt, recipe.PublishedAt);
    }

    [Fact]
    public void Publish_rejects_a_recipe_that_is_already_published()
    {
        var recipe = CreateRecipe();
        recipe.AddIngredient(new RecipeIngredient(recipe.Id, "Rice"));
        recipe.AddStep(new RecipeStep(recipe.Id, 1, "Cook", "Cook the rice."));
        recipe.Publish();
        var publishedAt = recipe.PublishedAt;

        Assert.Throws<RecipeAlreadyPublishedException>(() => recipe.Publish());

        Assert.Equal(RecipeStatus.Published, recipe.Status);
        Assert.Equal(publishedAt, recipe.PublishedAt);
    }

    private static Recipe CreateRecipe() =>
        new(
            "Test recipe",
            "test-recipe",
            "Recipe used to verify publish rules.",
            "Prepare and serve.",
            10,
            15,
            2,
            RecipeDifficulty.Easy,
            Guid.NewGuid(),
            "test-author");
}

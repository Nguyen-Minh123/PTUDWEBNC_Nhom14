using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.UnitTests.Seeder;

public sealed class RecipeDataSeederTests
{
    [Fact]
    public async Task SeedAsync_should_seed_realistic_category_and_recipe_data()
    {
        await using var dbContext = CreateDbContext();
        var seeder = new RecipeDataSeeder(dbContext);

        await seeder.SeedAsync();

        var categories = await dbContext.Categories.OrderBy(x => x.OrderIndex).ToListAsync();
        var recipes = await dbContext.Recipes.ToListAsync();
        var ingredients = await dbContext.RecipeIngredients.ToListAsync();
        var steps = await dbContext.RecipeSteps.ToListAsync();

        Assert.Equal(4, categories.Count);
        Assert.NotEmpty(recipes);
        Assert.NotEmpty(ingredients);
        Assert.NotEmpty(steps);

        Assert.All(recipes, recipe =>
        {
            Assert.False(string.IsNullOrWhiteSpace(recipe.Title));
            Assert.False(string.IsNullOrWhiteSpace(recipe.Slug));
            Assert.False(string.IsNullOrWhiteSpace(recipe.Description));
            Assert.True(recipe.PrepTime > 0);
            Assert.True(recipe.CookTime >= 0);
            Assert.True(recipe.Servings > 0);
            Assert.Contains(recipe.Status, new[] { RecipeStatus.Draft, RecipeStatus.Published, RecipeStatus.Archived });
        });
    }

    [Fact]
    public async Task SeedAsync_should_be_idempotent()
    {
        await using var dbContext = CreateDbContext();
        var seeder = new RecipeDataSeeder(dbContext);

        await seeder.SeedAsync();
        await seeder.SeedAsync();

        Assert.Equal(4, await dbContext.Categories.CountAsync());
        Assert.True(await dbContext.Recipes.CountAsync() > 0);
    }

    private static CulinaryBlogDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<CulinaryBlogDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new TestCulinaryBlogDbContext(options);
    }

    private sealed class TestCulinaryBlogDbContext(DbContextOptions<CulinaryBlogDbContext> options)
        : CulinaryBlogDbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Recipe>().Ignore(x => x.SearchVector);
        }
    }
}

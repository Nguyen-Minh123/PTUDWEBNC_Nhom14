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
        var images = await dbContext.RecipeImages.ToListAsync();

        Assert.Equal(12, categories.Count);
        Assert.Equal(55, recipes.Count);
        Assert.NotEmpty(ingredients);
        Assert.NotEmpty(steps);
        Assert.NotEmpty(images);
        Assert.Contains(await dbContext.Users.ToListAsync(), user => user.Id == "seeder-user-id");

        var validAuthorIds = new HashSet<string>
        {
            "seeder-user-id",
            "chef-hieu-id",
            "chef-khai-id",
            "admin-user-id"
        };

        Assert.All(categories, category =>
        {
            Assert.False(string.IsNullOrWhiteSpace(category.Name));
            Assert.False(string.IsNullOrWhiteSpace(category.Slug));
            Assert.False(string.IsNullOrWhiteSpace(category.Description));
            Assert.False(string.IsNullOrWhiteSpace(category.ImageUrl));
        });

        Assert.All(recipes, recipe =>
        {
            Assert.False(string.IsNullOrWhiteSpace(recipe.Title));
            Assert.False(string.IsNullOrWhiteSpace(recipe.Slug));
            Assert.False(string.IsNullOrWhiteSpace(recipe.Description));
            Assert.True(recipe.PrepTime > 0);
            Assert.True(recipe.CookTime >= 0);
            Assert.True(recipe.Servings > 0);
            Assert.NotEqual(Guid.Empty, recipe.CategoryId);
            Assert.Contains(recipe.AuthorId, validAuthorIds);
            Assert.NotEmpty(recipe.Ingredients);
            Assert.NotEmpty(recipe.Steps);
            Assert.NotEmpty(recipe.Images);
            Assert.NotNull(recipe.Nutrition);
            Assert.Equal(RecipeStatus.Published, recipe.Status);
        });
    }

    [Fact]
    public async Task SeedAsync_should_be_idempotent()
    {
        await using var dbContext = CreateDbContext();
        var seeder = new RecipeDataSeeder(dbContext);

        await seeder.SeedAsync();
        var recipeCount = await dbContext.Recipes.CountAsync();
        var ingredientCount = await dbContext.RecipeIngredients.CountAsync();
        var stepCount = await dbContext.RecipeSteps.CountAsync();
        await seeder.SeedAsync();

        // Lần seed thứ hai không được tạo thêm category hoặc recipe trùng.
        Assert.Equal(12, await dbContext.Categories.CountAsync());
        Assert.Equal(recipeCount, await dbContext.Recipes.CountAsync());
        Assert.Equal(ingredientCount, await dbContext.RecipeIngredients.CountAsync());
        Assert.Equal(stepCount, await dbContext.RecipeSteps.CountAsync());
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

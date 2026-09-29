using CulinaryBlog.Application.Common.Mappings;
using CulinaryBlog.Domain.Entities;

namespace CulinaryBlog.UnitTests.Mapping;

public class RecipeMappingTests
{
    [Fact]
    public void ProjectToSummary_ShouldMapRecipeEntityToRecipeSummaryDto()
    {
        // Arrange
        RecipeMappingConfig.Configure();

        var categoryId = Guid.NewGuid();
        var recipe = new Recipe(
            title: "Bún Bò Huế",
            slug: "bun-bo-hue",
            description: "Đặc sản xứ Huế đậm đà thơm ngon",
            instructions: "Hầm xương bò và nấu nước dùng...",
            prepTime: 30,
            cookTime: 90,
            servings: 4,
            difficulty: RecipeDifficulty.Medium,
            categoryId: categoryId,
            authorId: "user-123");

        var image = new RecipeImage(
            recipeId: recipe.Id,
            originalUrl: "https://minio.local/images/bun-bo.jpg",
            mediumUrl: "https://minio.local/images/bun-bo-medium.jpg",
            thumbnailUrl: "https://minio.local/images/bun-bo-thumb.jpg",
            isPrimary: true);

        recipe.AddImage(image);

        var query = new List<Recipe> { recipe }.AsQueryable();

        // Act
        var resultList = query.ProjectToSummary().ToList();

        // Assert
        Assert.Single(resultList);
        var dto = resultList[0];
        Assert.Equal(recipe.Id, dto.Id);
        Assert.Equal("Bún Bò Huế", dto.Title);
        Assert.Equal("bun-bo-hue", dto.Slug);
        Assert.Equal("Đặc sản xứ Huế đậm đà thơm ngon", dto.Description);
        Assert.Equal(30, dto.PrepTime);
        Assert.Equal(90, dto.CookTime);
        Assert.Equal(120, dto.TotalTime);
        Assert.Equal(4, dto.Servings);
        Assert.Equal("Medium", dto.Difficulty);
        Assert.Equal(categoryId, dto.CategoryId);
        Assert.Equal("user-123", dto.AuthorId);
        Assert.Equal("https://minio.local/images/bun-bo-medium.jpg", dto.CoverImageUrl);
    }
}

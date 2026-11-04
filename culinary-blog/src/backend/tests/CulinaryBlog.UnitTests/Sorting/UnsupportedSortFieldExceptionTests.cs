using CulinaryBlog.Application.Common.Extensions;
using CulinaryBlog.Domain.Exceptions;

namespace CulinaryBlog.UnitTests.Sorting;

public class UnsupportedSortFieldExceptionTests
{
    private class TestItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public int ViewCount { get; set; }
    }

    [Fact]
    public void Exception_WithFieldNameOnly_ShouldSetPropertiesProperly()
    {
        // Act
        var exception = new UnsupportedSortFieldException("invalidField");

        // Assert
        Assert.Equal("invalidField", exception.FieldName);
        Assert.Null(exception.EntityName);
        Assert.Empty(exception.AllowedFields);
        Assert.Contains("invalidField", exception.Message);
    }

    [Fact]
    public void Exception_WithFieldNameAndAllowedFields_ShouldContainAllowedList()
    {
        // Arrange
        var allowedFields = new[] { "title", "createdAt" };

        // Act
        var exception = new UnsupportedSortFieldException("hackerInput", allowedFields);

        // Assert
        Assert.Equal("hackerInput", exception.FieldName);
        Assert.Null(exception.EntityName);
        Assert.Equal(2, exception.AllowedFields.Count);
        Assert.Contains("title", exception.AllowedFields);
        Assert.Contains("createdAt", exception.AllowedFields);
        Assert.Contains("hackerInput", exception.Message);
        Assert.Contains("title, createdAt", exception.Message);
    }

    [Fact]
    public void Exception_WithFullDetails_ShouldSetAllPropertiesAndMessage()
    {
        // Arrange
        var allowedFields = new[] { "title", "createdAt", "viewCount" };

        // Act
        var exception = new UnsupportedSortFieldException("password", "Recipe", allowedFields);

        // Assert
        Assert.Equal("password", exception.FieldName);
        Assert.Equal("Recipe", exception.EntityName);
        Assert.Equal(3, exception.AllowedFields.Count);
        Assert.Contains("Recipe", exception.Message);
        Assert.Contains("password", exception.Message);
    }

    [Fact]
    public void ApplySort_WhenFieldNotInAllowedList_ShouldThrowUnsupportedSortFieldException()
    {
        // Arrange
        var data = new List<TestItem>
        {
            new() { Id = 1, Title = "A", ViewCount = 10 },
            new() { Id = 2, Title = "B", ViewCount = 20 }
        }.AsQueryable();

        var allowedFields = new[] { "title" };

        // Act & Assert
        var ex = Assert.Throws<UnsupportedSortFieldException>(() =>
            data.ApplySort("-viewCount", allowedFields));

        Assert.Equal("viewCount", ex.FieldName);
        Assert.Equal(nameof(TestItem), ex.EntityName);
        Assert.Contains("title", ex.AllowedFields);
    }

    [Fact]
    public void ApplySort_WhenFieldDoesNotExistOnEntity_ShouldThrowUnsupportedSortFieldException()
    {
        // Arrange
        var data = new List<TestItem>
        {
            new() { Id = 1, Title = "A" }
        }.AsQueryable();

        // Act & Assert
        var ex = Assert.Throws<UnsupportedSortFieldException>(() =>
            data.ApplySort("nonExistentField"));

        Assert.Equal("nonExistentField", ex.FieldName);
        Assert.Equal(nameof(TestItem), ex.EntityName);
    }

    [Fact]
    public void ApplySort_WithValidAllowedFields_ShouldSortCorrectly()
    {
        // Arrange
        var data = new List<TestItem>
        {
            new() { Id = 1, Title = "Beta", ViewCount = 30 },
            new() { Id = 2, Title = "Alpha", ViewCount = 10 },
            new() { Id = 3, Title = "Gamma", ViewCount = 20 }
        }.AsQueryable();

        var allowedFields = new[] { "title", "viewCount" };

        // Act: Sắp xếp theo title tăng dần
        var resultAsc = data.ApplySort("title", allowedFields).ToList();

        // Assert
        Assert.Equal("Alpha", resultAsc[0].Title);
        Assert.Equal("Beta", resultAsc[1].Title);
        Assert.Equal("Gamma", resultAsc[2].Title);

        // Act: Sắp xếp theo viewCount giảm dần (?sort=-viewCount)
        var resultDesc = data.ApplySort("-viewCount", allowedFields).ToList();

        // Assert
        Assert.Equal(30, resultDesc[0].ViewCount);
        Assert.Equal(20, resultDesc[1].ViewCount);
        Assert.Equal(10, resultDesc[2].ViewCount);
    }

    [Fact]
    public void ApplySort_WithMultipleSortClauses_ShouldSortByMultipleFields()
    {
        // Arrange
        var data = new List<TestItem>
        {
            new() { Id = 1, Title = "Same", ViewCount = 10 },
            new() { Id = 2, Title = "Same", ViewCount = 30 },
            new() { Id = 3, Title = "Another", ViewCount = 20 }
        }.AsQueryable();

        var allowedFields = new[] { "title", "viewCount" };

        // Act: Sắp xếp theo title tăng dần, sau đó viewCount giảm dần (?sort=title,-viewCount)
        var result = data.ApplySort("title,-viewCount", allowedFields).ToList();

        // Assert
        Assert.Equal("Another", result[0].Title);
        Assert.Equal("Same", result[1].Title);
        Assert.Equal(30, result[1].ViewCount);
        Assert.Equal("Same", result[2].Title);
        Assert.Equal(10, result[2].ViewCount);
    }
}

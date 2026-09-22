using CulinaryBlog.Application.Common.Extensions;

namespace CulinaryBlog.UnitTests.Common;

public class QueryableExtensionsTests
{
    private class TestItem
    {
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    private readonly IQueryable<TestItem> _testData = new List<TestItem>
    {
        new() { Name = "Alice", Age = 30, CreatedAt = new DateTime(2025, 1, 1) },
        new() { Name = "Bob", Age = 25, CreatedAt = new DateTime(2025, 2, 1) },
        new() { Name = "Charlie", Age = 35, CreatedAt = new DateTime(2025, 1, 1) },
        new() { Name = "David", Age = 25, CreatedAt = new DateTime(2025, 3, 1) }
    }.AsQueryable();

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void ApplySort_NullOrWhitespace_ReturnsOriginalOrder(string? sort)
    {
        var result = _testData.ApplySort(sort).ToList();

        Assert.Equal("Alice", result[0].Name);
        Assert.Equal("Bob", result[1].Name);
        Assert.Equal("Charlie", result[2].Name);
        Assert.Equal("David", result[3].Name);
    }

    [Fact]
    public void ApplySort_Ascending_SortsAscending()
    {
        var result = _testData.ApplySort("name").ToList();

        Assert.Equal("Alice", result[0].Name);
        Assert.Equal("Bob", result[1].Name);
        Assert.Equal("Charlie", result[2].Name);
        Assert.Equal("David", result[3].Name);
    }

    [Fact]
    public void ApplySort_DescendingWithMinus_SortsDescending()
    {
        var result = _testData.ApplySort("-age").ToList();

        Assert.Equal(35, result[0].Age); // Charlie
        Assert.Equal(30, result[1].Age); // Alice
        Assert.Equal(25, result[2].Age);
        Assert.Equal(25, result[3].Age);
    }

    [Fact]
    public void ApplySort_MultiColumn_SortsCorrectly()
    {
        // Sắp xếp theo Age tăng dần, nếu bằng nhau thì theo Name giảm dần
        var result = _testData.ApplySort("age,-name").ToList();

        // 25 tuổi: David trước Bob (vì -name giảm dần D -> B)
        Assert.Equal("David", result[0].Name);
        Assert.Equal("Bob", result[1].Name);
        Assert.Equal("Alice", result[2].Name);   // 30
        Assert.Equal("Charlie", result[3].Name); // 35
    }

    [Fact]
    public void ApplySort_WithAllowedFields_IgnoresUnauthorizedField()
    {
        // Chỉ cho phép sort theo "name", trường "age" bị bỏ qua
        var result = _testData.ApplySort("-age,name", "name").ToList();

        // Kết quả sẽ chỉ được sort theo name tăng dần (A-Z)
        Assert.Equal("Alice", result[0].Name);
        Assert.Equal("Bob", result[1].Name);
        Assert.Equal("Charlie", result[2].Name);
        Assert.Equal("David", result[3].Name);
    }

    [Fact]
    public void ApplySort_WithCustomMapping_MapsCorrectly()
    {
        var mapping = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            ["authorName"] = "Name"
        };

        var result = _testData.ApplySort("-authorName", mapping).ToList();

        Assert.Equal("David", result[0].Name);
        Assert.Equal("Charlie", result[1].Name);
        Assert.Equal("Bob", result[2].Name);
        Assert.Equal("Alice", result[3].Name);
    }
}

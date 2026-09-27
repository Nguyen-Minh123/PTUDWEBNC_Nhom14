using CulinaryBlog.Application.Common.Extensions;
using CulinaryBlog.Application.Common.Models;

namespace CulinaryBlog.UnitTests.Common;

public class PagedResultTests
{
    private class TestItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
    }

    private readonly IQueryable<TestItem> _testData = Enumerable.Range(1, 10)
        .Select(i => new TestItem
        {
            Id = i,
            Name = $"User {i}",
            Age = 20 + i
        })
        .AsQueryable();

    [Fact]
    public void ToPagedResult_MiddlePage_CalculatesMetadataCorrectly()
    {
        // 10 phần tử, lấy trang 2 với kích thước trang là 3 (gồm phần tử 4, 5, 6)
        var result = _testData.ToPagedResult(pageNumber: 2, pageSize: 3);

        Assert.Equal(3, result.Items.Count);
        Assert.Equal(4, result.Items[0].Id);
        Assert.Equal(6, result.Items[2].Id);
        Assert.Equal(10, result.TotalCount);
        Assert.Equal(2, result.PageNumber);
        Assert.Equal(3, result.PageSize);
        Assert.Equal(4, result.TotalPages); // ceil(10 / 3) = 4
        Assert.True(result.HasPreviousPage);
        Assert.True(result.HasNextPage);
    }

    [Fact]
    public void ToPagedResult_FirstPage_HasNoPreviousPage()
    {
        var result = _testData.ToPagedResult(pageNumber: 1, pageSize: 3);

        Assert.Equal(3, result.Items.Count);
        Assert.Equal(1, result.Items[0].Id);
        Assert.False(result.HasPreviousPage);
        Assert.True(result.HasNextPage);
    }

    [Fact]
    public void ToPagedResult_LastPage_HasNoNextPage()
    {
        // Trang 4 với pageSize = 3 của 10 phần tử chỉ có 1 phần tử cuối (Id = 10)
        var result = _testData.ToPagedResult(pageNumber: 4, pageSize: 3);

        Assert.Single(result.Items);
        Assert.Equal(10, result.Items[0].Id);
        Assert.True(result.HasPreviousPage);
        Assert.False(result.HasNextPage);
    }

    [Fact]
    public void ToPagedResult_InvalidPageNumberAndSize_UsesDefaults()
    {
        // PageNumber < 1 mặc định về 1, PageSize < 1 mặc định về 10
        var result = _testData.ToPagedResult(pageNumber: -1, pageSize: 0);

        Assert.Equal(1, result.PageNumber);
        Assert.Equal(10, result.PageSize);
        Assert.Equal(10, result.Items.Count);
        Assert.Equal(1, result.TotalPages);
    }

    [Fact]
    public void ToPagedResult_PageOutOfRange_ReturnsEmptyItems()
    {
        var result = _testData.ToPagedResult(pageNumber: 99, pageSize: 5);

        Assert.Empty(result.Items);
        Assert.Equal(10, result.TotalCount);
        Assert.True(result.HasPreviousPage);
        Assert.False(result.HasNextPage);
    }

    [Fact]
    public void ApplySort_CombinedWith_ToPagedResult_WorksSeamlessly()
    {
        // Sắp xếp giảm dần theo Age (Id = 10 -> 1), sau đó lấy trang 1 với 3 phần tử
        var result = _testData
            .ApplySort("-age")
            .ToPagedResult(pageNumber: 1, pageSize: 3);

        Assert.Equal(3, result.Items.Count);
        Assert.Equal(10, result.Items[0].Id);
        Assert.Equal(9, result.Items[1].Id);
        Assert.Equal(8, result.Items[2].Id);
    }

    [Fact]
    public void PagedResult_Map_TransformsItemsAndKeepsMetadata()
    {
        var pagedResult = _testData.ToPagedResult(pageNumber: 1, pageSize: 3);

        var mappedResult = pagedResult.Map(x => x.Name.ToUpper());

        Assert.Equal(3, mappedResult.Items.Count);
        Assert.Equal("USER 1", mappedResult.Items[0]);
        Assert.Equal(pagedResult.TotalCount, mappedResult.TotalCount);
        Assert.Equal(pagedResult.PageNumber, mappedResult.PageNumber);
        Assert.Equal(pagedResult.PageSize, mappedResult.PageSize);
        Assert.Equal(pagedResult.TotalPages, mappedResult.TotalPages);
        Assert.Equal(pagedResult.HasPreviousPage, mappedResult.HasPreviousPage);
        Assert.Equal(pagedResult.HasNextPage, mappedResult.HasNextPage);
    }

    [Fact]
    public void ApplyPagination_ReturnsCorrectSubset()
    {
        var query = _testData.ApplyPagination(pageNumber: 2, pageSize: 4);
        var list = query.ToList();

        Assert.Equal(4, list.Count);
        Assert.Equal(5, list[0].Id);
        Assert.Equal(8, list[3].Id);
    }
}

using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using NpgsqlTypes;

namespace CulinaryBlog.Infrastructure.Persistence.Extensions;

/// <summary>
/// Các extension method hỗ trợ tìm kiếm Recipe bằng PostgreSQL full-text search.
/// </summary>
public static class RecipeSearchExtensions
{
    // Phải dùng đúng tên shadow property đã khai báo trong configuration.
    private const string SearchVectorPropertyName = "SearchVector";

    // Dùng cấu hình "simple" cho tiếng Việt / mixed content.
    private const string FullTextSearchConfig = "simple";

    /// <summary>
    /// Lọc danh sách Recipe theo từ khóa tìm kiếm.
    /// 
    /// Ví dụ:
    /// - "banh mi"
    /// - "ca phe sua da"
    /// - "salad healthy"
    /// </summary>
    public static IQueryable<Recipe> WhereSearchMatches(
        this IQueryable<Recipe> query,
        string? keyword)
    {
        // Không có keyword thì trả nguyên query để không ảnh hưởng pipeline.
        if (string.IsNullOrWhiteSpace(keyword))
        {
            return query;
        }

        var normalizedKeyword = keyword.Trim();

        // Tạo tsquery từ text nhập vào của user.
        var tsQuery = EF.Functions.WebSearchToTsQuery(FullTextSearchConfig, normalizedKeyword);

        // Lọc theo SearchVector đã được index bằng GIN.
        return query.Where(recipe =>
            EF.Property<NpgsqlTsVector>(recipe, SearchVectorPropertyName).Matches(tsQuery));
    }
}
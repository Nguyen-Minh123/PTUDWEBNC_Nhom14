using System.Linq.Expressions;
using System.Reflection;

namespace CulinaryBlog.Application.Common.Extensions;

public static class QueryableExtensions
{
    /// <summary>
    /// Áp dụng sắp xếp động trên IQueryable theo cú pháp chuẩn RESTful "?sort=-field,field2"
    /// Dấu '-' biểu thị sắp xếp giảm dần (Descending), không có dấu '-' là tăng dần (Ascending).
    /// </summary>
    /// <typeparam name="T">Kiểu thực thể</typeparam>
    /// <param name="source">IQueryable nguồn</param>
    /// <param name="sort">Chuỗi tham số sắp xếp (ví dụ: "-createdAt,title")</param>
    /// <param name="allowedFields">Danh sách trắng các trường được phép sắp xếp (không phân biệt hoa thường)</param>
    /// <param name="customMapping">Bảng ánh xạ tùy chỉnh từ tên tham số sang tên thuộc tính thực thể</param>
    /// <returns>IQueryable đã được sắp xếp</returns>
    public static IQueryable<T> ApplySort<T>(
        this IQueryable<T> source,
        string? sort,
        IReadOnlyDictionary<string, string>? customMapping = null,
        IReadOnlyCollection<string>? allowedFields = null)
    {
        if (string.IsNullOrWhiteSpace(sort))
        {
            return source;
        }

        var sortClauses = sort.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        if (sortClauses.Length == 0)
        {
            return source;
        }

        var currentQuery = source;
        var isFirst = true;
        var allowedSet = allowedFields != null
            ? new HashSet<string>(allowedFields, StringComparer.OrdinalIgnoreCase)
            : null;

        var entityProperties = typeof(T)
            .GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .ToDictionary(p => p.Name, p => p, StringComparer.OrdinalIgnoreCase);

        foreach (var clause in sortClauses)
        {
            var isDescending = clause.StartsWith('-');
            var rawFieldName = clause.TrimStart('-', '+').Trim();

            if (string.IsNullOrEmpty(rawFieldName))
            {
                continue;
            }

            // Kiểm tra trường có nằm trong danh sách được phép không
            if (allowedSet != null && !allowedSet.Contains(rawFieldName))
            {
                continue;
            }

            // Ánh xạ nếu có cấu hình customMapping
            var propertyName = rawFieldName;
            if (customMapping != null && customMapping.TryGetValue(rawFieldName, out var mappedName))
            {
                propertyName = mappedName;
            }

            // Tìm thuộc tính trên Entity
            if (!entityProperties.TryGetValue(propertyName, out var property))
            {
                continue;
            }

            // Xây dựng Expression Tree an toàn, không bị boxing kiểu dữ liệu gốc
            var parameter = Expression.Parameter(typeof(T), "x");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);

            var methodName = isFirst
                ? (isDescending ? nameof(Queryable.OrderByDescending) : nameof(Queryable.OrderBy))
                : (isDescending ? nameof(Queryable.ThenByDescending) : nameof(Queryable.ThenBy));

            var resultExpression = Expression.Call(
                typeof(Queryable),
                methodName,
                new[] { typeof(T), property.PropertyType },
                currentQuery.Expression,
                Expression.Quote(orderByExpression));

            currentQuery = currentQuery.Provider.CreateQuery<T>(resultExpression);
            isFirst = false;
        }

        return currentQuery;
    }

    /// <summary>
    /// Overload tiện ích cho phép truyền trực tiếp danh sách các trường được phép sắp xếp
    /// </summary>
    public static IQueryable<T> ApplySort<T>(
        this IQueryable<T> source,
        string? sort,
        params string[] allowedFields)
    {
        return source.ApplySort(sort, null, allowedFields);
    }
}

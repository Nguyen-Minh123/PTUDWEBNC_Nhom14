using System.Linq.Expressions;
using System.Reflection;
using CulinaryBlog.Application.Common.Models;
using CulinaryBlog.Domain.Exceptions;

namespace CulinaryBlog.Application.Common.Extensions;

/// <summary>
/// Cung cấp các phương thức mở rộng (Extension Methods) cho IQueryable:
/// - Sắp xếp động linh hoạt theo cú pháp RESTful (?sort=-field,field2)
/// - Kiểm tra và ném ngoại lệ UnsupportedSortFieldException nếu trường sắp xếp không hợp lệ
/// - Phân trang (ApplyPagination, ToPagedResult)
/// </summary>
public static class QueryableExtensions
{
    /// <summary>
    /// Áp dụng sắp xếp động trên IQueryable theo cú pháp chuẩn RESTful "?sort=-field,field2"
    /// Dấu '-' biểu thị sắp xếp giảm dần (Descending), không có dấu '-' là tăng dần (Ascending).
    /// Nếu trường sắp xếp không nằm trong whitelist hoặc không tồn tại trên thực thể, 
    /// phương thức sẽ ném UnsupportedSortFieldException (chuẩn RFC 7807, HTTP 400).
    /// </summary>
    /// <typeparam name="T">Kiểu thực thể</typeparam>
    /// <param name="source">IQueryable nguồn</param>
    /// <param name="sort">Chuỗi tham số sắp xếp (ví dụ: "-createdAt,title")</param>
    /// <param name="customMapping">Bảng ánh xạ tùy chỉnh từ tên tham số sang tên thuộc tính thực thể</param>
    /// <param name="allowedFields">Danh sách trắng các trường được phép sắp xếp (không phân biệt hoa thường)</param>
    /// <returns>IQueryable đã được sắp xếp</returns>
    /// <exception cref="UnsupportedSortFieldException">Ném ra khi trường sắp xếp không hợp lệ</exception>
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

            // Kiểm tra trường có nằm trong danh sách được phép không (nếu có cấu hình allowedFields)
            if (allowedSet != null && !allowedSet.Contains(rawFieldName))
            {
                throw new UnsupportedSortFieldException(rawFieldName, typeof(T).Name, allowedFields!);
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
                // Nếu trường không tồn tại trên thực thể, ném ngoại lệ UnsupportedSortFieldException
                var validProps = allowedFields ?? (IReadOnlyCollection<string>)entityProperties.Keys;
                throw new UnsupportedSortFieldException(rawFieldName, typeof(T).Name, validProps);
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

    /// <summary>
    /// Áp dụng phân trang (Skip/Take) trên IQueryable nguồn theo pageNumber và pageSize.
    /// </summary>
    /// <typeparam name="T">Kiểu thực thể</typeparam>
    /// <param name="source">IQueryable nguồn</param>
    /// <param name="pageNumber">Số thứ tự trang (>= 1)</param>
    /// <param name="pageSize">Số phần tử trên mỗi trang (>= 1)</param>
    /// <returns>IQueryable đã được phân trang</returns>
    public static IQueryable<T> ApplyPagination<T>(
        this IQueryable<T> source,
        int pageNumber,
        int pageSize)
    {
        var validPageNumber = pageNumber < 1 ? 1 : pageNumber;
        var validPageSize = pageSize < 1 ? 10 : pageSize;

        return source
            .Skip((validPageNumber - 1) * validPageSize)
            .Take(validPageSize);
    }

    /// <summary>
    /// Phân trang và đóng gói kết quả truy vấn thành đối tượng PagedResult chứa dữ liệu cùng metadata.
    /// </summary>
    /// <typeparam name="T">Kiểu thực thể</typeparam>
    /// <param name="source">IQueryable nguồn</param>
    /// <param name="pageNumber">Số thứ tự trang</param>
    /// <param name="pageSize">Số phần tử trên mỗi trang</param>
    /// <returns>Đối tượng PagedResult chứa danh sách phần tử và thông tin phân trang</returns>
    public static PagedResult<T> ToPagedResult<T>(
        this IQueryable<T> source,
        int pageNumber,
        int pageSize)
    {
        return PagedResult<T>.Create(source, pageNumber, pageSize);
    }
}

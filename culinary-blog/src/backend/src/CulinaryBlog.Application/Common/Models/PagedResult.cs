namespace CulinaryBlog.Application.Common.Models;

/// <summary>
/// Đại diện cho kết quả phân trang chuẩn của hệ thống API
/// </summary>
/// <typeparam name="T">Kiểu dữ liệu của phần tử trong danh sách</typeparam>
public class PagedResult<T>
{
    /// <summary>
    /// Danh sách các phần tử thuộc trang hiện tại
    /// </summary>
    public IReadOnlyList<T> Items { get; init; }

    /// <summary>
    /// Trang hiện tại (bắt đầu từ 1)
    /// </summary>
    public int PageNumber { get; init; }

    /// <summary>
    /// Số lượng phần tử tối đa trên mỗi trang
    /// </summary>
    public int PageSize { get; init; }

    /// <summary>
    /// Tổng số lượng phần tử trên toàn bộ các trang
    /// </summary>
    public int TotalCount { get; init; }

    /// <summary>
    /// Tổng số trang
    /// </summary>
    public int TotalPages => PageSize > 0 ? (int)Math.Ceiling(TotalCount / (double)PageSize) : 0;

    /// <summary>
    /// Xác định xem có trang trước đó hay không
    /// </summary>
    public bool HasPreviousPage => PageNumber > 1;

    /// <summary>
    /// Xác định xem có trang kế tiếp hay không
    /// </summary>
    public bool HasNextPage => PageNumber < TotalPages;

    public PagedResult(IReadOnlyList<T> items, int totalCount, int pageNumber, int pageSize)
    {
        Items = items;
        TotalCount = totalCount;
        PageNumber = pageNumber;
        PageSize = pageSize;
    }

    /// <summary>
    /// Tạo đối tượng PagedResult từ IQueryable nguồn kèm phân trang
    /// </summary>
    public static PagedResult<T> Create(IQueryable<T> source, int pageNumber, int pageSize)
    {
        var validPageNumber = pageNumber < 1 ? 1 : pageNumber;
        var validPageSize = pageSize < 1 ? 10 : pageSize;

        var totalCount = source.Count();
        var items = source
            .Skip((validPageNumber - 1) * validPageSize)
            .Take(validPageSize)
            .ToList();

        return new PagedResult<T>(items, totalCount, validPageNumber, validPageSize);
    }

    /// <summary>
    /// Chuyển đổi kiểu dữ liệu các phần tử trong trang nhưng vẫn giữ nguyên thông tin phân trang
    /// </summary>
    public PagedResult<TDestination> Map<TDestination>(Func<T, TDestination> mapFunc)
    {
        ArgumentNullException.ThrowIfNull(mapFunc);

        var mappedItems = Items.Select(mapFunc).ToList();
        return new PagedResult<TDestination>(mappedItems, TotalCount, PageNumber, PageSize);
    }
}

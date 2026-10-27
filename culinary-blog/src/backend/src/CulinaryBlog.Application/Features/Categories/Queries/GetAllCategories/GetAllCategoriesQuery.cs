using CulinaryBlog.Application.Common.Caching;
using CulinaryBlog.Application.Behaviors;
using MediatR;

namespace CulinaryBlog.Application.Features.Categories.Queries.GetAllCategories;

/// <summary>
/// Query lấy danh sách danh mục kèm thống kê số bài viết.
///
/// Chức năng:
/// - Trả về toàn bộ danh mục cho API public.
/// - Hỗ trợ cache để giảm tải database.
/// - Không có tham số đầu vào vì đây là danh sách tổng.
/// </summary>
public sealed record GetAllCategoriesQuery : IRequest<List<CategorySummaryDto>>, ICacheableQuery
{
    /// <summary>
    /// Khóa cache duy nhất cho danh sách danh mục.
    /// </summary>
    public string CacheKey => CacheKeys.CategoriesAll();

    /// <summary>
    /// Thời gian sống của cache cho query này.
    /// </summary>
    public TimeSpan? CacheDuration => TimeSpan.FromMinutes(10);

    /// <summary>
    /// Cho phép bỏ qua cache trong các tình huống đặc biệt.
    /// </summary>
    public bool BypassCache => false;
}

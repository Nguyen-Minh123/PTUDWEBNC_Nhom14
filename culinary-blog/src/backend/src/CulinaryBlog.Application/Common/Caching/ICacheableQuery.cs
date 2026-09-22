namespace CulinaryBlog.Application.Common.Caching;

/// <summary>
/// Đánh dấu một MediatR Query có thể được cache.
/// 
/// Mục đích:
/// - Cho phép QueryCacheBehavior nhận biết request nào nên đọc/ghi cache.
/// - Chuẩn hóa cache key và TTL cho từng query.
/// - Hỗ trợ bật/tắt cache theo từng query khi cần.
/// </summary>
public interface ICacheableQuery
{
    /// <summary>
    /// Khóa cache duy nhất của query.
    /// Key nên được tạo theo quy ước thống nhất để dễ invalidate theo prefix.
    /// </summary>
    string CacheKey { get; }

    /// <summary>
    /// Thời gian sống của cache cho query này.
    /// Ví dụ: 30 phút cho category list, 15 phút cho recipe list, 1 phút cho search.
    /// </summary>
    TimeSpan CacheDuration { get; }

    /// <summary>
    /// Cho phép bỏ qua cache trong trường hợp đặc biệt.
    /// Ví dụ: debug, admin refresh, hoặc cần ép đọc từ database.
    /// </summary>
    bool BypassCache { get; }
}
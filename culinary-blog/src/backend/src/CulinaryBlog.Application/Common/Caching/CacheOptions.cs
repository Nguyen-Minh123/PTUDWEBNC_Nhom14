namespace CulinaryBlog.Application.Common.Caching;

/// <summary>
/// Tập hợp các cấu hình TTL dùng cho cache trong toàn bộ ứng dụng.
/// 
/// Mục đích:
/// - Gom các giá trị TTL về một nơi duy nhất.
/// - Tránh hard-code thời gian sống trong Query/Handler.
/// - Dễ điều chỉnh theo môi trường và theo chiến lược cache.
/// </summary>
public sealed class CacheOptions
{
    /// <summary>
    /// TTL mặc định cho các cache key không có cấu hình riêng.
    /// Khuyến nghị nên để ngắn vừa phải để giảm tải DB nhưng vẫn tránh stale data.
    /// </summary>
    public TimeSpan DefaultTtl { get; set; } = TimeSpan.FromMinutes(15);

    /// <summary>
    /// TTL cho danh sách category.
    /// SRS có nhiều ví dụ TTL cho category list, vì vậy giá trị này nên để cấu hình.
    /// </summary>
    public TimeSpan CategoryListTtl { get; set; } = TimeSpan.FromMinutes(30);

    /// <summary>
    /// TTL cho chi tiết category.
    /// </summary>
    public TimeSpan CategoryDetailTtl { get; set; } = TimeSpan.FromMinutes(30);

    /// <summary>
    /// TTL cho danh sách recipe.
    /// SRS nêu recipe list có TTL 15 phút trong ví dụ cache policy.
    /// </summary>
    public TimeSpan RecipeListTtl { get; set; } = TimeSpan.FromMinutes(15);

    /// <summary>
    /// TTL cho chi tiết recipe.
    /// </summary>
    public TimeSpan RecipeDetailTtl { get; set; } = TimeSpan.FromMinutes(5);

    /// <summary>
    /// TTL cho kết quả tìm kiếm.
    /// Search thay đổi nhanh nên TTL ngắn hơn các loại cache khác.
    /// </summary>
    public TimeSpan SearchResultsTtl { get; set; } = TimeSpan.FromMinutes(1);

    /// <summary>
    /// TTL cho profile người dùng.
    /// </summary>
    public TimeSpan UserProfileTtl { get; set; } = TimeSpan.FromMinutes(10);

    /// <summary>
    /// TTL tối đa cho các cache cần ổn định cao nhưng vẫn phải cập nhật theo invalidation.
    /// </summary>
    public TimeSpan LongLivedTtl { get; set; } = TimeSpan.FromHours(1);

    /// <summary>
    /// Cho phép tắt cache trong môi trường đặc biệt như debug/test.
    /// </summary>
    public bool Enabled { get; set; } = true;
}
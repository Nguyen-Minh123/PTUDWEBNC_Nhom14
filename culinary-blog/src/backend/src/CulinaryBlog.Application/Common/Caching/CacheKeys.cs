using System.Globalization;
using System.Text;

namespace CulinaryBlog.Application.Common.Caching;

/// <summary>
/// Tập hợp các key cache chuẩn hóa dùng trong toàn bộ ứng dụng.
/// 
/// Mục tiêu:
/// - Tránh hard-code key string rải rác trong query handler.
/// - Dễ invalidate theo prefix.
/// - Đảm bảo key ổn định, dễ đọc, dễ bảo trì.
/// </summary>
public static class CacheKeys
{
    // Prefix cấp cao theo từng domain dữ liệu.
    public const string CategoriesPrefix = "categories:";
    public const string RecipesPrefix = "recipes:";
    public const string SearchPrefix = "search:";
    public const string UsersPrefix = "users:";
    public const string AuthPrefix = "auth:";

    // =========================================================
    // Categories
    // =========================================================

    /// <summary>
    /// Key cache cho danh sách danh mục.
    /// Thường dùng cho trang public categories list.
    /// </summary>
    public static string CategoriesAll() => $"{CategoriesPrefix}all";

    /// <summary>
    /// Key cache cho chi tiết danh mục theo slug.
    /// </summary>
    public static string CategoryBySlug(string slug)
        => $"{CategoriesPrefix}slug:{NormalizeSlug(slug)}";

    /// <summary>
    /// Key cache cho danh sách recipe thuộc một danh mục theo slug và paging.
    /// </summary>
    public static string CategoryRecipesBySlug(
        string slug,
        int page,
        int pageSize,
        string? sort = null,
        string? search = null)
        => BuildKey(
            $"{CategoriesPrefix}slug:{NormalizeSlug(slug)}:recipes",
            ("page", page.ToString(CultureInfo.InvariantCulture)),
            ("pageSize", pageSize.ToString(CultureInfo.InvariantCulture)),
            ("sort", NormalizeValue(sort)),
            ("q", NormalizeValue(search)));

    // =========================================================
    // Recipes
    // =========================================================

    /// <summary>
    /// Key cache cho chi tiết recipe theo id.
    /// </summary>
    public static string RecipeById(Guid recipeId)
        => $"{RecipesPrefix}detail:id:{recipeId:N}";

    /// <summary>
    /// Key cache cho chi tiết recipe theo slug.
    /// </summary>
    public static string RecipeBySlug(string slug)
        => $"{RecipesPrefix}detail:slug:{NormalizeSlug(slug)}";

    /// <summary>
    /// Key cache cho danh sách recipe theo phân trang và filter.
    /// Dùng cho query list public/published recipe.
    /// </summary>
    public static string RecipeList(
        int page,
        int pageSize,
        Guid? categoryId = null,
        string? difficulty = null,
        int? maxCookTime = null,
        string? sort = null,
        string? search = null,
        bool? isPublished = true)
        => BuildKey(
            $"{RecipesPrefix}list",
            ("page", page.ToString(CultureInfo.InvariantCulture)),
            ("pageSize", pageSize.ToString(CultureInfo.InvariantCulture)),
            ("categoryId", categoryId?.ToString("N", CultureInfo.InvariantCulture) ?? "-"),
            ("difficulty", NormalizeValue(difficulty)),
            ("maxCookTime", maxCookTime?.ToString(CultureInfo.InvariantCulture) ?? "-"),
            ("sort", NormalizeValue(sort)),
            ("q", NormalizeValue(search)),
            ("published", isPublished.HasValue ? isPublished.Value.ToString().ToLowerInvariant() : "-"));

    /// <summary>
    /// Key cache cho dữ liệu recipe detail mở rộng.
    /// Có thể dùng khi query trả thêm ingredients, steps, nutrition, images.
    /// </summary>
    public static string RecipeDetail(Guid recipeId)
        => $"{RecipesPrefix}detail:{recipeId:N}";

    /// <summary>
    /// Key cache cho query admin/owner xem draft và archive của recipe.
    /// </summary>
    public static string RecipeAdminView(Guid recipeId)
        => $"{RecipesPrefix}admin:view:{recipeId:N}";

    // =========================================================
    // Search
    // =========================================================

    /// <summary>
    /// Key cache cho kết quả tìm kiếm recipe.
    /// </summary>
    public static string RecipeSearch(
        string? keyword,
        int page,
        int pageSize,
        Guid? categoryId = null,
        string? difficulty = null,
        int? maxCookTime = null,
        string? sort = null)
        => BuildKey(
            $"{SearchPrefix}recipes",
            ("q", NormalizeValue(keyword)),
            ("page", page.ToString(CultureInfo.InvariantCulture)),
            ("pageSize", pageSize.ToString(CultureInfo.InvariantCulture)),
            ("categoryId", categoryId?.ToString("N", CultureInfo.InvariantCulture) ?? "-"),
            ("difficulty", NormalizeValue(difficulty)),
            ("maxCookTime", maxCookTime?.ToString(CultureInfo.InvariantCulture) ?? "-"),
            ("sort", NormalizeValue(sort)));

    // =========================================================
    // Users / Auth
    // =========================================================

    /// <summary>
    /// Key cache cho profile người dùng hiện tại.
    /// </summary>
    public static string UserProfile(Guid userId)
        => $"{UsersPrefix}profile:{userId:N}";

    /// <summary>
    /// Key cache cho dữ liệu auth tạm thời nếu cần.
    /// </summary>
    public static string AuthSession(string sessionId)
        => $"{AuthPrefix}session:{NormalizeValue(sessionId)}";

    // =========================================================
    // Prefix helpers for invalidation
    // =========================================================

    /// <summary>
    /// Prefix invalidate cho toàn bộ category keys.
    /// </summary>
    public static string CategoriesInvalidatePrefix => CategoriesPrefix;

    /// <summary>
    /// Prefix invalidate cho toàn bộ recipe keys.
    /// </summary>
    public static string RecipesInvalidatePrefix => RecipesPrefix;

    /// <summary>
    /// Prefix invalidate cho toàn bộ search keys.
    /// </summary>
    public static string SearchInvalidatePrefix => SearchPrefix;

    /// <summary>
    /// Prefix invalidate cho toàn bộ user profile keys.
    /// </summary>
    public static string UsersInvalidatePrefix => UsersPrefix;

    // =========================================================
    // Internal helpers
    // =========================================================

    private static string BuildKey(string prefix, params (string Name, string Value)[] parts)
    {
        var sb = new StringBuilder(prefix);

        foreach (var (name, value) in parts)
        {
            sb.Append(':')
              .Append(name)
              .Append(':')
              .Append(value);
        }

        return sb.ToString();
    }

    private static string NormalizeSlug(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Slug cannot be empty.", nameof(slug));
        }

        return slug.Trim().ToLowerInvariant();
    }

    private static string NormalizeValue(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return "-";
        }

        var normalized = value.Trim().ToLowerInvariant();

        // Escape để key không bị vỡ bởi ký tự đặc biệt hoặc khoảng trắng.
        return Uri.EscapeDataString(normalized);
    }
}
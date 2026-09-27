namespace CulinaryBlog.Infrastructure.Jobs;

/// <summary>
/// Hằng số dùng chung cho hệ thống background jobs.
/// Mục tiêu:
/// - Tránh hard-code tên queue, dashboard path và tên job.
/// - Giúp đồng bộ giữa Hangfire registration, job class và các handler.
/// </summary>
public static class JobConstants
{
    /// <summary>
    /// Queue mặc định cho các job nền thông thường.
    /// </summary>
    public const string DefaultQueue = "default";

    /// <summary>
    /// Queue dành cho các job xử lý media/file.
    /// Ví dụ: xóa ảnh recipe trên MinIO.
    /// </summary>
    public const string MediaQueue = "media";

    /// <summary>
    /// Đường dẫn dashboard Hangfire.
    /// </summary>
    public const string DashboardPath = "/hangfire";

    /// <summary>
    /// Số lần retry tối đa cho job thất bại.
    /// SRS mô tả job MinIO delete retry tối đa 3 lần.
    /// </summary>
    public const int DefaultRetryAttempts = 3;

    /// <summary>
    /// Tên job gửi email chào mừng.
    /// </summary>
    public const string WelcomeEmailJob = "welcome-email";

    /// <summary>
    /// Tên job xóa file ảnh khỏi MinIO.
    /// </summary>
    public const string DeleteFileJob = "delete-file";

    /// <summary>
    /// Tên job tạo thumbnail ảnh.
    /// </summary>
    public const string GenerateThumbnailJob = "generate-thumbnail";

    /// <summary>
    /// Tên job cập nhật sitemap.
    /// </summary>
    public const string UpdateSitemapJob = "update-sitemap";

    /// <summary>
    /// Schema Hangfire trong PostgreSQL.
    /// </summary>
    public const string HangfireSchema = "hangfire";
}
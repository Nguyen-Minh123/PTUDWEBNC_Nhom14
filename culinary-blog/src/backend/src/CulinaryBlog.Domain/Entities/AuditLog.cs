namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Bản ghi bất biến mô tả một thay đổi dữ liệu cần kiểm toán.
/// </summary>
public sealed class AuditLog
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public DateTimeOffset OccurredAtUtc { get; set; } = DateTimeOffset.UtcNow;

    public string? ActorId { get; set; }

    public string Action { get; set; } = string.Empty;

    public string EntityName { get; set; } = string.Empty;

    public string? EntityId { get; set; }

    public string? OldValues { get; set; }

    public string? NewValues { get; set; }
}

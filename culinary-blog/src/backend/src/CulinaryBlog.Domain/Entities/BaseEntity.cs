namespace CulinaryBlog.Domain.Entities;

public abstract class BaseEntity
{
    /// <summary>
    /// Khóa chính.
    /// </summary>
    public Guid Id { get; set; } = Guid.NewGuid();
    
    /// <summary>
    /// Thời điểm tạo.
    /// </summary>
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    
    /// <summary>
    /// Thời điểm cập nhật gần nhất.
    /// </summary>
    public DateTimeOffset? UpdatedAt { get; set; }
    
    public bool IsDeleted { get; set; } = false;
    
    /// <summary>
    /// Concurrency token dùng để phát hiện cập nhật đồng thời.
    /// Dùng kiểu uint để đồng bộ với PostgreSQL/Npgsql.
    /// </summary>
    public uint RowVersion { get; set; }
}
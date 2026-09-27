using System.ComponentModel.DataAnnotations;

namespace CulinaryBlog.Domain.Common;

/// <summary>
/// Base class cho tất cả Entity trong Domain.
/// Cung cấp các thuộc tính dùng chung như:
/// - Id
/// - Audit Information
/// - Soft Delete
/// - Concurrency Token
/// </summary>
public abstract class BaseEntity
{
    /// <summary>
    /// Khóa chính của Entity.
    /// </summary>
    public Guid Id { get; set; } = Guid.NewGuid();

    #region Audit Information

    /// <summary>
    /// Thời điểm tạo bản ghi.
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Người tạo bản ghi.
    /// </summary>
    public Guid? CreatedBy { get; set; }

    /// <summary>
    /// Thời điểm cập nhật gần nhất.
    /// </summary>
    public DateTime? UpdatedAt { get; set; }

    /// <summary>
    /// Người cập nhật gần nhất.
    /// </summary>
    public Guid? UpdatedBy { get; set; }

    #endregion

    #region Soft Delete

    /// <summary>
    /// Đánh dấu Entity đã bị xóa mềm.
    /// False = còn tồn tại.
    /// True = đã bị xóa.
    /// </summary>
    public bool IsDeleted { get; set; } = false;

    /// <summary>
    /// Thời điểm xóa mềm.
    /// Null nếu chưa bị xóa.
    /// </summary>
    public DateTime? DeletedAt { get; set; }

    /// <summary>
    /// Người thực hiện thao tác xóa mềm.
    /// </summary>
    public Guid? DeletedBy { get; set; }

    #endregion

    #region Concurrency

    /// <summary>
    /// Optimistic Concurrency Token.
    /// EF Core sẽ kiểm tra RowVersion khi Update.
    /// </summary>
    [Timestamp]
    public byte[] RowVersion { get; set; } = Array.Empty<byte>();

    #endregion
}
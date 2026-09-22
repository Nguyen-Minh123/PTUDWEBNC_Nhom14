namespace CulinaryBlog.Domain.Common;

/// <summary>
/// Đánh dấu Entity hỗ trợ Soft Delete.
/// Các Entity implement interface này sẽ không bị xóa vật lý
/// khỏi cơ sở dữ liệu mà chỉ được cập nhật trạng thái IsDeleted.
/// </summary>
public interface ISoftDelete
{
    /// <summary>
    /// Trạng thái xóa mềm.
    /// False = dữ liệu còn hiệu lực.
    /// True = dữ liệu đã bị xóa mềm.
    /// </summary>
    bool IsDeleted { get; set; }

    /// <summary>
    /// Thời điểm thực hiện xóa mềm.
    /// Null nếu dữ liệu chưa bị xóa.
    /// </summary>
    DateTime? DeletedAt { get; set; }

    /// <summary>
    /// Người thực hiện thao tác xóa mềm.
    /// Null nếu chưa bị xóa.
    /// </summary>
    Guid? DeletedBy { get; set; }
}
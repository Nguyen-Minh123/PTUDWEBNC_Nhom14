namespace CulinaryBlog.Application.Common.Interfaces;

/// <summary>
/// Đại diện cho Unit of Work ở tầng Application.
/// 
/// Ý nghĩa:
/// - Gom thao tác lưu thay đổi xuống database vào một nơi duy nhất.
/// - DbContext ở Infrastructure sẽ implement interface này.
/// - Không nên đặt repository property ở đây nếu DbContext không thực sự sở hữu repository.
/// </summary>
public interface IUnitOfWork
{
    /// <summary>
    /// Lưu toàn bộ thay đổi đang được tracking xuống database.
    /// </summary>
    /// <param name="cancellationToken">Token hủy từ HTTP request hoặc pipeline.</param>
    /// <returns>Số lượng bản ghi bị ảnh hưởng.</returns>
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
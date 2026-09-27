using System.IO;

namespace CulinaryBlog.Application.Common.Interfaces;

/// <summary>
/// Hợp đồng trừu tượng cho dịch vụ lưu trữ file.
/// 
/// Mục tiêu:
/// - Ẩn chi tiết triển khai MinIO/S3/local filesystem khỏi Application Layer.
/// - Cho phép thay thế implementation mà không ảnh hưởng đến use case.
/// 
/// Theo SRS:
/// - Upload file ảnh công thức lên object storage và trả về public URL.
/// - Xóa file theo URL công khai.
/// - Thao tác xóa cần idempotent: nếu file không tồn tại thì không ném lỗi.
/// </summary>
public interface IFileStorageService
{
    /// <summary>
    /// Tải một file lên bộ lưu trữ đối tượng.
    /// </summary>
    /// <returns>
    /// Public URL của file đã upload.
    /// </returns>
    Task<string> UploadAsync(
        Stream fileStream,
        string fileName,
        string contentType,
        long length,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Xóa file khỏi bộ lưu trữ theo public URL.
    /// </summary>
    /// <remarks>
    /// Phải xử lý idempotent: nếu object không tồn tại thì không throw exception.
    /// </remarks>
    Task DeleteAsync(
        string fileUrl,
        CancellationToken cancellationToken = default);
}
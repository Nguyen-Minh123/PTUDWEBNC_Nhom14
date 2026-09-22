using System;
using System.Threading;
using System.Threading.Tasks;

namespace CulinaryBlog.Application.Common.Caching;

/// <summary>
/// Hợp đồng trừu tượng cho dịch vụ cache dùng trong Application Layer.
/// 
/// Mục tiêu:
/// - Ẩn chi tiết triển khai Redis khỏi use case.
/// - Cho phép cache-aside, read-through, invalidation theo prefix.
/// - Hỗ trợ TTL để phù hợp với các chiến lược cache của hệ thống.
/// </summary>
public interface ICacheService
{
    /// <summary>
    /// Lấy dữ liệu từ cache theo key.
    /// </summary>
    /// <typeparam name="T">Kiểu dữ liệu cần deserialize.</typeparam>
    /// <param name="key">Khóa cache.</param>
    /// <param name="cancellationToken">Token hủy tác vụ.</param>
    /// <returns>
    /// Giá trị đã cache, hoặc null nếu không tồn tại.
    /// </returns>
    Task<T?> GetAsync<T>(
        string key,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Lưu dữ liệu vào cache với TTL.
    /// </summary>
    /// <typeparam name="T">Kiểu dữ liệu cần serialize.</typeparam>
    /// <param name="key">Khóa cache.</param>
    /// <param name="value">Giá trị cần lưu.</param>
    /// <param name="ttl">Thời gian sống của cache.</param>
    /// <param name="cancellationToken">Token hủy tác vụ.</param>
    Task SetAsync<T>(
        string key,
        T value,
        TimeSpan ttl,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Xóa một mục cache theo key.
    /// </summary>
    /// <param name="key">Khóa cache cần xóa.</param>
    /// <param name="cancellationToken">Token hủy tác vụ.</param>
    Task RemoveAsync(
        string key,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Xóa nhiều key theo tiền tố.
    /// Dùng cho invalidation khi tạo/cập nhật/xóa dữ liệu.
    /// </summary>
    /// <param name="prefix">Tiền tố key, ví dụ: "recipes:" hoặc "category:".</param>
    /// <param name="cancellationToken">Token hủy tác vụ.</param>
    Task RemoveByPrefixAsync(
        string prefix,
        CancellationToken cancellationToken = default);
}
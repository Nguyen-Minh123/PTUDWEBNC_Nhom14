namespace CulinaryBlog.Application.Common.Interfaces;

/// <summary>
/// Cung cấp thông tin người dùng hiện tại cho Application Layer.
/// </summary>
public interface ICurrentUserService
{
    /// <summary>
    /// ID người dùng hiện tại trong hệ thống.
    /// Sử dụng kiểu string để khớp với ApplicationUser : IdentityUser<string>.
    /// </summary>
    string? UserId { get; }

    /// <summary>
    /// Email của người dùng hiện tại, nếu có.
    /// </summary>
    string? Email { get; }

    /// <summary>
    /// Tên hiển thị của người dùng hiện tại, nếu có.
    /// </summary>
    string? DisplayName { get; }

    /// <summary>
    /// Kiểm tra người dùng hiện tại có thuộc vai trò được chỉ định hay không.
    /// </summary>
    bool IsInRole(string role);

    /// <summary>
    /// Cho biết request hiện tại đã xác thực hay chưa.
    /// </summary>
    bool IsAuthenticated { get; }
}
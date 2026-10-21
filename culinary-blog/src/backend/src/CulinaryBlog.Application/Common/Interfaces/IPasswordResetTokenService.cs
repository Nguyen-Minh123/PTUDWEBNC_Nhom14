using CulinaryBlog.Domain.Entities;

namespace CulinaryBlog.Application.Common.Interfaces;

/// <summary>
/// Dịch vụ sinh và kiểm tra tính hợp lệ của token đặt lại mật khẩu (Password Reset Token).
/// </summary>
public interface IPasswordResetTokenService
{
    /// <summary>
    /// Tạo ra một token an toàn dùng một lần có gắn hạn sử dụng cho người dùng.
    /// </summary>
    string GenerateToken(ApplicationUser user, TimeSpan? lifespan = null);

    /// <summary>
    /// Kiểm tra token có hợp lệ, chưa hết hạn và chữ ký khớp với SecurityStamp hiện tại của người dùng.
    /// </summary>
    bool ValidateToken(ApplicationUser user, string token);
}

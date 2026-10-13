using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Người dùng hệ thống.
/// Theo SRS: ApplicationUser extends IdentityUser.
/// </summary>
public class ApplicationUser : IdentityUser
{
    /// <summary>
    /// Constructor private cho EF Core.
    /// Khởi tạo mặc định các giá trị an toàn.
    /// </summary>
    private ApplicationUser()
    {
        Id = Guid.NewGuid().ToString();
        CreatedAt = DateTimeOffset.UtcNow;
        IsActive = true;
    }

    /// <summary>
    /// Tạo người dùng mới với email và tên hiển thị.
    /// </summary>
    public ApplicationUser(string email, string displayName)
        : this()
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            throw new ArgumentException("Email cannot be empty.", nameof(email));
        }

        if (string.IsNullOrWhiteSpace(displayName))
        {
            throw new ArgumentException("DisplayName cannot be empty.", nameof(displayName));
        }

        Email = email.Trim();
        UserName = email.Trim();
        DisplayName = NormalizeRequiredText(displayName, 100, nameof(displayName));
    }

    /// <summary>
    /// Tên hiển thị công khai.
    /// </summary>
    [MaxLength(100)]
    public string DisplayName { get; private set; } = string.Empty;

    /// <summary>
    /// URL avatar, nullable.
    /// </summary>
    [MaxLength(500)]
    public string? AvatarUrl { get; private set; }

    /// <summary>
    /// Tiểu sử ngắn của tác giả, nullable.
    /// </summary>
    public string? Bio { get; private set; }

    /// <summary>
    /// Trạng thái tài khoản.
    /// </summary>
    public bool IsActive { get; private set; } = true;

    /// <summary>
    /// Ngày tạo tài khoản.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; } = DateTimeOffset.UtcNow;

    /// <summary>
    /// Cập nhật hồ sơ cơ bản.
    /// </summary>
    public void UpdateProfile(string displayName, string? bio = null, string? avatarUrl = null)
    {
        DisplayName = NormalizeRequiredText(displayName, 100, nameof(displayName));
        Bio = NormalizeOptionalText(bio, int.MaxValue);
        AvatarUrl = NormalizeOptionalText(avatarUrl, 500);
    }

    /// <summary>
    /// Gán avatar.
    /// </summary>
    public void SetAvatarUrl(string? avatarUrl)
    {
        AvatarUrl = NormalizeOptionalText(avatarUrl, 500);
    }

    /// <summary>
    /// Gán bio.
    /// </summary>
    public void SetBio(string? bio)
    {
        Bio = NormalizeOptionalText(bio, int.MaxValue);
    }

    /// <summary>
    /// Kích hoạt tài khoản.
    /// </summary>
    public void Activate()
    {
        IsActive = true;
    }

    /// <summary>
    /// Vô hiệu hóa tài khoản.
    /// </summary>
    public void Deactivate()
    {
        IsActive = false;
    }

    /// <summary>
    /// Chuẩn hóa và kiểm tra chuỗi bắt buộc.
    /// </summary>
    private static string NormalizeRequiredText(string? value, int maxLength, string paramName)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException($"{paramName} cannot be empty.", paramName);
        }

        var normalized = value.Trim();

        if (normalized.Length > maxLength)
        {
            throw new ArgumentOutOfRangeException(
                paramName,
                $"The value of {paramName} exceeds the maximum length of {maxLength}.");
        }

        return normalized;
    }

    /// <summary>
    /// Chuẩn hóa và kiểm tra chuỗi tùy chọn.
    /// </summary>
    private static string? NormalizeOptionalText(string? value, int maxLength)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var normalized = value.Trim();

        if (normalized.Length > maxLength)
        {
            throw new ArgumentOutOfRangeException(
                nameof(value),
                $"The value exceeds the maximum length of {maxLength}.");
        }

        return normalized;
    }
}
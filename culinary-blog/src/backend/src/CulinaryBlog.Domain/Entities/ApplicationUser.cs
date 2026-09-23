using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Người dùng hệ thống.
/// Kế thừa IdentityUser<string> theo SRS.
/// </summary>
public class ApplicationUser : IdentityUser<string>
{
    private ApplicationUser()
    {
        Id = Guid.NewGuid().ToString();
        CreatedAt = DateTimeOffset.UtcNow;
        IsActive = true;
    }

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

    public void UpdateProfile(string displayName, string? bio = null, string? avatarUrl = null)
    {
        DisplayName = NormalizeRequiredText(displayName, 100, nameof(displayName));
        Bio = NormalizeOptionalText(bio, int.MaxValue);
        AvatarUrl = NormalizeOptionalText(avatarUrl, 500);
    }

    public void SetAvatarUrl(string? avatarUrl)
    {
        AvatarUrl = NormalizeOptionalText(avatarUrl, 500);
    }

    public void SetBio(string? bio)
    {
        Bio = NormalizeOptionalText(bio, int.MaxValue);
    }

    public void Activate()
    {
        IsActive = true;
    }

    public void Deactivate()
    {
        IsActive = false;
    }

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
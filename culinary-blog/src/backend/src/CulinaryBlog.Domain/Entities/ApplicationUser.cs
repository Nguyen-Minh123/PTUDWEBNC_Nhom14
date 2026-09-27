using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Ngu?i dùng h? th?ng.
/// K? th?a IdentityUser<string> theo SRS.
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

    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    /// <summary>
    /// Tên hi?n th? công khai.
    /// </summary>
    [MaxLength(100)]
    public string DisplayName { get; private set; } = string.Empty;

    /// <summary>
    /// URL avatar, nullable.
    /// </summary>
    [MaxLength(500)]
    public string? AvatarUrl { get; private set; }

    /// <summary>
    /// Ti?u s? ng?n c?a tác gi?, nullable.
    /// </summary>
    public string? Bio { get; private set; }

    /// <summary>
    /// Tr?ng thái tài kho?n.
    /// </summary>
    public bool IsActive { get; private set; } = true;

    /// <summary>
    /// Ngày t?o tài kho?n.
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
            throw new ArgumentException($" cannot be empty.", paramName);
        }

        var normalized = value.Trim();

        if (normalized.Length > maxLength)
        {
            throw new ArgumentOutOfRangeException(
                paramName,
                $"The value of  exceeds the maximum length of .");
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
                $"The value exceeds the maximum length of .");
        }

        return normalized;
    }
}

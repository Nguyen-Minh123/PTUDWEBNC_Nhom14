using Microsoft.AspNetCore.Identity;

namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Thực thể người dùng kế thừa từ ASP.NET Core IdentityUser với khóa chính kiểu string (GUID).
/// Chứa các thông tin hồ sơ mở rộng của tác giả / đầu bếp / quản trị viên trong hệ thống Culinary Blog.
/// </summary>
public class ApplicationUser : IdentityUser<string>
{
    public const int MaxDisplayNameLength = 150;
    public const int MaxBioLength = 1000;
    public const int MaxAvatarUrlLength = 500;

    protected ApplicationUser()
    {
        Id = Guid.NewGuid().ToString();
        DisplayName = string.Empty;
        FirstName = string.Empty;
        LastName = string.Empty;
        CreatedAt = DateTimeOffset.UtcNow;
        IsActive = true;
        SecurityStamp = Guid.NewGuid().ToString();
    }

    public ApplicationUser(
        string email,
        string displayName,
        string? bio = null,
        string? avatarUrl = null)
        : this()
    {
        SetEmail(email);
        SetDisplayName(displayName);
        SetBio(bio);
        SetAvatarUrl(avatarUrl);
    }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
    public bool IsActive { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }

    /// <summary>
    /// Cho biết tài khoản hiện tại có đang bị khóa hoặc vô hiệu hóa hay không.
    /// </summary>
    public bool IsLockedOut =>
        !IsActive || (LockoutEnd.HasValue && LockoutEnd.Value > DateTimeOffset.UtcNow);

    public void UpdateProfile(string displayName, string? bio = null, string? avatarUrl = null)
    {
        SetDisplayName(displayName);
        SetBio(bio);
        SetAvatarUrl(avatarUrl);
        Touch();
    }

    public void SetEmail(string email)
    {
        var normalized = NormalizeRequiredText(email, nameof(email), 256);

        Email = normalized;
        NormalizedEmail = normalized.ToUpperInvariant();
        UserName = normalized;
        NormalizedUserName = NormalizedEmail;
    }

    public void SetDisplayName(string displayName)
    {
        DisplayName = NormalizeRequiredText(displayName, nameof(displayName), MaxDisplayNameLength);
    }

    public void SetBio(string? bio)
    {
        Bio = NormalizeOptionalText(bio, nameof(bio), MaxBioLength);
    }

    public void SetAvatarUrl(string? avatarUrl)
    {
        AvatarUrl = NormalizeOptionalText(avatarUrl, nameof(avatarUrl), MaxAvatarUrlLength);
    }

    public void Deactivate(DateTimeOffset? lockoutEnd = null)
    {
        IsActive = false;
        LockoutEnabled = true;
        LockoutEnd = lockoutEnd ?? DateTimeOffset.UtcNow.AddYears(100);
        SecurityStamp = Guid.NewGuid().ToString();
        Touch();
    }

    public void Activate()
    {
        IsActive = true;
        LockoutEnd = null;
        AccessFailedCount = 0;
        SecurityStamp = Guid.NewGuid().ToString();
        Touch();
    }

    private void Touch()
    {
        UpdatedAt = DateTimeOffset.UtcNow;
    }

    private static string NormalizeRequiredText(string value, string paramName, int maxLength)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException($"{paramName} cannot be empty.", paramName);
        }

        var trimmed = value.Trim();

        if (trimmed.Length > maxLength)
        {
            throw new ArgumentOutOfRangeException(
                paramName,
                $"The value of {paramName} exceeds the maximum length of {maxLength}.");
        }

        return trimmed;
    }

    private static string? NormalizeOptionalText(string? value, string paramName, int maxLength)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var trimmed = value.Trim();

        if (trimmed.Length > maxLength)
        {
            throw new ArgumentOutOfRangeException(
                paramName,
                $"The value of {paramName} exceeds the maximum length of {maxLength}.");
        }

        return trimmed;
    }
}

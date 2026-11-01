namespace CulinaryBlog.Application.DTOs;

/// <summary>
/// DTO biểu diễn thông tin chi tiết của người dùng trong bảng Quản trị Người dùng (FR-BKE-016, FR-FTE-044).
/// </summary>
public class UserListItemDto
{
    public string Id { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
    public string PrimaryRole { get; set; } = "User";
    public IReadOnlyList<string> Roles { get; set; } = ["User"];
    public bool IsActive { get; set; } = true;
    public bool IsLockedOut { get; set; }
    public DateTimeOffset? LockoutEnd { get; set; }
    public int RecipeCount { get; set; }
    public int PublishedRecipeCount { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
}

/// <summary>
/// DTO biểu diễn thông tin công khai của tác giả / đầu bếp ẩm thực (FR-BKE-016, FR-FTE-045).
/// </summary>
public class AuthorSummaryDto
{
    public string Id { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
    public string PrimaryRole { get; set; } = "Author";
    public int PublishedRecipeCount { get; set; }
    public int TotalRecipeCount { get; set; }
    public DateTimeOffset JoinedAt { get; set; }
}

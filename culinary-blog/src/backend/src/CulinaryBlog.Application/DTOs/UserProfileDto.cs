namespace CulinaryBlog.Application.DTOs;

public class UserProfileDto
{
    public string Id { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
    public IReadOnlyList<string> Roles { get; set; } = ["User"];
    public bool IsActive { get; set; } = true;
    public int RecipeCount { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}

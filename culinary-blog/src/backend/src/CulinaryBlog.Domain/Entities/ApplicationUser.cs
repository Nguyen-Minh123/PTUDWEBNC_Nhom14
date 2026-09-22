using Microsoft.AspNetCore.Identity;

namespace CulinaryBlog.Domain.Entities;

// Sửa IdentityUser<string> thành IdentityUser
public class ApplicationUser : IdentityUser 
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    
    public string? AvatarUrl { get; set; }
    
    public string? Bio { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
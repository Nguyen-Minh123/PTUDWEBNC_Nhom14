using System.ComponentModel.DataAnnotations;

namespace CulinaryBlog.Domain.Entities;

public class RefreshToken
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(200)]
    public string Token { get; set; } = string.Empty;

    public bool IsUsed { get; set; }

    public bool IsRevoked { get; set; }

    public DateTime ExpiresAt { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;

    public string? TokenHash { get; set; }

    public string? ReplacedByTokenHash { get; set; }

    public ApplicationUser User { get; set; } = null!;
}

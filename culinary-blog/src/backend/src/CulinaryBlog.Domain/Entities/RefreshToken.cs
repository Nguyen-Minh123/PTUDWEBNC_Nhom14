using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;

namespace CulinaryBlog.Domain.Entities;

public class RefreshToken
{
    private string _token = string.Empty;

    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(200)]
    public string Token
    {
        get => _token;
        set
        {
            _token = value;
            if (!string.IsNullOrEmpty(value) && string.IsNullOrEmpty(TokenHash))
            {
                TokenHash = ComputeHash(value);
            }
        }
    }

    public bool IsUsed { get; set; }

    public bool IsRevoked { get; set; }

    public DateTime ExpiresAt { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;

    public string TokenHash { get; set; } = string.Empty;

    public string? ReplacedByTokenHash { get; set; }

    public ApplicationUser User { get; set; } = null!;

    public static string ComputeHash(string token)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
        return Convert.ToHexString(bytes).ToLowerInvariant();
    }
}

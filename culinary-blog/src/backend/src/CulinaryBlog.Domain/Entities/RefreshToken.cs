namespace CulinaryBlog.Domain.Entities;

public class RefreshToken
{
    public Guid Id { get; private set; }
    public string TokenHash { get; private set; } = string.Empty;
    public string UserId { get; private set; } = string.Empty;
    public bool IsRevoked { get; private set; }
    public bool IsUsed { get; private set; }
    public DateTime ExpiresAt { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public string? ReplacedByTokenHash { get; private set; }

    public ApplicationUser? User { get; private set; }

    protected RefreshToken() { }

    public static RefreshToken Create(string userId, string tokenHash, int expiryDays)
    {
        return new RefreshToken
        {
            Id = Guid.NewGuid(),
            TokenHash = tokenHash,
            UserId = userId,
            ExpiresAt = DateTime.UtcNow.AddDays(expiryDays),
            CreatedAt = DateTime.UtcNow,
        };
    }

    public bool IsValid() => !IsRevoked && !IsUsed && ExpiresAt > DateTime.UtcNow;

    public void MarkUsed(string newHash)
    {
        IsUsed = true;
        ReplacedByTokenHash = newHash;
    }

    public void Revoke()
    {
        IsRevoked = true;
    }
}
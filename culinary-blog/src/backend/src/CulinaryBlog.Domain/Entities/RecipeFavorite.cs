namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Liên kết một người dùng với một công thức họ đã lưu yêu thích.
/// </summary>
public sealed class RecipeFavorite
{
    private RecipeFavorite()
    {
    }

    public RecipeFavorite(string userId, Guid recipeId)
    {
        if (string.IsNullOrWhiteSpace(userId))
        {
            throw new ArgumentException("UserId cannot be empty.", nameof(userId));
        }

        if (recipeId == Guid.Empty)
        {
            throw new ArgumentException("RecipeId cannot be empty.", nameof(recipeId));
        }

        Id = Guid.NewGuid();
        UserId = userId.Trim();
        RecipeId = recipeId;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    public Guid Id { get; private set; }

    public string UserId { get; private set; } = string.Empty;

    public Guid RecipeId { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    public ApplicationUser Owner { get; private set; } = null!;

    public Recipe Recipe { get; private set; } = null!;
}

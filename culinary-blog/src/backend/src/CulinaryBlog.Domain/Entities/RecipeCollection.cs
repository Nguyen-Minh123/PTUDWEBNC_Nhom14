namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Bộ sưu tập công thức riêng tư thuộc về một người dùng.
/// </summary>
public sealed class RecipeCollection
{
    private readonly List<RecipeCollectionItem> _items = [];

    private RecipeCollection()
    {
    }

    public RecipeCollection(string ownerId, string name)
    {
        if (string.IsNullOrWhiteSpace(ownerId))
        {
            throw new ArgumentException("OwnerId cannot be empty.", nameof(ownerId));
        }

        Id = Guid.NewGuid();
        OwnerId = ownerId.Trim();
        Name = NormalizeName(name);
        CreatedAt = DateTimeOffset.UtcNow;
    }

    public Guid Id { get; private set; }

    public string OwnerId { get; private set; } = string.Empty;

    public string Name { get; private set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; private set; }

    public ApplicationUser Owner { get; private set; } = null!;

    public IReadOnlyCollection<RecipeCollectionItem> Items => _items.AsReadOnly();

    public void Rename(string name)
    {
        Name = NormalizeName(name);
    }

    private static string NormalizeName(string? name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Name cannot be empty.", nameof(name));
        }

        var normalizedName = name.Trim();

        if (normalizedName.Length > 100)
        {
            throw new ArgumentOutOfRangeException(nameof(name), "Name cannot exceed 100 characters.");
        }

        return normalizedName;
    }
}

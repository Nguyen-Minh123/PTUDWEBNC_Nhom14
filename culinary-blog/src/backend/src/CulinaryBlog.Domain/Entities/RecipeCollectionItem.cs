namespace CulinaryBlog.Domain.Entities;

/// <summary>
/// Liên kết một công thức với một bộ sưu tập.
/// </summary>
public sealed class RecipeCollectionItem
{
    private RecipeCollectionItem()
    {
    }

    public RecipeCollectionItem(Guid collectionId, Guid recipeId)
    {
        if (collectionId == Guid.Empty)
        {
            throw new ArgumentException("CollectionId cannot be empty.", nameof(collectionId));
        }

        if (recipeId == Guid.Empty)
        {
            throw new ArgumentException("RecipeId cannot be empty.", nameof(recipeId));
        }

        Id = Guid.NewGuid();
        CollectionId = collectionId;
        RecipeId = recipeId;
        AddedAt = DateTimeOffset.UtcNow;
    }

    public Guid Id { get; private set; }

    public Guid CollectionId { get; private set; }

    public Guid RecipeId { get; private set; }

    public DateTimeOffset AddedAt { get; private set; }

    public RecipeCollection Collection { get; private set; } = null!;

    public Recipe Recipe { get; private set; } = null!;
}

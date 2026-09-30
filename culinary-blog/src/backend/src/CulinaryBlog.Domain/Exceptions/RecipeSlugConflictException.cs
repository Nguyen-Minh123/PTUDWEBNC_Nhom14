namespace CulinaryBlog.Domain.Exceptions;

public sealed class RecipeSlugConflictException : DomainException
{
    public RecipeSlugConflictException(string slug)
        : base($"A recipe with slug '{slug}' already exists.")
    {
    }
}
using CulinaryBlog.Domain.Exceptions;

namespace CulinaryBlog.Domain.Exceptions;

public sealed class RecipeSlugConflictException : DomainException
{
    public RecipeSlugConflictException(string slug)
        : base($"A recipe with slug '{slug}' already exists.")
    {
    }
}

public sealed class RecipeNotFoundException : DomainException
{
    public RecipeNotFoundException(Guid id)
        : base($"Recipe with id '{id}' was not found.")
    {
    }
}

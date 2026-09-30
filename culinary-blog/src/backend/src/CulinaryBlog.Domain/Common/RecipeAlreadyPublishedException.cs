namespace CulinaryBlog.Domain.Common;

public sealed class RecipeAlreadyPublishedException : InvalidOperationException
{
    public RecipeAlreadyPublishedException()
        : base("Recipe has already been published.")
    {
    }
}
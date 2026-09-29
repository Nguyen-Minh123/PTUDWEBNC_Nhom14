using System;

namespace CulinaryBlog.Domain.Exceptions;

public class RecipeAlreadyPublishedException : DomainException
{
    public RecipeAlreadyPublishedException(Guid recipeId) 
        : base("Recipe with ID " + recipeId + " is already published and cannot be modified.")
    {
    }
}

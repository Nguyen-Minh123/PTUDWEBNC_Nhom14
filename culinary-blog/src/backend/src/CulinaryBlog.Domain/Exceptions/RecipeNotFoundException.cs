using System;

namespace CulinaryBlog.Domain.Exceptions;

public class RecipeNotFoundException : DomainException
{
    public RecipeNotFoundException(Guid recipeId) 
        : base("Recipe with ID " + recipeId + "" was not found.")
    {
    }
}

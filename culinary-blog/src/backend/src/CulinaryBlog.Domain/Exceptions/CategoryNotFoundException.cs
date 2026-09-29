using System;

namespace CulinaryBlog.Domain.Exceptions;

public class CategoryNotFoundException : DomainException
{
    public CategoryNotFoundException(Guid categoryId) 
        : base("Category with ID " + categoryId + "" was not found.")
    {
    }
}

using System;

namespace CulinaryBlog.Domain.Exceptions;

public class UnsupportedSortFieldException : DomainException
{
    public UnsupportedSortFieldException(string fieldName) 
        : base("The sort field '" + fieldName + "' is not supported.")
    {
    }
}

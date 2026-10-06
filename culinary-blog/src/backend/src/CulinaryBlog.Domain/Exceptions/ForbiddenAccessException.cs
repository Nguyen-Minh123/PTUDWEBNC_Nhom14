namespace CulinaryBlog.Domain.Exceptions;

public class ForbiddenAccessException : DomainException
{
    public ForbiddenAccessException() : base("You are not authorized to access this resource.")
    {
    }

    public ForbiddenAccessException(string message) : base(message)
    {
    }
}

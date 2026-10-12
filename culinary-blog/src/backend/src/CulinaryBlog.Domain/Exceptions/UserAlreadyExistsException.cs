namespace CulinaryBlog.Domain.Exceptions;

public class UserAlreadyExistsException : DomainException
{
    public UserAlreadyExistsException(string email)
        : base($"Email '{email}' đã được sử dụng.")
    {
    }
}

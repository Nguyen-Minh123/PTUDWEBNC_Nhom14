namespace CulinaryBlog.Domain.Exceptions;

public class InvalidCredentialsException : DomainException
{
    public InvalidCredentialsException()
        : base("Email hoặc mật khẩu không chính xác.")
    {
    }

    public InvalidCredentialsException(string message)
        : base(message)
    {
    }
}
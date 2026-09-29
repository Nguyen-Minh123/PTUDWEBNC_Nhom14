namespace CulinaryBlog.Domain.Exceptions;

public class UserNotFoundException : DomainException
{
    public UserNotFoundException(string identifier)
        : base("Không tìm thấy người dùng với thông tin: " + identifier)
    {
    }
}
using System;

namespace CulinaryBlog.Domain.Exceptions;

public class UserNotFoundException : DomainException
{
    public UserNotFoundException(string email) 
        : base("User with email '" + email + "' was not found.")
    {
    }
}

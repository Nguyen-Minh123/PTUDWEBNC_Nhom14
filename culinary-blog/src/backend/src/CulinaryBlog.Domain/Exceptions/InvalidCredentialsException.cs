using System;

namespace CulinaryBlog.Domain.Exceptions;

public class InvalidCredentialsException : DomainException
{
    public InvalidCredentialsException() 
        : base("Invalid email or password.")
    {
    }
}

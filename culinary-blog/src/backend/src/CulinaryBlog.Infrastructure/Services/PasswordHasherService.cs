using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace CulinaryBlog.Infrastructure.Services;

public class PasswordHasherService : IPasswordHasherService
{
    private readonly PasswordHasher<ApplicationUser> _hasher = new();

    public string HashPassword(ApplicationUser user, string password)
    {
        return _hasher.HashPassword(user, password);
    }

    public bool VerifyPassword(ApplicationUser user, string hashedPassword, string providedPassword)
    {
        var result = _hasher.VerifyHashedPassword(user, hashedPassword, providedPassword);
        return result == PasswordVerificationResult.Success || result == PasswordVerificationResult.SuccessRehashNeeded;
    }
}

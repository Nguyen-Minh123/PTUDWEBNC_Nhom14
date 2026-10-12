using CulinaryBlog.Domain.Entities;

namespace CulinaryBlog.Application.Common.Interfaces;

public interface IPasswordHasherService
{
    string HashPassword(ApplicationUser user, string password);
    bool VerifyPassword(ApplicationUser user, string hashedPassword, string providedPassword);
}

using System.Security.Claims;
using CulinaryBlog.Domain.Entities;

namespace CulinaryBlog.Application.Common.Interfaces;

public interface IJwtService
{
    string GenerateAccessToken(ApplicationUser user, IList<string> roles);
    string GenerateRefreshToken();
    ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
}

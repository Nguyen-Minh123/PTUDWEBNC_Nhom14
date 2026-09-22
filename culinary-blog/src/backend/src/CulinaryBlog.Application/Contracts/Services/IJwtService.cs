using System.Security.Claims;
using CulinaryBlog.Domain.Entities;

namespace CulinaryBlog.Application.Contracts.Services;

public interface IJwtService
{
    string GenerateAccessToken(ApplicationUser user, IList<string> roles);
    (string RawToken, string TokenHash) GenerateRefreshToken();
    string HashToken(string rawToken);
    ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
}
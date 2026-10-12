using CulinaryBlog.Application.Common.Interfaces;
using Google.Apis.Auth;

namespace CulinaryBlog.Infrastructure.Services;

public class GoogleAuthService : IGoogleAuthService
{
    public async Task<(string Email, string Name, string Picture)> ValidateTokenAsync(string idToken)
    {
        try
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
            return (payload.Email, payload.Name, payload.Picture);
        }
        catch (InvalidJwtException ex)
        {
            throw new UnauthorizedAccessException("Invalid Google token.", ex);
        }
    }
}

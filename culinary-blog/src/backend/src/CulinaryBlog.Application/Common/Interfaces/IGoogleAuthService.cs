namespace CulinaryBlog.Application.Common.Interfaces;

public interface IGoogleAuthService
{
    Task<(string Email, string Name, string Picture)> ValidateTokenAsync(string idToken);
}

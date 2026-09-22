namespace CulinaryBlog.Application.Authentication.Contracts;

public record RegisterRequest(string FirstName, string LastName, string Email, string Password);

public record LoginRequest(string Email, string Password);

public record RefreshTokenRequest(string AccessToken, string RefreshToken);

public record AuthResponse(
    string Id, 
    string FirstName, 
    string LastName, 
    string Email, 
    string AccessToken, 
    string RefreshToken);
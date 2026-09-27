namespace CulinaryBlog.Application.DTOs;

public record AuthResponseDto(
    string AccessToken,
    string RefreshToken,
    DateTime AccessTokenExpiry,
    UserDto User
);

public record UserDto(
    string Id,
    string FullName,
    string Email,
    string UserName,
    string? AvatarUrl,
    IList<string> Roles
);
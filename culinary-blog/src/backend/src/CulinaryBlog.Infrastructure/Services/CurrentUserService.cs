using System.Security.Claims;
using CulinaryBlog.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace CulinaryBlog.Infrastructure.Services;

/// <summary>
/// Lấy thông tin người dùng hiện tại từ HttpContext.User.
/// </summary>
public sealed class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    private ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;

    public string? UserId =>
        User?.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? User?.FindFirstValue("sub")
        ?? User?.FindFirstValue("userId");

    public string? Email =>
        User?.FindFirstValue(ClaimTypes.Email)
        ?? User?.FindFirstValue("email");

    public string? DisplayName =>
        User?.FindFirstValue("name")
        ?? User?.FindFirstValue(ClaimTypes.Name)
        ?? User?.FindFirstValue("displayName");

    public bool IsAuthenticated =>
        User?.Identity?.IsAuthenticated == true;

    public bool IsInRole(string role)
    {
        if (string.IsNullOrWhiteSpace(role) || User is null)
        {
            return false;
        }

        return User.IsInRole(role);
    }
}
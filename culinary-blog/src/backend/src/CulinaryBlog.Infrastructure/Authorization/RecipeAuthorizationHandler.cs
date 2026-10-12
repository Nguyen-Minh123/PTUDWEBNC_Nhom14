using System.Security.Claims;
using CulinaryBlog.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace CulinaryBlog.Infrastructure.Authorization;

public static class RecipeOperations
{
    public static readonly OperationAuthorizationRequirement Create = new() { Name = nameof(Create) };
    public static readonly OperationAuthorizationRequirement Read = new() { Name = nameof(Read) };
    public static readonly OperationAuthorizationRequirement Update = new() { Name = nameof(Update) };
    public static readonly OperationAuthorizationRequirement Delete = new() { Name = nameof(Delete) };
    public static readonly OperationAuthorizationRequirement Publish = new() { Name = nameof(Publish) };
    public static readonly OperationAuthorizationRequirement Archive = new() { Name = nameof(Archive) };
}

/// <summary>
/// Resource-based authorization handler cho Recipe.
/// Đảm bảo tác giả sở hữu (AuthorId == currentUserId) hoặc Admin mới được phép chỉnh sửa/xóa/xuất bản.
/// </summary>
public sealed class RecipeAuthorizationHandler
    : AuthorizationHandler<OperationAuthorizationRequirement, Recipe>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        OperationAuthorizationRequirement requirement,
        Recipe resource)
    {
        if (context.User.IsInRole("Admin"))
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

        if (requirement.Name == RecipeOperations.Read.Name)
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

        var userId = context.User.FindFirst("sub")?.Value 
            ?? context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!string.IsNullOrEmpty(userId) &&
            string.Equals(resource.AuthorId, userId, StringComparison.OrdinalIgnoreCase))
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}

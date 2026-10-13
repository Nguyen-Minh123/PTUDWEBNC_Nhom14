using System.Security.Claims;
using CulinaryBlog.Domain.Entities;
using Microsoft.AspNetCore.Authorization;

namespace CulinaryBlog.API.Authorization;

internal static class RecipeAuthorizationPolicies
{
    public const string AuthenticatedUser = "AuthenticatedUser";
    public const string OwnerOrAdmin = "RecipeOwnerOrAdmin";
    public const string AdminRole = "Admin";
}

internal sealed class RecipeOwnerOrAdminRequirement : IAuthorizationRequirement
{
}

internal sealed class RecipeOwnerOrAdminHandler
    : AuthorizationHandler<RecipeOwnerOrAdminRequirement, Recipe>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        RecipeOwnerOrAdminRequirement requirement,
        Recipe resource)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? context.User.FindFirstValue("sub")
            ?? context.User.FindFirstValue("userId");

        if (context.User.IsInRole(RecipeAuthorizationPolicies.AdminRole) ||
            (!string.IsNullOrWhiteSpace(userId) &&
             string.Equals(userId, resource.AuthorId, StringComparison.Ordinal)))
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}

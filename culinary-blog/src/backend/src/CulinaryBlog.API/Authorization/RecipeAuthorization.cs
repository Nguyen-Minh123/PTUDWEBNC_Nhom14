using System.Security.Claims;
using CulinaryBlog.Domain.Entities;
using Microsoft.AspNetCore.Authorization;

namespace CulinaryBlog.API.Authorization;

/// <summary>Centralized names for recipe authorization policies and the administrator role.</summary>
internal static class RecipeAuthorizationPolicies
{
    public const string AuthenticatedUser = "AuthenticatedUser";
    public const string OwnerOrAdmin = "RecipeOwnerOrAdmin";
    public const string AdminRole = "Admin";
}

/// <summary>Requirement evaluated against the recipe being modified.</summary>
internal sealed class RecipeOwnerOrAdminRequirement : IAuthorizationRequirement
{
}

/// <summary>Allows only the recipe owner or an administrator to modify a recipe.</summary>
internal sealed class RecipeOwnerOrAdminHandler
    : AuthorizationHandler<RecipeOwnerOrAdminRequirement, Recipe>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        RecipeOwnerOrAdminRequirement requirement,
        Recipe resource)
    {
        // Support the standard name-identifier claim and the user-id claims used by existing tokens.
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? context.User.FindFirstValue("sub")
            ?? context.User.FindFirstValue("userId");

        // Admin bypasses ownership; otherwise the authenticated user must match the stored AuthorId.
        if (context.User.IsInRole(RecipeAuthorizationPolicies.AdminRole) ||
            (!string.IsNullOrWhiteSpace(userId) &&
             string.Equals(userId, resource.AuthorId, StringComparison.Ordinal)))
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}

using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Models;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Users.Queries.GetUsers;

public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, PagedResult<UserListItemDto>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetUsersQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PagedResult<UserListItemDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        var validPageNumber = request.PageNumber < 1 ? 1 : request.PageNumber;
        var validPageSize = request.PageSize < 1 ? 10 : Math.Min(request.PageSize, 50);

        var query = _dbContext.Users.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var keyword = request.SearchTerm.Trim().ToLowerInvariant();
            query = query.Where(u =>
                u.DisplayName.ToLower().Contains(keyword) ||
                (u.Email != null && u.Email.ToLower().Contains(keyword)) ||
                u.FirstName.ToLower().Contains(keyword) ||
                u.LastName.ToLower().Contains(keyword));
        }

        var users = await query.ToListAsync(cancellationToken);
        var rolesMap = await UserRoleHelper.GetUsersRolesMapAsync(_dbContext, users, cancellationToken);

        var userIds = users.Select(u => u.Id).ToList();
        var recipeStats = await _dbContext.Recipes
            .AsNoTracking()
            .Where(r => userIds.Contains(r.AuthorId))
            .GroupBy(r => r.AuthorId)
            .Select(g => new
            {
                AuthorId = g.Key,
                TotalCount = g.Count(),
                PublishedCount = g.Count(r => r.Status == RecipeStatus.Published)
            })
            .ToDictionaryAsync(x => x.AuthorId, StringComparer.Ordinal, cancellationToken);

        var now = DateTimeOffset.UtcNow;
        var items = users.Select(u =>
        {
            var roles = rolesMap.TryGetValue(u.Id, out var r) ? r : UserRoleHelper.GetFallbackRoles(u.Email);
            var primaryRole = UserRoleHelper.GetPrimaryRole(roles);
            var stats = recipeStats.GetValueOrDefault(u.Id);
            var isLockedOut = !u.IsActive || (u.LockoutEnd.HasValue && u.LockoutEnd.Value > now);

            return new UserListItemDto
            {
                Id = u.Id,
                Email = u.Email ?? string.Empty,
                DisplayName = u.DisplayName,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Bio = u.Bio,
                AvatarUrl = u.AvatarUrl,
                PrimaryRole = primaryRole,
                Roles = roles,
                IsActive = u.IsActive && !isLockedOut,
                IsLockedOut = isLockedOut,
                LockoutEnd = u.LockoutEnd,
                RecipeCount = stats?.TotalCount ?? 0,
                PublishedRecipeCount = stats?.PublishedCount ?? 0,
                CreatedAt = u.CreatedAt,
                UpdatedAt = u.UpdatedAt
            };
        });

        if (!string.IsNullOrWhiteSpace(request.Role))
        {
            var normalizedRole = UserRoleHelper.NormalizeRoleName(request.Role);
            if (normalizedRole != null)
            {
                items = items.Where(x =>
                    string.Equals(x.PrimaryRole, normalizedRole, StringComparison.OrdinalIgnoreCase) ||
                    x.Roles.Contains(normalizedRole, StringComparer.OrdinalIgnoreCase));
            }
        }

        if (request.IsActive.HasValue)
        {
            items = items.Where(x => x.IsActive == request.IsActive.Value);
        }

        var sortKey = (request.Sort ?? "-createdAt").Trim().ToLowerInvariant();
        items = sortKey switch
        {
            "createdat" => items.OrderBy(x => x.CreatedAt),
            "displayname" => items.OrderBy(x => x.DisplayName, StringComparer.OrdinalIgnoreCase),
            "-displayname" => items.OrderByDescending(x => x.DisplayName, StringComparer.OrdinalIgnoreCase),
            "recipecount" => items.OrderBy(x => x.RecipeCount).ThenByDescending(x => x.CreatedAt),
            "-recipecount" => items.OrderByDescending(x => x.RecipeCount).ThenByDescending(x => x.CreatedAt),
            _ => items.OrderByDescending(x => x.CreatedAt)
        };

        var filteredList = items.ToList();
        var totalCount = filteredList.Count;
        var pagedItems = filteredList
            .Skip((validPageNumber - 1) * validPageSize)
            .Take(validPageSize)
            .ToList();

        return new PagedResult<UserListItemDto>(pagedItems, totalCount, validPageNumber, validPageSize);
    }
}

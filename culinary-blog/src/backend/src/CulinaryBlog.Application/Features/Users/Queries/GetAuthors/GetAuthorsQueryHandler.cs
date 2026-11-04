using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Models;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Users.Queries.GetAuthors;

public class GetAuthorsQueryHandler : IRequestHandler<GetAuthorsQuery, PagedResult<AuthorSummaryDto>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetAuthorsQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PagedResult<AuthorSummaryDto>> Handle(GetAuthorsQuery request, CancellationToken cancellationToken)
    {
        var validPageNumber = request.PageNumber < 1 ? 1 : request.PageNumber;
        var validPageSize = request.PageSize < 1 ? 12 : Math.Min(request.PageSize, 50);

        var now = DateTimeOffset.UtcNow;
        var query = _dbContext.Users
            .AsNoTracking()
            .Where(u => u.IsActive && (!u.LockoutEnd.HasValue || u.LockoutEnd.Value <= now));

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var keyword = request.SearchTerm.Trim().ToLowerInvariant();
            query = query.Where(u =>
                u.DisplayName.ToLower().Contains(keyword) ||
                (u.Bio != null && u.Bio.ToLower().Contains(keyword)) ||
                (u.Email != null && u.Email.ToLower().Contains(keyword)));
        }

        var activeUsers = await query.ToListAsync(cancellationToken);
        var rolesMap = await UserRoleHelper.GetUsersRolesMapAsync(_dbContext, activeUsers, cancellationToken);

        var userIds = activeUsers.Select(u => u.Id).ToList();
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

        var authors = activeUsers
            .Select(u =>
            {
                var roles = rolesMap.TryGetValue(u.Id, out var r) ? r : UserRoleHelper.GetFallbackRoles(u.Email);
                var primaryRole = UserRoleHelper.GetPrimaryRole(roles);
                var stats = recipeStats.GetValueOrDefault(u.Id);
                var isAuthorOrHasRecipes =
                    roles.Contains(UserRoleHelper.Author, StringComparer.OrdinalIgnoreCase) ||
                    roles.Contains(UserRoleHelper.Admin, StringComparer.OrdinalIgnoreCase) ||
                    (stats?.PublishedCount ?? 0) > 0;

                return (IsEligible: isAuthorOrHasRecipes, Dto: new AuthorSummaryDto
                {
                    Id = u.Id,
                    DisplayName = u.DisplayName,
                    Email = u.Email ?? string.Empty,
                    Bio = u.Bio,
                    AvatarUrl = u.AvatarUrl,
                    PrimaryRole = primaryRole,
                    PublishedRecipeCount = stats?.PublishedCount ?? 0,
                    TotalRecipeCount = stats?.TotalCount ?? 0,
                    JoinedAt = u.CreatedAt
                });
            })
            .Where(x => x.IsEligible)
            .Select(x => x.Dto);

        var sortKey = (request.Sort ?? "-publishedRecipeCount").Trim().ToLowerInvariant();
        authors = sortKey switch
        {
            "displayname" => authors.OrderBy(a => a.DisplayName, StringComparer.OrdinalIgnoreCase),
            "-displayname" => authors.OrderByDescending(a => a.DisplayName, StringComparer.OrdinalIgnoreCase),
            "joinedat" => authors.OrderBy(a => a.JoinedAt),
            "-joinedat" => authors.OrderByDescending(a => a.JoinedAt),
            "publishedrecipecount" => authors.OrderBy(a => a.PublishedRecipeCount).ThenBy(a => a.DisplayName),
            _ => authors.OrderByDescending(a => a.PublishedRecipeCount).ThenBy(a => a.DisplayName)
        };

        var authorList = authors.ToList();
        var totalCount = authorList.Count;
        var pagedItems = authorList
            .Skip((validPageNumber - 1) * validPageSize)
            .Take(validPageSize)
            .ToList();

        return new PagedResult<AuthorSummaryDto>(pagedItems, totalCount, validPageNumber, validPageSize);
    }
}

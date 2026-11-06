using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.DTOs;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Users.Queries.GetCurrentUserProfile;

public class GetCurrentUserProfileQueryHandler : IRequestHandler<GetCurrentUserProfileQuery, UserProfileDto?>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly ICurrentUserService _currentUserService;

    public GetCurrentUserProfileQueryHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
    {
        _dbContext = dbContext;
        _currentUserService = currentUserService;
    }

    public async Task<UserProfileDto?> Handle(GetCurrentUserProfileQuery request, CancellationToken cancellationToken)
    {
        var currentUserId = _currentUserService.UserId;
        if (string.IsNullOrWhiteSpace(currentUserId))
        {
            return null;
        }

        var user = await _dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == currentUserId, cancellationToken);

        if (user == null)
        {
            return null;
        }

        var roles = await UserRoleHelper.GetUserRolesAsync(_dbContext, user, cancellationToken);
        var recipeCount = await _dbContext.Recipes
            .AsNoTracking()
            .CountAsync(r => r.AuthorId == user.Id, cancellationToken);

        var dto = user.Adapt<UserProfileDto>();
        dto.Roles = roles;
        dto.IsActive = user.IsActive;
        dto.RecipeCount = recipeCount;

        return dto;
    }
}

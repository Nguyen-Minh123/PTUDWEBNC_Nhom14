using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Users.Queries.GetUserById;

public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, UserListItemDto>
{
    private readonly IApplicationDbContext _dbContext;

    public GetUserByIdQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<UserListItemDto> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

        if (user is null)
        {
            throw new UserNotFoundException(request.UserId);
        }

        var roles = await UserRoleHelper.GetUserRolesAsync(_dbContext, user, cancellationToken);
        var primaryRole = UserRoleHelper.GetPrimaryRole(roles);

        var totalRecipes = await _dbContext.Recipes
            .AsNoTracking()
            .CountAsync(r => r.AuthorId == user.Id, cancellationToken);

        var publishedRecipes = await _dbContext.Recipes
            .AsNoTracking()
            .CountAsync(r => r.AuthorId == user.Id && r.Status == RecipeStatus.Published, cancellationToken);

        var isLockedOut = user.IsLockedOut;

        return new UserListItemDto
        {
            Id = user.Id,
            Email = user.Email ?? string.Empty,
            DisplayName = user.DisplayName,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Bio = user.Bio,
            AvatarUrl = user.AvatarUrl,
            PrimaryRole = primaryRole,
            Roles = roles,
            IsActive = user.IsActive && !isLockedOut,
            IsLockedOut = isLockedOut,
            LockoutEnd = user.LockoutEnd,
            RecipeCount = totalRecipes,
            PublishedRecipeCount = publishedRecipes,
            CreatedAt = user.CreatedAt,
            UpdatedAt = user.UpdatedAt
        };
    }
}

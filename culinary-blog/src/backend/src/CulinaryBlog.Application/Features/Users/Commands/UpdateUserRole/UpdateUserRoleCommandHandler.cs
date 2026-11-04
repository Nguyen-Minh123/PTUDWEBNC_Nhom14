using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CulinaryBlog.Application.Features.Users.Commands.UpdateUserRole;

public class UpdateUserRoleCommandHandler : IRequestHandler<UpdateUserRoleCommand, UserListItemDto>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IValidator<UpdateUserRoleCommand> _validator;
    private readonly ILogger<UpdateUserRoleCommandHandler> _logger;

    public UpdateUserRoleCommandHandler(
        IApplicationDbContext dbContext,
        ICurrentUserService currentUserService,
        IValidator<UpdateUserRoleCommand> validator,
        ILogger<UpdateUserRoleCommandHandler> logger)
    {
        _dbContext = dbContext;
        _currentUserService = currentUserService;
        _validator = validator;
        _logger = logger;
    }

    public async Task<UserListItemDto> Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        var normalizedRole = UserRoleHelper.NormalizeRoleName(request.Role)!;

        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

        if (user is null)
        {
            throw new UserNotFoundException(request.UserId);
        }

        // Bảo vệ chống tự hạ quyền Admin (Self-demotion Guard)
        if (string.Equals(_currentUserService.UserId, user.Id, StringComparison.Ordinal) &&
            !string.Equals(normalizedRole, UserRoleHelper.Admin, StringComparison.OrdinalIgnoreCase))
        {
            throw new DomainException("Quản trị viên không thể tự hạ quyền Admin của chính mình.");
        }

        var updatedRoles = await UserRoleHelper.AssignRoleAsync(_dbContext, user.Id, normalizedRole, cancellationToken);
        user.SecurityStamp = Guid.NewGuid().ToString();
        user.UpdatedAt = DateTimeOffset.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation(
            "Admin {AdminId} đã cập nhật vai trò của người dùng {TargetUserId} ({Email}) thành {NewRole}.",
            _currentUserService.UserId ?? "system",
            user.Id,
            user.Email,
            normalizedRole);

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
            PrimaryRole = normalizedRole,
            Roles = updatedRoles,
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

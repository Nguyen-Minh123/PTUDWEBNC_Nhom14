using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CulinaryBlog.Application.Features.Users.Commands.UpdateUserStatus;

public class UpdateUserStatusCommandHandler : IRequestHandler<UpdateUserStatusCommand, UserListItemDto>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IValidator<UpdateUserStatusCommand> _validator;
    private readonly ILogger<UpdateUserStatusCommandHandler> _logger;

    public UpdateUserStatusCommandHandler(
        IApplicationDbContext dbContext,
        ICurrentUserService currentUserService,
        IValidator<UpdateUserStatusCommand> validator,
        ILogger<UpdateUserStatusCommandHandler> logger)
    {
        _dbContext = dbContext;
        _currentUserService = currentUserService;
        _validator = validator;
        _logger = logger;
    }

    public async Task<UserListItemDto> Handle(UpdateUserStatusCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

        if (user is null)
        {
            throw new UserNotFoundException(request.UserId);
        }

        // Bảo vệ chống tự khóa tài khoản của chính mình (Self-lockout Guard)
        if (!request.IsActive && string.Equals(_currentUserService.UserId, user.Id, StringComparison.Ordinal))
        {
            throw new DomainException("Quản trị viên không thể tự khóa tài khoản của chính mình.");
        }

        var revokedSessionCount = 0;

        if (request.IsActive)
        {
            user.Activate();
        }
        else
        {
            var lockoutEnd = request.LockoutDays.HasValue
                ? DateTimeOffset.UtcNow.AddDays(request.LockoutDays.Value)
                : DateTimeOffset.UtcNow.AddYears(100);

            user.Deactivate(lockoutEnd);

            // Thu hồi tức thì toàn bộ phiên đăng nhập (RefreshTokens) đang hoạt động của người dùng bị khóa
            var activeTokens = await _dbContext.RefreshTokens
                .Where(rt => rt.UserId == user.Id && !rt.IsRevoked)
                .ToListAsync(cancellationToken);

            foreach (var token in activeTokens)
            {
                token.IsRevoked = true;
            }

            revokedSessionCount = activeTokens.Count;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation(
            "Admin {AdminId} đã cập nhật trạng thái tài khoản {TargetUserId} ({Email}) thành IsActive={IsActive} (RevokedSessions={RevokedCount}, Reason={Reason}).",
            _currentUserService.UserId ?? "system",
            user.Id,
            user.Email,
            request.IsActive,
            revokedSessionCount,
            request.Reason ?? "N/A");

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

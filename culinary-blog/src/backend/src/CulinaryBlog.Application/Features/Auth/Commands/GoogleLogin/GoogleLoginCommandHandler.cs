using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Auth.Commands.GoogleLogin;

public class GoogleLoginCommandHandler : IRequestHandler<GoogleLoginCommand, AuthResponseDto>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IJwtService _jwtService;
    private readonly IGoogleAuthService _googleAuthService;

    public GoogleLoginCommandHandler(IApplicationDbContext dbContext, IJwtService jwtService, IGoogleAuthService googleAuthService)
    {
        _dbContext = dbContext;
        _jwtService = jwtService;
        _googleAuthService = googleAuthService;
    }

    public async Task<AuthResponseDto> Handle(GoogleLoginCommand request, CancellationToken cancellationToken)
    {
        // 1. Verify Google Token
        var payload = await _googleAuthService.ValidateTokenAsync(request.IdToken);

        // 2. Check if user exists
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email == payload.Email, cancellationToken);

        List<string> roles;
        if (user == null)
        {
            // 3. Create new user
            user = new ApplicationUser(payload.Email, payload.Name);
            user.SetAvatarUrl(payload.Picture);
            user.EmailConfirmed = true; // Social login means email is verified

            _dbContext.Users.Add(user);
            roles = await UserRoleHelper.AssignRoleAsync(_dbContext, user.Id, UserRoleHelper.Author, cancellationToken);
        }
        else
        {
            if (user.IsLockedOut)
            {
                throw new ForbiddenAccessException("Tài khoản của bạn đã bị khóa hoặc vô hiệu hóa bởi Quản trị viên.");
            }

            if (string.IsNullOrEmpty(user.AvatarUrl))
            {
                user.SetAvatarUrl(payload.Picture);
            }

            roles = await UserRoleHelper.GetUserRolesAsync(_dbContext, user, cancellationToken);
        }

        // 4. Generate Tokens
        var accessToken = _jwtService.GenerateAccessToken(user, roles);
        var refreshToken = _jwtService.GenerateRefreshToken();

        var rtEntity = new RefreshToken
        {
            Token = refreshToken,
            UserId = user.Id,
            ExpiresAt = DateTime.UtcNow.AddDays(7)
        };
        _dbContext.RefreshTokens.Add(rtEntity);

        await _dbContext.SaveChangesAsync(cancellationToken);

        var profileDto = user.Adapt<UserProfileDto>();
        profileDto.Roles = roles;
        profileDto.IsActive = user.IsActive;

        // 5. Return Response
        return new AuthResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            User = profileDto
        };
    }
}

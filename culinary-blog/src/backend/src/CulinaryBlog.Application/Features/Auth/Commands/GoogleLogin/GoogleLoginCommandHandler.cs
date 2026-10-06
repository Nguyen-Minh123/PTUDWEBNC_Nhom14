using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Entities;
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

        if (user == null)
        {
            // 3. Create new user
            user = new ApplicationUser(payload.Email, payload.Name);
            user.SetAvatarUrl(payload.Picture);
            user.EmailConfirmed = true; // Social login means email is verified

            _dbContext.Users.Add(user);
        }
        else
        {
            // Optional: update avatar if not set
            if (string.IsNullOrEmpty(user.AvatarUrl))
            {
                user.SetAvatarUrl(payload.Picture);
            }
        }

        // 4. Generate Tokens
        var roles = new List<string> { "User" }; // Add default role or fetch from db
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

        // 5. Return Response
        return new AuthResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            User = user.Adapt<UserProfileDto>()
        };
    }
}

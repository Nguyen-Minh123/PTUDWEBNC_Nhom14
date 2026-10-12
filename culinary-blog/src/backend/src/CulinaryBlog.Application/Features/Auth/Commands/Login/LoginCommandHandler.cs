using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Auth.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthResponseDto>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IJwtService _jwtService;
    private readonly IPasswordHasherService _passwordHasher;

    public LoginCommandHandler(
        IApplicationDbContext dbContext,
        IJwtService jwtService,
        IPasswordHasherService passwordHasher)
    {
        _dbContext = dbContext;
        _jwtService = jwtService;
        _passwordHasher = passwordHasher;
    }

    public async Task<AuthResponseDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);

        if (user == null)
        {
            throw new InvalidCredentialsException();
        }

        if (string.IsNullOrEmpty(user.PasswordHash) || !_passwordHasher.VerifyPassword(user, user.PasswordHash, request.Password))
        {
            throw new InvalidCredentialsException();
        }

        var roles = new List<string> { "Author", "User" };
        if (user.Email is not null && user.Email.Contains("admin", StringComparison.OrdinalIgnoreCase))
        {
            roles.Add("Admin");
        }

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

        return new AuthResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            User = user.Adapt<UserProfileDto>()
        };
    }
}

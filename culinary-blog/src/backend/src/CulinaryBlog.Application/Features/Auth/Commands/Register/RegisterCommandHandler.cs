using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Auth.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResponseDto>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IJwtService _jwtService;
    private readonly IPasswordHasherService _passwordHasher;

    public RegisterCommandHandler(
        IApplicationDbContext dbContext,
        IJwtService jwtService,
        IPasswordHasherService passwordHasher)
    {
        _dbContext = dbContext;
        _jwtService = jwtService;
        _passwordHasher = passwordHasher;
    }

    public async Task<AuthResponseDto> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var existingUser = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);

        if (existingUser != null)
        {
            throw new UserAlreadyExistsException(request.Email);
        }

        var user = new ApplicationUser(email, request.DisplayName);
        if (!string.IsNullOrWhiteSpace(request.FirstName)) user.FirstName = request.FirstName.Trim();
        if (!string.IsNullOrWhiteSpace(request.LastName)) user.LastName = request.LastName.Trim();

        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);
        user.EmailConfirmed = true;

        _dbContext.Users.Add(user);

        var roles = new List<string> { "Author", "User" };
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

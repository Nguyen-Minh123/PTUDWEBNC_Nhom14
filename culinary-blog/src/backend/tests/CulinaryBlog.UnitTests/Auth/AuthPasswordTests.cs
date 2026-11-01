using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Application.Features.Auth.Commands.ChangePassword;
using CulinaryBlog.Application.Features.Auth.Commands.ForgotPassword;
using CulinaryBlog.Application.Features.Auth.Commands.ResetPassword;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using CulinaryBlog.Infrastructure.Persistence;
using CulinaryBlog.Infrastructure.Services;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace CulinaryBlog.UnitTests.Auth;

public class AuthPasswordTests
{
    private readonly IConfiguration _configuration;
    private readonly IPasswordResetTokenService _tokenService;
    private readonly IPasswordHasherService _passwordHasher;

    public AuthPasswordTests()
    {
        var configBuilder = new ConfigurationBuilder();
        configBuilder.AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["Jwt:SigningKey"] = "test-secret-key-that-is-at-least-32-bytes-long-1234567890"
        });
        _configuration = configBuilder.Build();
        _tokenService = new PasswordResetTokenService(_configuration);
        _passwordHasher = new PasswordHasherService();
    }

    private CulinaryBlogDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<CulinaryBlogDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new TestCulinaryBlogDbContext(options);
    }

    private sealed class TestCulinaryBlogDbContext(DbContextOptions<CulinaryBlogDbContext> options)
        : CulinaryBlogDbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Recipe>().Ignore(x => x.SearchVector);
        }
    }

    private class MockCurrentUserService : ICurrentUserService
    {
        public string? UserId { get; set; }
        public string? Email { get; set; }
        public string? DisplayName { get; set; }
        public bool IsAuthenticated => !string.IsNullOrEmpty(UserId);
        public bool IsInRole(string role) => true;
    }

    [Fact]
    public void TokenService_GenerateAndValidate_ShouldSucceed()
    {
        var user = new ApplicationUser("chef@example.com", "Chef");
        user.PasswordHash = _passwordHasher.HashPassword(user, "OldPassword123!");
        user.SecurityStamp = Guid.NewGuid().ToString();

        var token = _tokenService.GenerateToken(user, TimeSpan.FromMinutes(10));
        Assert.False(string.IsNullOrWhiteSpace(token));

        var isValid = _tokenService.ValidateToken(user, token);
        Assert.True(isValid);
    }

    [Fact]
    public void TokenService_ValidateToken_ShouldFailWhenSecurityStampChanged()
    {
        var user = new ApplicationUser("chef@example.com", "Chef");
        user.PasswordHash = _passwordHasher.HashPassword(user, "OldPassword123!");
        user.SecurityStamp = Guid.NewGuid().ToString();

        var token = _tokenService.GenerateToken(user, TimeSpan.FromMinutes(10));

        // Giả lập người dùng đã đổi mật khẩu làm thay đổi SecurityStamp
        user.SecurityStamp = Guid.NewGuid().ToString();

        var isValid = _tokenService.ValidateToken(user, token);
        Assert.False(isValid, "Token cũ phải bị vô hiệu hóa khi SecurityStamp thay đổi!");
    }

    [Fact]
    public async Task ForgotPassword_ShouldReturnResetToken_WhenUserExists()
    {
        using var dbContext = CreateDbContext();
        var user = new ApplicationUser("baker@example.com", "Baker");
        user.PasswordHash = _passwordHasher.HashPassword(user, "Password123!");
        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();

        var handler = new ForgotPasswordCommandHandler(
            dbContext,
            _tokenService,
            new ForgotPasswordCommandValidator(),
            NullLogger<ForgotPasswordCommandHandler>.Instance);

        var result = await handler.Handle(new ForgotPasswordCommand("baker@example.com"), CancellationToken.None);

        Assert.NotNull(result);
        Assert.NotNull(result.ResetToken);
        Assert.True(_tokenService.ValidateToken(user, result.ResetToken!));
    }

    [Fact]
    public async Task ResetPassword_ShouldUpdatePasswordHash_WhenTokenValid()
    {
        using var dbContext = CreateDbContext();
        var user = new ApplicationUser("tester@example.com", "Tester");
        var oldHash = _passwordHasher.HashPassword(user, "OldPassword123!");
        user.PasswordHash = oldHash;
        user.SecurityStamp = Guid.NewGuid().ToString();
        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();

        var token = _tokenService.GenerateToken(user, TimeSpan.FromMinutes(15));

        var handler = new ResetPasswordCommandHandler(
            dbContext,
            _tokenService,
            _passwordHasher,
            new ResetPasswordCommandValidator(),
            NullLogger<ResetPasswordCommandHandler>.Instance);

        var command = new ResetPasswordCommand(
            "tester@example.com",
            token,
            "NewSecret@2026",
            "NewSecret@2026");

        var response = await handler.Handle(command, CancellationToken.None);

        Assert.NotNull(response);
        var updatedUser = await dbContext.Users.FirstAsync(u => u.Email == "tester@example.com");
        Assert.NotEqual(oldHash, updatedUser.PasswordHash);
        Assert.True(_passwordHasher.VerifyPassword(updatedUser, updatedUser.PasswordHash!, "NewSecret@2026"));

        // Token cũ không còn hợp lệ nữa
        Assert.False(_tokenService.ValidateToken(updatedUser, token));
    }

    [Fact]
    public async Task ChangePassword_ShouldSucceed_WhenCurrentPasswordIsCorrect()
    {
        using var dbContext = CreateDbContext();
        var user = new ApplicationUser("user@example.com", "User");
        user.PasswordHash = _passwordHasher.HashPassword(user, "CurrentSecret123!");
        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();

        var currentUserService = new MockCurrentUserService { UserId = user.Id, Email = user.Email };

        var handler = new ChangePasswordCommandHandler(
            dbContext,
            currentUserService,
            _passwordHasher,
            new ChangePasswordCommandValidator(),
            NullLogger<ChangePasswordCommandHandler>.Instance);

        var command = new ChangePasswordCommand(
            "CurrentSecret123!",
            "NewSecret123@#",
            "NewSecret123@#");

        var response = await handler.Handle(command, CancellationToken.None);
        Assert.NotNull(response);

        var updatedUser = await dbContext.Users.FirstAsync(u => u.Id == user.Id);
        Assert.True(_passwordHasher.VerifyPassword(updatedUser, updatedUser.PasswordHash!, "NewSecret123@#"));
    }

    [Fact]
    public async Task ChangePassword_ShouldThrowInvalidCredentials_WhenCurrentPasswordIncorrect()
    {
        using var dbContext = CreateDbContext();
        var user = new ApplicationUser("user2@example.com", "User2");
        user.PasswordHash = _passwordHasher.HashPassword(user, "CurrentSecret123!");
        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();

        var currentUserService = new MockCurrentUserService { UserId = user.Id, Email = user.Email };

        var handler = new ChangePasswordCommandHandler(
            dbContext,
            currentUserService,
            _passwordHasher,
            new ChangePasswordCommandValidator(),
            NullLogger<ChangePasswordCommandHandler>.Instance);

        var command = new ChangePasswordCommand(
            "WrongCurrentPassword!",
            "NewSecret123@#",
            "NewSecret123@#");

        await Assert.ThrowsAsync<InvalidCredentialsException>(() => handler.Handle(command, CancellationToken.None));
    }
}

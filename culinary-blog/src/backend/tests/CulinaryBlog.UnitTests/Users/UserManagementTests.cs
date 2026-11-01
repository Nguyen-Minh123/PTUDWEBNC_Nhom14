using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Application.Features.Users.Commands.UpdateUserRole;
using CulinaryBlog.Application.Features.Users.Commands.UpdateUserStatus;
using CulinaryBlog.Application.Features.Users.Queries.GetAuthors;
using CulinaryBlog.Application.Features.Users.Queries.GetUsers;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using CulinaryBlog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace CulinaryBlog.UnitTests.Users;

public class UserManagementTests
{
    private static CulinaryBlogDbContext CreateDbContext()
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

    private sealed class MockCurrentUserService : ICurrentUserService
    {
        public string? UserId { get; set; }
        public string? Email { get; set; }
        public string? DisplayName { get; set; }
        public bool IsAuthenticated => !string.IsNullOrEmpty(UserId);
        public bool IsInRole(string role) => string.Equals(role, "Admin", StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task GetUsersQuery_ShouldReturnPagedAndFilteredUsersWithRecipeCounts()
    {
        await using var dbContext = CreateDbContext();
        var seeder = new RecipeDataSeeder(dbContext);
        await seeder.SeedAsync();

        var handler = new GetUsersQueryHandler(dbContext);

        var allResult = await handler.Handle(new GetUsersQuery(PageNumber: 1, PageSize: 10), CancellationToken.None);
        Assert.Equal(5, allResult.TotalCount);
        Assert.Contains(allResult.Items, u => u.Id == "seeder-user-id" && u.PublishedRecipeCount == 25);

        var adminOnly = await handler.Handle(new GetUsersQuery(Role: "Admin"), CancellationToken.None);
        Assert.Single(adminOnly.Items);
        Assert.Equal("admin@culinary.com", adminOnly.Items[0].Email);
        Assert.Equal("Admin", adminOnly.Items[0].PrimaryRole);
    }

    [Fact]
    public async Task GetAuthorsQuery_ShouldReturnActiveAuthorsSortedByPublishedRecipes()
    {
        await using var dbContext = CreateDbContext();
        var seeder = new RecipeDataSeeder(dbContext);
        await seeder.SeedAsync();

        var handler = new GetAuthorsQueryHandler(dbContext);

        var authorsResult = await handler.Handle(new GetAuthorsQuery(PageNumber: 1, PageSize: 12), CancellationToken.None);

        Assert.NotEmpty(authorsResult.Items);
        Assert.Equal("seeder-user-id", authorsResult.Items[0].Id);
        Assert.Equal(25, authorsResult.Items[0].PublishedRecipeCount);
    }

    [Fact]
    public async Task UpdateUserRoleCommand_ShouldAssignNewRole_AndPreventSelfDemotion()
    {
        await using var dbContext = CreateDbContext();
        var adminUser = new ApplicationUser("admin@culinary.com", "Admin User") { Id = "admin-1" };
        var normalUser = new ApplicationUser("member@culinary.com", "Member User") { Id = "user-1" };

        dbContext.Users.AddRange(adminUser, normalUser);
        await UserRoleHelper.AssignRoleAsync(dbContext, adminUser.Id, "Admin");
        await UserRoleHelper.AssignRoleAsync(dbContext, normalUser.Id, "User");
        await dbContext.SaveChangesAsync();

        var currentUser = new MockCurrentUserService { UserId = adminUser.Id, Email = adminUser.Email };
        var handler = new UpdateUserRoleCommandHandler(
            dbContext,
            currentUser,
            new UpdateUserRoleCommandValidator(),
            NullLogger<UpdateUserRoleCommandHandler>.Instance);

        var updatedDto = await handler.Handle(new UpdateUserRoleCommand(normalUser.Id, "Author"), CancellationToken.None);
        Assert.Equal("Author", updatedDto.PrimaryRole);
        Assert.Contains("Author", updatedDto.Roles);

        // Admin không được tự hạ quyền Admin của chính mình
        await Assert.ThrowsAsync<DomainException>(() =>
            handler.Handle(new UpdateUserRoleCommand(adminUser.Id, "User"), CancellationToken.None));
    }

    [Fact]
    public async Task UpdateUserStatusCommand_ShouldLockAccount_AndRevokeAllActiveRefreshTokensImmediately()
    {
        await using var dbContext = CreateDbContext();
        var adminUser = new ApplicationUser("admin@culinary.com", "Admin User") { Id = "admin-1" };
        var targetUser = new ApplicationUser("chef@culinary.com", "Chef User") { Id = "chef-1" };

        dbContext.Users.AddRange(adminUser, targetUser);
        dbContext.RefreshTokens.AddRange(
            new RefreshToken
            {
                Token = "session-token-1",
                UserId = targetUser.Id,
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                IsRevoked = false
            },
            new RefreshToken
            {
                Token = "session-token-2",
                UserId = targetUser.Id,
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                IsRevoked = false
            });
        await dbContext.SaveChangesAsync();

        var currentUser = new MockCurrentUserService { UserId = adminUser.Id, Email = adminUser.Email };
        var handler = new UpdateUserStatusCommandHandler(
            dbContext,
            currentUser,
            new UpdateUserStatusCommandValidator(),
            NullLogger<UpdateUserStatusCommandHandler>.Instance);

        // 1. Khóa tài khoản targetUser
        var lockedDto = await handler.Handle(
            new UpdateUserStatusCommand(targetUser.Id, IsActive: false, LockoutDays: 30, Reason: "Vi phạm quy định cộng đồng"),
            CancellationToken.None);

        Assert.False(lockedDto.IsActive);
        Assert.True(lockedDto.IsLockedOut);
        Assert.NotNull(lockedDto.LockoutEnd);

        // Kiểm tra toàn bộ RefreshToken của targetUser đã bị thu hồi tức thì
        var tokens = await dbContext.RefreshTokens.Where(rt => rt.UserId == targetUser.Id).ToListAsync();
        Assert.Equal(2, tokens.Count);
        Assert.All(tokens, t => Assert.True(t.IsRevoked));

        // 2. Mở khóa lại tài khoản targetUser
        var unlockedDto = await handler.Handle(
            new UpdateUserStatusCommand(targetUser.Id, IsActive: true),
            CancellationToken.None);

        Assert.True(unlockedDto.IsActive);
        Assert.False(unlockedDto.IsLockedOut);
        Assert.Null(unlockedDto.LockoutEnd);

        // 3. Admin không được tự khóa tài khoản của chính mình
        await Assert.ThrowsAsync<DomainException>(() =>
            handler.Handle(new UpdateUserStatusCommand(adminUser.Id, IsActive: false), CancellationToken.None));
    }
}

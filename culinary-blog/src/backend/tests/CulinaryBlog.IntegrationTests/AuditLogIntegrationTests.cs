using System.Net;
using System.Text.Json;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CulinaryBlog.IntegrationTests;

public sealed class AuditLogAuthorizationIntegrationTests
    : IClassFixture<RecipeAuthorizationWebApplicationFactory>
{
    private readonly HttpClient _client;

    public AuditLogAuthorizationIntegrationTests(RecipeAuthorizationWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Anonymous_user_cannot_query_audit_logs()
    {
        using var response = await _client.GetAsync("/api/v1/audit-logs");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Non_admin_user_cannot_query_audit_logs()
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, "/api/v1/audit-logs");
        request.Headers.Add(TestAuthHandler.UserIdHeader, "audit-test-author");
        request.Headers.Add(TestAuthHandler.RoleHeader, "Author");

        using var response = await _client.SendAsync(request);

        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }

    [Theory]
    [InlineData("/api/v1/audit-logs?page=0")]
    [InlineData("/api/v1/audit-logs?pageSize=101")]
    [InlineData("/api/v1/audit-logs?action=Unknown")]
    [InlineData("/api/v1/audit-logs?fromUtc=2026-11-02T00:00:00Z&toUtc=2026-11-01T00:00:00Z")]
    public async Task Admin_receives_validation_problem_for_invalid_query(string path)
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, path);
        request.Headers.Add(TestAuthHandler.UserIdHeader, "audit-test-admin");
        request.Headers.Add(TestAuthHandler.RoleHeader, "Admin");

        using var response = await _client.SendAsync(request);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal("application/problem+json", response.Content.Headers.ContentType?.MediaType);
    }
}

public sealed class AuditLogDatabaseIntegrationTests
{
    [Fact]
    public async Task SaveChanges_writes_added_modified_and_soft_deleted_audit_records()
    {
        using var factory = new AuditLogDatabaseWebApplicationFactory();
        await using var scope = factory.Services.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<CulinaryBlogDbContext>();
        await dbContext.Database.MigrateAsync();

        var category = new Category($"audit-test-{Guid.NewGuid():N}");
        dbContext.Categories.Add(category);

        try
        {
            await dbContext.SaveChangesAsync();

            var addedLog = await FindCategoryLogAsync(
                dbContext,
                category.Id,
                "Added");

            Assert.Null(addedLog.ActorId);
            Assert.Null(addedLog.OldValues);
            using (var newValues = JsonDocument.Parse(addedLog.NewValues!))
            {
                Assert.Equal(category.Name, newValues.RootElement.GetProperty("Name").GetString());
            }

            category.SetOrderIndex(7);
            await dbContext.SaveChangesAsync();
            var modifiedLog = await FindCategoryLogAsync(
                dbContext,
                category.Id,
                "Modified");

            using (var oldValues = JsonDocument.Parse(modifiedLog.OldValues!))
            using (var newValues = JsonDocument.Parse(modifiedLog.NewValues!))
            {
                Assert.Equal(0, oldValues.RootElement.GetProperty("OrderIndex").GetInt32());
                Assert.Equal(7, newValues.RootElement.GetProperty("OrderIndex").GetInt32());
            }

            dbContext.Categories.Remove(category);
            await dbContext.SaveChangesAsync();

            var categoryLogs = await dbContext.AuditLogs
                .Where(log => log.EntityName == nameof(Category) && log.EntityId == category.Id.ToString())
                .OrderBy(log => log.OccurredAtUtc)
                .ToListAsync();
            Assert.True(
                await dbContext.Categories.IgnoreQueryFilters()
                    .AnyAsync(entity => entity.Id == category.Id && entity.IsDeleted),
                "The soft-delete interceptor must preserve the category and mark it deleted.");
            Assert.Contains(
                categoryLogs,
                log => log.Action == "SoftDeleted");
            var softDeletedLog = categoryLogs.Single(log => log.Action == "SoftDeleted");

            using (var oldValues = JsonDocument.Parse(softDeletedLog.OldValues!))
            using (var newValues = JsonDocument.Parse(softDeletedLog.NewValues!))
            {
                Assert.False(oldValues.RootElement.GetProperty("IsDeleted").GetBoolean());
                Assert.True(newValues.RootElement.GetProperty("IsDeleted").GetBoolean());
            }

            var categoryLogCount = await dbContext.AuditLogs
                .CountAsync(log => log.EntityName == nameof(Category) && log.EntityId == category.Id.ToString());
            Assert.Equal(3, categoryLogCount);
        }
        finally
        {
            dbContext.ChangeTracker.Clear();
            await dbContext.AuditLogs
                .Where(log => log.EntityName == nameof(Category) && log.EntityId == category.Id.ToString())
                .ExecuteDeleteAsync();
            await dbContext.Categories
                .IgnoreQueryFilters()
                .Where(entity => entity.Id == category.Id)
                .ExecuteDeleteAsync();
        }
    }

    [Fact]
    public async Task Admin_can_filter_and_page_audit_logs()
    {
        using var factory = new AuditLogDatabaseWebApplicationFactory();
        using var client = factory.CreateClient();
        await using var scope = factory.Services.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<CulinaryBlogDbContext>();
        await dbContext.Database.MigrateAsync();

        var actorId = $"audit-test-{Guid.NewGuid():N}";
        var entityId = Guid.NewGuid().ToString();
        var now = DateTimeOffset.UtcNow;
        var olderLog = new AuditLog
        {
            OccurredAtUtc = now.AddMinutes(-2),
            ActorId = actorId,
            Action = "Added",
            EntityName = nameof(Category),
            EntityId = entityId,
            NewValues = """{"Name":"Before"}"""
        };
        var newerLog = new AuditLog
        {
            OccurredAtUtc = now,
            ActorId = actorId,
            Action = "Modified",
            EntityName = nameof(Category),
            EntityId = entityId,
            OldValues = """{"Name":"Before"}""",
            NewValues = """{"Name":"After"}"""
        };
        dbContext.AuditLogs.AddRange(olderLog, newerLog);

        try
        {
            await dbContext.SaveChangesAsync();

            using var request = new HttpRequestMessage(
                HttpMethod.Get,
                $"/api/v1/audit-logs?actorId={Uri.EscapeDataString(actorId)}&entityName=Category&page=1&pageSize=1");
            request.Headers.Add(TestAuthHandler.UserIdHeader, "audit-test-admin");
            request.Headers.Add(TestAuthHandler.RoleHeader, "Admin");

            using var response = await client.SendAsync(request);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            using var body = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
            var result = body.RootElement;

            Assert.Equal(2, result.GetProperty("totalCount").GetInt32());
            Assert.Equal(1, result.GetProperty("page").GetInt32());
            Assert.Equal(1, result.GetProperty("pageSize").GetInt32());

            var items = result.GetProperty("items");
            Assert.Equal(1, items.GetArrayLength());
            Assert.Equal(newerLog.Id.ToString(), items[0].GetProperty("id").GetString());
            Assert.Equal(JsonValueKind.Object, items[0].GetProperty("oldValues").ValueKind);
            Assert.Equal("After", items[0].GetProperty("newValues").GetProperty("Name").GetString());

            using var actionRequest = new HttpRequestMessage(
                HttpMethod.Get,
                $"/api/v1/audit-logs?actorId={Uri.EscapeDataString(actorId)}&action=added");
            actionRequest.Headers.Add(TestAuthHandler.UserIdHeader, "audit-test-admin");
            actionRequest.Headers.Add(TestAuthHandler.RoleHeader, "Admin");

            using var actionResponse = await client.SendAsync(actionRequest);
            Assert.Equal(HttpStatusCode.OK, actionResponse.StatusCode);
            using var actionBody = await JsonDocument.ParseAsync(await actionResponse.Content.ReadAsStreamAsync());
            Assert.Equal(1, actionBody.RootElement.GetProperty("totalCount").GetInt32());
            Assert.Equal(olderLog.Id.ToString(), actionBody.RootElement.GetProperty("items")[0].GetProperty("id").GetString());
        }
        finally
        {
            dbContext.ChangeTracker.Clear();
            await dbContext.AuditLogs
                .Where(log => log.ActorId == actorId)
                .ExecuteDeleteAsync();
        }
    }

    private static Task<AuditLog> FindCategoryLogAsync(
        CulinaryBlogDbContext dbContext,
        Guid categoryId,
        string action) =>
        dbContext.AuditLogs.SingleAsync(log =>
            log.EntityName == nameof(Category)
            && log.EntityId == categoryId.ToString()
            && log.Action == action);
}

internal sealed class AuditLogDatabaseWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
            ?? throw new InvalidOperationException(
                "Set ConnectionStrings__DefaultConnection to an isolated PostgreSQL test database before running audit log database integration tests.");

        builder.UseEnvironment("Testing");
        builder.UseSetting("Jwt:Issuer", "culinary-blog-audit-tests");
        builder.UseSetting("Jwt:Audience", "culinary-blog-audit-tests");
        builder.UseSetting("Jwt:SigningKey", "audit-log-integration-test-signing-key-at-least-32-bytes");
        builder.UseSetting("ConnectionStrings:DefaultConnection", connectionString);

        builder.ConfigureTestServices(services =>
        {
            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = TestAuthHandler.SchemeName;
                    options.DefaultChallengeScheme = TestAuthHandler.SchemeName;
                    options.DefaultScheme = TestAuthHandler.SchemeName;
                })
                .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>(
                    TestAuthHandler.SchemeName,
                    _ => { });
        });
    }
}

using System.Net;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using CulinaryBlog.API;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Models;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Application.Features.Recipes.Commands;
using CulinaryBlog.Application.Features.Recipes.Queries.GetRecipeBySlug;
using CulinaryBlog.Application.Features.Recipes.Queries.SearchRecipes;
using CulinaryBlog.Application.Recipes.Commands.DeleteRecipe;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CulinaryBlog.IntegrationTests;

public sealed class RecipeAuthorizationMatrixTests
    : IClassFixture<RecipeAuthorizationWebApplicationFactory>
{
    private const string OwnerId = "recipe-owner";
    private const string OtherUserId = "another-user";

    private readonly RecipeAuthorizationWebApplicationFactory _factory;
    private readonly HttpClient _client;

    public RecipeAuthorizationMatrixTests(RecipeAuthorizationWebApplicationFactory factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    public static TheoryData<string, int> MutationCases => new()
    {
        { "create", (int)HttpStatusCode.Created },
        { "update", (int)HttpStatusCode.OK },
        { "publish", (int)HttpStatusCode.OK },
        { "archive", (int)HttpStatusCode.OK },
        { "delete", (int)HttpStatusCode.NoContent }
    };

    public static TheoryData<string> MutationNames => new()
    {
        "create",
        "update",
        "publish",
        "archive",
        "delete"
    };

    public static TheoryData<string> ResourceMutationCases => new()
    {
        "update",
        "publish",
        "archive",
        "delete"
    };

    public static TheoryData<string, int> PublicReadCases => new()
    {
        { "list", (int)HttpStatusCode.OK },
        { "detail", (int)HttpStatusCode.OK },
        { "search", (int)HttpStatusCode.OK },
        { "slug", (int)HttpStatusCode.NotFound }
    };

    [Theory]
    [MemberData(nameof(PublicReadCases))]
    public async Task Anonymous_can_reach_public_recipe_reads(string readCase, int expectedStatus)
    {
        using var response = await _client.SendAsync(CreateReadRequest(readCase));

        Assert.Equal((HttpStatusCode)expectedStatus, response.StatusCode);
    }

    [Theory]
    [MemberData(nameof(MutationNames))]
    public async Task Anonymous_cannot_mutate_recipes(string mutation)
    {
        using var request = CreateMutationRequest(mutation);
        using var response = await _client.SendAsync(request);

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Theory]
    [MemberData(nameof(MutationCases))]
    public async Task Owner_can_perform_recipe_mutations(string mutation, int expectedStatus)
    {
        using var request = CreateMutationRequest(mutation, OwnerId);
        using var response = await _client.SendAsync(request);

        Assert.Equal((HttpStatusCode)expectedStatus, response.StatusCode);

        if (mutation == "create")
        {
            using var responseBody = await response.Content.ReadAsStreamAsync();
            using var json = await JsonDocument.ParseAsync(responseBody);
            Assert.Equal(OwnerId, json.RootElement.GetProperty("authorId").GetString());
        }
    }

    [Theory]
    [MemberData(nameof(ResourceMutationCases))]
    public async Task Other_users_cannot_mutate_a_recipe(string mutation)
    {
        using var request = CreateMutationRequest(mutation, OtherUserId);
        using var response = await _client.SendAsync(request);

        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }

    [Theory]
    [MemberData(nameof(ResourceMutationCases))]
    public async Task Admin_can_mutate_another_users_recipe(string mutation)
    {
        using var request = CreateMutationRequest(mutation, OtherUserId, "Admin");
        using var response = await _client.SendAsync(request);

        var expectedStatus = mutation == "delete" ? HttpStatusCode.NoContent : HttpStatusCode.OK;
        Assert.Equal(expectedStatus, response.StatusCode);
    }

    private HttpRequestMessage CreateReadRequest(string readCase)
    {
        var recipeId = _factory.Recipe.Id;
        var (path, method) = readCase switch
        {
            "list" => ("/api/v1/recipes", HttpMethod.Get),
            "detail" => ($"/api/v1/recipes/{recipeId}", HttpMethod.Get),
            "search" => ("/api/v1/recipes/search?q=pho&page=1&pageSize=10", HttpMethod.Get),
            "slug" => ("/api/v1/recipes/not-a-real-recipe", HttpMethod.Get),
            _ => throw new ArgumentOutOfRangeException(nameof(readCase), readCase, "Unknown read scenario.")
        };

        return new HttpRequestMessage(method, path);
    }

    private HttpRequestMessage CreateMutationRequest(
        string mutation,
        string? userId = null,
        string? role = null)
    {
        var recipeId = _factory.Recipe.Id;
        var (path, method) = mutation switch
        {
            "create" => ("/api/v1/recipes", HttpMethod.Post),
            "update" => ($"/api/v1/recipes/{recipeId}", HttpMethod.Put),
            "publish" => ($"/api/v1/recipes/{recipeId}/publish", HttpMethod.Post),
            "archive" => ($"/api/v1/recipes/{recipeId}/archive", HttpMethod.Post),
            "delete" => ($"/api/v1/recipes/{recipeId}", HttpMethod.Delete),
            _ => throw new ArgumentOutOfRangeException(nameof(mutation), mutation, "Unknown mutation scenario.")
        };

        var request = new HttpRequestMessage(method, path);
        if (userId is not null)
        {
            request.Headers.Add(TestAuthHandler.UserIdHeader, userId);
        }

        if (role is not null)
        {
            request.Headers.Add(TestAuthHandler.RoleHeader, role);
        }

        if (mutation is "create" or "update")
        {
            var categoryId = _factory.Recipe.CategoryId;
            var idProperty = mutation == "update" ? $""" "id": "{recipeId}", """ : string.Empty;
            var body = $$"""
                {
                  {{idProperty}}
                  "title": "Authorization matrix test recipe",
                  "slug": "authorization-matrix-test",
                  "description": "A test recipe for authorization integration tests.",
                  "instructions": "Prepare and serve.",
                  "prepTime": 10,
                  "cookTime": 15,
                  "servings": 2,
                  "difficulty": 1,
                  "categoryId": "{{categoryId}}",
                  "authorId": "untrusted-client-author"
                }
                """;

            request.Content = new StringContent(body, Encoding.UTF8, "application/json");
        }

        return request;
    }
}

public sealed class RecipeAuthorizationWebApplicationFactory : WebApplicationFactory<Program>
{
    private readonly RecipeRepositoryStub _recipeRepository = new();

    public Recipe Recipe => _recipeRepository.Recipe;

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.UseSetting("Jwt:Issuer", "culinary-blog-integration-tests");
        builder.UseSetting("Jwt:Audience", "culinary-blog-integration-tests");
        builder.UseSetting("Jwt:SigningKey", "integration-test-signing-key-with-at-least-32-bytes");
        builder.UseSetting(
            "ConnectionStrings:DefaultConnection",
            "Host=localhost;Port=5432;Database=unused;Username=unused;Password=unused");
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

            services.RemoveAll<IUnitOfWork>();
            services.AddSingleton<IUnitOfWork>(new UnitOfWorkStub(_recipeRepository));
            services.RemoveAll<ISender>();
            services.AddSingleton<ISender>(new RecipeSenderStub(Recipe));
        });
    }
}

public sealed class TestAuthHandler(
    IOptionsMonitor<AuthenticationSchemeOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder)
    : AuthenticationHandler<AuthenticationSchemeOptions>(options, logger, encoder)
{
    public const string SchemeName = "IntegrationTest";
    public const string UserIdHeader = "X-Test-User";
    public const string RoleHeader = "X-Test-Role";

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.TryGetValue(UserIdHeader, out var userId))
        {
            return Task.FromResult(AuthenticateResult.NoResult());
        }

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, userId.ToString()),
            new("sub", userId.ToString())
        };

        if (Request.Headers.TryGetValue(RoleHeader, out var role))
        {
            claims.Add(new Claim("role", role.ToString()));
        }

        var identity = new ClaimsIdentity(claims, Scheme.Name, "name", "role");
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);
        return Task.FromResult(AuthenticateResult.Success(ticket));
    }
}

internal sealed class UnitOfWorkStub(IRecipeRepository recipes) : IUnitOfWork
{
    public IRecipeRepository Recipes { get; } = recipes;

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) =>
        Task.FromResult(0);
}

internal sealed class RecipeRepositoryStub : IRecipeRepository
{
    private static readonly Guid CategoryId = Guid.Parse("4d56e5ef-5b45-4333-b146-0e770d8d1906");

    public Recipe Recipe { get; } = new(
        "Authorization matrix recipe",
        "authorization-matrix-recipe",
        "Recipe used in authorization integration tests.",
        "Prepare and serve.",
        10,
        15,
        2,
        RecipeDifficulty.Easy,
        CategoryId,
        "recipe-owner");

    public Task<Recipe?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
        Task.FromResult(id == Recipe.Id ? Recipe : null);

    public Task<Recipe?> GetByIdWithDetailsAsync(Guid id, CancellationToken cancellationToken = default) =>
        GetByIdAsync(id, cancellationToken);

    public Task<Recipe?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default) =>
        Task.FromResult(slug == Recipe.Slug ? Recipe : null);

    public Task<Recipe?> GetBySlugWithDetailsAsync(string slug, CancellationToken cancellationToken = default) =>
        GetBySlugAsync(slug, cancellationToken);

    public Task<bool> SlugExistsAsync(
        string slug,
        Guid? excludeRecipeId = null,
        CancellationToken cancellationToken = default) =>
        Task.FromResult(slug == Recipe.Slug && excludeRecipeId != Recipe.Id);

    public Task AddAsync(Recipe recipe, CancellationToken cancellationToken = default) =>
        Task.CompletedTask;

    public void Update(Recipe recipe)
    {
    }

    public void Remove(Recipe recipe)
    {
    }

    public Task<IReadOnlyList<Recipe>> GetPagedAsync(
        int page,
        int pageSize,
        Guid? categoryId = null,
        RecipeStatus? status = null,
        string? keyword = null,
        CancellationToken cancellationToken = default) =>
        Task.FromResult<IReadOnlyList<Recipe>>([Recipe]);

    public Task<int> CountAsync(
        Guid? categoryId = null,
        RecipeStatus? status = null,
        string? keyword = null,
        CancellationToken cancellationToken = default) =>
        Task.FromResult(1);
}

internal sealed class RecipeSenderStub(Recipe existingRecipe) : ISender
{
    public Task<TResponse> Send<TResponse>(
        IRequest<TResponse> request,
        CancellationToken cancellationToken = default)
    {
        object? response = request switch
        {
            CreateRecipeCommand create => new Recipe(
                create.Title,
                create.Slug,
                create.Description,
                create.Instructions,
                create.PrepTime,
                create.CookTime,
                create.Servings,
                create.Difficulty,
                create.CategoryId,
                create.AuthorId,
                create.Nutrition),
            UpdateRecipeCommand => existingRecipe,
            PublishRecipeCommand => existingRecipe,
            ArchiveRecipeCommand => existingRecipe,
            DeleteRecipeCommand => true,
            SearchRecipesQuery search => new PaginatedResult<RecipeSummaryDto>(
                [],
                0,
                search.Page,
                search.PageSize),
            GetRecipeBySlugQuery => null,
            _ => throw new NotSupportedException($"Request type {request.GetType().Name} is not configured for this test.")
        };

        return Task.FromResult((TResponse)response!);
    }

    public Task Send<TRequest>(
        TRequest request,
        CancellationToken cancellationToken = default)
        where TRequest : IRequest =>
        throw new NotSupportedException("This endpoint test does not send requests without a response.");

    public Task<object?> Send(object request, CancellationToken cancellationToken = default) =>
        Task.FromResult<object?>(request);

    public IAsyncEnumerable<TResponse> CreateStream<TResponse>(
        IStreamRequest<TResponse> request,
        CancellationToken cancellationToken = default) =>
        throw new NotSupportedException("This endpoint test does not create mediator streams.");

    public IAsyncEnumerable<object?> CreateStream(
        object request,
        CancellationToken cancellationToken = default) =>
        throw new NotSupportedException("This endpoint test does not create mediator streams.");
}

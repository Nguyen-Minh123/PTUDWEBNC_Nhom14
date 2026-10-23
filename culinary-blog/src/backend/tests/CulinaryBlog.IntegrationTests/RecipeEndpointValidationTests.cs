using System.Net;
using System.Net.Http.Json;
using System.Text.Json;

namespace CulinaryBlog.IntegrationTests;

public sealed class RecipeEndpointValidationTests
    : IClassFixture<RecipeAuthorizationWebApplicationFactory>
{
    private readonly RecipeAuthorizationWebApplicationFactory _factory;
    private readonly HttpClient _client;

    public RecipeEndpointValidationTests(RecipeAuthorizationWebApplicationFactory factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Theory]
    [InlineData("/api/v1/auth/register", "", "valid-password")]
    [InlineData("/api/v1/auth/register", "user@example.com", " ")]
    [InlineData("/api/v1/auth/login", "", "valid-password")]
    [InlineData("/api/v1/auth/login", "user@example.com", " ")]
    public async Task Authentication_endpoints_reject_missing_credentials(
        string path,
        string email,
        string password)
    {
        using var response = await _client.PostAsJsonAsync(path, new { email, password });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Recipe_search_returns_paginated_response_contract()
    {
        using var response = await _client.GetAsync("/api/v1/recipes/search?q=pho&page=2&pageSize=5");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        using var json = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        var result = json.RootElement;

        Assert.Equal(JsonValueKind.Array, result.GetProperty("items").ValueKind);
        Assert.Equal(0, result.GetProperty("totalCount").GetInt32());
        Assert.Equal(2, result.GetProperty("page").GetInt32());
        Assert.Equal(5, result.GetProperty("pageSize").GetInt32());
        Assert.Equal(0, result.GetProperty("totalPages").GetInt32());
    }

    [Fact]
    public async Task Recipe_detail_returns_matching_recipe_and_nested_data_contract()
    {
        using var response = await _client.GetAsync($"/api/v1/recipes/{_factory.Recipe.Id}");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        using var json = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        var recipe = json.RootElement;

        Assert.Equal(_factory.Recipe.Id.ToString(), recipe.GetProperty("id").GetString());
        Assert.Equal(_factory.Recipe.Title, recipe.GetProperty("title").GetString());
        Assert.Equal(JsonValueKind.Array, recipe.GetProperty("ingredients").ValueKind);
        Assert.Equal(JsonValueKind.Array, recipe.GetProperty("steps").ValueKind);
        Assert.Equal(JsonValueKind.Array, recipe.GetProperty("images").ValueKind);
        Assert.Equal(JsonValueKind.Object, recipe.GetProperty("nutrition").ValueKind);
    }

    [Theory]
    [InlineData("/api/v1/recipes?page=0")]
    [InlineData("/api/v1/recipes?pageSize=101")]
    [InlineData("/api/v1/recipes?status=not-a-status")]
    [InlineData("/api/v1/recipes/search?q=%20")]
    public async Task Invalid_recipe_query_returns_validation_problem(string path)
    {
        using var response = await _client.GetAsync(path);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal("application/problem+json", response.Content.Headers.ContentType?.MediaType);
    }

    [Fact]
    public async Task Missing_recipe_slug_returns_not_found()
    {
        using var response = await _client.GetAsync("/api/v1/recipes/not-a-real-recipe");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task Missing_recipe_id_returns_not_found()
    {
        var missingId = Guid.NewGuid();

        using var response = await _client.GetAsync($"/api/v1/recipes/{missingId}");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task Pagination_validation_problem_identifies_invalid_field()
    {
        using var response = await _client.GetAsync("/api/v1/recipes?page=0");
        using var json = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        var errors = json.RootElement.GetProperty("errors");

        Assert.True(errors.TryGetProperty("page", out _));
    }
}

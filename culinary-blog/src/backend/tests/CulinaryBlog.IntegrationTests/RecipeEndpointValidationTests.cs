using System.Net;
using System.Text.Json;

namespace CulinaryBlog.IntegrationTests;

public sealed class RecipeEndpointValidationTests
    : IClassFixture<RecipeAuthorizationWebApplicationFactory>
{
    private readonly HttpClient _client;

    public RecipeEndpointValidationTests(RecipeAuthorizationWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
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

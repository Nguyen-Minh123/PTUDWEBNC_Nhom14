using System.Net;
using System.Text.Json;

namespace CulinaryBlog.IntegrationTests;

public sealed class RecipeNutritionContractTests
    : IClassFixture<RecipeAuthorizationWebApplicationFactory>
{
    private readonly RecipeAuthorizationWebApplicationFactory _factory;

    public RecipeNutritionContractTests(RecipeAuthorizationWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Recipe_detail_returns_all_six_nutrition_values()
    {
        using var client = _factory.CreateClient();
        using var response = await client.GetAsync($"/api/v1/recipes/{_factory.Recipe.Id}");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        using var json = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        var nutrition = json.RootElement.GetProperty("nutrition");

        Assert.Equal(321.5m, nutrition.GetProperty("calories").GetDecimal());
        Assert.Equal(18.25m, nutrition.GetProperty("protein").GetDecimal());
        Assert.Equal(42.75m, nutrition.GetProperty("carbohydrates").GetDecimal());
        Assert.Equal(9.5m, nutrition.GetProperty("fat").GetDecimal());
        Assert.Equal(6.25m, nutrition.GetProperty("fiber").GetDecimal());
        Assert.Equal(725m, nutrition.GetProperty("sodium").GetDecimal());
    }
}

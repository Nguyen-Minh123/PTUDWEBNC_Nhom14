using CulinaryBlog.Application.Features.Recipes.Queries.GetRecipeBySlug;
using CulinaryBlog.Application.Features.Recipes.Queries.SearchRecipes;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CulinaryBlog.API.Endpoints;

public static class RecipeEndpoints
{
    public static IEndpointRouteBuilder MapRecipeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/recipes")
            .WithTags("Recipes")
            .WithOpenApi();

        group.MapGet("/search", async (
            ISender sender,
            [FromQuery] string q,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            CancellationToken ct = default) =>
        {
            if (string.IsNullOrWhiteSpace(q))
                return Results.BadRequest("Vui lòng nhập từ khóa tìm kiếm.");

            var result = await sender.Send(new SearchRecipesQuery(q.Trim(), page, pageSize), ct);
            return Results.Ok(result);
        })
        .WithName("SearchRecipes")
        .WithSummary("Tìm kiếm công thức nấu ăn bằng Full-Text Search")
        .AllowAnonymous();

        group.MapGet("/{slug}", async (string slug, ISender sender, CancellationToken ct) =>
        {
            var result = await sender.Send(new GetRecipeBySlugQuery(slug), ct);
            return result is not null ? Results.Ok(result) : Results.NotFound();
        })
        .WithName("GetRecipeBySlug")
        .WithSummary("Lấy chi tiết công thức nấu ăn theo Slug")
        .AllowAnonymous();

        return app;
    }
}

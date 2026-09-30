using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Features.Recipes;
using CulinaryBlog.Application.Features.Recipes.Commands;
using CulinaryBlog.Application.Features.Recipes.Queries;
using CulinaryBlog.Application.Recipes.Commands.DeleteRecipe;
using CulinaryBlog.Application.Features.Recipes.Queries.GetRecipeBySlug;
using CulinaryBlog.Application.Features.Recipes.Queries.SearchRecipes;
using CulinaryBlog.Domain.Entities;
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

        group.MapGet("", async (
            [FromServices] ISender sender,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] Guid? categoryId = null,
            CancellationToken ct = default) =>
        {
            if (page < 1 || pageSize is < 1 or > 100)
            {
                return Results.BadRequest("Page phải >= 1 và pageSize phải từ 1 đến 100.");
            }

            var result = await sender.Send(
                new ListRecipesQuery(page, pageSize, categoryId),
                ct);
            return Results.Ok(result);
        })
        .WithName("ListRecipes")
        .WithSummary("Lấy danh sách công thức đã xuất bản")
        .AllowAnonymous();

        group.MapGet("/{id:guid}", async (Guid id, [FromServices] ISender sender, CancellationToken ct) =>
        {
            var result = await sender.Send(new GetRecipeByIdQuery(id), ct);
            return result is null ? Results.NotFound() : Results.Ok(result);
        })
        .WithName("GetRecipeById")
        .WithSummary("Lấy công thức theo ID");

        group.MapPost("", async (
            CreateRecipeRequest request,
            [FromServices] ISender sender,
            [FromServices] ICurrentUserService currentUser,
            CancellationToken ct) =>
        {
            if (!TryGetAuthenticatedUserId(currentUser, out var authorId))
            {
                return Results.Unauthorized();
            }

            var result = await sender.Send(new CreateRecipeCommand(
                request.Title,
                request.Slug,
                request.Description,
                request.Instructions,
                request.PrepTime,
                request.CookTime,
                request.Servings,
                request.Difficulty,
                request.CategoryId,
                authorId,
                request.Nutrition), ct);

            return Results.CreatedAtRoute("GetRecipeById", new { id = result.Id }, result);
        })
        .WithName("CreateRecipe")
        .WithSummary("Tạo công thức mới");

        group.MapPut("/{id:guid}", async (
            Guid id,
            UpdateRecipeRequest request,
            [FromServices] ISender sender,
            [FromServices] ICurrentUserService currentUser,
            CancellationToken ct) =>
        {
            if (!TryGetAuthenticatedUserId(currentUser, out _))
            {
                return Results.Unauthorized();
            }

            var result = await sender.Send(new UpdateRecipeCommand(
                id,
                request.Title,
                request.Slug,
                request.Description,
                request.Instructions,
                request.PrepTime,
                request.CookTime,
                request.Servings,
                request.Difficulty,
                request.CategoryId,
                request.Nutrition), ct);

            return result is null ? Results.NotFound() : Results.Ok(result);
        })
        .WithName("UpdateRecipe")
        .WithSummary("Cập nhật công thức");

        group.MapDelete("/{id:guid}", async (
            Guid id,
            [FromServices] ISender sender,
            [FromServices] ICurrentUserService currentUser,
            CancellationToken ct) =>
        {
            if (!TryGetAuthenticatedUserId(currentUser, out _))
            {
                return Results.Unauthorized();
            }

            var deleted = await sender.Send(new DeleteRecipeCommand(id), ct);
            return deleted ? Results.NoContent() : Results.NotFound();
        })
        .WithName("DeleteRecipe")
        .WithSummary("Xóa mềm công thức");

        group.MapPost("/{id:guid}/publish", async (
            Guid id,
            [FromServices] ISender sender,
            [FromServices] ICurrentUserService currentUser,
            CancellationToken ct) =>
        {
            if (!TryGetAuthenticatedUserId(currentUser, out _))
            {
                return Results.Unauthorized();
            }

            var result = await sender.Send(new PublishRecipeCommand(id), ct);
            return result is null ? Results.NotFound() : Results.Ok(result);
        })
        .WithName("PublishRecipe")
        .WithSummary("Xuất bản công thức đủ nguyên liệu và bước thực hiện");

        group.MapPost("/{id:guid}/archive", async (
            Guid id,
            [FromServices] ISender sender,
            [FromServices] ICurrentUserService currentUser,
            CancellationToken ct) =>
        {
            if (!TryGetAuthenticatedUserId(currentUser, out _))
            {
                return Results.Unauthorized();
            }

            var result = await sender.Send(new ArchiveRecipeCommand(id), ct);
            return result is null ? Results.NotFound() : Results.Ok(result);
        })
        .WithName("ArchiveRecipe")
        .WithSummary("Lưu trữ công thức");

        group.MapGet("/search", async (
            [FromServices] ISender sender,
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

        group.MapGet("/{slug}", async (string slug, [FromServices] ISender sender, CancellationToken ct) =>
        {
            var result = await sender.Send(new GetRecipeBySlugQuery(slug), ct);
            return result is not null ? Results.Ok(result) : Results.NotFound();
        })
        .WithName("GetRecipeBySlug")
        .WithSummary("Lấy chi tiết công thức nấu ăn theo Slug")
        .AllowAnonymous();

        return app;
    }

    private static bool TryGetAuthenticatedUserId(ICurrentUserService currentUser, out string userId)
    {
        userId = currentUser.UserId ?? string.Empty;
        return currentUser.IsAuthenticated && !string.IsNullOrWhiteSpace(userId);
    }
}

public sealed record CreateRecipeRequest(
    string Title,
    string Slug,
    string Description,
    string Instructions,
    int PrepTime,
    int CookTime,
    int Servings,
    RecipeDifficulty Difficulty,
    Guid CategoryId,
    RecipeNutritionDto? Nutrition = null);

public sealed record UpdateRecipeRequest(
    string Title,
    string Slug,
    string Description,
    string Instructions,
    int PrepTime,
    int CookTime,
    int Servings,
    RecipeDifficulty Difficulty,
    Guid CategoryId,
    RecipeNutritionDto? Nutrition = null);

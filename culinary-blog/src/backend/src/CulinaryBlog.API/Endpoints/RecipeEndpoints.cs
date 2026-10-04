using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Models;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Application.Features.Recipes.Commands;
using CulinaryBlog.Application.Features.Recipes.Queries.GetRecipeBySlug;
using CulinaryBlog.Application.Features.Recipes.Queries.SearchRecipes;
using CulinaryBlog.Application.Recipes.Commands.DeleteRecipe;
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

        group.MapGet("/", async (
            [FromServices] IUnitOfWork unitOfWork,
            [FromQuery] string? keyword,
            [FromQuery] Guid? categoryId,
            [FromQuery] string? status,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            CancellationToken ct = default) =>
        {
            var pageNumber = page <= 0 ? 1 : page;
            var pageSizeNumber = pageSize <= 0 ? 10 : Math.Min(pageSize, 100);

            RecipeStatus? statusFilter = null;
            if (!string.IsNullOrWhiteSpace(status) && Enum.TryParse<RecipeStatus>(status, true, out var parsedStatus))
            {
                statusFilter = parsedStatus;
            }

            var recipes = await unitOfWork.Recipes.GetPagedAsync(
                page: pageNumber,
                pageSize: pageSizeNumber,
                categoryId: categoryId,
                status: statusFilter,
                keyword: keyword,
                cancellationToken: ct);

            var totalCount = await unitOfWork.Recipes.CountAsync(
                categoryId: categoryId,
                status: statusFilter,
                keyword: keyword,
                cancellationToken: ct);

            var items = recipes.Select(MapToSummaryDto).ToList();
            return Results.Ok(new PaginatedResult<RecipeSummaryDto>(items, totalCount, pageNumber, pageSizeNumber));
        })
        .WithName("GetRecipes")
        .WithSummary("Lấy danh sách công thức có phân trang, lọc theo trạng thái và danh mục")
        .AllowAnonymous();

        group.MapGet("/{id:guid}", async (
            Guid id,
            [FromServices] IUnitOfWork unitOfWork,
            CancellationToken ct) =>
        {
            var recipe = await unitOfWork.Recipes.GetByIdWithDetailsAsync(id, ct);
            return recipe is null ? Results.NotFound() : Results.Ok(MapToDetailDto(recipe));
        })
        .WithName("GetRecipeById")
        .WithSummary("Lấy chi tiết công thức theo Id")
        .AllowAnonymous();

        group.MapPost("/", async (
            [FromBody] CreateRecipeCommand command,
            [FromServices] ISender sender,
            CancellationToken ct) =>
        {
            var recipe = await sender.Send(command, ct);
            return Results.Created($"/api/v1/recipes/{recipe.Id}", MapToDetailDto(recipe));
        })
        .WithName("CreateRecipe")
        .WithSummary("Tạo công thức mới ở trạng thái Draft")
        .AllowAnonymous();

        group.MapPut("/{id:guid}", async (
            Guid id,
            [FromBody] UpdateRecipeCommand request,
            [FromServices] ISender sender,
            CancellationToken ct) =>
        {
            var command = request with { Id = id };
            var recipe = await sender.Send(command, ct);
            return Results.Ok(MapToDetailDto(recipe));
        })
        .WithName("UpdateRecipe")
        .WithSummary("Cập nhật thông tin công thức")
        .AllowAnonymous();

        group.MapPost("/{id:guid}/publish", async (
            Guid id,
            [FromServices] ISender sender,
            CancellationToken ct) =>
        {
            var recipe = await sender.Send(new PublishRecipeCommand(id), ct);
            return recipe is null ? Results.NotFound() : Results.Ok(MapToDetailDto(recipe));
        })
        .WithName("PublishRecipe")
        .WithSummary("Xuất bản công thức")
        .AllowAnonymous();

        group.MapPost("/{id:guid}/archive", async (
            Guid id,
            [FromServices] ISender sender,
            CancellationToken ct) =>
        {
            var recipe = await sender.Send(new ArchiveRecipeCommand(id), ct);
            return recipe is null ? Results.NotFound() : Results.Ok(MapToDetailDto(recipe));
        })
        .WithName("ArchiveRecipe")
        .WithSummary("Lưu trữ công thức")
        .AllowAnonymous();

        group.MapDelete("/{id:guid}", async (
            Guid id,
            [FromServices] ISender sender,
            CancellationToken ct) =>
        {
            var deleted = await sender.Send(new DeleteRecipeCommand(id), ct);
            return deleted ? Results.NoContent() : Results.NotFound();
        })
        .WithName("DeleteRecipe")
        .WithSummary("Xóa mềm công thức")
        .AllowAnonymous();

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

    private static RecipeSummaryDto MapToSummaryDto(Recipe recipe) => new(
        recipe.Id,
        recipe.Title,
        recipe.Slug,
        recipe.Description,
        recipe.PrepTime,
        recipe.CookTime,
        recipe.Servings,
        recipe.Difficulty,
        recipe.Status,
        recipe.CategoryId,
        recipe.AuthorId,
        recipe.CreatedAt.UtcDateTime,
        recipe.UpdatedAt?.UtcDateTime);

    private static RecipeDetailDto MapToDetailDto(Recipe recipe) => new(
        recipe.Id,
        recipe.Title,
        recipe.Slug,
        recipe.Description,
        recipe.Instructions,
        recipe.PrepTime,
        recipe.CookTime,
        recipe.Servings,
        recipe.Difficulty,
        recipe.Status,
        recipe.CategoryId,
        recipe.AuthorId,
        recipe.CreatedAt.UtcDateTime,
        recipe.UpdatedAt?.UtcDateTime,
        recipe.Category is null ? null : new CategoryDto(recipe.Category.Id, recipe.Category.Name, recipe.Category.Slug, recipe.Category.Description ?? string.Empty),
        recipe.Steps.Select(step => new RecipeStepDto(step.Id, step.StepNumber, step.Title, step.Description, step.TimerMinutes, step.ImageUrl)).ToList(),
        recipe.Ingredients.Select(ingredient => new RecipeIngredientDto(ingredient.Id, ingredient.Name, ingredient.Quantity, ingredient.Unit, ingredient.Notes, ingredient.OrderIndex)).ToList(),
        recipe.Images.Select(image => new RecipeImageDto(image.Id, image.OriginalUrl, image.MediumUrl, image.ThumbnailUrl, image.AltText, image.IsPrimary, image.OrderIndex)).ToList());
}

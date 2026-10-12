using CulinaryBlog.Application.Features.Categories.Commands.CreateCategory;
using CulinaryBlog.Application.Features.Categories.Commands.DeleteCategory;
using CulinaryBlog.Application.Features.Categories.Commands.UpdateCategory;
using CulinaryBlog.Application.Features.Categories.Queries.GetAllCategories;
using CulinaryBlog.Application.Features.Categories.Queries.GetCategoryById;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace CulinaryBlog.API.Endpoints;

public static class CategoryEndpoints
{
    public static IEndpointRouteBuilder MapCategoryEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/categories")
            .WithTags("Categories")
            .WithOpenApi();

        group.MapGet("/", async ([FromServices] ISender sender, CancellationToken ct) =>
        {
            var result = await sender.Send(new GetAllCategoriesQuery(), ct);
            return Results.Ok(result);
        })
        .WithName("GetAllCategories")
        .WithSummary("Lấy danh sách tất cả danh mục");

        group.MapGet("/{id:guid}", async (Guid id, [FromServices] ISender sender, CancellationToken ct) =>
        {
            var result = await sender.Send(new GetCategoryByIdQuery(id), ct);
            return Results.Ok(result);
        })
        .WithName("GetCategoryById")
        .WithSummary("Lấy thông tin danh mục theo ID");

        group.MapPost("/", async ([FromServices] ISender sender, [FromBody] CreateCategoryCommand command, CancellationToken ct) =>
        {
            var result = await sender.Send(command, ct);
            return Results.Created($"/api/v1/categories/{result.Id}", result);
        })
        .WithName("CreateCategory")
        .WithSummary("Tạo danh mục mới (Admin)")
        .RequireAuthorization("AdminOnly");

        group.MapPut("/{id:guid}", async (Guid id, [FromServices] ISender sender, [FromBody] UpdateCategoryRequest request, CancellationToken ct) =>
        {
            var command = new UpdateCategoryCommand(id, request.Name, request.Slug, request.Description, request.ImageUrl, request.OrderIndex);
            var result = await sender.Send(command, ct);
            return Results.Ok(result);
        })
        .WithName("UpdateCategory")
        .WithSummary("Cập nhật danh mục (Admin)")
        .RequireAuthorization("AdminOnly");

        group.MapDelete("/{id:guid}", async (Guid id, [FromServices] ISender sender, CancellationToken ct) =>
        {
            await sender.Send(new DeleteCategoryCommand(id), ct);
            return Results.NoContent();
        })
        .WithName("DeleteCategory")
        .WithSummary("Xóa danh mục (Admin)")
        .RequireAuthorization("AdminOnly");

        return app;
    }
}

public class UpdateCategoryRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Slug { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public int OrderIndex { get; set; }
}

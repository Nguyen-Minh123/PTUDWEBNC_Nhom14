using CulinaryBlog.Application.Features.Recipes.Images;
using CulinaryBlog.Application.Features.Recipes.Images.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CulinaryBlog.API.Endpoints;

/// <summary>
/// Endpoint group quản lý ảnh công thức.
/// Hỗ trợ upload ảnh, đặt ảnh chính và xóa ảnh.
/// </summary>
public static class RecipeImagesEndpoints
{
    public static IEndpointRouteBuilder MapRecipeImagesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/recipes/{id:guid}/images")
            .WithTags("Recipe Images")
            .RequireAuthorization();

        // Upload ảnh mới cho recipe.
        group.MapPost("/", UploadImage)
            .WithName("UploadRecipeImage")
            .Produces<RecipeImageDto>(StatusCodes.Status201Created)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        // Đặt một ảnh làm ảnh chính.
        group.MapPatch("/{imageId:guid}/primary", SetPrimaryImage)
            .WithName("SetPrimaryRecipeImage")
            .Produces<RecipeImageDto>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        // Xóa một ảnh khỏi recipe.
        group.MapDelete("/{imageId:guid}", DeleteImage)
            .WithName("DeleteRecipeImage")
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    private static async Task<IResult> UploadImage(
        Guid id,
        [FromForm] IFormFile file,
        [FromForm] string? altText,
        [FromForm] int orderIndex,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new UploadRecipeImageCommand(
            id,
            file,
            altText,
            orderIndex);

        var result = await sender.Send(command, cancellationToken);

        return Results.Created($"/api/v1/recipes/{id}/images/{result.Id}", result);
    }

    private static async Task<IResult> SetPrimaryImage(
        Guid id,
        Guid imageId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new SetPrimaryRecipeImageCommand(id, imageId),
            cancellationToken);

        return Results.Ok(result);
    }

    private static async Task<IResult> DeleteImage(
        Guid id,
        Guid imageId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        await sender.Send(new DeleteRecipeImageCommand(id, imageId), cancellationToken);
        return Results.NoContent();
    }
}
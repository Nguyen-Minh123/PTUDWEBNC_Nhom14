using CulinaryBlog.Application.Features.Recipes.Ingredients.Commands;
using CulinaryBlog.Application.Features.Recipes.Ingredients;
using MediatR;

namespace CulinaryBlog.API.Endpoints;

public static class RecipeIngredientsEndpoints
{
    public static IEndpointRouteBuilder MapRecipeIngredientsEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/recipes/{id:guid}/ingredients")
            .WithTags("Recipe Ingredients")
            .RequireAuthorization();

        group.MapPost("/", CreateIngredient)
            .WithName("CreateRecipeIngredient")
            .Produces<RecipeIngredientDto>(StatusCodes.Status201Created)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        group.MapPut("/{ingId:guid}", UpdateIngredient)
            .WithName("UpdateRecipeIngredient")
            .Produces<RecipeIngredientDto>(StatusCodes.Status200OK)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        group.MapDelete("/{ingId:guid}", DeleteIngredient)
            .WithName("DeleteRecipeIngredient")
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    private static async Task<IResult> CreateIngredient(
        Guid id,
        CreateRecipeIngredientRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new CreateRecipeIngredientCommand(
            id,
            request.Name,
            request.Quantity,
            request.Unit,
            request.Notes,
            request.OrderIndex);

        var result = await sender.Send(command, cancellationToken);

        return Results.Created($"/api/v1/recipes/{id}/ingredients/{result.Id}", result);
    }

    private static async Task<IResult> UpdateIngredient(
        Guid id,
        Guid ingId,
        UpdateRecipeIngredientRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new UpdateRecipeIngredientCommand(
            id,
            ingId,
            request.Name,
            request.Quantity,
            request.Unit,
            request.Notes,
            request.OrderIndex);

        var result = await sender.Send(command, cancellationToken);

        return Results.Ok(result);
    }

    private static async Task<IResult> DeleteIngredient(
        Guid id,
        Guid ingId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        await sender.Send(new DeleteRecipeIngredientCommand(id, ingId), cancellationToken);
        return Results.NoContent();
    }

    public sealed record CreateRecipeIngredientRequest(
        string Name,
        decimal Quantity,
        string Unit,
        string? Notes,
        int OrderIndex);

    public sealed record UpdateRecipeIngredientRequest(
        string Name,
        decimal Quantity,
        string Unit,
        string? Notes,
        int OrderIndex);
}
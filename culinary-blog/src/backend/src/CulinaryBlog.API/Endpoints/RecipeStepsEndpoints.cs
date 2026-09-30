using CulinaryBlog.Application.Features.Recipes.Steps;
using CulinaryBlog.Application.Features.Recipes.Steps.Commands;
using MediatR;

namespace CulinaryBlog.API.Endpoints;

/// <summary>
/// Endpoint group quản lý các bước thực hiện của Recipe.
/// </summary>
public static class RecipeStepsEndpoints
{
    public static IEndpointRouteBuilder MapRecipeStepsEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/recipes/{id:guid}/steps")
            .WithTags("Recipe Steps")
            .RequireAuthorization();

        group.MapPost("/", CreateStep)
            .WithName("CreateRecipeStep")
            .Produces<RecipeStepDto>(StatusCodes.Status201Created)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        group.MapPut("/{stepId:guid}", UpdateStep)
            .WithName("UpdateRecipeStep")
            .Produces<RecipeStepDto>(StatusCodes.Status200OK)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        group.MapDelete("/{stepId:guid}", DeleteStep)
            .WithName("DeleteRecipeStep")
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    private static async Task<IResult> CreateStep(
        Guid id,
        CreateRecipeStepRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new CreateRecipeStepCommand(
            id,
            request.Title,
            request.Description,
            request.TimerMinutes,
            request.ImageUrl);

        var result = await sender.Send(command, cancellationToken);

        return Results.Created($"/api/v1/recipes/{id}/steps/{result.Id}", result);
    }

    private static async Task<IResult> UpdateStep(
        Guid id,
        Guid stepId,
        UpdateRecipeStepRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new UpdateRecipeStepCommand(
            id,
            stepId,
            request.Title,
            request.Description,
            request.TimerMinutes,
            request.ImageUrl);

        var result = await sender.Send(command, cancellationToken);
        return Results.Ok(result);
    }

    private static async Task<IResult> DeleteStep(
        Guid id,
        Guid stepId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        await sender.Send(new DeleteRecipeStepCommand(id, stepId), cancellationToken);
        return Results.NoContent();
    }

    /// <summary>
    /// Body cho tạo bước.
    /// </summary>
    public sealed record CreateRecipeStepRequest(
        string Title,
        string Description,
        int? TimerMinutes,
        string? ImageUrl);

    /// <summary>
    /// Body cho cập nhật bước.
    /// </summary>
    public sealed record UpdateRecipeStepRequest(
        string Title,
        string Description,
        int? TimerMinutes,
        string? ImageUrl);
}
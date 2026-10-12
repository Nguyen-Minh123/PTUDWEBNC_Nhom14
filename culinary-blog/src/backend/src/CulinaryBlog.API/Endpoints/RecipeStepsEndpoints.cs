using CulinaryBlog.Application.Features.Recipes.Steps;
using CulinaryBlog.Application.Features.Recipes.Steps.Commands;
using MediatR;

namespace CulinaryBlog.API.Endpoints;

/// <summary>
/// Endpoint group quản lý các bước thực hiện của Recipe.
/// Bao gồm: thêm bước, cập nhật bước, và xóa bước.
/// </summary>
public static class RecipeStepsEndpoints
{
    /// <summary>
    /// Gắn toàn bộ endpoint quản lý bước thực hiện vào ứng dụng.
    /// </summary>
    public static IEndpointRouteBuilder MapRecipeStepsEndpoints(this IEndpointRouteBuilder app)
    {
        // Tạo group endpoint chung cho tài nguyên steps của một recipe.
        var group = app.MapGroup("/api/v1/recipes/{id:guid}/steps")
            .WithTags("Recipe Steps")
            .RequireAuthorization();

        // Endpoint: thêm một bước mới vào recipe.
        group.MapPost("/", CreateStep)
            .WithName("CreateRecipeStep")
            .Produces<RecipeStepDto>(StatusCodes.Status201Created)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        // Endpoint: cập nhật nội dung của một bước đã tồn tại.
        group.MapPut("/{stepId:guid}", UpdateStep)
            .WithName("UpdateRecipeStep")
            .Produces<RecipeStepDto>(StatusCodes.Status200OK)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        // Endpoint: xóa một bước khỏi recipe.
        group.MapDelete("/{stepId:guid}", DeleteStep)
            .WithName("DeleteRecipeStep")
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    /// <summary>
    /// Handler tạo mới một bước thực hiện.
    /// Dữ liệu từ request body được chuyển thành command và gửi qua MediatR.
    /// </summary>
    private static async Task<IResult> CreateStep(
        Guid id,
        CreateRecipeStepRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        // Tạo command thêm bước mới cho recipe hiện tại.
        var command = new CreateRecipeStepCommand(
            id,
            request.Title,
            request.Description,
            request.TimerMinutes,
            request.ImageUrl);

        // Gửi command xuống application layer để xử lý nghiệp vụ.
        var result = await sender.Send(command, cancellationToken);

        // Trả về HTTP 201 Created cùng đường dẫn của resource vừa tạo.
        return Results.Created($"/api/v1/recipes/{id}/steps/{result.Id}", result);
    }

    /// <summary>
    /// Handler cập nhật thông tin của một bước.
    /// </summary>
    private static async Task<IResult> UpdateStep(
        Guid id,
        Guid stepId,
        UpdateRecipeStepRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        // Tạo command cập nhật bước theo recipeId và stepId.
        var command = new UpdateRecipeStepCommand(
            id,
            stepId,
            request.Title,
            request.Description,
            request.TimerMinutes,
            request.ImageUrl);

        // Gửi command để application layer xử lý.
        var result = await sender.Send(command, cancellationToken);
        // Trả về dữ liệu bước đã cập nhật.
        return Results.Ok(result);
    }

    /// <summary>
    /// Handler xóa một bước khỏi recipe.
    /// </summary>
    private static async Task<IResult> DeleteStep(
        Guid id,
        Guid stepId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        // Gửi command xóa bước.
        await sender.Send(new DeleteRecipeStepCommand(id, stepId), cancellationToken);
        // Trả về 204 No Content vì resource đã bị xóa.
        return Results.NoContent();
    }

    /// <summary>
    /// Body request cho chức năng thêm bước.
    /// </summary>
    public sealed record CreateRecipeStepRequest(
        string Title,
        string Description,
        int? TimerMinutes,
        string? ImageUrl);

    /// <summary>
    /// Body request cho chức năng cập nhật bước.
    /// </summary>
    public sealed record UpdateRecipeStepRequest(
        string Title,
        string Description,
        int? TimerMinutes,
        string? ImageUrl);
}
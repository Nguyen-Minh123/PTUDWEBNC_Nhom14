using CulinaryBlog.Application.Features.Recipes.Ingredients.Commands;
using CulinaryBlog.Application.Features.Recipes.Ingredients;
using MediatR;

namespace CulinaryBlog.API.Endpoints;

/// <summary>
/// Khai báo các endpoint quản lý nguyên liệu của một công thức.
/// Bao gồm: thêm mới, cập nhật, và xóa nguyên liệu.
/// </summary>
public static class RecipeIngredientsEndpoints
{
    /// <summary>
    /// Gắn toàn bộ endpoint quản lý nguyên liệu vào ứng dụng.
    /// </summary>
    public static IEndpointRouteBuilder MapRecipeIngredientsEndpoints(this IEndpointRouteBuilder app)
    {
        // Tạo group endpoint chung cho tài nguyên ingredients của một recipe.
        var group = app.MapGroup("/api/v1/recipes/{id:guid}/ingredients")
            .WithTags("Recipe Ingredients")
            .RequireAuthorization();

        // Endpoint: thêm nguyên liệu mới cho recipe.
        group.MapPost("/", CreateIngredient)
            .WithName("CreateRecipeIngredient")
            .Produces<RecipeIngredientDto>(StatusCodes.Status201Created)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        // Endpoint: cập nhật thông tin một nguyên liệu cụ thể.
        group.MapPut("/{ingId:guid}", UpdateIngredient)
            .WithName("UpdateRecipeIngredient")
            .Produces<RecipeIngredientDto>(StatusCodes.Status200OK)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        // Endpoint: xóa một nguyên liệu cụ thể khỏi recipe.
        group.MapDelete("/{ingId:guid}", DeleteIngredient)
            .WithName("DeleteRecipeIngredient")
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    /// <summary>
    /// Handler tạo mới một nguyên liệu.
    /// Nhận dữ liệu từ request body, chuyển thành command và gửi qua MediatR.
    /// </summary>
    private static async Task<IResult> CreateIngredient(
        Guid id,
        CreateRecipeIngredientRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        // Tạo command để thêm nguyên liệu cho recipe hiện tại.
        var command = new CreateRecipeIngredientCommand(
            id,
            request.Name,
            request.Quantity,
            request.Unit,
            request.Notes,
            request.OrderIndex);

        // Gửi command xuống application layer để xử lý nghiệp vụ.
        var result = await sender.Send(command, cancellationToken);

        // Trả về HTTP 201 Created cùng URL của resource vừa tạo.
        return Results.Created($"/api/v1/recipes/{id}/ingredients/{result.Id}", result);
    }

    /// <summary>
    /// Handler cập nhật một nguyên liệu đã tồn tại.
    /// </summary>
    private static async Task<IResult> UpdateIngredient(
        Guid id,
        Guid ingId,
        UpdateRecipeIngredientRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        // Tạo command cập nhật nguyên liệu theo recipeId và ingredientId.
        var command = new UpdateRecipeIngredientCommand(
            id,
            ingId,
            request.Name,
            request.Quantity,
            request.Unit,
            request.Notes,
            request.OrderIndex);

        // Gửi command để application layer xử lý.
        var result = await sender.Send(command, cancellationToken);

        // Trả về dữ liệu đã cập nhật.
        return Results.Ok(result);
    }

    /// <summary>
    /// Handler xóa một nguyên liệu khỏi recipe.
    /// </summary>
    private static async Task<IResult> DeleteIngredient(
        Guid id,
        Guid ingId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        // Gửi command xóa nguyên liệu.
        await sender.Send(new DeleteRecipeIngredientCommand(id, ingId), cancellationToken);
        // Không trả về nội dung vì resource đã bị xóa.
        return Results.NoContent();
    }

    /// <summary>
    /// Body request cho chức năng thêm nguyên liệu.
    /// </summary>
    public sealed record CreateRecipeIngredientRequest(
        string Name,
        decimal Quantity,
        string Unit,
        string? Notes,
        int OrderIndex);

    /// <summary>
    /// Body request cho chức năng cập nhật nguyên liệu.
    /// </summary>
    public sealed record UpdateRecipeIngredientRequest(
        string Name,
        decimal Quantity,
        string Unit,
        string? Notes,
        int OrderIndex);
}
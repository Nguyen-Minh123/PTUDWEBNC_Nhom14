using CulinaryBlog.Application.Features.Recipes.Commands.UpdateRecipe;
using CulinaryBlog.Domain.Entities;
using MediatR;

namespace CulinaryBlog.API.Endpoints;

/// <summary>
/// Endpoint quản lý Recipe.
/// </summary>
public static class RecipesEndpoints
{
    public static IEndpointRouteBuilder MapRecipesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/recipes")
            .WithTags("Recipes")
            .RequireAuthorization();

        // Cập nhật công thức với RowVersion để tránh ghi đè dữ liệu cũ.
        group.MapPut("/{id:guid}", UpdateRecipe)
            .WithName("UpdateRecipe")
            .Produces<RecipeDto>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status409Conflict)
            .ProducesValidationProblem();

        return app;
    }

    private static async Task<IResult> UpdateRecipe(
        Guid id,
        UpdateRecipeRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new UpdateRecipeCommand(
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
            request.RowVersion);

        var result = await sender.Send(command, cancellationToken);

        return Results.Ok(result);
    }

    /// <summary>
    /// Body request cho cập nhật Recipe.
    /// RowVersion được client gửi lại từ dữ liệu vừa đọc.
    /// </summary>
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
        uint RowVersion);
}
using CulinaryBlog.Application.Features.Recipes.Commands.CreateRecipe;
using CulinaryBlog.Application.Features.Recipes.Commands.DeleteRecipe;
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

        group.MapPost("", CreateRecipe)
            .WithName("CreateRecipe")
            .Produces(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status409Conflict)
            .ProducesValidationProblem();

        group.MapPut("/{id:guid}", UpdateRecipe)
            .WithName("UpdateRecipe")
            .Produces<RecipeDto>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status409Conflict)
            .ProducesValidationProblem();

        group.MapDelete("/{id:guid}", DeleteRecipe)
            .WithName("DeleteRecipe")
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status403Forbidden);

        return app;
    }

    private static async Task<IResult> CreateRecipe(
        CreateRecipeRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new CreateRecipeCommand
        {
            Title = request.Title,
            Slug = request.Slug,
            Description = request.Description,
            Instructions = request.Instructions,
            PrepTime = request.PrepTime,
            CookTime = request.CookTime,
            Servings = request.Servings,
            Difficulty = request.Difficulty,
            CategoryId = request.CategoryId,
            Calories = request.Calories,
            Protein = request.Protein,
            Carbohydrates = request.Carbohydrates,
            Fat = request.Fat,
            Fiber = request.Fiber,
            Sodium = request.Sodium,
            Steps = request.Steps,
            Ingredients = request.Ingredients
        };

        var recipeId = await sender.Send(command, cancellationToken);

        return Results.Created($"/api/v1/recipes/{recipeId}", new { id = recipeId });
    }

    private static async Task<IResult> UpdateRecipe(
        Guid id,
        UpdateRecipeRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var slug = string.IsNullOrWhiteSpace(request.Slug)
            ? request.Title
            : request.Slug;

        var command = new UpdateRecipeCommand(
            id,
            request.Title,
            slug,
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

    private static async Task<IResult> DeleteRecipe(
        Guid id,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new DeleteRecipeCommand
        {
            Id = id
        };

        await sender.Send(command, cancellationToken);
        return Results.NoContent();
    }

    public sealed record CreateRecipeRequest(
        string Title,
        string? Slug,
        string Description,
        string Instructions,
        int PrepTime,
        int CookTime,
        int Servings,
        RecipeDifficulty Difficulty,
        Guid CategoryId,
        decimal? Calories,
        decimal? Protein,
        decimal? Carbohydrates,
        decimal? Fat,
        decimal? Fiber,
        decimal? Sodium,
        IList<CreateRecipeStepModel> Steps,
        IList<CreateRecipeIngredientModel> Ingredients);

    public sealed record UpdateRecipeRequest(
        string Title,
        string? Slug,
        string Description,
        string Instructions,
        int PrepTime,
        int CookTime,
        int Servings,
        RecipeDifficulty Difficulty,
        Guid CategoryId,
        uint RowVersion);
}
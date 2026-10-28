using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Models;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Application.Features.Recipes.Commands;
using CulinaryBlog.Application.Features.Recipes.Queries.GetRecipeBySlug;
using CulinaryBlog.Application.Features.Recipes.Queries.SearchRecipes;
using CulinaryBlog.Application.Recipes.Commands.DeleteRecipe;
using CulinaryBlog.API.Authorization;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CulinaryBlog.API.Endpoints;

/// <summary>
/// Maps the recipe API endpoints.
/// </summary>
public static class RecipeEndpoints
{
    /// <summary>
    /// Registers recipe routes and their OpenAPI metadata.
    /// </summary>
    /// <param name="app">The endpoint route builder.</param>
    /// <returns>The route builder with recipe endpoints registered.</returns>
    public static IEndpointRouteBuilder MapRecipeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/recipes")
            .WithTags("Recipes")
            .WithDescription("Tạo, tìm kiếm và quản lý vòng đời công thức nấu ăn.");

        group.MapGet("/", async (
            [FromServices] IUnitOfWork unitOfWork,
            [FromQuery] string? keyword,
            [FromQuery] Guid? categoryId,
            [FromQuery] string? status,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            CancellationToken ct = default) =>
        {
            var validationErrors = ValidatePagination(page, pageSize);

            RecipeStatus? statusFilter = null;
            if (!string.IsNullOrWhiteSpace(status))
            {
                var statusValue = status.Trim();
                if (Enum.TryParse<RecipeStatus>(statusValue, true, out var parsedStatus) &&
                    Enum.IsDefined(parsedStatus) &&
                    string.Equals(Enum.GetName(parsedStatus), statusValue, StringComparison.OrdinalIgnoreCase))
                {
                    statusFilter = parsedStatus;
                }
                else
                {
                    validationErrors["status"] = ["Status must be Draft, Published, or Archived."];
                }
            }

            if (validationErrors.Count > 0)
            {
                return Results.ValidationProblem(validationErrors);
            }

            var recipes = await unitOfWork.Recipes.GetPagedAsync(
                page: page,
                pageSize: pageSize,
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
            return Results.Ok(new PaginatedResult<RecipeSummaryDto>(items, totalCount, page, pageSize));
        })
        .WithName("GetRecipes")
        .WithSummary("Lấy danh sách công thức có phân trang, lọc theo trạng thái và danh mục")
        .WithDescription("Trả về danh sách công thức theo trang, có thể lọc bằng từ khóa, danh mục và trạng thái.")
        .Produces<PaginatedResult<RecipeSummaryDto>>(StatusCodes.Status200OK)
        .ProducesValidationProblem()
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
        .WithDescription("Trả về công thức cùng danh mục, nguyên liệu, các bước thực hiện và hình ảnh.")
        .Produces<RecipeDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound)
        .AllowAnonymous();

        group.MapPost("/", async (
            [FromBody] CreateRecipeCommand command,
            [FromServices] ISender sender,
            [FromServices] ICurrentUserService currentUserService,
            CancellationToken ct) =>
        {
            var authorId = currentUserService.UserId;
            if (string.IsNullOrWhiteSpace(authorId))
            {
                return Results.Forbid();
            }

            var recipe = await sender.Send(command with { AuthorId = authorId }, ct);
            return Results.Created($"/api/v1/recipes/{recipe.Id}", MapToDetailDto(recipe));
        })
        .WithName("CreateRecipe")
        .WithSummary("Tạo công thức mới ở trạng thái Draft")
        .WithDescription("Tạo bản nháp công thức và trả về đường dẫn đến tài nguyên vừa tạo.")
        .Produces<RecipeDetailDto>(StatusCodes.Status201Created)
        .Produces(StatusCodes.Status401Unauthorized)
        .Produces(StatusCodes.Status403Forbidden)
        .ProducesValidationProblem()
        // Yêu cầu đăng nhập trước khi handler được chạy; author luôn lấy từ identity phía server.
        .RequireAuthorization(RecipeAuthorizationPolicies.AuthenticatedUser);

        group.MapPut("/{id:guid}", async (
            Guid id,
            [FromBody] UpdateRecipeCommand request,
            [FromServices] ISender sender,
            [FromServices] IUnitOfWork unitOfWork,
            [FromServices] IAuthorizationService authorizationService,
            HttpContext httpContext,
            CancellationToken ct) =>
        {
            // Nạp tài nguyên trước để kiểm tra owner/Admin; ID không tồn tại trả 404.
            var recipe = await unitOfWork.Recipes.GetByIdAsync(id, ct);
            if (recipe is null)
            {
                return Results.NotFound();
            }

            var authorizationResult = await authorizationService.AuthorizeAsync(
                httpContext.User,
                recipe,
                RecipeAuthorizationPolicies.OwnerOrAdmin);
            if (!authorizationResult.Succeeded)
            {
                // Người đã đăng nhập nhưng không sở hữu recipe và không phải Admin nhận 403.
                return Results.Forbid();
            }

            var command = request with { Id = id };
            var updatedRecipe = await sender.Send(command, ct);
            return Results.Ok(MapToDetailDto(updatedRecipe));
        })
        .WithName("UpdateRecipe")
        .WithSummary("Cập nhật thông tin công thức")
        .WithDescription("Cập nhật nội dung, thời gian, danh mục và thông tin dinh dưỡng của công thức.")
        .Produces<RecipeDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status401Unauthorized)
        .Produces(StatusCodes.Status403Forbidden)
        .Produces(StatusCodes.Status404NotFound)
        .ProducesValidationProblem()
        .RequireAuthorization(RecipeAuthorizationPolicies.AuthenticatedUser);

        group.MapPost("/{id:guid}/publish", async (
            Guid id,
            [FromServices] ISender sender,
            [FromServices] IUnitOfWork unitOfWork,
            [FromServices] IAuthorizationService authorizationService,
            HttpContext httpContext,
            CancellationToken ct) =>
        {
            // Publish/archive/delete là quyền trên một recipe cụ thể, không chỉ quyền đăng nhập.
            var existingRecipe = await unitOfWork.Recipes.GetByIdAsync(id, ct);
            if (existingRecipe is null)
            {
                return Results.NotFound();
            }

            var authorizationResult = await authorizationService.AuthorizeAsync(
                httpContext.User,
                existingRecipe,
                RecipeAuthorizationPolicies.OwnerOrAdmin);
            if (!authorizationResult.Succeeded)
            {
                return Results.Forbid();
            }

            var publishedRecipe = await sender.Send(new PublishRecipeCommand(id), ct);
            return publishedRecipe is null
                ? Results.NotFound()
                : Results.Ok(MapToDetailDto(publishedRecipe));
        })
        .WithName("PublishRecipe")
        .WithSummary("Xuất bản công thức")
        .WithDescription("Chuyển công thức sang trạng thái Published khi thỏa mãn các quy tắc nghiệp vụ.")
        .Produces<RecipeDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status401Unauthorized)
        .Produces(StatusCodes.Status403Forbidden)
        .Produces(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status404NotFound)
        .RequireAuthorization(RecipeAuthorizationPolicies.AuthenticatedUser);

        group.MapPost("/{id:guid}/archive", async (
            Guid id,
            [FromServices] ISender sender,
            [FromServices] IUnitOfWork unitOfWork,
            [FromServices] IAuthorizationService authorizationService,
            HttpContext httpContext,
            CancellationToken ct) =>
        {
            // Kiểm tra cùng một resource trước khi thay đổi trạng thái recipe.
            var existingRecipe = await unitOfWork.Recipes.GetByIdAsync(id, ct);
            if (existingRecipe is null)
            {
                return Results.NotFound();
            }

            var authorizationResult = await authorizationService.AuthorizeAsync(
                httpContext.User,
                existingRecipe,
                RecipeAuthorizationPolicies.OwnerOrAdmin);
            if (!authorizationResult.Succeeded)
            {
                return Results.Forbid();
            }

            var archivedRecipe = await sender.Send(new ArchiveRecipeCommand(id), ct);
            return archivedRecipe is null
                ? Results.NotFound()
                : Results.Ok(MapToDetailDto(archivedRecipe));
        })
        .WithName("ArchiveRecipe")
        .WithSummary("Lưu trữ công thức")
        .WithDescription("Chuyển công thức sang trạng thái Archived.")
        .Produces<RecipeDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status401Unauthorized)
        .Produces(StatusCodes.Status403Forbidden)
        .Produces(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status404NotFound)
        .RequireAuthorization(RecipeAuthorizationPolicies.AuthenticatedUser);

        group.MapDelete("/{id:guid}", async (
            Guid id,
            [FromServices] ISender sender,
            [FromServices] IUnitOfWork unitOfWork,
            [FromServices] IAuthorizationService authorizationService,
            HttpContext httpContext,
            CancellationToken ct) =>
        {
            var recipe = await unitOfWork.Recipes.GetByIdAsync(id, ct);
            if (recipe is null)
            {
                return Results.NotFound();
            }

            var authorizationResult = await authorizationService.AuthorizeAsync(
                httpContext.User,
                recipe,
                RecipeAuthorizationPolicies.OwnerOrAdmin);
            if (!authorizationResult.Succeeded)
            {
                return Results.Forbid();
            }

            var deleted = await sender.Send(new DeleteRecipeCommand(id), ct);
            return deleted ? Results.NoContent() : Results.NotFound();
        })
        .WithName("DeleteRecipe")
        .WithSummary("Xóa mềm công thức")
        .WithDescription("Đánh dấu công thức đã xóa; không xóa vật lý dữ liệu.")
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status401Unauthorized)
        .Produces(StatusCodes.Status403Forbidden)
        .Produces(StatusCodes.Status404NotFound)
        .RequireAuthorization(RecipeAuthorizationPolicies.AuthenticatedUser);

        group.MapGet("/search", async (
            [FromServices] ISender sender,
            [FromQuery] string q,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            CancellationToken ct = default) =>
        {
            var validationErrors = ValidatePagination(page, pageSize);

            if (string.IsNullOrWhiteSpace(q))
            {
                validationErrors["q"] = ["Vui lòng nhập từ khóa tìm kiếm."];
            }

            if (validationErrors.Count > 0)
            {
                return Results.ValidationProblem(validationErrors);
            }

            var result = await sender.Send(new SearchRecipesQuery(q.Trim(), page, pageSize), ct);
            return Results.Ok(result);
        })
        .WithName("SearchRecipes")
        .WithSummary("Tìm kiếm công thức nấu ăn bằng Full-Text Search")
        .WithDescription("Tìm kiếm theo từ khóa và trả về kết quả có phân trang.")
        .Produces<PaginatedResult<RecipeSummaryDto>>(StatusCodes.Status200OK)
        .ProducesValidationProblem()
        .AllowAnonymous();

        group.MapGet("/{slug}", async (string slug, [FromServices] ISender sender, CancellationToken ct) =>
        {
            var result = await sender.Send(new GetRecipeBySlugQuery(slug), ct);
            return result is not null ? Results.Ok(result) : Results.NotFound();
        })
        .WithName("GetRecipeBySlug")
        .WithSummary("Lấy chi tiết công thức nấu ăn theo Slug")
        .WithDescription("Trả về thông tin chi tiết công thức khớp với slug.")
        .Produces<RecipeDetailDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound)
        .AllowAnonymous();

        return app;
    }

    private static Dictionary<string, string[]> ValidatePagination(int page, int pageSize)
    {
        var errors = new Dictionary<string, string[]>();

        if (page < 1)
        {
            errors["page"] = ["Page must be greater than or equal to 1."];
        }

        if (pageSize is < 1 or > 100)
        {
            errors["pageSize"] = ["Page size must be between 1 and 100."];
        }

        return errors;
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
        recipe.Images.Select(image => new RecipeImageDto(image.Id, image.OriginalUrl, image.MediumUrl, image.ThumbnailUrl, image.AltText, image.IsPrimary, image.OrderIndex)).ToList(),
        recipe.Nutrition is null
            ? null
            : new RecipeNutritionDto(
                recipe.Nutrition.Calories,
                recipe.Nutrition.Protein,
                recipe.Nutrition.Carbohydrates,
                recipe.Nutrition.Fat,
                recipe.Nutrition.Fiber,
                recipe.Nutrition.Sodium));
}

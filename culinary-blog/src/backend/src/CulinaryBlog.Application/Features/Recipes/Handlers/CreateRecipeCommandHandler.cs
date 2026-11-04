
using CulinaryBlog.Application.Common.Exceptions;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Commands.CreateRecipe;

/// <summary>
/// Xử lý tạo mới Recipe.
/// Thiết kế chuẩn: CreateRecipe chỉ tạo Recipe core + steps + ingredients + nutrition.
/// Ảnh không được tạo ở đây vì RecipeImage là một aggregate/use case riêng.
/// </summary>
public sealed class CreateRecipeCommandHandler
    : IRequestHandler<CreateRecipeCommand, Guid>
{
    private readonly IApplicationDbContext _db;
    private readonly ICurrentUserService _currentUser;

    /// <summary>
    /// Khởi tạo handler với DbContext abstraction và current user service.
    /// </summary>
    public CreateRecipeCommandHandler(
        IApplicationDbContext db,
        ICurrentUserService currentUser)
    {
        _db = db;
        _currentUser = currentUser;
    }

    /// <summary>
    /// Tạo Recipe mới và lưu xuống database.
    /// </summary>
    public async Task<Guid> Handle(CreateRecipeCommand request, CancellationToken cancellationToken)
    {
        // 1) Bắt buộc người dùng phải đăng nhập để tạo recipe.
        if (!_currentUser.IsAuthenticated || string.IsNullOrWhiteSpace(_currentUser.UserId))
        {
            throw new UnauthorizedAccessException("You must be authenticated to create a recipe.");
        }

        var authorId = _currentUser.UserId.Trim();

        // 2) Kiểm tra category tồn tại trước khi tạo recipe.
        var categoryExists = await _db.Categories
            .AnyAsync(x => x.Id == request.CategoryId, cancellationToken);

        if (!categoryExists)
        {
            throw new KeyNotFoundException("Category not found.");
        }

        // 3) Chặn slug trùng sớm để trả lỗi rõ ràng hơn thay vì chờ DB constraint.
        var slug = request.Slug ?? request.Title;
        var slugExists = await _db.Recipes
            .AnyAsync(x => x.Slug == slug, cancellationToken);

        if (slugExists)
        {
            throw new InvalidOperationException($"Recipe slug '{slug}' already exists.");
        }

        // 4) Tạo value object Nutrition từ request.
        var nutrition = new RecipeNutrition
        {
            Calories = request.Calories,
            Protein = request.Protein,
            Carbohydrates = request.Carbohydrates,
            Fat = request.Fat,
            Fiber = request.Fiber,
            Sodium = request.Sodium
        };

        // 5) Tạo aggregate root Recipe.
        var recipe = new Recipe(
            request.Title,
            slug,
            request.Description,
            request.Instructions,
            request.PrepTime,
            request.CookTime,
            request.Servings,
            request.Difficulty,
            request.CategoryId,
            authorId,
            nutrition);

        // 6) Gắn steps vào aggregate.
        AddSteps(recipe, request.Steps);

        // 7) Gắn ingredients vào aggregate.
        AddIngredients(recipe, request.Ingredients);

        // 8) Không tạo RecipeImage ở đây.
        // Theo SRS, ảnh là luồng riêng: POST /api/v1/recipes/{id}/images.
        // Lý do: metadata ảnh cần ObjectKey, ContentType, FileSize, Checksum...
        // Chỉ có từ luồng upload MinIO, không nên nhét ảnh vào CreateRecipe.

        _db.Recipes.Add(recipe);

        try
        {
            await _db.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateException ex)
        {
            throw new InvalidOperationException(
                "Failed to create recipe. Please check duplicate slug, invalid related data, or database constraint.",
                ex);
        }

        // 9) Có thể invalidate cache tại đây nếu hệ thống đã bật cache cho recipe/category/search.
        // Ví dụ:
        // await _cacheService.RemoveByPrefixAsync(CacheKeys.RecipesInvalidatePrefix, cancellationToken);

        return recipe.Id;
    }

    /// <summary>
    /// Gắn danh sách bước nấu vào Recipe.
    /// </summary>
    private static void AddSteps(Recipe recipe, IList<CreateRecipeStepModel> steps)
    {
        if (steps is null || steps.Count == 0)
        {
            return;
        }

        // Chặn trùng StepNumber sớm để báo lỗi dễ hiểu hơn.
        var duplicateStepNumbers = steps
            .GroupBy(x => x.StepNumber)
            .Where(g => g.Count() > 1)
            .Select(g => g.Key)
            .ToList();

        if (duplicateStepNumbers.Count > 0)
        {
            throw new InvalidOperationException(
                $"Duplicate step numbers are not allowed: {string.Join(", ", duplicateStepNumbers)}.");
        }

        foreach (var stepModel in steps.OrderBy(x => x.StepNumber))
        {
            // Domain RecipeStep yêu cầu: title + description.
            // Request hiện tại chỉ có Instruction nên dùng:
            // - title: Step {n}
            // - description: Instruction
            var step = new RecipeStep(
                recipe.Id,
                stepModel.StepNumber,
                $"Step {stepModel.StepNumber}",
                stepModel.Instruction,
                stepModel.TimerMinutes,
                stepModel.ImageUrl);

            recipe.AddStep(step);
        }
    }

    /// <summary>
    /// Gắn danh sách nguyên liệu vào Recipe.
    /// </summary>
    private static void AddIngredients(Recipe recipe, IList<CreateRecipeIngredientModel> ingredients)
    {
        if (ingredients is null || ingredients.Count == 0)
        {
            return;
        }

        foreach (var ingredientModel in ingredients)
        {
            // Giả định RecipeIngredient có constructor:
            // RecipeId, Name, Quantity, Unit.
            var ingredient = new RecipeIngredient(
                recipe.Id,
                ingredientModel.Name,
                ingredientModel.Quantity,
                ingredientModel.Unit);

            recipe.AddIngredient(ingredient);
        }
    }
}

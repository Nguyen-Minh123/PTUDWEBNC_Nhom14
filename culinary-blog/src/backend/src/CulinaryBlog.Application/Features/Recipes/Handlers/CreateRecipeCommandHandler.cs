
using CulinaryBlog.Application.Common.Exceptions;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Commands.CreateRecipe;

/// <summary>
/// Xử lý tạo mới Recipe.
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
        // [MỚI] Bắt buộc người dùng phải đăng nhập để tạo recipe.
        if (!_currentUser.IsAuthenticated || string.IsNullOrWhiteSpace(_currentUser.UserId))
        {
            throw new UnauthorizedAccessException("You must be authenticated to create a recipe.");
        }

        var authorId = _currentUser.UserId.Trim();

        // [MỚI] Kiểm tra Category tồn tại trước khi tạo Recipe.
        var categoryExists = await _db.Categories
            .AnyAsync(x => x.Id == request.CategoryId, cancellationToken);

        if (!categoryExists)
        {
            throw new KeyNotFoundException("Category not found.");
        }

        // [MỚI] Tạo value object Nutrition từ request.
        var nutrition = new RecipeNutrition
        {
            Calories = request.Calories,
            Protein = request.Protein,
            Carbohydrates = request.Carbohydrates,
            Fat = request.Fat,
            Fiber = request.Fiber,
            Sodium = request.Sodium
        };

        // [MỚI] Tạo aggregate root Recipe.
        var recipe = new Recipe(
            request.Title,
            request.Slug ?? request.Title,
            request.Description,
            request.Instructions,
            request.PrepTime,
            request.CookTime,
            request.Servings,
            request.Difficulty,
            request.CategoryId,
            authorId,
            nutrition);

        // [MỚI] Gắn steps vào aggregate.
        AddSteps(recipe, request.Steps);

        // [MỚI] Gắn ingredients vào aggregate.
        AddIngredients(recipe, request.Ingredients);

        // [MỚI] Gắn images vào aggregate.
        AddImages(recipe, request.Images);

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

        // [MỚI] Có thể invalidate cache tại đây nếu hệ thống đã bật cache cho recipe/category/search.
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

        // [MỚI] Chặn trùng StepNumber sớm để báo lỗi dễ hiểu hơn.
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
            // [MỚI] Domain RecipeStep yêu cầu: title + description.
            // Hiện request chỉ có Instruction nên dùng:
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
            // [MỚI] Giả định RecipeIngredient có constructor:
            // RecipeId, Name, Quantity, Unit.
            var ingredient = new RecipeIngredient(
                recipe.Id,
                ingredientModel.Name,
                ingredientModel.Quantity,
                ingredientModel.Unit);

            recipe.AddIngredient(ingredient);
        }
    }

    /// <summary>
    /// Gắn danh sách ảnh vào Recipe.
    /// </summary>
    private static void AddImages(Recipe recipe, IList<CreateRecipeImageModel> images)
    {
        if (images is null || images.Count == 0)
        {
            return;
        }

        var hasPrimary = images.Any(x => x.IsPrimary);

        for (var i = 0; i < images.Count; i++)
        {
            var imageModel = images[i];

            // [MỚI] Nếu client không chỉ định ảnh chính,
            // ảnh đầu tiên sẽ được dùng làm ảnh chính mặc định.
            var isPrimary = imageModel.IsPrimary || (!hasPrimary && i == 0);

            // [MỚI] Dùng named arguments để tránh nhầm vị trí tham số:
            // constructor thật là:
            // (recipeId, originalUrl, altText, orderIndex, isPrimary, mediumUrl, thumbnailUrl)
            var image = new RecipeImage(
                recipe.Id,
                imageModel.Url,
                altText: null,
                orderIndex: i,
                isPrimary: isPrimary,
                mediumUrl: null,
                thumbnailUrl: null);

            recipe.AddImage(image);
        }
    }
}

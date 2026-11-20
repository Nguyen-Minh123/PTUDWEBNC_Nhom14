using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.DTOs;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Queries.GetRecipeBySlug;

public class GetRecipeBySlugQueryHandler : IRequestHandler<GetRecipeBySlugQuery, RecipeDetailDto?>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetRecipeBySlugQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<RecipeDetailDto?> Handle(GetRecipeBySlugQuery request, CancellationToken cancellationToken)
    {
        var recipe = await _unitOfWork.Recipes.GetBySlugWithDetailsAsync(request.Slug, cancellationToken);
        if (recipe is null)
        {
            return null;
        }

        var coverImageUrl = recipe.Images
            .Where(i => i.IsPrimary)
            .Select(i => i.MediumUrl ?? i.OriginalUrl)
            .FirstOrDefault()
            ?? recipe.Images
                .OrderBy(i => i.OrderIndex)
                .Select(i => i.MediumUrl ?? i.OriginalUrl)
                .FirstOrDefault();

        return new RecipeDetailDto(
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
            recipe.Steps.OrderBy(s => s.StepNumber).Select(step => new RecipeStepDto(step.Id, step.StepNumber, step.Title, step.Description, step.TimerMinutes, step.ImageUrl)).ToList(),
            recipe.Ingredients.OrderBy(i => i.OrderIndex).Select(ingredient => new RecipeIngredientDto(ingredient.Id, ingredient.Name, ingredient.Quantity, ingredient.Unit, ingredient.Notes, ingredient.OrderIndex)).ToList(),
            recipe.Images.OrderBy(img => img.OrderIndex).Select(image => new RecipeImageDto(image.Id, image.OriginalUrl, image.MediumUrl, image.ThumbnailUrl, image.AltText, image.IsPrimary, image.OrderIndex)).ToList(),
            recipe.Nutrition is null
                ? null
                : new RecipeNutritionDto(
                    recipe.Nutrition.Calories,
                    recipe.Nutrition.Protein,
                    recipe.Nutrition.Carbohydrates,
                    recipe.Nutrition.Fat,
                    recipe.Nutrition.Fiber,
                    recipe.Nutrition.Sodium),
            recipe.Category?.Name,
            recipe.Author?.DisplayName ?? recipe.Author?.UserName,
            coverImageUrl,
            recipe.PrepTime + recipe.CookTime,
            4.9,
            24);
    }
}

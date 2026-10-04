using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Commands;

public sealed class UpdateRecipeCommandHandler : IRequestHandler<UpdateRecipeCommand, Recipe>
{
    private readonly IUnitOfWork _unitOfWork;

    public UpdateRecipeCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Recipe> Handle(UpdateRecipeCommand request, CancellationToken cancellationToken)
    {
        var recipe = await _unitOfWork.Recipes.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new RecipeNotFoundException(request.Id);

        if (!string.Equals(recipe.Slug, request.Slug, StringComparison.OrdinalIgnoreCase) &&
            await _unitOfWork.Recipes.SlugExistsAsync(request.Slug, request.Id, cancellationToken))
        {
            throw new RecipeSlugConflictException(request.Slug);
        }

        recipe.UpdateDetails(
            title: request.Title,
            slug: request.Slug,
            description: request.Description,
            instructions: request.Instructions,
            prepTime: request.PrepTime,
            cookTime: request.CookTime,
            servings: request.Servings,
            difficulty: request.Difficulty,
            categoryId: request.CategoryId);

        if (request.Nutrition is not null)
        {
            recipe.SetNutrition(request.Nutrition);
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return recipe;
    }
}

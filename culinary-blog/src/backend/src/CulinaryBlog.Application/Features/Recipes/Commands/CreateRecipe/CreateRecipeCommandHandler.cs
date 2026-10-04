using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Commands;

public sealed class CreateRecipeCommandHandler : IRequestHandler<CreateRecipeCommand, Recipe>
{
    private readonly IUnitOfWork _unitOfWork;

    public CreateRecipeCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Recipe> Handle(CreateRecipeCommand request, CancellationToken cancellationToken)
    {
        var slug = request.Slug.Trim();

        if (await _unitOfWork.Recipes.SlugExistsAsync(slug, cancellationToken: cancellationToken))
        {
            throw new RecipeSlugConflictException(slug);
        }

        var recipe = new Recipe(
            title: request.Title,
            slug: slug,
            description: request.Description,
            instructions: request.Instructions,
            prepTime: request.PrepTime,
            cookTime: request.CookTime,
            servings: request.Servings,
            difficulty: request.Difficulty,
            categoryId: request.CategoryId,
            authorId: request.AuthorId,
            nutrition: request.Nutrition);

        await _unitOfWork.Recipes.AddAsync(recipe, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return recipe;
    }
}

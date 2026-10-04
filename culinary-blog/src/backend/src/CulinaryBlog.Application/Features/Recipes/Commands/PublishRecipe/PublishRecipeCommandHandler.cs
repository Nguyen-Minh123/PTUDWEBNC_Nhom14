using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Commands;

public sealed class PublishRecipeCommandHandler : IRequestHandler<PublishRecipeCommand, Recipe?>
{
    private readonly IUnitOfWork _unitOfWork;

    public PublishRecipeCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Recipe?> Handle(PublishRecipeCommand request, CancellationToken cancellationToken)
    {
        var recipe = await _unitOfWork.Recipes.GetByIdWithDetailsAsync(request.Id, cancellationToken)
            ?? throw new RecipeNotFoundException(request.Id);

        if (!recipe.Ingredients.Any() || !recipe.Steps.Any())
        {
            throw new DomainException("A recipe must include at least one ingredient and one step before publishing.");
        }

        recipe.Publish();
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return recipe;
    }
}

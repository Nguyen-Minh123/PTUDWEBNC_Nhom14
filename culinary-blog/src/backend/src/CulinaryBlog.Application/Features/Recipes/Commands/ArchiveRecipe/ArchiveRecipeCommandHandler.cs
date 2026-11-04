using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Commands;

public sealed class ArchiveRecipeCommandHandler : IRequestHandler<ArchiveRecipeCommand, Recipe?>
{
    private readonly IUnitOfWork _unitOfWork;

    public ArchiveRecipeCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Recipe?> Handle(ArchiveRecipeCommand request, CancellationToken cancellationToken)
    {
        var recipe = await _unitOfWork.Recipes.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new RecipeNotFoundException(request.Id);

        recipe.Archive();
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return recipe;
    }
}

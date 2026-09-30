using CulinaryBlog.Application.Common.Interfaces;
using MediatR;

namespace CulinaryBlog.Application.Recipes.Commands.DeleteRecipe;

/// <summary>
/// Command handler dùng để xóa Recipe.
/// 
/// Xóa mềm Recipe thông qua repository và Unit of Work.
/// </summary>
public sealed class DeleteRecipeCommandHandler
    : IRequestHandler<DeleteRecipeCommand, bool>
{
    private readonly IUnitOfWork _unitOfWork;

    public DeleteRecipeCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> Handle(
        DeleteRecipeCommand request,
        CancellationToken cancellationToken)
    {
        var recipe = await _unitOfWork.Recipes.GetByIdAsync(request.Id, cancellationToken);
        if (recipe is null)
        {
            return false;
        }

        recipe.IsDeleted = true;
        recipe.UpdatedAt = DateTimeOffset.UtcNow;
        _unitOfWork.Recipes.Update(recipe);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return true;
    }
}
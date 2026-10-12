using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Exceptions;
using MediatR;

namespace CulinaryBlog.Application.Recipes.Commands.DeleteRecipe;

public sealed class DeleteRecipeCommandHandler
    : IRequestHandler<DeleteRecipeCommand, bool>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public DeleteRecipeCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<bool> Handle(
        DeleteRecipeCommand request,
        CancellationToken cancellationToken)
    {
        var recipe = await _unitOfWork.Recipes.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new RecipeNotFoundException(request.Id);

        var currentUserId = _currentUserService.UserId;
        var isAdmin = _currentUserService.IsInRole("Admin");

        if (!isAdmin && recipe.AuthorId != currentUserId)
        {
            throw new ForbiddenAccessException("Bạn không có quyền xóa công thức này.");
        }

        recipe.IsDeleted = true;
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return true;
    }
}
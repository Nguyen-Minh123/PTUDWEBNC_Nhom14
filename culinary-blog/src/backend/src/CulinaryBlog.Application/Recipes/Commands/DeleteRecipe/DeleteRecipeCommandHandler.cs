using CulinaryBlog.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Recipes.Commands.DeleteRecipe;

public sealed class DeleteRecipeCommandHandler
    : IRequestHandler<DeleteRecipeCommand, Unit>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly ICurrentUserService _currentUserService;

    public DeleteRecipeCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
    {
        _dbContext = dbContext;
        _currentUserService = currentUserService;
    }

    public async Task<Unit> Handle(
        DeleteRecipeCommand request,
        CancellationToken cancellationToken)
    {
        var recipe = await _dbContext.Recipes
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (recipe is null)
        {
            throw new InvalidOperationException($"Recipe with Id '{request.Id}' was not found.");
        }

        var currentUserId = _currentUserService.UserId;
        var isAdmin = _currentUserService.IsInRole("Admin");

        if (!isAdmin && recipe.AuthorId != currentUserId)
        {
            throw new CulinaryBlog.Domain.Exceptions.ForbiddenAccessException("Bạn không có quyền xóa công thức này.");
        }

        _dbContext.Recipes.Remove(recipe);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
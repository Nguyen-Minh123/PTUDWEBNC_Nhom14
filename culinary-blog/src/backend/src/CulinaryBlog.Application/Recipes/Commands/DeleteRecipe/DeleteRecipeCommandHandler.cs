using CulinaryBlog.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Recipes.Commands.DeleteRecipe;

/// <summary>
/// Command handler dùng để xóa Recipe.
/// 
/// Vì hệ thống đang theo hướng Clean Architecture + EF Core abstraction,
/// handler sẽ làm việc trực tiếp với IApplicationDbContext thay vì đi qua
/// IUnitOfWork.Recipes.
/// </summary>
public sealed class DeleteRecipeCommandHandler
    : IRequestHandler<DeleteRecipeCommand, Unit>
{
    private readonly IApplicationDbContext _dbContext;

    public DeleteRecipeCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Unit> Handle(
        DeleteRecipeCommand request,
        CancellationToken cancellationToken)
    {
        // Tìm recipe theo Id.
        var recipe = await _dbContext.Recipes
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (recipe is null)
        {
            throw new InvalidOperationException($"Recipe with Id '{request.Id}' was not found.");
        }

        // Nếu hệ thống có SoftDeleteInterceptor, Remove() sẽ được interceptor
        // chuyển thành soft delete thay vì xóa vật lý.
        _dbContext.Recipes.Remove(recipe);

        // Lưu thay đổi xuống database.
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
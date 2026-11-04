namespace CulinaryBlog.Application.Common.Interfaces;

public interface IUnitOfWork
{
    IRecipeRepository Recipes { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
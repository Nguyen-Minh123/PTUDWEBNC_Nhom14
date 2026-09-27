using CulinaryBlog.Application.Common.Interfaces;

namespace CulinaryBlog.Infrastructure.Persistence.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly CulinaryBlogDbContext _context;

    public UnitOfWork(CulinaryBlogDbContext context, IRecipeRepository recipes)
    {
        _context = context;
        Recipes = recipes;
    }

    public IRecipeRepository Recipes { get; }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }
}

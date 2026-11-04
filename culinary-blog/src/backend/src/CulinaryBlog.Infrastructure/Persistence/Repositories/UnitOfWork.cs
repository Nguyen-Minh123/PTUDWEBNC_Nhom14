using CulinaryBlog.Application.Common.Interfaces;

namespace CulinaryBlog.Infrastructure.Persistence.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly CulinaryBlogDbContext _db;
    private IRecipeRepository? _recipes;

    public UnitOfWork(CulinaryBlogDbContext db)
    {
        _db = db;
    }

    public IRecipeRepository Recipes => _recipes ??= new RecipeRepository(_db);

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _db.SaveChangesAsync(cancellationToken);
    }
}

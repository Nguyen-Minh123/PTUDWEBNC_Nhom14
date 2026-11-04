using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Infrastructure.Persistence.Repositories;

public class RecipeRepository : IRecipeRepository
{
    private readonly CulinaryBlogDbContext _db;

    public RecipeRepository(CulinaryBlogDbContext db)
    {
        _db = db;
    }

    public async Task<Recipe?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        return await _db.Recipes.FirstOrDefaultAsync(r => r.Id == id, ct);
    }

    public async Task<Recipe?> GetByIdWithDetailsAsync(Guid id, CancellationToken ct = default)
    {
        return await _db.Recipes
            .AsSplitQuery()
            .Include(r => r.Category)
            .Include(r => r.Steps.OrderBy(s => s.StepNumber))
            .Include(r => r.Ingredients.OrderBy(i => i.OrderIndex))
            .Include(r => r.Images)
            .FirstOrDefaultAsync(r => r.Id == id, ct);
    }

    public async Task<Recipe?> GetBySlugAsync(string slug, CancellationToken ct = default)
    {
         return await _db.Recipes.FirstOrDefaultAsync(r => r.Slug == slug, ct);
    }

    public async Task<Recipe?> GetBySlugWithDetailsAsync(string slug, CancellationToken ct = default)
    {
        return await _db.Recipes
            .AsSplitQuery()
            .Include(r => r.Category)
            .Include(r => r.Steps.OrderBy(s => s.StepNumber))
            .Include(r => r.Ingredients.OrderBy(i => i.OrderIndex))
            .Include(r => r.Images)
            .FirstOrDefaultAsync(r => r.Slug == slug, ct);
    }

    public async Task<bool> SlugExistsAsync(string slug, Guid? excludeRecipeId = null, CancellationToken ct = default)
    {
        var query = _db.Recipes.Where(r => r.Slug == slug);
        if (excludeRecipeId.HasValue)
        {
            query = query.Where(r => r.Id != excludeRecipeId.Value);
        }
        return await query.AnyAsync(ct);
    }

    public async Task AddAsync(Recipe recipe, CancellationToken ct = default)
    {
        await _db.Recipes.AddAsync(recipe, ct);
    }

    public void Update(Recipe recipe)
    {
        _db.Recipes.Update(recipe);
    }

    public void Remove(Recipe recipe)
    {
        _db.Recipes.Remove(recipe);
    }

    public async Task<IReadOnlyList<Recipe>> GetPagedAsync(
        int page,
        int pageSize,
        Guid? categoryId = null,
        RecipeStatus? status = null,
        string? keyword = null,
        CancellationToken cancellationToken = default)
    {
        var query = _db.Recipes.AsNoTracking();

        if (categoryId.HasValue)
            query = query.Where(r => r.CategoryId == categoryId.Value);

        if (status.HasValue)
            query = query.Where(r => r.Status == status.Value);

        if (!string.IsNullOrWhiteSpace(keyword))
        {
            var tsQuery = EF.Functions.PlainToTsQuery("simple", keyword);
            query = query.Where(r => r.SearchVector!.Matches(tsQuery))
                         .OrderByDescending(r => r.SearchVector!.Rank(tsQuery));
        }
        else
        {
            query = query.OrderByDescending(r => r.CreatedAt);
        }

        return await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Include(r => r.Category)
            .Include(r => r.Images)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> CountAsync(
        Guid? categoryId = null,
        RecipeStatus? status = null,
        string? keyword = null,
        CancellationToken cancellationToken = default)
    {
        var query = _db.Recipes.AsNoTracking();

        if (categoryId.HasValue)
            query = query.Where(r => r.CategoryId == categoryId.Value);

        if (status.HasValue)
            query = query.Where(r => r.Status == status.Value);

        if (!string.IsNullOrWhiteSpace(keyword))
        {
            var tsQuery = EF.Functions.PlainToTsQuery("simple", keyword);
            query = query.Where(r => r.SearchVector!.Matches(tsQuery));
        }

        return await query.CountAsync(cancellationToken);
    }
}

using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Infrastructure.Persistence.Repositories;

public class RecipeRepository : IRecipeRepository
{
    private readonly CulinaryBlogDbContext _context;

    public RecipeRepository(CulinaryBlogDbContext context)
    {
        _context = context;
    }

    public async Task<Recipe?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Recipes.FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
    }

    public async Task<Recipe?> GetByIdWithDetailsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Recipes
            .Include(r => r.Ingredients)
            .Include(r => r.Steps)
            .Include(r => r.Images)
            .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
    }

    public async Task<Recipe?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        return await _context.Recipes.FirstOrDefaultAsync(r => r.Slug == slug, cancellationToken);
    }

    public async Task<Recipe?> GetBySlugWithDetailsAsync(string slug, CancellationToken cancellationToken = default)
    {
        return await _context.Recipes
            .Include(r => r.Ingredients)
            .Include(r => r.Steps)
            .Include(r => r.Images)
            .FirstOrDefaultAsync(r => r.Slug == slug, cancellationToken);
    }

    public async Task<bool> SlugExistsAsync(string slug, Guid? excludeRecipeId = null, CancellationToken cancellationToken = default)
    {
        var query = _context.Recipes.Where(r => r.Slug == slug);
        if (excludeRecipeId.HasValue)
        {
            query = query.Where(r => r.Id != excludeRecipeId.Value);
        }
        return await query.AnyAsync(cancellationToken);
    }

    public async Task AddAsync(Recipe recipe, CancellationToken cancellationToken = default)
    {
        await _context.Recipes.AddAsync(recipe, cancellationToken);
    }

    public void Update(Recipe recipe)
    {
        _context.Recipes.Update(recipe);
    }

    public void Remove(Recipe recipe)
    {
        _context.Recipes.Remove(recipe);
    }

    public async Task<IReadOnlyList<Recipe>> GetPagedAsync(int page, int pageSize, Guid? categoryId = null, RecipeStatus? status = null, string? keyword = null, CancellationToken cancellationToken = default)
    {
        var query = _context.Recipes.AsQueryable();

        if (categoryId.HasValue)
        {
            query = query.Where(r => r.CategoryId == categoryId.Value);
        }

        if (status.HasValue)
        {
            query = query.Where(r => r.Status == status.Value);
        }

        if (!string.IsNullOrWhiteSpace(keyword))
        {
            query = query.Where(r => r.Title.Contains(keyword) || r.Description.Contains(keyword));
        }

        return await query
            .OrderByDescending(r => r.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }
}

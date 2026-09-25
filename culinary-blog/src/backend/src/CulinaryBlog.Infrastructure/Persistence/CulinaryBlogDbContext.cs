using CulinaryBlog.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Infrastructure.Persistence;

public class CulinaryBlogDbContext : IdentityDbContext<ApplicationUser>
{
    public DbSet<Recipe> Recipes => Set<Recipe>();

    public DbSet<RecipeIngredient> RecipeIngredients => Set<RecipeIngredient>();

    public DbSet<RecipeStep> RecipeSteps => Set<RecipeStep>();

    public CulinaryBlogDbContext(DbContextOptions<CulinaryBlogDbContext> options) 
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        // Tùy chỉnh tên bảng mặc định của Identity (tùy chọn)
        builder.Entity<ApplicationUser>().ToTable("AspNetUsers");
        builder.ApplyConfigurationsFromAssembly(typeof(CulinaryBlogDbContext).Assembly);
    }
}
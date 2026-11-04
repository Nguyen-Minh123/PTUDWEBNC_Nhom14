using CulinaryBlog.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Common.Interfaces;

/// <summary>
/// Giao diện trừu tượng của DbContext cho tầng Application, tuân thủ nguyên tắc Dependency Inversion (DIP)
/// trong Clean Architecture để các Query/Command Handlers có thể truy vấn trực tiếp với AsNoTracking() và Projection.
/// </summary>
public interface IApplicationDbContext
{
    DbSet<Recipe> Recipes { get; }
    DbSet<Category> Categories { get; }
    DbSet<RecipeIngredient> RecipeIngredients { get; }
    DbSet<RecipeStep> RecipeSteps { get; }
    DbSet<RecipeImage> RecipeImages { get; }
    DbSet<RecipeFavorite> RecipeFavorites { get; }
    DbSet<RecipeCollection> RecipeCollections { get; }
    DbSet<RecipeCollectionItem> RecipeCollectionItems { get; }
    DbSet<AuditLog> AuditLogs { get; }
    DbSet<ApplicationUser> Users { get; }
    DbSet<IdentityRole<string>> Roles { get; }
    DbSet<IdentityUserRole<string>> UserRoles { get; }
    DbSet<RefreshToken> RefreshTokens { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

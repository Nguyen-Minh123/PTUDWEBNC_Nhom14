using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Infrastructure.Persistence;

/// <summary>
/// DbContext chính của hệ thống.
/// 
/// Vai trò:
/// - Quản lý Identity tables
/// - Quản lý các bảng nghiệp vụ như Category, Recipe, RecipeStep, ...
/// - Là implementation cụ thể của IApplicationDbContext và IUnitOfWork
/// </summary>
public class CulinaryBlogDbContext
    : IdentityDbContext<ApplicationUser, IdentityRole<string>, string>,
      IApplicationDbContext,
      IUnitOfWork
{
    /// <summary>
    /// Khởi tạo DbContext với options được DI cung cấp.
    /// </summary>
    public CulinaryBlogDbContext(DbContextOptions<CulinaryBlogDbContext> options)
        : base(options)
    {
    }

    /// <summary>
    /// Bảng Categories.
    /// </summary>
    public DbSet<Category> Categories => Set<Category>();

    /// <summary>
    /// Bảng Recipes.
    /// </summary>
    public DbSet<Recipe> Recipes => Set<Recipe>();

    /// <summary>
    /// Bảng RecipeSteps.
    /// </summary>
    public DbSet<RecipeStep> RecipeSteps => Set<RecipeStep>();

    /// <summary>
    /// Bảng RecipeIngredients.
    /// </summary>
    public DbSet<RecipeIngredient> RecipeIngredients => Set<RecipeIngredient>();

    /// <summary>
    /// Bảng RecipeImages.
    /// </summary>
    public DbSet<RecipeImage> RecipeImages => Set<RecipeImage>();

    /// <summary>
    /// Override SaveChangesAsync để DbContext thực thi vai trò Unit of Work.
    /// 
    /// Nếu bạn có interceptor audit/soft delete thì vẫn có thể giữ ở pipeline,
    /// còn DbContext chỉ chịu trách nhiệm lưu dữ liệu.
    /// </summary>
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return base.SaveChangesAsync(cancellationToken);
    }

    /// <summary>
    /// Cấu hình mapping model sang database.
    /// </summary>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        ConfigureIdentityTables(modelBuilder);
        ConfigureCategory(modelBuilder);
        ConfigureRecipe(modelBuilder);
        ConfigureRecipeStep(modelBuilder);
        ConfigureRecipeIngredient(modelBuilder);
        ConfigureRecipeImage(modelBuilder);
    }

    /// <summary>
    /// Đổi tên các bảng Identity về format thống nhất với project.
    /// </summary>
    private static void ConfigureIdentityTables(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ApplicationUser>().ToTable("AspNetUsers");
        modelBuilder.Entity<IdentityRole<string>>().ToTable("AspNetRoles");
        modelBuilder.Entity<IdentityUserRole<string>>().ToTable("AspNetUserRoles");
        modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("AspNetUserClaims");
        modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("AspNetUserLogins");
        modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("AspNetRoleClaims");
        modelBuilder.Entity<IdentityUserToken<string>>().ToTable("AspNetUserTokens");
    }

    /// <summary>
    /// Cấu hình bảng Category.
    /// </summary>
    private static void ConfigureCategory(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<Category>();

        entity.ToTable("Categories");
        entity.HasKey(x => x.Id);

        // Id do application tự sinh, không để database sinh tự động.
        entity.Property(x => x.Id)
            .ValueGeneratedNever();

        entity.Property(x => x.Name)
            .HasMaxLength(100)
            .IsRequired();

        entity.HasIndex(x => x.Name)
            .IsUnique();

        entity.Property(x => x.Slug)
            .HasMaxLength(120)
            .IsRequired();

        entity.HasIndex(x => x.Slug)
            .IsUnique();

        entity.Property(x => x.Description)
            .HasColumnType("text")
            .IsRequired(false);

        entity.Property(x => x.ImageUrl)
            .HasMaxLength(500)
            .IsRequired(false);

        entity.Property(x => x.OrderIndex)
            .HasDefaultValue(0)
            .IsRequired();

        entity.Property(x => x.CreatedAt)
            .IsRequired();

        entity.Property(x => x.UpdatedAt)
            .IsRequired(false);

        entity.Property(x => x.IsDeleted)
            .HasDefaultValue(false)
            .IsRequired();

        entity.Property(x => x.RowVersion)
            .IsRowVersion();

        // Soft delete filter.
        entity.HasQueryFilter(x => !x.IsDeleted);
    }

    /// <summary>
    /// Cấu hình bảng Recipe.
    /// </summary>
    private static void ConfigureRecipe(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<Recipe>();

        entity.ToTable("Recipes");
        entity.HasKey(x => x.Id);

        entity.Property(x => x.Id)
            .ValueGeneratedNever();

        entity.Property(x => x.Title)
            .HasMaxLength(200)
            .IsRequired();

        entity.Property(x => x.Slug)
            .HasMaxLength(220)
            .IsRequired();

        entity.HasIndex(x => x.Slug)
            .IsUnique();

        entity.Property(x => x.Description)
            .HasMaxLength(2000)
            .IsRequired();

        entity.Property(x => x.Instructions)
            .HasColumnType("text")
            .IsRequired();

        entity.Property(x => x.PrepTime)
            .IsRequired();

        entity.Property(x => x.CookTime)
            .IsRequired();

        entity.Property(x => x.Servings)
            .IsRequired();

        entity.Property(x => x.Difficulty)
            .HasConversion<int>()
            .HasDefaultValue(RecipeDifficulty.Easy)
            .IsRequired();

        entity.Property(x => x.Status)
            .HasConversion<int>()
            .HasDefaultValue(RecipeStatus.Draft)
            .IsRequired();

        entity.Property(x => x.CategoryId)
            .IsRequired();

        entity.Property(x => x.AuthorId)
            .HasMaxLength(450)
            .IsRequired();

        entity.Property(x => x.PublishedAt)
            .IsRequired(false);

        entity.Property(x => x.CreatedAt)
            .IsRequired();

        entity.Property(x => x.UpdatedAt)
            .IsRequired(false);

        entity.Property(x => x.IsDeleted)
            .HasDefaultValue(false)
            .IsRequired();

        entity.Property(x => x.RowVersion)
            .IsRowVersion();

        entity.HasIndex(x => x.CategoryId);
        entity.HasIndex(x => x.AuthorId);
        entity.HasIndex(x => x.Status);
        entity.HasIndex(x => x.PublishedAt);
        entity.HasIndex(x => x.Difficulty);

        entity.HasOne<Category>()
            .WithMany()
            .HasForeignKey(x => x.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        entity.HasOne<ApplicationUser>()
            .WithMany()
            .HasForeignKey(x => x.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        // Value object Nutrition được map vào cùng bảng Recipes.
        entity.OwnsOne(x => x.Nutrition, nutrition =>
        {
            nutrition.Property(x => x.Calories)
                .HasColumnName("Nutrition_Calories")
                .HasPrecision(8, 2);

            nutrition.Property(x => x.Protein)
                .HasColumnName("Nutrition_Protein")
                .HasPrecision(8, 2);

            nutrition.Property(x => x.Carbohydrates)
                .HasColumnName("Nutrition_Carbohydrates")
                .HasPrecision(8, 2);

            nutrition.Property(x => x.Fat)
                .HasColumnName("Nutrition_Fat")
                .HasPrecision(8, 2);

            nutrition.Property(x => x.Fiber)
                .HasColumnName("Nutrition_Fiber")
                .HasPrecision(8, 2);

            nutrition.Property(x => x.Sodium)
                .HasColumnName("Nutrition_Sodium")
                .HasPrecision(8, 2);
        });

        entity.HasMany(x => x.Steps)
            .WithOne(x => x.Recipe)
            .HasForeignKey(x => x.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasMany(x => x.Ingredients)
            .WithOne(x => x.Recipe)
            .HasForeignKey(x => x.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasMany(x => x.Images)
            .WithOne(x => x.Recipe)
            .HasForeignKey(x => x.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        // Soft delete filter.
        entity.HasQueryFilter(x => !x.IsDeleted);

        /// <summary>
        /// Cấu hình optimistic concurrency token.
        /// Npgsql sẽ dùng xmin cho property uint này.
        /// </summary>
        entity.Property(x => x.RowVersion)
            .IsRowVersion();
    }

    /// <summary>
    /// Cấu hình bảng RecipeSteps.
    /// </summary>
    private static void ConfigureRecipeStep(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<RecipeStep>();

        entity.ToTable("RecipeSteps");
        entity.HasKey(x => x.Id);

        entity.Property(x => x.Id)
            .ValueGeneratedNever();

        entity.Property(x => x.RecipeId)
            .IsRequired();

        entity.Property(x => x.StepNumber)
            .IsRequired();

        entity.Property(x => x.Title)
            .HasMaxLength(200)
            .IsRequired();

        entity.Property(x => x.Description)
            .HasColumnType("text")
            .IsRequired();

        entity.Property(x => x.TimerMinutes)
            .IsRequired(false);

        entity.Property(x => x.ImageUrl)
            .HasMaxLength(500)
            .IsRequired(false);

        entity.HasIndex(x => new { x.RecipeId, x.StepNumber })
            .IsUnique();

        entity.HasIndex(x => x.RecipeId);

        entity.Property(x => x.IsDeleted)
            .HasDefaultValue(false)
            .IsRequired();

        entity.Property(x => x.CreatedAt)
            .IsRequired();

        entity.Property(x => x.UpdatedAt)
            .IsRequired(false);

        entity.Property(x => x.RowVersion)
            .IsRowVersion();

        entity.HasQueryFilter(x => !x.IsDeleted);
    }

    /// <summary>
    /// Cấu hình bảng RecipeIngredients.
    /// </summary>
    private static void ConfigureRecipeIngredient(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<RecipeIngredient>();

        entity.ToTable("RecipeIngredients");
        entity.HasKey(x => x.Id);

        entity.Property(x => x.Id)
            .ValueGeneratedNever();

        entity.Property(x => x.RecipeId)
            .IsRequired();

        entity.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        entity.Property(x => x.Quantity)
            .HasPrecision(10, 3)
            .IsRequired(false);

        entity.Property(x => x.Unit)
            .HasMaxLength(50)
            .IsRequired(false);

        entity.Property(x => x.Notes)
            .HasColumnType("text")
            .IsRequired(false);

        entity.Property(x => x.OrderIndex)
            .HasDefaultValue(0)
            .IsRequired();

        entity.HasIndex(x => new { x.RecipeId, x.OrderIndex });

        entity.HasIndex(x => x.RecipeId);

        entity.Property(x => x.IsDeleted)
            .HasDefaultValue(false)
            .IsRequired();

        entity.Property(x => x.CreatedAt)
            .IsRequired();

        entity.Property(x => x.UpdatedAt)
            .IsRequired(false);

        entity.Property(x => x.RowVersion)
            .IsRowVersion();

        entity.HasQueryFilter(x => !x.IsDeleted);
    }

    /// <summary>
    /// Cấu hình bảng RecipeImages.
    /// </summary>
    private static void ConfigureRecipeImage(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<RecipeImage>();

        entity.ToTable("RecipeImages");
        entity.HasKey(x => x.Id);

        entity.Property(x => x.Id)
            .ValueGeneratedNever();

        entity.Property(x => x.RecipeId)
            .IsRequired();

        entity.Property(x => x.OriginalUrl)
            .HasMaxLength(500)
            .IsRequired();

        entity.Property(x => x.MediumUrl)
            .HasMaxLength(500)
            .IsRequired(false);

        entity.Property(x => x.ThumbnailUrl)
            .HasMaxLength(500)
            .IsRequired(false);

        entity.Property(x => x.AltText)
            .HasMaxLength(200)
            .IsRequired(false);

        entity.Property(x => x.IsPrimary)
            .HasDefaultValue(false)
            .IsRequired();

        entity.Property(x => x.OrderIndex)
            .HasDefaultValue(0)
            .IsRequired();

        entity.HasIndex(x => new { x.RecipeId, x.OrderIndex });
        entity.HasIndex(x => x.RecipeId);

        entity.Property(x => x.IsDeleted)
            .HasDefaultValue(false)
            .IsRequired();

        entity.Property(x => x.CreatedAt)
            .IsRequired();

        entity.Property(x => x.UpdatedAt)
            .IsRequired(false);

        entity.Property(x => x.RowVersion)
            .IsRowVersion();

        entity.HasQueryFilter(x => !x.IsDeleted);
    }
}
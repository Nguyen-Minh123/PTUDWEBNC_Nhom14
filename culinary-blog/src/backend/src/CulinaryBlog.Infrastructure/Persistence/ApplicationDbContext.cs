using CulinaryBlog.Domain.Common;
using CulinaryBlog.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Infrastructure.Persistence;

public class ApplicationDbContext
    : IdentityDbContext<ApplicationUser, IdentityRole<string>, string>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Recipe> Recipes => Set<Recipe>();
    public DbSet<RecipeStep> RecipeSteps => Set<RecipeStep>();
    public DbSet<RecipeIngredient> RecipeIngredients => Set<RecipeIngredient>();
    public DbSet<RecipeImage> RecipeImages => Set<RecipeImage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        ConfigureIdentityTables(modelBuilder);
        ConfigureRecipe(modelBuilder);
        ConfigureRecipeStep(modelBuilder);
        ConfigureRecipeIngredient(modelBuilder);
        ConfigureRecipeImage(modelBuilder);
    }

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
            .IsRequired();

        entity.Property(x => x.Instructions)
            .IsRequired();

        entity.Property(x => x.PrepTime)
            .IsRequired();

        entity.Property(x => x.CookTime)
            .IsRequired();

        entity.Property(x => x.Servings)
            .IsRequired();

        entity.Property(x => x.Difficulty)
            .HasConversion<int>()
            .IsRequired();

        entity.Property(x => x.Status)
            .HasConversion<int>()
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

        entity.HasQueryFilter(x => !x.IsDeleted);
    }

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
            .IsRequired();

        entity.Property(x => x.TimerMinutes)
            .IsRequired(false);

        entity.Property(x => x.ImageUrl)
            .HasMaxLength(500)
            .IsRequired(false);

        entity.HasIndex(x => new { x.RecipeId, x.StepNumber })
            .IsUnique();

        entity.HasQueryFilter(x => !x.IsDeleted);
    }

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
            .IsRequired(false);

        entity.Property(x => x.Unit)
            .HasMaxLength(50)
            .IsRequired(false);

        entity.Property(x => x.Notes)
            .HasMaxLength(500)
            .IsRequired(false);

        entity.Property(x => x.OrderIndex)
            .IsRequired();

        entity.HasIndex(x => new { x.RecipeId, x.OrderIndex });

        entity.HasQueryFilter(x => !x.IsDeleted);
    }

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
            .IsRequired();

        entity.HasIndex(x => new { x.RecipeId, x.OrderIndex });

        entity.HasQueryFilter(x => !x.IsDeleted);
    }
}
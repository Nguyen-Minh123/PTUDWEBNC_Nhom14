using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CulinaryBlog.Infrastructure.Persistence.Configurations;

public sealed class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
{
    public void Configure(EntityTypeBuilder<Recipe> builder)
    {
        builder.ToTable("Recipes");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.Property(x => x.Title)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.Slug)
            .HasMaxLength(220)
            .IsRequired();

        builder.HasIndex(x => x.Slug)
            .IsUnique();

        builder.Property(x => x.Description)
            .IsRequired();

        builder.Property(x => x.Instructions)
            .IsRequired();

        builder.Property(x => x.PrepTime)
            .IsRequired();

        builder.Property(x => x.CookTime)
            .IsRequired();

        builder.Property(x => x.Servings)
            .IsRequired();

        builder.Property(x => x.Difficulty)
            .HasConversion<int>()
            .IsRequired();

        builder.Property(x => x.Status)
            .HasConversion<int>()
            .IsRequired();

        builder.Property(x => x.CategoryId)
            .IsRequired();

        builder.Property(x => x.AuthorId)
            .HasMaxLength(450)
            .IsRequired();

        builder.Property(x => x.PublishedAt)
            .IsRequired(false);

        builder.Property(x => x.CreatedAt)
            .IsRequired();

        builder.Property(x => x.UpdatedAt)
            .IsRequired(false);

        builder.Property(x => x.IsDeleted)
            .HasDefaultValue(false)
            .IsRequired();

        builder.Property(x => x.RowVersion)
            .IsRowVersion();

        builder.HasIndex(x => x.CategoryId);
        builder.HasIndex(x => x.AuthorId);
        builder.HasIndex(x => x.Status);
        builder.HasIndex(x => x.PublishedAt);
        builder.HasIndex(x => x.Difficulty);

        builder.HasOne<Category>()
            .WithMany()
            .HasForeignKey(x => x.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne<ApplicationUser>()
            .WithMany()
            .HasForeignKey(x => x.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.OwnsOne(x => x.Nutrition, nutrition =>
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

        builder.HasMany(x => x.Steps)
            .WithOne(x => x.Recipe)
            .HasForeignKey(x => x.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Ingredients)
            .WithOne(x => x.Recipe)
            .HasForeignKey(x => x.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Images)
            .WithOne(x => x.Recipe)
            .HasForeignKey(x => x.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
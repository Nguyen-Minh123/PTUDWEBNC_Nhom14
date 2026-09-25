using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CulinaryBlog.Infrastructure.Persistence.Configurations;

public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
{
    public void Configure(EntityTypeBuilder<Recipe> builder)
    {
        builder.ToTable("Recipes");
        builder.HasKey(recipe => recipe.Id);
        builder.Property(recipe => recipe.Title).HasMaxLength(200).IsRequired();
        builder.Property(recipe => recipe.Description).HasMaxLength(4000);
        builder.Property(recipe => recipe.IsPublished).IsRequired();
        builder.Property(recipe => recipe.CreatedAt).IsRequired();
        builder.Property(recipe => recipe.RowVersion).IsRowVersion();

        builder.HasMany(recipe => recipe.Ingredients)
            .WithOne()
            .HasForeignKey("RecipeId")
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(recipe => recipe.Steps)
            .WithOne()
            .HasForeignKey("RecipeId")
            .OnDelete(DeleteBehavior.Cascade);

        builder.Navigation(recipe => recipe.Ingredients).UsePropertyAccessMode(PropertyAccessMode.Field);
        builder.Navigation(recipe => recipe.Steps).UsePropertyAccessMode(PropertyAccessMode.Field);

        builder.OwnsOne(recipe => recipe.NutritionInfo, nutrition =>
        {
            nutrition.Property(value => value.Calories).HasColumnName("Calories").HasPrecision(10, 2);
            nutrition.Property(value => value.Protein).HasColumnName("Protein").HasPrecision(10, 2);
            nutrition.Property(value => value.Carbohydrates).HasColumnName("Carbohydrates").HasPrecision(10, 2);
            nutrition.Property(value => value.Fat).HasColumnName("Fat").HasPrecision(10, 2);
            nutrition.Property(value => value.Fiber).HasColumnName("Fiber").HasPrecision(10, 2);
            nutrition.Property(value => value.Sugar).HasColumnName("Sugar").HasPrecision(10, 2);
        });

        builder.Navigation(recipe => recipe.NutritionInfo).IsRequired();
    }
}

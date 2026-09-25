using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CulinaryBlog.Infrastructure.Persistence.Configurations;

public class RecipeIngredientConfiguration : IEntityTypeConfiguration<RecipeIngredient>
{
    public void Configure(EntityTypeBuilder<RecipeIngredient> builder)
    {
        builder.ToTable("RecipeIngredients");
        builder.HasKey(ingredient => ingredient.Id);
        builder.Property(ingredient => ingredient.Name).HasMaxLength(200).IsRequired();
        builder.Property(ingredient => ingredient.Quantity).HasPrecision(10, 2);
        builder.Property(ingredient => ingredient.Unit).HasMaxLength(50);
        builder.Property(ingredient => ingredient.RowVersion).IsRowVersion();
    }
}

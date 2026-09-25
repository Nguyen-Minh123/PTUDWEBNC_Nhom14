using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CulinaryBlog.Infrastructure.Persistence.Configurations;

public class RecipeStepConfiguration : IEntityTypeConfiguration<RecipeStep>
{
    public void Configure(EntityTypeBuilder<RecipeStep> builder)
    {
        builder.ToTable("RecipeSteps");
        builder.HasKey(step => step.Id);
        builder.Property(step => step.StepNumber).IsRequired();
        builder.Property(step => step.Instruction).HasMaxLength(4000).IsRequired();
        builder.Property(step => step.RowVersion).IsRowVersion();
        builder.HasIndex("RecipeId", nameof(RecipeStep.StepNumber)).IsUnique();
    }
}

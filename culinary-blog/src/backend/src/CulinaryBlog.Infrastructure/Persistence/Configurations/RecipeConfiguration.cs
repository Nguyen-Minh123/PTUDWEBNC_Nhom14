using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NpgsqlTypes;

namespace CulinaryBlog.Infrastructure.Persistence.Configurations;

/// <summary>
/// Cấu hình ánh xạ Entity Recipe sang bảng Recipes trong PostgreSQL.
/// 
/// Ngoài các cột dữ liệu nghiệp vụ, file này còn cấu hình SearchVector
/// để hỗ trợ full-text search bằng PostgreSQL tsvector + GIN index.
/// </summary>
public sealed class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
{
    // Tên cột shadow property dùng cho full-text search.
    // Vì đây là chi tiết persistence nên không đặt trong Domain entity.
    private const string SearchVectorPropertyName = "SearchVector";

    // Cấu hình full-text search dùng "simple" để phù hợp nội dung tiếng Việt / mixed content.
    // Nếu hệ thống của bạn chủ yếu là tiếng Anh, có thể đổi sang "english".
    private const string FullTextSearchConfig = "simple";

    public void Configure(EntityTypeBuilder<Recipe> builder)
    {
        builder.ToTable("Recipes");

        // Khóa chính.
        builder.HasKey(x => x.Id);

        // Id do application tự sinh, không để database tự generate.
        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        // Title.
        builder.Property(x => x.Title)
            .HasMaxLength(200)
            .IsRequired();

        // Slug.
        builder.Property(x => x.Slug)
            .HasMaxLength(220)
            .IsRequired();

        // Unique slug để truy vấn chi tiết theo đường dẫn.
        builder.HasIndex(x => x.Slug)
            .IsUnique();

        // Description.
        builder.Property(x => x.Description)
            .IsRequired();

        // Instructions.
        builder.Property(x => x.Instructions)
            .IsRequired();

        // PrepTime.
        builder.Property(x => x.PrepTime)
            .IsRequired();

        // CookTime.
        builder.Property(x => x.CookTime)
            .IsRequired();

        // Servings.
        builder.Property(x => x.Servings)
            .IsRequired();

        // Enum Difficulty lưu dưới dạng int.
        builder.Property(x => x.Difficulty)
            .HasConversion<int>()
            .IsRequired();

        // Enum Status lưu dưới dạng int.
        builder.Property(x => x.Status)
            .HasConversion<int>()
            .IsRequired();

        // CategoryId là foreign key.
        builder.Property(x => x.CategoryId)
            .IsRequired();

        // AuthorId là foreign key tới ASP.NET Identity user.
        builder.Property(x => x.AuthorId)
            .HasMaxLength(450)
            .IsRequired();

        // PublishedAt có thể null nếu recipe còn draft.
        builder.Property(x => x.PublishedAt)
            .IsRequired(false);

        // Cột audit.
        builder.Property(x => x.CreatedAt)
            .IsRequired();

        builder.Property(x => x.UpdatedAt)
            .IsRequired(false);

        // Soft delete.
        builder.Property(x => x.IsDeleted)
            .HasDefaultValue(false)
            .IsRequired();

        // Concurrency token.
        builder.Property(x => x.RowVersion)
            .IsRowVersion();

        // Các index phục vụ filter/sort phổ biến.
        builder.HasIndex(x => x.CategoryId);
        builder.HasIndex(x => x.AuthorId);
        builder.HasIndex(x => x.Status);
        builder.HasIndex(x => x.PublishedAt);
        builder.HasIndex(x => x.Difficulty);

        // Quan hệ Recipe -> Category.
        builder.HasOne<Category>()
            .WithMany()
            .HasForeignKey(x => x.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        // Quan hệ Recipe -> ApplicationUser.
        builder.HasOne<ApplicationUser>()
            .WithMany()
            .HasForeignKey(x => x.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        // Value object Nutrition được map thành owned type.
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

        // Recipe -> Steps.
        builder.HasMany(x => x.Steps)
            .WithOne(x => x.Recipe)
            .HasForeignKey(x => x.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        // Recipe -> Ingredients.
        builder.HasMany(x => x.Ingredients)
            .WithOne(x => x.Recipe)
            .HasForeignKey(x => x.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        // Recipe -> Images.
        builder.HasMany(x => x.Images)
            .WithOne(x => x.Recipe)
            .HasForeignKey(x => x.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        // ============================================================
        // FULL-TEXT SEARCH: SearchVector + GIN
        // ============================================================

        // SearchVector là shadow property nên không cần khai báo trong Recipe.cs.
        // Nó được database sinh tự động từ Title + Description + Instructions.
        builder.Property<NpgsqlTsVector>(SearchVectorPropertyName)
            .HasColumnType("tsvector")
            .HasComputedColumnSql(
                $"to_tsvector('{FullTextSearchConfig}', " +
                "coalesce(\"Title\", '') || ' ' || " +
                "coalesce(\"Description\", '') || ' ' || " +
                "coalesce(\"Instructions\", ''))",
                stored: true);

        // Tạo GIN index để tăng tốc truy vấn full-text search.
        builder.HasIndex(SearchVectorPropertyName)
            .HasDatabaseName("IX_Recipes_SearchVector_GIN")
            .HasMethod("GIN");

        // Soft delete filter.
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
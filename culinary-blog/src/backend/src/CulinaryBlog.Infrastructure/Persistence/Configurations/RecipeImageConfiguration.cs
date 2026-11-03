using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CulinaryBlog.Infrastructure.Persistence.Configurations;

/// <summary>
/// Cấu hình EF Core cho bảng RecipeImages.
/// Tối ưu:
/// - Index theo RecipeId + OrderIndex để render gallery nhanh.
/// - Partial unique index để đảm bảo mỗi recipe chỉ có 1 ảnh chính.
/// </summary>
public sealed class RecipeImageConfiguration : IEntityTypeConfiguration<RecipeImage>
{
    public void Configure(EntityTypeBuilder<RecipeImage> builder)
    {
        builder.ToTable("RecipeImages");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.ObjectKey)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.OriginalUrl)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.ContentType)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.FileSize)
            .IsRequired();

        builder.Property(x => x.ChecksumSha256)
            .HasMaxLength(64);

        builder.Property(x => x.MediumUrl)
            .HasMaxLength(500);

        builder.Property(x => x.ThumbnailUrl)
            .HasMaxLength(500);

        builder.Property(x => x.AltText)
            .HasMaxLength(200);

        builder.Property(x => x.StorageProvider)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.IsPrimary)
            .HasDefaultValue(false);

        builder.Property(x => x.OrderIndex)
            .HasDefaultValue(0);

        builder.Property(x => x.Width);
        builder.Property(x => x.Height);

        builder.HasOne(x => x.Recipe)
            .WithMany(x => x.Images)
            .HasForeignKey(x => x.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        // Tối ưu truy vấn gallery theo recipe.
        builder.HasIndex(x => new { x.RecipeId, x.OrderIndex });

        // Bảo đảm chỉ có một ảnh chính cho mỗi recipe.
        // PostgreSQL partial unique index chỉ áp dụng cho các dòng IsPrimary = true.
        builder.HasIndex(x => new { x.RecipeId, x.IsPrimary })
            .IsUnique()
            .HasFilter("\"IsPrimary\" = true");

        // Nếu bạn thường xuyên tìm theo RecipeId thì index này giúp query list ảnh nhanh hơn.
        builder.HasIndex(x => x.RecipeId);
    }
}
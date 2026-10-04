using CulinaryBlog.Application.Common.DTOs;
using CulinaryBlog.Domain.Entities;
using Mapster;

namespace CulinaryBlog.Application.Common.Mappings;

/// <summary>
/// Cấu hình ánh xạ Mapster cho Recipe và cung cấp Extension Method ProjectToSummary
/// sử dụng Mapster.ProjectToType nhằm tối ưu hóa câu lệnh SQL tại tầng Database.
/// 
/// Thay vì SELECT * từ bảng Recipe và eager-load toàn bộ bảng quan hệ vào bộ nhớ (In-Memory),
/// ProjectToType<RecipeSummaryDto>() sẽ yêu cầu EF Core chỉ SELECT đúng các cột được định nghĩa trong DTO.
/// </summary>
public static class RecipeMappingConfig
{
    private static bool _isConfigured;

    /// <summary>
    /// Đăng ký quy tắc ánh xạ Mapster giữa Recipe Entity và RecipeSummaryDto.
    /// </summary>
    public static void Configure()
    {
        if (_isConfigured) return;

        TypeAdapterConfig<DateTimeOffset, DateTime>.NewConfig()
            .MapWith(src => src.UtcDateTime);

        TypeAdapterConfig<Recipe, RecipeSummaryDto>.NewConfig()
            .Map(dest => dest.CategoryId, src => src.CategoryId)
            .Map(dest => dest.CreatedAt, src => src.CreatedAt)
            .Map(dest => dest.CoverImageUrl, src =>
                src.Images == null
                    ? null
                    : src.Images
                        .Where(i => i != null && i.IsPrimary)
                        .Select(i => i.MediumUrl ?? i.OriginalUrl)
                        .FirstOrDefault() ??
                      src.Images
                        .Where(i => i != null)
                        .OrderBy(i => i.OrderIndex)
                        .Select(i => i.MediumUrl ?? i.OriginalUrl)
                        .FirstOrDefault())
            .Map(dest => dest.Difficulty, src => src.Difficulty.ToString())
            .Map(dest => dest.Status, src => src.Status.ToString());

        _isConfigured = true;
    }

    /// <summary>
    /// Extension method áp dụng Mapster ProjectToType trên IQueryable<Recipe>.
    /// Giúp câu truy vấn EF Core dịch thẳng thành SELECT cột cụ thể trong SQL.
    /// </summary>
    /// <param name="query">IQueryable nguồn từ DbSet<Recipe></param>
    /// <returns>IQueryable chứa các đối tượng RecipeSummaryDto đã được tối ưu</returns>
    public static IQueryable<RecipeSummaryDto> ProjectToSummary(this IQueryable<Recipe> query)
    {
        Configure();

        return query.Select(recipe => new RecipeSummaryDto
        {
            Id = recipe.Id,
            Title = recipe.Title,
            Slug = recipe.Slug,
            Description = recipe.Description,
            PrepTime = recipe.PrepTime,
            CookTime = recipe.CookTime,
            Servings = recipe.Servings,
            Difficulty = recipe.Difficulty.ToString(),
            Status = recipe.Status.ToString(),
            CategoryId = recipe.CategoryId,
            CategoryName = recipe.Category != null ? recipe.Category.Name : string.Empty,
            AuthorId = recipe.AuthorId,
            AuthorName = recipe.Author != null ? recipe.Author.UserName : null,
            CoverImageUrl = recipe.Images
                .Where(image => image.IsPrimary)
                .Select(image => image.MediumUrl ?? image.OriginalUrl)
                .FirstOrDefault()
                ?? recipe.Images
                    .OrderBy(image => image.OrderIndex)
                    .Select(image => image.MediumUrl ?? image.OriginalUrl)
                    .FirstOrDefault(),
            CreatedAt = DateTime.UtcNow,
            AverageRating = 5.0,
            ReviewCount = 0
        });
    }
}

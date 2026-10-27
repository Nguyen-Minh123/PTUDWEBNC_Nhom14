using CulinaryBlog.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Categories.Queries.GetAllCategories;

/// <summary>
/// Xử lý query lấy danh sách danh mục kèm thống kê số bài viết.
/// Handler này chỉ đọc dữ liệu, không chứa business logic ghi dữ liệu.
/// </summary>
public sealed class GetAllCategoriesQueryHandler
    : IRequestHandler<GetAllCategoriesQuery, List<CategorySummaryDto>>
{
    private readonly IApplicationDbContext _dbContext;

    /// <summary>
    /// Tiêm abstraction của DbContext để giữ đúng nguyên tắc Clean Architecture.
    /// </summary>
    public GetAllCategoriesQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <summary>
    /// Truy vấn danh mục theo thứ tự hiển thị,
    /// đồng thời đếm số Recipe thuộc từng danh mục.
    /// </summary>
    public async Task<List<CategorySummaryDto>> Handle(
        GetAllCategoriesQuery request,
        CancellationToken cancellationToken)
    {
        // Lấy dữ liệu dạng read-only để tối ưu hiệu năng.
        // AsNoTracking giúp EF Core không theo dõi entity, phù hợp cho truy vấn đọc.
        var categories = await _dbContext.Categories
            .AsNoTracking()
            .OrderBy(c => c.OrderIndex)
            .ThenBy(c => c.Name)
            .Select(c => new CategorySummaryDto
            {
                Id = c.Id,
                Name = c.Name,
                Slug = c.Slug,
                Description = c.Description,
                ImageUrl = c.ImageUrl,
                OrderIndex = c.OrderIndex,
                RecipeCount = c.Recipes.Count()
            })
            .ToListAsync(cancellationToken);

        return categories;
    }
}
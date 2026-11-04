namespace CulinaryBlog.Application.Common.DTOs;

/// <summary>
/// DTO rút gọn của Recipe dùng cho danh sách (Listing), tìm kiếm (Search), phân trang (Pagination).
/// Được ánh xạ trực tiếp từ IQueryable<Recipe> thông qua Mapster ProjectToType
/// nhằm giảm tải payload mạng, tránh over-fetching dữ liệu và N+1 queries.
/// </summary>
public class RecipeSummaryDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int PrepTime { get; set; }
    public int CookTime { get; set; }
    public int TotalTime => PrepTime + CookTime;
    public int Servings { get; set; }
    public string Difficulty { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    
    // Category info
    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    
    // Author info
    public string AuthorId { get; set; } = string.Empty;
    public string? AuthorName { get; set; }

    // Cover Image
    public string? CoverImageUrl { get; set; }

    // Audit & Social stats
    public DateTime CreatedAt { get; set; }
    public double AverageRating { get; set; } = 5.0;
    public int ReviewCount { get; set; } = 0;
}

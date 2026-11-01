namespace CulinaryBlog.Application.Features.Categories;

/// <summary>
/// DTO rút gọn cho danh mục.
/// Dùng cho màn hình danh sách danh mục kèm thống kê số bài viết.
/// </summary>
public sealed record CategorySummaryDto
{
    /// <summary>
    /// Định danh danh mục.
    /// Giá trị này nên khớp với kiểu Id trong Domain Entity.
    /// </summary>
    public Guid Id { get; init; }

    /// <summary>
    /// Tên hiển thị của danh mục.
    /// </summary>
    public string Name { get; init; } = string.Empty;

    /// <summary>
    /// Slug thân thiện với URL.
    /// </summary>
    public string Slug { get; init; } = string.Empty;

    /// <summary>
    /// Mô tả ngắn của danh mục.
    /// Có thể null nếu chưa khai báo.
    /// </summary>
    public string? Description { get; init; }

    /// <summary>
    /// Ảnh đại diện của danh mục.
    /// Có thể null nếu danh mục không có hình.
    /// </summary>
    public string? ImageUrl { get; init; }

    /// <summary>
    /// Thứ tự hiển thị trên navigation hoặc menu.
    /// </summary>
    public int OrderIndex { get; init; }

    /// <summary>
    /// Số lượng bài viết thuộc danh mục này.
    /// Dùng để hiển thị thống kê trên giao diện.
    /// </summary>
    public int RecipeCount { get; init; }
}
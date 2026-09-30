namespace CulinaryBlog.Application.Common.DTOs;

/// <summary>
/// DTO đại diện cho danh mục công thức (Category).
/// </summary>
public class CategoryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public int OrderIndex { get; set; }
    public int RecipeCount { get; set; }
}

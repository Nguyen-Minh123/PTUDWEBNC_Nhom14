namespace CulinaryBlog.Application.Common.DTOs;

/// <summary>
/// DTO đại diện cho bình luận và đánh giá công thức nấu ăn.
/// Dùng để truyền tải dữ liệu bình luận giữa API Backend và Frontend Next.js.
/// </summary>
public class CommentDto
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid RecipeId { get; set; }
    public string AuthorId { get; set; } = string.Empty;
    public string AuthorName { get; set; } = string.Empty;
    public string? AuthorAvatar { get; set; }
    public int Rating { get; set; } = 5;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int LikesCount { get; set; } = 0;
}

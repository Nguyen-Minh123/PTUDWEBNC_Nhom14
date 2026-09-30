using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Queries.GetRecipesByKeyword;

/// <summary>
/// Query dùng để tìm danh sách Recipe theo từ khóa.
/// 
/// Mục tiêu:
/// - Tìm theo title / description / instructions thông qua full-text search
/// - Trả về danh sách gọn để hiển thị ở màn hình search result
/// - Hỗ trợ giới hạn số lượng bản ghi trả về
/// </summary>
/// <param name="Keyword">Từ khóa người dùng nhập để tìm kiếm.</param>
/// <param name="Take">Số lượng kết quả tối đa cần lấy.</param>
public sealed record GetRecipesByKeywordQuery(
    string Keyword,
    int Take = 20
) : IRequest<IReadOnlyList<RecipeSearchResultDto>>;

/// <summary>
/// DTO dùng cho màn hình hiển thị kết quả tìm kiếm Recipe.
/// 
/// Chỉ lấy các trường cần thiết để:
/// - tối ưu dữ liệu trả về
/// - tránh trả về entity trực tiếp
/// - dễ dùng cho frontend
/// </summary>
public sealed record RecipeSearchResultDto
{
    /// <summary>
    /// Id của Recipe.
    /// </summary>
    public Guid Id { get; init; }

    /// <summary>
    /// Tiêu đề của Recipe.
    /// </summary>
    public string Title { get; init; } = string.Empty;

    /// <summary>
    /// Slug phục vụ điều hướng chi tiết.
    /// </summary>
    public string Slug { get; init; } = string.Empty;

    /// <summary>
    /// Mô tả ngắn của Recipe.
    /// </summary>
    public string Description { get; init; } = string.Empty;

    /// <summary>
    /// Thời gian chuẩn bị.
    /// </summary>
    public int PrepTime { get; init; }

    /// <summary>
    /// Thời gian nấu.
    /// </summary>
    public int CookTime { get; init; }

    /// <summary>
    /// Số phần ăn.
    /// </summary>
    public int Servings { get; init; }

    /// <summary>
    /// Mức độ khó.
    /// </summary>
    public int Difficulty { get; init; }

    /// <summary>
    /// Trạng thái Recipe.
    /// </summary>
    public int Status { get; init; }

    /// <summary>
    /// Id danh mục của Recipe.
    /// </summary>
    public Guid CategoryId { get; init; }

    /// <summary>
    /// Id tác giả tạo Recipe.
    /// </summary>
    public string AuthorId { get; init; } = string.Empty;

    /// <summary>
    /// Thời điểm Recipe được publish, nếu có.
    /// </summary>
    public DateTimeOffset? PublishedAt { get; init; }
}


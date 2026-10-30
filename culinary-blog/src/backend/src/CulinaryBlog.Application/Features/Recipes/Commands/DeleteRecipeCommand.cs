using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Commands.DeleteRecipe;

/// <summary>
/// Command dùng để xóa Recipe theo Id.
/// 
/// Chức năng:
/// - Nhận thông tin xóa từ API.
/// - Truyền xuống DeleteRecipeCommandHandler qua MediatR.
/// - Có hỗ trợ concurrency token để tránh xóa đè dữ liệu đã bị cập nhật.
/// </summary>
public sealed record DeleteRecipeCommand : IRequest<Unit>
{
    /// <summary>
    /// Định danh của Recipe cần xóa.
    /// </summary>
    public Guid Id { get; init; }

    /// <summary>
    /// Concurrency token của Recipe.
    /// Dùng để bảo đảm bản ghi chưa bị thay đổi bởi user khác trước khi xóa.
    /// </summary>
    public byte[] RowVersion { get; init; } = Array.Empty<byte>();
}

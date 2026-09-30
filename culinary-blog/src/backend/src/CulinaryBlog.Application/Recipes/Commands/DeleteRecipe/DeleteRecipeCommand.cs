using MediatR;

namespace CulinaryBlog.Application.Recipes.Commands.DeleteRecipe;

/// <summary>
/// Command dùng để xóa một Recipe theo Id.
/// 
/// Mục tiêu:
/// - Chỉ chứa dữ liệu đầu vào của thao tác xóa
/// - Không chứa logic nghiệp vụ
/// - Được handler xử lý trong tầng Application
/// </summary>
/// <param name="Id">Id của Recipe cần xóa.</param>
public sealed record DeleteRecipeCommand(Guid Id) : IRequest<bool>;
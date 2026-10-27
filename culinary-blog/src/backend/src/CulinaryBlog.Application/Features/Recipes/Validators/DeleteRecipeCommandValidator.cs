using FluentValidation;

namespace CulinaryBlog.Application.Features.Recipes.Commands.DeleteRecipe;

/// <summary>
/// Validator cho DeleteRecipeCommand.
///
/// Chức năng:
/// - Kiểm tra dữ liệu đầu vào trước khi vào handler.
/// - Chặn xóa khi thiếu Id hoặc thiếu RowVersion.
/// - Giảm nguy cơ lỗi concurrency và lỗi request rỗng.
/// </summary>
public sealed class DeleteRecipeCommandValidator : AbstractValidator<DeleteRecipeCommand>
{
    /// <summary>
    /// Khởi tạo toàn bộ rule validate cho command xóa Recipe.
    /// </summary>
    public DeleteRecipeCommandValidator()
    {
        // [MỚI] Bắt buộc phải có Id hợp lệ để xác định bản ghi cần xóa.
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Recipe Id is required.");

        // [MỚI] Bắt buộc có RowVersion để đảm bảo xóa đúng phiên bản dữ liệu mới nhất.
        RuleFor(x => x.RowVersion)
            .NotNull()
            .WithMessage("RowVersion is required.")
            .Must(x => x is { Length: > 0 })
            .WithMessage("RowVersion must not be empty.");
    }
}

using CulinaryBlog.Application.Common.Exceptions;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Commands.UpdateRecipe;

/// <summary>
/// Xử lý cập nhật Recipe có kiểm tra concurrency token.
/// </summary>
public sealed class UpdateRecipeCommandHandler
    : IRequestHandler<UpdateRecipeCommand, RecipeDto>
{
    private readonly IApplicationDbContext _db;
    private readonly ICurrentUserService _currentUser;

    /// <summary>
    /// Khởi tạo handler với DbContext abstraction và current user service.
    /// </summary>
    public UpdateRecipeCommandHandler(
        IApplicationDbContext db,
        ICurrentUserService currentUser)
    {
        _db = db;
        _currentUser = currentUser;
    }

    /// <summary>
    /// Cập nhật Recipe theo Id và RowVersion.
    /// </summary>
    public async Task<RecipeDto> Handle(UpdateRecipeCommand request, CancellationToken cancellationToken)
    {
        // Lấy đúng bản ghi còn khớp concurrency token mà client gửi lên.
        // Nếu không có bản ghi nào khớp, ta sẽ phân biệt giữa "không tồn tại" và "xung đột concurrency".
        var recipe = await _db.Recipes
            .FirstOrDefaultAsync(
                x => x.Id == request.Id && x.RowVersion == request.RowVersion,
                cancellationToken);

        // Phân biệt lỗi "không tìm thấy" với lỗi "đã bị người khác cập nhật".
        if (recipe is null)
        {
            var exists = await _db.Recipes
                .AnyAsync(x => x.Id == request.Id, cancellationToken);

            if (!exists)
            {
                throw new KeyNotFoundException("Recipe not found.");
            }

            throw new ConcurrencyConflictException(
                "Recipe was updated by another user. Please reload and try again.");
        }

        // Chỉ cho phép tác giả hoặc người có quyền hợp lệ thao tác với recipe này.
        if (!CurrentUserAuthorization.CanManageRecipe(_currentUser, recipe.AuthorId))
        {
            throw new UnauthorizedAccessException("You do not have permission to update this recipe.");
        }

        // Kiểm tra Category tồn tại trước khi cập nhật để tránh lỗi FK ở tầng database.
        var categoryExists = await _db.Categories
            .AnyAsync(x => x.Id == request.CategoryId, cancellationToken);

        if (!categoryExists)
        {
            throw new KeyNotFoundException("Category not found.");
        }

        // Cập nhật thông tin cốt lõi của recipe.
        recipe.UpdateDetails(
            request.Title,
            request.Slug ?? request.Title,
            request.Description,
            request.Instructions,
            request.PrepTime,
            request.CookTime,
            request.Servings,
            request.Difficulty,
            request.CategoryId);

        try
        {
            // Lưu thay đổi xuống database.
            await _db.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateConcurrencyException)
        {
            // Bắt trường hợp có request khác ghi đè đúng lúc SaveChanges.
            throw new ConcurrencyConflictException(
                "Recipe was updated by another user. Please reload and try again.");
        }

        // Đọc lại dữ liệu sau khi lưu để trả về trạng thái mới nhất.
        // Cách này an toàn hơn nếu database sinh lại RowVersion sau khi update.
        var updatedRecipe = await _db.Recipes
            .AsNoTracking()
            .FirstAsync(x => x.Id == recipe.Id, cancellationToken);

        return new RecipeDto(
            updatedRecipe.Id,
            updatedRecipe.Title,
            updatedRecipe.Slug,
            updatedRecipe.Description,
            updatedRecipe.Instructions,
            updatedRecipe.PrepTime,
            updatedRecipe.CookTime,
            updatedRecipe.Servings,
            updatedRecipe.Difficulty,
            updatedRecipe.CategoryId,
            updatedRecipe.RowVersion);
    }

    // Nếu sau này mở rộng quyền cho admin/super-admin,
    // có thể chuyển logic authorization sang helper riêng để tái sử dụng.
}
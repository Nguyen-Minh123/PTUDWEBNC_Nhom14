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

    public UpdateRecipeCommandHandler(
        IApplicationDbContext db,
        ICurrentUserService currentUser)
    {
        _db = db;
        _currentUser = currentUser;
    }

    public async Task<RecipeDto> Handle(UpdateRecipeCommand request, CancellationToken cancellationToken)
    {
        // Chỉ lấy đúng bản ghi còn khớp RowVersion mà client gửi lên.
        // Nếu không khớp, ta sẽ phân biệt giữa "không tồn tại" và "xung đột concurrency".
        var recipe = await _db.Recipes
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.RowVersion == request.RowVersion, cancellationToken);

        if (recipe is null)
        {
            var exists = await _db.Recipes.AnyAsync(x => x.Id == request.Id, cancellationToken);

            if (!exists)
                throw new KeyNotFoundException("Recipe not found.");

            throw new ConcurrencyConflictException("Recipe was updated by another user. Please reload and try again.");
        }

        if (!CurrentUserAuthorization.CanManageRecipe(_currentUser, recipe.AuthorId))
            throw new UnauthorizedAccessException("You do not have permission to update this recipe.");

        recipe.UpdateDetails(
            request.Title,
            request.Slug,
            request.Description,
            request.Instructions,
            request.PrepTime,
            request.CookTime,
            request.Servings,
            request.Difficulty,
            request.CategoryId);

        try
        {
            await _db.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateConcurrencyException)
        {
            // Bắt trường hợp có request khác ghi đè đúng lúc SaveChanges.
            throw new ConcurrencyConflictException("Recipe was updated by another user. Please reload and try again.");
        }

        return new RecipeDto(
            recipe.Id,
            recipe.Title,
            recipe.Slug,
            recipe.Description,
            recipe.Instructions,
            recipe.PrepTime,
            recipe.CookTime,
            recipe.Servings,
            recipe.Difficulty,
            recipe.CategoryId,
            recipe.RowVersion);
    }

    // private bool CanManageRecipe(string authorId)
    // {
    //     // Nếu sau này ICurrentUserService có IsAdmin, chỉ cần mở rộng điều kiện tại đây.
    //     return string.Equals(_currentUser.UserId, authorId, StringComparison.Ordinal);
    // }
}
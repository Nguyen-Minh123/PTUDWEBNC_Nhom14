using MediatR;

namespace CulinaryBlog.Application.Recipes.Commands.DeleteRecipe;

/// <summary>
/// Command dùng để xóa một Recipe theo Id.
/// </summary>
/// <param name="Id">Id của Recipe cần xóa.</param>
public sealed record DeleteRecipeCommand(Guid Id) : IRequest<bool>;
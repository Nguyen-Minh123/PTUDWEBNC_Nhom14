using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Steps.Commands;

/// <summary>
/// Command xóa một bước.
/// Sau khi xóa sẽ renumber toàn bộ bước còn lại.
/// </summary>
public sealed record DeleteRecipeStepCommand(
    Guid RecipeId,
    Guid StepId
) : IRequest<Unit>;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Steps.Commands;

/// <summary>
/// Command tạo bước mới cho Recipe.
/// StepNumber sẽ được tự động gán ở handler.
/// </summary>
public sealed record CreateRecipeStepCommand(
    Guid RecipeId,
    string Title,
    string Description,
    int? TimerMinutes,
    string? ImageUrl
) : IRequest<RecipeStepDto>;
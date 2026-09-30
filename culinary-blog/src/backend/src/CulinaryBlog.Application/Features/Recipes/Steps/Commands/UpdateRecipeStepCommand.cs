using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Steps.Commands;

/// <summary>
/// Command cập nhật nội dung bước.
/// Không cho sửa StepNumber ở đây.
/// </summary>
public sealed record UpdateRecipeStepCommand(
    Guid RecipeId,
    Guid StepId,
    string Title,
    string Description,
    int? TimerMinutes,
    string? ImageUrl
) : IRequest<RecipeStepDto>;
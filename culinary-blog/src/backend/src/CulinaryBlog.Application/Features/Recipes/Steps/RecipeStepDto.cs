namespace CulinaryBlog.Application.Features.Recipes.Steps;

/// <summary>
/// DTO trả về cho API bước thực hiện.
/// </summary>
public sealed record RecipeStepDto(
    Guid Id,
    Guid RecipeId,
    int StepNumber,
    string Title,
    string Description,
    int? TimerMinutes,
    string? ImageUrl);
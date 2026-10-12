using CulinaryBlog.Application.Features.Recipes.Steps.Commands;
using FluentValidation;

namespace CulinaryBlog.Application.Features.Recipes.Steps.Validators;

/// <summary>
/// Validate dữ liệu cập nhật bước.
/// </summary>
public sealed class UpdateRecipeStepCommandValidator : AbstractValidator<UpdateRecipeStepCommand>
{
    public UpdateRecipeStepCommandValidator()
    {
        RuleFor(x => x.RecipeId).NotEmpty();
        RuleFor(x => x.StepId).NotEmpty();

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(2000);

        RuleFor(x => x.TimerMinutes)
            .GreaterThanOrEqualTo(0)
            .When(x => x.TimerMinutes.HasValue);

        RuleFor(x => x.ImageUrl)
            .MaximumLength(500)
            .When(x => !string.IsNullOrWhiteSpace(x.ImageUrl));
    }
}
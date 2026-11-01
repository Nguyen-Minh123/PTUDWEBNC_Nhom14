using FluentValidation;

namespace CulinaryBlog.Application.Features.Recipes.Commands;

/// <summary>
/// Validate dữ liệu cập nhật Recipe.
/// </summary>
public sealed class UpdateRecipeCommandValidator : AbstractValidator<UpdateRecipeCommand>
{
    public UpdateRecipeCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Slug)
            .NotEmpty()
            .MaximumLength(220);

        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(2000);

        RuleFor(x => x.Instructions)
            .NotEmpty();

        RuleFor(x => x.PrepTime)
            .GreaterThan(0);

        RuleFor(x => x.CookTime)
            .GreaterThanOrEqualTo(0);

        RuleFor(x => x.Servings)
            .GreaterThan(0);

        RuleFor(x => x.CategoryId)
            .NotEmpty();

        // RowVersion nếu được gửi lên thì phải lớn hơn 0
        RuleFor(x => x.RowVersion)
            .Must(x => !x.HasValue || x.Value > 0)
            .WithMessage("RowVersion must be greater than 0 if provided.");
    }
}
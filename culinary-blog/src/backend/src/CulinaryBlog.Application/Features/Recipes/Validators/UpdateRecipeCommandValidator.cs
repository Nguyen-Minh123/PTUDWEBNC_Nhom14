using FluentValidation;

namespace CulinaryBlog.Application.Features.Recipes.Commands.UpdateRecipe;

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

        // RowVersion phải khác 0 để đảm bảo client gửi token concurrency hợp lệ.
        RuleFor(x => x.RowVersion)
            .Must(x => x > 0)
            .WithMessage("RowVersion must be greater than 0.");
    }
}
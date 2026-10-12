using FluentValidation;

namespace CulinaryBlog.Application.Features.Recipes.Ingredients.Commands.Validators;

public sealed class CreateRecipeIngredientCommandValidator : AbstractValidator<CreateRecipeIngredientCommand>
{
    public CreateRecipeIngredientCommandValidator()
    {
        RuleFor(x => x.RecipeId).NotEmpty();

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Quantity)
            .GreaterThan(0);

        RuleFor(x => x.Unit)
            .NotEmpty()
            .MaximumLength(50);

        RuleFor(x => x.Notes)
            .MaximumLength(500)
            .When(x => !string.IsNullOrWhiteSpace(x.Notes));

        RuleFor(x => x.OrderIndex)
            .GreaterThanOrEqualTo(0);
    }
}
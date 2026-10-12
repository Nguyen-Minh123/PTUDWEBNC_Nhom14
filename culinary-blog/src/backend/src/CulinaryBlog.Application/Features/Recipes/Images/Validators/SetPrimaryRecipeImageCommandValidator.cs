using FluentValidation;
using CulinaryBlog.Application.Features.Recipes.Images.Commands;

namespace CulinaryBlog.Application.Features.Recipes.Images.Validators;

/// <summary>
/// Validate dữ liệu đặt ảnh chính.
/// </summary>
public sealed class SetPrimaryRecipeImageCommandValidator : AbstractValidator<SetPrimaryRecipeImageCommand>
{
    public SetPrimaryRecipeImageCommandValidator()
    {
        RuleFor(x => x.RecipeId).NotEmpty();
        RuleFor(x => x.ImageId).NotEmpty();
    }
}
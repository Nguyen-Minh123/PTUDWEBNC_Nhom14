using FluentValidation;
using CulinaryBlog.Application.Features.Recipes.Images.Commands;

namespace CulinaryBlog.Application.Features.Recipes.Images.Validators;

/// <summary>
/// Validate dữ liệu xóa ảnh.
/// </summary>
public sealed class DeleteRecipeImageCommandValidator : AbstractValidator<DeleteRecipeImageCommand>
{
    public DeleteRecipeImageCommandValidator()
    {
        RuleFor(x => x.RecipeId).NotEmpty();
        RuleFor(x => x.ImageId).NotEmpty();
    }
}
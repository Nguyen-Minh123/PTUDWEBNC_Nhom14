using FluentValidation;
using CulinaryBlog.Application.Features.Recipes.Images.Commands;

namespace CulinaryBlog.Application.Features.Recipes.Images.Validators;

/// <summary>
/// Validate dữ liệu upload ảnh.
/// </summary>
public sealed class UploadRecipeImageCommandValidator : AbstractValidator<UploadRecipeImageCommand>
{
    private const long MaxFileSize = 5 * 1024 * 1024;

    public UploadRecipeImageCommandValidator()
    {
        RuleFor(x => x.RecipeId)
            .NotEmpty();

        RuleFor(x => x.File)
            .NotNull()
            .Must(file => file.Length > 0)
            .WithMessage("File không được rỗng.")
            .Must(file => file.Length <= MaxFileSize)
            .WithMessage("Kích thước file vượt quá giới hạn 5MB.");

        RuleFor(x => x.AltText)
            .MaximumLength(200)
            .When(x => !string.IsNullOrWhiteSpace(x.AltText));

        RuleFor(x => x.OrderIndex)
            .GreaterThanOrEqualTo(0);
    }
}
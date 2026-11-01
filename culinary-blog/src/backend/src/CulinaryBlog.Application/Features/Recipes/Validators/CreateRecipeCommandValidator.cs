using FluentValidation;

namespace CulinaryBlog.Application.Features.Recipes.Commands.CreateRecipe;

/// <summary>
/// Validator cho CreateRecipeCommand.
/// 
/// Chức năng:
/// - Kiểm tra dữ liệu đầu vào trước khi vào handler.
/// - Chặn lỗi rỗng, vượt giới hạn độ dài, số âm, và dữ liệu lồng nhau không hợp lệ.
/// - Giảm tải cho handler và database.
/// </summary>
public sealed class CreateRecipeCommandValidator : AbstractValidator<CreateRecipeCommand>
{
    /// <summary>
    /// Khởi tạo toàn bộ rule validate cho command tạo Recipe.
    /// </summary>
    public CreateRecipeCommandValidator()
    {
        // =========================================================
        // Basic fields
        // =========================================================

        RuleFor(x => x.Title)
            .NotEmpty()
            .WithMessage("Title is required.")
            .MaximumLength(200)
            .WithMessage("Title must not exceed 200 characters.");

        RuleFor(x => x.Slug)
            .MaximumLength(220)
            .WithMessage("Slug must not exceed 220 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.Slug));

        RuleFor(x => x.Description)
            .NotEmpty()
            .WithMessage("Description is required.")
            .MaximumLength(2000)
            .WithMessage("Description must not exceed 2000 characters.");

        RuleFor(x => x.Instructions)
            .NotEmpty()
            .WithMessage("Instructions are required.");

        // =========================================================
        // Time / servings
        // =========================================================

        RuleFor(x => x.PrepTime)
            .GreaterThan(0)
            .WithMessage("PrepTime must be greater than 0.");

        RuleFor(x => x.CookTime)
            .GreaterThanOrEqualTo(0)
            .WithMessage("CookTime must be greater than or equal to 0.");

        RuleFor(x => x.Servings)
            .GreaterThan(0)
            .WithMessage("Servings must be greater than 0.");

        // =========================================================
        // Category
        // =========================================================

        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .WithMessage("CategoryId is required.");

        // =========================================================
        // Nutrition
        // =========================================================

        RuleFor(x => x.Calories)
            .GreaterThanOrEqualTo(0)
            .When(x => x.Calories.HasValue)
            .WithMessage("Calories must be greater than or equal to 0.");

        RuleFor(x => x.Protein)
            .GreaterThanOrEqualTo(0)
            .When(x => x.Protein.HasValue)
            .WithMessage("Protein must be greater than or equal to 0.");

        RuleFor(x => x.Carbohydrates)
            .GreaterThanOrEqualTo(0)
            .When(x => x.Carbohydrates.HasValue)
            .WithMessage("Carbohydrates must be greater than or equal to 0.");

        RuleFor(x => x.Fat)
            .GreaterThanOrEqualTo(0)
            .When(x => x.Fat.HasValue)
            .WithMessage("Fat must be greater than or equal to 0.");

        RuleFor(x => x.Fiber)
            .GreaterThanOrEqualTo(0)
            .When(x => x.Fiber.HasValue)
            .WithMessage("Fiber must be greater than or equal to 0.");

        RuleFor(x => x.Sodium)
            .GreaterThanOrEqualTo(0)
            .When(x => x.Sodium.HasValue)
            .WithMessage("Sodium must be greater than or equal to 0.");

        // =========================================================
        // Nested collections
        // =========================================================

        RuleFor(x => x.Steps)
            .NotNull()
            .WithMessage("Steps collection must not be null.");

        RuleForEach(x => x.Steps)
            .SetValidator(new CreateRecipeStepModelValidator());

        RuleFor(x => x.Steps)
            .Must(HasUniqueStepNumbers)
            .WithMessage("Duplicate StepNumber values are not allowed.")
            .When(x => x.Steps is { Count: > 0 });

        RuleFor(x => x.Ingredients)
            .NotNull()
            .WithMessage("Ingredients collection must not be null.");

        RuleForEach(x => x.Ingredients)
            .SetValidator(new CreateRecipeIngredientModelValidator());

        RuleFor(x => x.Images)
            .NotNull()
            .WithMessage("Images collection must not be null.");

        RuleForEach(x => x.Images)
            .SetValidator(new CreateRecipeImageModelValidator());

        RuleFor(x => x.Images)
            .Must(HasAtMostOnePrimaryImage)
            .WithMessage("Only one primary image is allowed.")
            .When(x => x.Images is { Count: > 0 });
    }

    /// <summary>
    /// Kiểm tra các step có StepNumber trùng nhau hay không.
    /// </summary>
    private static bool HasUniqueStepNumbers(IList<CreateRecipeStepModel> steps)
    {
        return steps
            .GroupBy(x => x.StepNumber)
            .All(g => g.Count() == 1);
    }

    /// <summary>
    /// Kiểm tra danh sách ảnh chỉ có tối đa một ảnh chính.
    /// </summary>
    private static bool HasAtMostOnePrimaryImage(IList<CreateRecipeImageModel> images)
    {
        return images.Count(x => x.IsPrimary) <= 1;
    }
}

/// <summary>
/// Validator cho một bước nấu ăn.
/// </summary>
public sealed class CreateRecipeStepModelValidator : AbstractValidator<CreateRecipeStepModel>
{
    /// <summary>
    /// Khởi tạo rule cho step.
    /// </summary>
    public CreateRecipeStepModelValidator()
    {
        RuleFor(x => x.StepNumber)
            .GreaterThan(0)
            .WithMessage("StepNumber must be greater than 0.");

        RuleFor(x => x.Instruction)
            .NotEmpty()
            .WithMessage("Instruction is required.")
            .MaximumLength(2000)
            .WithMessage("Instruction must not exceed 2000 characters.");
    }
}

/// <summary>
/// Validator cho một nguyên liệu.
/// </summary>
public sealed class CreateRecipeIngredientModelValidator : AbstractValidator<CreateRecipeIngredientModel>
{
    /// <summary>
    /// Khởi tạo rule cho ingredient.
    /// </summary>
    public CreateRecipeIngredientModelValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Ingredient name is required.")
            .MaximumLength(200)
            .WithMessage("Ingredient name must not exceed 200 characters.");

        RuleFor(x => x.Quantity)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Quantity must be greater than or equal to 0.");

        RuleFor(x => x.Unit)
            .NotEmpty()
            .WithMessage("Ingredient unit is required.")
            .MaximumLength(50)
            .WithMessage("Ingredient unit must not exceed 50 characters.");
    }
}

/// <summary>
/// Validator cho một ảnh recipe.
/// </summary>
public sealed class CreateRecipeImageModelValidator : AbstractValidator<CreateRecipeImageModel>
{
    /// <summary>
    /// Khởi tạo rule cho image.
    /// </summary>
    public CreateRecipeImageModelValidator()
    {
        RuleFor(x => x.Url)
            .NotEmpty()
            .WithMessage("Image URL is required.")
            .MaximumLength(500)
            .WithMessage("Image URL must not exceed 500 characters.")
            .Must(BeAValidUri)
            .WithMessage("Image URL must be a valid absolute URL.");

        // IsPrimary là bool nên không cần validate kiểu dữ liệu,
        // chỉ cần rule tổng ở cấp command để giới hạn tối đa 1 ảnh chính.
    }

    /// <summary>
    /// Kiểm tra URL có phải là absolute URI hợp lệ hay không.
    /// </summary>
    private static bool BeAValidUri(string url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out _);
    }
}
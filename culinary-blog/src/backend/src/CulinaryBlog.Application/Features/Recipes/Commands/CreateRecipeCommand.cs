using CulinaryBlog.Domain.Entities;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Commands.CreateRecipe;

/// <summary>
/// ==================== NEW ====================
/// Command dùng để tạo mới một Recipe.
///
/// Chức năng:
/// - Nhận dữ liệu từ API (Request Body).
/// - Được MediatR gửi tới CreateRecipeCommandHandler.
/// - Không chứa business logic.
/// - Chỉ đóng vai trò DTO giữa API và Application.
/// </summary>
public sealed record CreateRecipeCommand : IRequest<Guid>
{
    // ============================================================
    // Thông tin cơ bản
    // ============================================================

    /// <summary>
    /// ==================== NEW ====================
    /// Tiêu đề công thức.
    /// Ví dụ: "Bò Kho".
    /// </summary>
    public string Title { get; init; } = string.Empty;

    /// <summary>
    /// ==================== NEW ====================
    /// Slug thân thiện URL.
    /// Nếu để trống Handler có thể tự sinh từ Title.
    /// Ví dụ: bo-kho
    /// </summary>
    public string? Slug { get; init; }

    /// <summary>
    /// ==================== NEW ====================
    /// Mô tả ngắn của công thức.
    /// </summary>
    public string Description { get; init; } = string.Empty;

    /// <summary>
    /// ==================== NEW ====================
    /// Nội dung hướng dẫn nấu ăn.
    /// </summary>
    public string Instructions { get; init; } = string.Empty;

    // ============================================================
    // Thời gian
    // ============================================================

    /// <summary>
    /// ==================== NEW ====================
    /// Thời gian chuẩn bị (phút).
    /// </summary>
    public int PrepTime { get; init; }

    /// <summary>
    /// ==================== NEW ====================
    /// Thời gian nấu (phút).
    /// </summary>
    public int CookTime { get; init; }

    /// <summary>
    /// ==================== NEW ====================
    /// Khẩu phần.
    /// </summary>
    public int Servings { get; init; }

    // ============================================================
    // Phân loại
    // ============================================================

    /// <summary>
    /// ==================== NEW ====================
    /// Độ khó món ăn.
    /// </summary>
    public RecipeDifficulty Difficulty { get; init; }

    /// <summary>
    /// ==================== NEW ====================
    /// Id danh mục.
    /// </summary>
    public Guid CategoryId { get; init; }

    // ============================================================
    // Dinh dưỡng
    // ============================================================

    /// <summary>
    /// ==================== NEW ====================
    /// Calories.
    /// </summary>
    public decimal? Calories { get; init; }

    /// <summary>
    /// ==================== NEW ====================
    /// Protein.
    /// </summary>
    public decimal? Protein { get; init; }

    /// <summary>
    /// ==================== NEW ====================
    /// Carbohydrates.
    /// </summary>
    public decimal? Carbohydrates { get; init; }

    /// <summary>
    /// ==================== NEW ====================
    /// Fat.
    /// </summary>
    public decimal? Fat { get; init; }

    /// <summary>
    /// ==================== NEW ====================
    /// Fiber.
    /// </summary>
    public decimal? Fiber { get; init; }

    /// <summary>
    /// ==================== NEW ====================
    /// Sodium.
    /// </summary>
    public decimal? Sodium { get; init; }

    // ============================================================
    // Recipe Step
    // ============================================================

    /// <summary>
    /// ==================== NEW ====================
    /// Danh sách các bước thực hiện.
    /// Có thể rỗng khi tạo Recipe,
    /// sau đó thêm qua API RecipeStep.
    /// </summary>
    public IList<CreateRecipeStepModel> Steps { get; init; }
        = new List<CreateRecipeStepModel>();

    // ============================================================
    // Ingredient
    // ============================================================

    /// <summary>
    /// ==================== NEW ====================
    /// Danh sách nguyên liệu.
    /// Có thể thêm ngay lúc tạo Recipe.
    /// </summary>
    public IList<CreateRecipeIngredientModel> Ingredients { get; init; }
        = new List<CreateRecipeIngredientModel>();

    // ============================================================
    // Image
    // ============================================================

    /// <summary>
    /// ==================== NEW ====================
    /// Danh sách ảnh (URL hoặc ObjectKey).
    /// Upload file sẽ thực hiện bởi API Upload Image.
    /// </summary>
    public IList<CreateRecipeImageModel> Images { get; init; }
        = new List<CreateRecipeImageModel>();
}

/// <summary>
/// ==================== NEW ====================
/// DTO mô tả một bước thực hiện.
/// </summary>
public sealed record CreateRecipeStepModel
{
    /// <summary>
    /// Thứ tự bước.
    /// </summary>
    public int StepNumber { get; init; }

    /// <summary>
    /// Nội dung bước.
    /// </summary>
    public string Instruction { get; init; } = string.Empty;

    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public int? TimerMinutes { get; init; }
    public string? ImageUrl { get; init; }
}

/// <summary>
/// ==================== NEW ====================
/// DTO mô tả một nguyên liệu.
/// </summary>
public sealed record CreateRecipeIngredientModel
{
    /// <summary>
    /// Tên nguyên liệu.
    /// </summary>
    public string Name { get; init; } = string.Empty;

    /// <summary>
    /// Số lượng.
    /// </summary>
    public decimal Quantity { get; init; }

    /// <summary>
    /// Đơn vị.
    /// Ví dụ:
    /// g, kg, ml, tsp...
    /// </summary>
    public string Unit { get; init; } = string.Empty;
}

/// <summary>
/// ==================== NEW ====================
/// DTO mô tả ảnh Recipe.
/// </summary>
public sealed record CreateRecipeImageModel
{
    /// <summary>
    /// URL hoặc ObjectKey của ảnh.
    /// </summary>
    public string Url { get; init; } = string.Empty;

    /// <summary>
    /// Đánh dấu ảnh đại diện.
    /// </summary>
    public bool IsPrimary { get; init; }
}
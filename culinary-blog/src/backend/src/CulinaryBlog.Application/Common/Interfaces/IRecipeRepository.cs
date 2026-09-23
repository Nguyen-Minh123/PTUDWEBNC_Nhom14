using CulinaryBlog.Domain.Entities;

namespace CulinaryBlog.Application.Common.Interfaces;

/// <summary>
/// Repository dành riêng cho aggregate Recipe.
/// Chứa các thao tác truy vấn và ghi dữ liệu liên quan đến Recipe,
/// bao gồm cả quan hệ con cần thiết cho nghiệp vụ.
/// </summary>
public interface IRecipeRepository
{
    /// <summary>
    /// Lấy recipe theo Id.
    /// </summary>
    Task<Recipe?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Lấy recipe theo Id kèm đầy đủ dữ liệu cần cho nghiệp vụ:
    /// Steps, Ingredients, Images, Nutrition, Category, Author.
    /// Dùng khi xóa / cập nhật / hiển thị chi tiết.
    /// </summary>
    Task<Recipe?> GetByIdWithDetailsAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Lấy recipe theo slug.
    /// </summary>
    Task<Recipe?> GetBySlugAsync(
        string slug,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Lấy recipe theo slug kèm đầy đủ dữ liệu cần cho nghiệp vụ.
    /// </summary>
    Task<Recipe?> GetBySlugWithDetailsAsync(
        string slug,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Kiểm tra slug đã tồn tại hay chưa.
    /// Dùng khi tạo mới hoặc cập nhật recipe.
    /// </summary>
    Task<bool> SlugExistsAsync(
        string slug,
        Guid? excludeRecipeId = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Thêm recipe mới vào context.
    /// </summary>
    Task AddAsync(
        Recipe recipe,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Đánh dấu recipe đã thay đổi.
    /// </summary>
    void Update(Recipe recipe);

    /// <summary>
    /// Xóa recipe khỏi context.
    /// Với cấu hình cascade delete, các child entity sẽ bị xóa theo.
    /// </summary>
    void Remove(Recipe recipe);

    /// <summary>
    /// Lấy danh sách recipe theo phân trang và filter.
    /// Dùng cho public listing hoặc admin listing.
    /// </summary>
    Task<IReadOnlyList<Recipe>> GetPagedAsync(
        int page,
        int pageSize,
        Guid? categoryId = null,
        RecipeStatus? status = null,
        string? keyword = null,
        CancellationToken cancellationToken = default);
}
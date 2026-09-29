namespace CulinaryBlog.Domain.Entities.Categories;

using CulinaryBlog.Domain.Common.Exceptions;

public sealed class CategoryNotFoundException : DomainException
{
    /// <summary>
    /// Id của Category nếu lỗi phát sinh khi tìm theo Id.
    /// </summary>
    public Guid? CategoryId { get; }

    /// <summary>
    /// Slug của Category nếu lỗi phát sinh khi tìm theo Slug.
    /// </summary>
    public string? Slug { get; }

    /// <summary>
    /// Khởi tạo exception khi không tìm thấy Category theo Id.
    /// </summary>
    /// <param name="categoryId">Id của Category cần tìm.</param>
    public CategoryNotFoundException(Guid categoryId)
        : base($"Category with Id '{categoryId}' was not found.")
    {
        // Lưu lại Id để phục vụ logging, debug hoặc mapping response.
        CategoryId = categoryId;
    }

    /// <summary>
    /// Khởi tạo exception khi không tìm thấy Category theo Slug.
    /// </summary>
    /// <param name="slug">Slug của Category cần tìm.</param>
    public CategoryNotFoundException(string slug)
        : base($"Category with slug '{slug}' was not found.")
    {
        // Lưu lại Slug để phục vụ logging, debug hoặc mapping response.
        Slug = slug;
    }

    /// <summary>
    /// Hàm hỗ trợ tạo lỗi theo Id.
    /// Cách này giúp code gọi ngắn gọn và rõ nghĩa hơn.
    /// </summary>
    /// <param name="categoryId">Id của Category.</param>
    public static CategoryNotFoundException ById(Guid categoryId)
    {
        return new CategoryNotFoundException(categoryId);
    }

    /// <summary>
    /// Hàm hỗ trợ tạo lỗi theo Slug.
    /// </summary>
    /// <param name="slug">Slug của Category.</param>
    public static CategoryNotFoundException BySlug(string slug)
    {
        return new CategoryNotFoundException(slug);
    }
}
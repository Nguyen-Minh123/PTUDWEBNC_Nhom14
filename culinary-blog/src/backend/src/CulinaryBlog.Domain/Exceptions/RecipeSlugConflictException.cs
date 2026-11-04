using CulinaryBlog.Domain.Exceptions;

namespace CulinaryBlog.Domain.Exceptions;

public sealed class RecipeSlugConflictException : DomainException
{
    public RecipeSlugConflictException(string slug)
        : base($"A recipe with slug '{slug}' already exists.")
    {
    }
}

/// <summary>
/// Được ném khi không tìm thấy công thức theo mã định danh được yêu cầu.
/// </summary>
public sealed class RecipeNotFoundException : DomainException
{
    /// <summary>
    /// Tạo lỗi không tìm thấy và giữ lại ID để cung cấp ngữ cảnh chẩn đoán.
    /// </summary>
    public RecipeNotFoundException(Guid id)
        : base($"Recipe with id '{id}' was not found.")
    {
    }
}

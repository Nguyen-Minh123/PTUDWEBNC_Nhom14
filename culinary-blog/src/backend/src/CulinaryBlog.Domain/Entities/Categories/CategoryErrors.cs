namespace CulinaryBlog.Domain.Categories;

/// <summary>
/// Đại diện cho một lỗi nghiệp vụ trong Domain.
/// 
/// Cấu trúc này giúp các tầng Application / API
/// có thể nhận diện lỗi theo mã (Code) và nội dung (Message)
/// mà không phụ thuộc vào cách ném exception.
/// </summary>
/// <param name="Code">Mã định danh của lỗi.</param>
/// <param name="Message">Thông điệp mô tả lỗi cho người dùng hoặc log.</param>
public sealed record DomainError(string Code, string Message);

/// <summary>
/// Lớp gom các lỗi nghiệp vụ liên quan đến Category.
/// 
/// Mục tiêu:
/// - Tập trung toàn bộ lỗi của module Category tại một nơi
/// - Giúp code sạch hơn, dễ bảo trì hơn
/// - Hỗ trợ map lỗi sang exception hoặc HTTP response ở tầng ngoài
/// </summary>
public static class CategoryErrors
{
    // Tiền tố chuẩn để đặt mã lỗi cho module Category.
    // Ví dụ: Category.NotFound, Category.AlreadyExists...
    private const string Prefix = "Category";

    /// <summary>
    /// Lỗi khi không tìm thấy Category theo Id.
    /// </summary>
    /// <param name="categoryId">Id của Category cần tìm.</param>
    public static DomainError NotFound(Guid categoryId)
    {
        return new DomainError(
            Code: $"{Prefix}.NotFound",
            Message: $"Category with Id '{categoryId}' was not found."
        );
    }

    /// <summary>
    /// Lỗi khi không tìm thấy Category theo Slug.
    /// </summary>
    /// <param name="slug">Slug của Category cần tìm.</param>
    public static DomainError NotFound(string slug)
    {
        return new DomainError(
            Code: $"{Prefix}.NotFound",
            Message: $"Category with slug '{slug}' was not found."
        );
    }

    /// <summary>
    /// Lỗi khi tên Category bị trống hoặc chỉ chứa khoảng trắng.
    /// </summary>
    public static DomainError EmptyName()
    {
        return new DomainError(
            Code: $"{Prefix}.EmptyName",
            Message: "Category name must not be empty."
        );
    }

    /// <summary>
    /// Lỗi khi tên Category vượt quá độ dài cho phép.
    /// </summary>
    /// <param name="maxLength">Độ dài tối đa cho phép.</param>
    public static DomainError NameTooLong(int maxLength)
    {
        return new DomainError(
            Code: $"{Prefix}.NameTooLong",
            Message: $"Category name must not exceed {maxLength} characters."
        );
    }

    /// <summary>
    /// Lỗi khi Slug Category bị trống hoặc chỉ chứa khoảng trắng.
    /// </summary>
    public static DomainError EmptySlug()
    {
        return new DomainError(
            Code: $"{Prefix}.EmptySlug",
            Message: "Category slug must not be empty."
        );
    }

    /// <summary>
    /// Lỗi khi Slug Category vượt quá độ dài cho phép.
    /// </summary>
    /// <param name="maxLength">Độ dài tối đa cho phép.</param>
    public static DomainError SlugTooLong(int maxLength)
    {
        return new DomainError(
            Code: $"{Prefix}.SlugTooLong",
            Message: $"Category slug must not exceed {maxLength} characters."
        );
    }

    /// <summary>
    /// Lỗi khi Category đã tồn tại.
    /// Dùng khi tạo mới Category có cùng tên.
    /// </summary>
    /// <param name="name">Tên Category bị trùng.</param>
    public static DomainError AlreadyExists(string name)
    {
        return new DomainError(
            Code: $"{Prefix}.AlreadyExists",
            Message: $"Category with name '{name}' already exists."
        );
    }

    /// <summary>
    /// Lỗi khi Slug Category đã tồn tại.
    /// </summary>
    /// <param name="slug">Slug bị trùng.</param>
    public static DomainError SlugAlreadyExists(string slug)
    {
        return new DomainError(
            Code: $"{Prefix}.SlugAlreadyExists",
            Message: $"Category with slug '{slug}' already exists."
        );
    }

    /// <summary>
    /// Lỗi khi Category cha không tồn tại.
    /// Dùng cho trường hợp Category có quan hệ phân cấp.
    /// </summary>
    /// <param name="parentCategoryId">Id của Category cha.</param>
    public static DomainError ParentNotFound(Guid parentCategoryId)
    {
        return new DomainError(
            Code: $"{Prefix}.ParentNotFound",
            Message: $"Parent category with Id '{parentCategoryId}' was not found."
        );
    }

    /// <summary>
    /// Lỗi khi không thể xóa Category vì còn dữ liệu con liên quan.
    /// </summary>
    /// <param name="categoryId">Id của Category cần xóa.</param>
    public static DomainError CannotDeleteHasChildren(Guid categoryId)
    {
        return new DomainError(
            Code: $"{Prefix}.CannotDeleteHasChildren",
            Message: $"Category with Id '{categoryId}' cannot be deleted because it still has child categories."
        );
    }

    /// <summary>
    /// Lỗi khi không thể xóa Category vì còn Recipe đang sử dụng.
    /// </summary>
    /// <param name="categoryId">Id của Category cần xóa.</param>
    public static DomainError CannotDeleteInUse(Guid categoryId)
    {
        return new DomainError(
            Code: $"{Prefix}.CannotDeleteInUse",
            Message: $"Category with Id '{categoryId}' cannot be deleted because it is being used by one or more recipes."
        );
    }

    /// <summary>
    /// Lỗi khi tên Category không hợp lệ theo quy tắc nghiệp vụ.
    /// </summary>
    /// <param name="reason">Lý do tên không hợp lệ.</param>
    public static DomainError InvalidName(string reason)
    {
        return new DomainError(
            Code: $"{Prefix}.InvalidName",
            Message: $"Category name is invalid: {reason}"
        );
    }

    /// <summary>
    /// Lỗi khi Slug Category không hợp lệ theo quy tắc nghiệp vụ.
    /// </summary>
    /// <param name="reason">Lý do slug không hợp lệ.</param>
    public static DomainError InvalidSlug(string reason)
    {
        return new DomainError(
            Code: $"{Prefix}.InvalidSlug",
            Message: $"Category slug is invalid: {reason}"
        );
    }
}
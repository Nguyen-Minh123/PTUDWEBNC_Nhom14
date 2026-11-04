using System.Collections.ObjectModel;

namespace CulinaryBlog.Domain.Exceptions;

/// <summary>
/// Ngoại lệ thuộc tầng Domain, được ném ra khi client yêu cầu sắp xếp theo một trường không được hỗ trợ
/// hoặc không nằm trong danh sách các trường cho phép (allowed fields).
/// 
/// Ngoại lệ này tuân thủ chuẩn RFC 7807 (Problem Details for HTTP APIs) để tầng API/Middleware 
/// có thể ánh xạ sang mã trạng thái HTTP 400 Bad Request với thông tin chi tiết về trường lỗi và các trường hợp lệ.
/// </summary>
public class UnsupportedSortFieldException : Exception
{
    /// <summary>
    /// Tên trường sắp xếp không hợp lệ do client truyền vào (ví dụ qua query param ?sort=-invalidField).
    /// </summary>
    public string FieldName { get; }

    /// <summary>
    /// Tên thực thể đang được truy vấn sắp xếp (ví dụ: "Recipe", "Category").
    /// </summary>
    public string? EntityName { get; }

    /// <summary>
    /// Danh sách các trường được hỗ trợ sắp xếp hợp lệ cho thực thể tương ứng.
    /// </summary>
    public IReadOnlyCollection<string> AllowedFields { get; }

    /// <summary>
    /// Khởi tạo ngoại lệ chỉ với tên trường không hợp lệ.
    /// </summary>
    /// <param name="fieldName">Tên trường sắp xếp không được hỗ trợ.</param>
    public UnsupportedSortFieldException(string fieldName)
        : base($"Trường sắp xếp '{fieldName}' không được hỗ trợ.")
    {
        FieldName = fieldName ?? string.Empty;
        EntityName = null;
        AllowedFields = Array.Empty<string>();
    }

    /// <summary>
    /// Khởi tạo ngoại lệ với tên trường không hợp lệ và danh sách các trường được phép.
    /// </summary>
    /// <param name="fieldName">Tên trường sắp xếp không được hỗ trợ.</param>
    /// <param name="allowedFields">Danh sách các trường được phép sắp xếp.</param>
    public UnsupportedSortFieldException(string fieldName, IEnumerable<string> allowedFields)
        : base($"Trường sắp xếp '{fieldName}' không được hỗ trợ. Các trường hợp lệ: [{string.Join(", ", allowedFields ?? Enumerable.Empty<string>())}].")
    {
        FieldName = fieldName ?? string.Empty;
        EntityName = null;
        AllowedFields = new ReadOnlyCollection<string>((allowedFields ?? Enumerable.Empty<string>()).ToList());
    }

    /// <summary>
    /// Khởi tạo ngoại lệ đầy đủ với tên trường, tên thực thể và danh sách các trường được phép.
    /// </summary>
    /// <param name="fieldName">Tên trường sắp xếp không được hỗ trợ.</param>
    /// <param name="entityName">Tên thực thể (Entity) đang áp dụng sắp xếp.</param>
    /// <param name="allowedFields">Danh sách các trường được phép sắp xếp.</param>
    public UnsupportedSortFieldException(string fieldName, string entityName, IEnumerable<string> allowedFields)
        : base($"Trường sắp xếp '{fieldName}' không được hỗ trợ cho thực thể '{entityName}'. Các trường hợp lệ: [{string.Join(", ", allowedFields ?? Enumerable.Empty<string>())}].")
    {
        FieldName = fieldName ?? string.Empty;
        EntityName = entityName;
        AllowedFields = new ReadOnlyCollection<string>((allowedFields ?? Enumerable.Empty<string>()).ToList());
    }
}

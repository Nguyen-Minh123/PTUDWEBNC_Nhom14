using CulinaryBlog.Domain.Exceptions;

namespace CulinaryBlog.Domain.Common;

/// <summary>
/// Đại diện cho thao tác publish một công thức đã được publish trước đó.
/// </summary>
public sealed class RecipeAlreadyPublishedException : DomainException
{
    /// <summary>
    /// Tạo lỗi domain với thông báo ổn định cho quy tắc publish lặp.
    /// </summary>
    public RecipeAlreadyPublishedException()
        : base("Recipe has already been published.")
    {
    }
}
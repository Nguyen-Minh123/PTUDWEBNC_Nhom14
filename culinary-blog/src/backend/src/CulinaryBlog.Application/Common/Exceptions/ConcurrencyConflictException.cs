namespace CulinaryBlog.Application.Common.Exceptions;

/// <summary>
/// Ngoại lệ dùng khi dữ liệu đã bị cập nhật bởi một request khác.
/// </summary>
public sealed class ConcurrencyConflictException : Exception
{
    public ConcurrencyConflictException(string message)
        : base(message)
    {
    }
}
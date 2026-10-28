namespace CulinaryBlog.Application.DTOs;

public class ForgotPasswordResponseDto
{
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Token đặt lại mật khẩu. Trả về trong môi trường phát triển (Development/Testing) để thuận tiện kiểm thử frontend/API.
    /// </summary>
    public string? ResetToken { get; set; }
}

public class AuthMessageResponseDto
{
    public string Message { get; set; } = string.Empty;

    public AuthMessageResponseDto(string message)
    {
        Message = message;
    }
}

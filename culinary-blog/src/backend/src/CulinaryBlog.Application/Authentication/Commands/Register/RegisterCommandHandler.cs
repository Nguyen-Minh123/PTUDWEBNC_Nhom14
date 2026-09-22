using CulinaryBlog.Application.Authentication.Contracts;
using CulinaryBlog.Domain.Shared;
// Giả định ApplicationUser nằm trong namespace này, bạn hãy điều chỉnh nếu Khải đặt ở nơi khác
using CulinaryBlog.Domain.Entities; 
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CulinaryBlog.Application.Authentication.Commands.Register;

// Kế thừa IRequestHandler để MediatR biết đây là nơi xử lý RegisterCommand
internal sealed class RegisterCommandHandler : IRequestHandler<RegisterCommand, Result<AuthResponse>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    // private readonly IJwtTokenGenerator _jwtTokenGenerator; // (Sẽ tiêm interface sinh token ở bước sau)

    public RegisterCommandHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Result<AuthResponse>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        // 1. Kiểm tra xem Email đã tồn tại trong hệ thống chưa
        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser is not null)
        {
            return Result<AuthResponse>.Failure("Email này đã được sử dụng trong hệ thống.");
        }

        // 2. Khởi tạo Entity User mới
        var user = new ApplicationUser
        {
            UserName = request.Email, // Thường dùng Email làm UserName để dễ đăng nhập
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName
        };

        // 3. Lưu vào Database (UserManager sẽ TỰ ĐỘNG băm mật khẩu bằng thuật toán PBKDF2)
        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            // Gom tất cả các lỗi (ví dụ: mật khẩu quá ngắn, thiếu ký tự đặc biệt...) để trả về
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return Result<AuthResponse>.Failure($"Lỗi tạo tài khoản: {errors}");
        }

        // 4. Sinh JWT Token (Tạm thời gán chuỗi giả lập, bạn sẽ code logic sinh token thực tế sau)
        var accessToken = "mock-jwt-access-token";
        var refreshToken = "mock-refresh-token";

        // 5. Đóng gói kết quả trả về cho Endpoint
        var response = new AuthResponse(
            user.Id.ToString(),
            user.FirstName,
            user.LastName,
            user.Email,
            accessToken,
            refreshToken
        );

        return Result<AuthResponse>.Success(response);
    }
}
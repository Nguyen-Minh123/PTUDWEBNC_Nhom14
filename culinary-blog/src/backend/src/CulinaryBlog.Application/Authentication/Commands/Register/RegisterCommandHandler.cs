using CulinaryBlog.Application.Authentication.Contracts;
using CulinaryBlog.Domain.Shared;
using CulinaryBlog.Application.Contracts.Services;
using CulinaryBlog.Domain.Entities; 
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CulinaryBlog.Application.Authentication.Commands.Register;

// Kế thừa IRequestHandler để MediatR biết đây là nơi xử lý RegisterCommand
internal sealed class RegisterCommandHandler : IRequestHandler<RegisterCommand, Result<AuthResponse>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtService _jwtService;

    // SỬA LỖI: Tiêm IJwtService vào tham số của hàm khởi tạo
    public RegisterCommandHandler(UserManager<ApplicationUser> userManager, IJwtService jwtService)
    {
        _userManager = userManager;
        _jwtService = jwtService; // Gán vào biến nội bộ
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

        // ==========================================
        // 4. SINH JWT TOKEN THỰC TẾ
        // ==========================================
        // Thiết lập danh sách quyền cơ bản (Role) cho người mới đăng ký
        var roles = new List<string> { "User" };

        // Gọi IJwtService để tạo Access Token thật
        var accessToken = _jwtService.GenerateAccessToken(user, roles);

        // Gọi IJwtService để lấy cặp Refresh Token (Chuỗi gốc gửi đi, Chuỗi băm lưu DB)
        var (rawRefreshToken, refreshTokenHash) = _jwtService.GenerateRefreshToken();

        // (Sau này thành viên phụ trách Refresh Token sẽ viết code lưu refreshTokenHash xuống Database tại đây)

        // 5. Đóng gói kết quả trả về cho Endpoint
        var response = new AuthResponse(
            user.Id.ToString(),
            user.FirstName,
            user.LastName,
            user.Email,
            accessToken,
            rawRefreshToken // Gửi chuỗi Token gốc cho Next.js lưu vào cookie/local storage
        );

        return Result<AuthResponse>.Success(response);
    }
}
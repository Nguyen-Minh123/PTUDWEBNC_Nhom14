using CulinaryBlog.Application.Authentication.Contracts;
using CulinaryBlog.Application.Contracts.Services;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Shared;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CulinaryBlog.Application.Authentication.Commands.Login;

// 1. ĐỊNH NGHĨA COMMAND (Dữ liệu request gửi lên)
public record LoginCommand(
    string Email,
    string Password
) : IRequest<Result<AuthResponse>>;

// 2. ĐỊNH NGHĨA HANDLER (Logic xử lý Đăng nhập)
internal sealed class LoginCommandHandler : IRequestHandler<LoginCommand, Result<AuthResponse>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtService _jwtService;

    public LoginCommandHandler(UserManager<ApplicationUser> userManager, IJwtService jwtService)
    {
        _userManager = userManager;
        _jwtService = jwtService;
    }

    public async Task<Result<AuthResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        // 1. Tìm người dùng theo Email
        var user = await _userManager.FindByEmailAsync(request.Email);
        
        if (user is null)
        {
            // BẢO MẬT: Báo lỗi chung chung để chống dò quét tài khoản
            return Result<AuthResponse>.Failure("Email hoặc mật khẩu không chính xác.");
        }

        // 2. Đối chiếu mật khẩu
        var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);
        
        if (!isPasswordValid)
        {
            return Result<AuthResponse>.Failure("Email hoặc mật khẩu không chính xác.");
        }

        // 3. Lấy danh sách quyền (Roles)
        var roles = await _userManager.GetRolesAsync(user);
        if (!roles.Any())
        {
            roles = new List<string> { "User" };
        }

        // 4. Sinh Token thật
        var accessToken = _jwtService.GenerateAccessToken(user, roles);
        var (rawRefreshToken, refreshTokenHash) = _jwtService.GenerateRefreshToken();

        // 5. Đóng gói kết quả trả về
        var response = new AuthResponse(
            user.Id.ToString(),
            user.FirstName ?? "", // Dùng ?? "" để đề phòng chuỗi rỗng
            user.LastName ?? "",
            user.Email!,          // Thêm ! vì ta chắc chắn Email không thể null ở bước này
            accessToken,
            rawRefreshToken
        );

        return Result<AuthResponse>.Success(response);
    }
}
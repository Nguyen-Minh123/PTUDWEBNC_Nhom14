using System.Security.Claims;
using CulinaryBlog.Application.Common.Exceptions;
using CulinaryBlog.Application.Contracts.Persistence;
using CulinaryBlog.Application.Contracts.Services;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Entities;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace CulinaryBlog.Application.Features.Auth.Commands.RefreshToken;

public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, AuthResponseDto>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtService _jwtService;
    private readonly IApplicationDbContext _context;

    public RefreshTokenCommandHandler(
        UserManager<ApplicationUser> userManager,
        IJwtService jwtService,
        IApplicationDbContext context)
    {
        _userManager = userManager;
        _jwtService = jwtService;
        _context = context;
    }

    public async Task<AuthResponseDto> Handle(RefreshTokenCommand command, CancellationToken cancellationToken)
    {
        // 1. Lấy claims từ Access Token đã hết hạn[cite: 1]
        var principal = _jwtService.GetPrincipalFromExpiredToken(command.AccessToken)
            ?? throw new UnauthorizedException("Access token không hợp lệ.");
        
        var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? throw new UnauthorizedException("Token không chứa định danh user.");

        // 2. Băm raw token từ request để so khớp với TokenHash trong DB
        var incomingHash = _jwtService.HashToken(command.RefreshToken);

        var storedToken = await _context.RefreshTokens
            .FirstOrDefaultAsync(rt => rt.TokenHash == incomingHash && rt.UserId == userId, cancellationToken)
            ?? throw new UnauthorizedException("Refresh token không tồn tại.");

        // 3. Kiểm tra tính hợp lệ & Phát hiện Reuse Attack[cite: 1]
        if (!storedToken.IsValid())
        {
            if (storedToken.IsUsed)
            {
                var allUserTokens = await _context.RefreshTokens
                    .Where(rt => rt.UserId == userId)
                    .ToListAsync(cancellationToken);
                
                // Thu hồi toàn bộ token family của user[cite: 1]
                allUserTokens.ForEach(t => t.Revoke());
                await _context.SaveChangesAsync(cancellationToken);

                throw new UnauthorizedException("Phát hiện bảo mật: Refresh token đã bị tái sử dụng. Toàn bộ phiên đăng nhập đã bị hủy.");
            }

            throw new UnauthorizedException("Refresh token đã hết hạn hoặc đã bị thu hồi.");
        }

        // 4. Tìm user và roles
        var user = await _userManager.FindByIdAsync(userId)
            ?? throw new UnauthorizedException("Người dùng không tồn tại.");
        var roles = await _userManager.GetRolesAsync(user);

        // 5. Token Rotation: Đánh dấu token cũ đã dùng và cấp cặp token mới[cite: 1]
        var newAccessToken = _jwtService.GenerateAccessToken(user, roles);
        var (newRawToken, newHash) = _jwtService.GenerateRefreshToken();

        storedToken.MarkUsed(newHash);

        var newRefreshTokenEntity = Domain.Entities.RefreshToken.Create(userId, newHash, 7);
        _context.RefreshTokens.Add(newRefreshTokenEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return new AuthResponseDto(
            AccessToken: newAccessToken,
            RefreshToken: newRawToken,
            AccessTokenExpiry: DateTime.UtcNow.AddMinutes(15),
            User: user.Adapt<UserDto>()
        );
    }
}
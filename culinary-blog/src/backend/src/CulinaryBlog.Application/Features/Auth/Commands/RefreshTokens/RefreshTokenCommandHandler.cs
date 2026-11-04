using System.Security.Cryptography;
using System.Text;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Auth.Commands.RefreshTokens;

public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, AuthResponseDto>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IJwtService _jwtService;

    public RefreshTokenCommandHandler(
        IApplicationDbContext dbContext,
        IJwtService jwtService)
    {
        _dbContext = dbContext;
        _jwtService = jwtService;
    }

    public async Task<AuthResponseDto> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.RefreshToken))
        {
            throw new InvalidCredentialsException("Refresh token không được để trống.");
        }

        var tokenHash = RefreshToken.ComputeHash(request.RefreshToken);

        // Tìm token theo Hash hoặc Plain Token
        var token = await _dbContext.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.TokenHash == tokenHash || rt.Token == request.RefreshToken, cancellationToken);

        if (token == null)
        {
            throw new InvalidCredentialsException("Refresh token không hợp lệ hoặc không tồn tại.");
        }

        // FR-SEC-004: Token Theft Detection
        // Nếu token đã từng được sử dụng (IsUsed) hoặc đã bị thu hồi (IsRevoked), đây là dấu hiệu token bị tái sử dụng trái phép (Replay Attack)
        if (token.IsUsed || token.IsRevoked)
        {
            // Vô hiệu hóa toàn bộ refresh tokens của user để bảo vệ tài khoản
            var compromisedTokens = await _dbContext.RefreshTokens
                .Where(rt => rt.UserId == token.UserId && !rt.IsRevoked)
                .ToListAsync(cancellationToken);

            foreach (var compromised in compromisedTokens)
            {
                compromised.IsRevoked = true;
            }

            await _dbContext.SaveChangesAsync(cancellationToken);

            throw new InvalidCredentialsException("Cảnh báo bảo mật: Phát hiện hành vi tái sử dụng token (Token Theft). Toàn bộ phiên đăng nhập đã bị hủy bỏ để bảo đảm an toàn.");
        }

        // Kiểm tra thời hạn của token
        if (token.ExpiresAt < DateTime.UtcNow)
        {
            token.IsRevoked = true;
            await _dbContext.SaveChangesAsync(cancellationToken);
            throw new InvalidCredentialsException("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        }

        var user = token.User;
        if (user == null)
        {
            user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == token.UserId, cancellationToken);
            if (user == null)
            {
                throw new InvalidCredentialsException("Người dùng không tồn tại.");
            }
        }

        // FR-SEC-002: Token Rotation - Đánh dấu token cũ đã được sử dụng
        token.IsUsed = true;

        // Sinh cặp token mới
        var roles = new List<string> { "Author", "User" };
        if (user.Email is not null && user.Email.Contains("admin", StringComparison.OrdinalIgnoreCase))
        {
            roles.Add("Admin");
        }

        var newAccessToken = _jwtService.GenerateAccessToken(user, roles);
        var newRefreshToken = _jwtService.GenerateRefreshToken();

        token.ReplacedByTokenHash = RefreshToken.ComputeHash(newRefreshToken);

        var newRtEntity = new RefreshToken
        {
            Token = newRefreshToken,
            UserId = user.Id,
            ExpiresAt = DateTime.UtcNow.AddDays(7)
        };
        _dbContext.RefreshTokens.Add(newRtEntity);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new AuthResponseDto
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
            User = user.Adapt<UserProfileDto>()
        };
    }
}

using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Exceptions;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CulinaryBlog.Application.Features.Auth.Commands.ResetPassword;

public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, AuthMessageResponseDto>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IPasswordResetTokenService _tokenService;
    private readonly IPasswordHasherService _passwordHasher;
    private readonly IValidator<ResetPasswordCommand> _validator;
    private readonly ILogger<ResetPasswordCommandHandler> _logger;

    public ResetPasswordCommandHandler(
        IApplicationDbContext dbContext,
        IPasswordResetTokenService tokenService,
        IPasswordHasherService passwordHasher,
        IValidator<ResetPasswordCommand> validator,
        ILogger<ResetPasswordCommandHandler> logger)
    {
        _dbContext = dbContext;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
        _validator = validator;
        _logger = logger;
    }

    public async Task<AuthMessageResponseDto> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        var email = request.Email.Trim().ToLowerInvariant();
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);

        if (user == null)
        {
            _logger.LogWarning("Yêu cầu Reset Password cho email không tồn tại: {Email}", email);
            throw new DomainException("Mã khôi phục mật khẩu không hợp lệ hoặc đã hết hạn.");
        }

        var isValidToken = _tokenService.ValidateToken(user, request.Token);
        if (!isValidToken)
        {
            _logger.LogWarning("Token khôi phục mật khẩu không hợp lệ cho người dùng: {Email}", email);
            throw new DomainException("Mã khôi phục mật khẩu không hợp lệ hoặc đã hết hạn.");
        }

        // Cập nhật mật khẩu mới và hủy hiệu lực token cũ bằng cách cập nhật SecurityStamp
        user.PasswordHash = _passwordHasher.HashPassword(user, request.NewPassword);
        user.SecurityStamp = Guid.NewGuid().ToString();

        // Thu hồi toàn bộ Refresh Tokens đang hoạt động của tài khoản để đảm bảo bảo mật
        var activeRefreshTokens = await _dbContext.RefreshTokens
            .Where(rt => rt.UserId == user.Id && !rt.IsRevoked)
            .ToListAsync(cancellationToken);

        foreach (var rt in activeRefreshTokens)
        {
            rt.IsRevoked = true;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        _logger.LogInformation("Đặt lại mật khẩu thành công cho người dùng: {Email}", email);

        return new AuthMessageResponseDto("Đặt lại mật khẩu thành công. Vui lòng đăng nhập bằng mật khẩu mới.");
    }
}

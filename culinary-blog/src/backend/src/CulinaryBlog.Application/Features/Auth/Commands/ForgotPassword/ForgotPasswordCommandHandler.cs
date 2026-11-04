using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.DTOs;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CulinaryBlog.Application.Features.Auth.Commands.ForgotPassword;

public class ForgotPasswordCommandHandler : IRequestHandler<ForgotPasswordCommand, ForgotPasswordResponseDto>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IPasswordResetTokenService _tokenService;
    private readonly IValidator<ForgotPasswordCommand> _validator;
    private readonly ILogger<ForgotPasswordCommandHandler> _logger;

    public ForgotPasswordCommandHandler(
        IApplicationDbContext dbContext,
        IPasswordResetTokenService tokenService,
        IValidator<ForgotPasswordCommand> validator,
        ILogger<ForgotPasswordCommandHandler> logger)
    {
        _dbContext = dbContext;
        _tokenService = tokenService;
        _validator = validator;
        _logger = logger;
    }

    public async Task<ForgotPasswordResponseDto> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
    {
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        var email = request.Email.Trim().ToLowerInvariant();
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);

        if (user == null)
        {
            // OWASP Recommendation: Không tiết lộ email có tồn tại trong hệ thống hay không để chống account enumeration
            _logger.LogWarning("Yêu cầu quên mật khẩu cho email không tồn tại: {Email}", email);
            return new ForgotPasswordResponseDto
            {
                Message = "Nếu email này tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi.",
                ResetToken = null
            };
        }

        // Đảm bảo user có SecurityStamp
        if (string.IsNullOrEmpty(user.SecurityStamp))
        {
            user.SecurityStamp = Guid.NewGuid().ToString();
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        var token = _tokenService.GenerateToken(user, TimeSpan.FromMinutes(15));
        _logger.LogInformation("Đã tạo token đặt lại mật khẩu thành công cho người dùng: {Email}. Token: {Token}", email, token);

        return new ForgotPasswordResponseDto
        {
            Message = "Nếu email này tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi.",
            ResetToken = token // Trả về token cho môi trường dev/demo giúp frontend dễ dàng kiểm thử luồng reset
        };
    }
}

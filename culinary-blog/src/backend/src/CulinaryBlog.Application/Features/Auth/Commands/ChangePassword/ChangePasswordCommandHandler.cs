using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Domain.Exceptions;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CulinaryBlog.Application.Features.Auth.Commands.ChangePassword;

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, AuthMessageResponseDto>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IPasswordHasherService _passwordHasher;
    private readonly IValidator<ChangePasswordCommand> _validator;
    private readonly ILogger<ChangePasswordCommandHandler> _logger;

    public ChangePasswordCommandHandler(
        IApplicationDbContext dbContext,
        ICurrentUserService currentUserService,
        IPasswordHasherService passwordHasher,
        IValidator<ChangePasswordCommand> validator,
        ILogger<ChangePasswordCommandHandler> logger)
    {
        _dbContext = dbContext;
        _currentUserService = currentUserService;
        _passwordHasher = passwordHasher;
        _validator = validator;
        _logger = logger;
    }

    public async Task<AuthMessageResponseDto> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        var currentUserId = _currentUserService.UserId;
        if (string.IsNullOrWhiteSpace(currentUserId))
        {
            throw new ForbiddenAccessException("Bạn cần đăng nhập để thực hiện đổi mật khẩu.");
        }

        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == currentUserId, cancellationToken);

        if (user == null)
        {
            throw new UserNotFoundException(currentUserId);
        }

        if (string.IsNullOrEmpty(user.PasswordHash) || !_passwordHasher.VerifyPassword(user, user.PasswordHash, request.CurrentPassword))
        {
            _logger.LogWarning("Đổi mật khẩu thất bại: Mật khẩu hiện tại không khớp cho người dùng ID {UserId}", currentUserId);
            throw new InvalidCredentialsException("Mật khẩu hiện tại không chính xác.");
        }

        // Cập nhật mật khẩu mới
        user.PasswordHash = _passwordHasher.HashPassword(user, request.NewPassword);
        user.SecurityStamp = Guid.NewGuid().ToString();

        // Thu hồi toàn bộ Refresh Tokens cũ để bắt buộc tái xác thực trên mọi phiên làm việc
        var activeRefreshTokens = await _dbContext.RefreshTokens
            .Where(rt => rt.UserId == user.Id && !rt.IsRevoked)
            .ToListAsync(cancellationToken);

        foreach (var rt in activeRefreshTokens)
        {
            rt.IsRevoked = true;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        _logger.LogInformation("Người dùng ID {UserId} ({Email}) đã đổi mật khẩu thành công.", user.Id, user.Email);

        return new AuthMessageResponseDto("Đổi mật khẩu thành công. Vui lòng đăng nhập lại với mật khẩu mới.");
    }
}

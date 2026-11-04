using CulinaryBlog.Application.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Users.Commands.UpdateUserStatus;

/// <summary>
/// Command kích hoạt hoặc khóa tài khoản người dùng dành cho Quản trị viên,
/// đồng thời thu hồi tức thì toàn bộ phiên đăng nhập (RefreshTokens) khi khóa tài khoản (FR-BKE-017).
/// </summary>
public record UpdateUserStatusCommand(
    string UserId,
    bool IsActive,
    int? LockoutDays = null,
    string? Reason = null) : IRequest<UserListItemDto>;

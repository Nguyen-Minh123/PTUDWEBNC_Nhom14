using CulinaryBlog.Application.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Users.Commands.UpdateUserRole;

/// <summary>
/// Command thay đổi vai trò (RBAC: Admin, Author, User) của một người dùng dành cho Quản trị viên (FR-BKE-017).
/// </summary>
public record UpdateUserRoleCommand(
    string UserId,
    string Role) : IRequest<UserListItemDto>;

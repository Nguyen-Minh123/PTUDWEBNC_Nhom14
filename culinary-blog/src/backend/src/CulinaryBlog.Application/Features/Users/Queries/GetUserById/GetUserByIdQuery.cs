using CulinaryBlog.Application.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Users.Queries.GetUserById;

/// <summary>
/// Query lấy thông tin chi tiết của một người dùng / tác giả theo ID (FR-BKE-016).
/// </summary>
public record GetUserByIdQuery(string UserId) : IRequest<UserListItemDto>;

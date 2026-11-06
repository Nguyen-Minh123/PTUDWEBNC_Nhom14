using CulinaryBlog.Application.Common.Models;
using CulinaryBlog.Application.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Users.Queries.GetUsers;

/// <summary>
/// Query truy vấn danh sách người dùng có phân trang, tìm kiếm theo tên/email, lọc theo vai trò và trạng thái (FR-BKE-016).
/// </summary>
public record GetUsersQuery(
    string? SearchTerm = null,
    string? Role = null,
    bool? IsActive = null,
    int PageNumber = 1,
    int PageSize = 10,
    string? Sort = "-createdAt") : IRequest<PagedResult<UserListItemDto>>;

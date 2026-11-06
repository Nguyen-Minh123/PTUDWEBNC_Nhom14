using CulinaryBlog.Application.Common.Models;
using CulinaryBlog.Application.DTOs;
using CulinaryBlog.Application.Features.Users.Commands.UpdateUserProfile;
using CulinaryBlog.Application.Features.Users.Commands.UpdateUserRole;
using CulinaryBlog.Application.Features.Users.Commands.UpdateUserStatus;
using CulinaryBlog.Application.Features.Users.Queries.GetAuthors;
using CulinaryBlog.Application.Features.Users.Queries.GetCurrentUserProfile;
using CulinaryBlog.Application.Features.Users.Queries.GetUserById;
using CulinaryBlog.Application.Features.Users.Queries.GetUsers;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace CulinaryBlog.API.Endpoints;

public static class UserEndpoints
{
    public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/users")
            .WithTags("Users")
            .WithOpenApi();

        // 1. Lấy thông tin hồ sơ người dùng hiện tại (FR-USER-001)
        group.MapGet("/me", async (
            [FromServices] ISender sender,
            CancellationToken ct) =>
        {
            var profile = await sender.Send(new GetCurrentUserProfileQuery(), ct);
            return profile is not null ? Results.Ok(profile) : Results.NotFound();
        })
        .WithName("GetCurrentUserProfile")
        .WithSummary("Lấy thông tin hồ sơ cá nhân của người dùng hiện tại")
        .Produces<UserProfileDto>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status401Unauthorized)
        .ProducesProblem(StatusCodes.Status404NotFound)
        .RequireAuthorization();

        // 2. Cập nhật hồ sơ người dùng hiện tại (FR-USER-001)
        group.MapPut("/me", async (
            [FromServices] ISender sender,
            [FromBody] UpdateUserProfileRequest request,
            CancellationToken ct) =>
        {
            if (string.IsNullOrWhiteSpace(request.DisplayName))
            {
                return Results.BadRequest("DisplayName không được để trống.");
            }

            var command = new UpdateUserProfileCommand(
                request.DisplayName,
                request.Bio,
                request.AvatarUrl);

            var updatedProfile = await sender.Send(command, ct);
            return updatedProfile is not null ? Results.Ok(updatedProfile) : Results.NotFound();
        })
        .WithName("UpdateCurrentUserProfile")
        .WithSummary("Cập nhật thông tin hồ sơ cá nhân của người dùng hiện tại")
        .Produces<UserProfileDto>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .ProducesProblem(StatusCodes.Status401Unauthorized)
        .ProducesProblem(StatusCodes.Status404NotFound)
        .RequireAuthorization();

        // 3. Lấy danh sách người dùng có phân trang, tìm kiếm và lọc cho Admin (FR-BKE-016)
        group.MapGet("/", async (
            [FromServices] ISender sender,
            [FromQuery] string? searchTerm = null,
            [FromQuery] string? q = null,
            [FromQuery] string? role = null,
            [FromQuery] bool? isActive = null,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? sort = "-createdAt",
            CancellationToken ct = default) =>
        {
            var effectiveSearch = !string.IsNullOrWhiteSpace(searchTerm) ? searchTerm : q;
            var query = new GetUsersQuery(
                effectiveSearch,
                role,
                isActive,
                pageNumber,
                pageSize,
                sort);

            var result = await sender.Send(query, ct);
            return Results.Ok(result);
        })
        .WithName("GetUsers")
        .WithSummary("Truy vấn danh sách người dùng có phân trang, tìm kiếm và lọc (Admin Only - FR-BKE-016)")
        .Produces<PagedResult<UserListItemDto>>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status401Unauthorized)
        .ProducesProblem(StatusCodes.Status403Forbidden)
        .RequireAuthorization("AdminOnly");

        // 4. Lấy danh sách tác giả / đầu bếp ẩm thực công khai kèm thống kê bài viết (FR-BKE-016, FR-FTE-045)
        group.MapGet("/authors", async (
            [FromServices] ISender sender,
            [FromQuery] string? searchTerm = null,
            [FromQuery] string? q = null,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 12,
            [FromQuery] string? sort = "-publishedRecipeCount",
            CancellationToken ct = default) =>
        {
            var effectiveSearch = !string.IsNullOrWhiteSpace(searchTerm) ? searchTerm : q;
            var query = new GetAuthorsQuery(
                effectiveSearch,
                pageNumber,
                pageSize,
                sort);

            var result = await sender.Send(query, ct);
            return Results.Ok(result);
        })
        .WithName("GetAuthors")
        .WithSummary("Lấy danh sách tác giả ẩm thực công khai kèm số lượng công thức đã đóng góp (FR-BKE-016)")
        .Produces<PagedResult<AuthorSummaryDto>>(StatusCodes.Status200OK)
        .AllowAnonymous();

        // 5. Lấy chi tiết một người dùng / tác giả theo ID (FR-BKE-016)
        group.MapGet("/{id}", async (
            string id,
            [FromServices] ISender sender,
            CancellationToken ct = default) =>
        {
            var result = await sender.Send(new GetUserByIdQuery(id), ct);
            return Results.Ok(result);
        })
        .WithName("GetUserById")
        .WithSummary("Lấy thông tin chi tiết một người dùng / tác giả theo ID")
        .Produces<UserListItemDto>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status404NotFound)
        .AllowAnonymous();

        // 6. Thay đổi vai trò (RBAC: Admin, Author, User) của người dùng (FR-BKE-017)
        group.MapPut("/{id}/role", async (
            string id,
            [FromBody] UpdateUserRoleRequest request,
            [FromServices] ISender sender,
            CancellationToken ct = default) =>
        {
            var result = await sender.Send(new UpdateUserRoleCommand(id, request.Role), ct);
            return Results.Ok(result);
        })
        .WithName("UpdateUserRole")
        .WithSummary("Thay đổi quyền hạn (Admin, Author, User) của một người dùng (Admin Only - FR-BKE-017)")
        .Produces<UserListItemDto>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .ProducesProblem(StatusCodes.Status401Unauthorized)
        .ProducesProblem(StatusCodes.Status403Forbidden)
        .ProducesProblem(StatusCodes.Status404NotFound)
        .RequireAuthorization("AdminOnly");

        // 7. Kích hoạt hoặc khóa tài khoản người dùng & thu hồi phiên đăng nhập (FR-BKE-017)
        group.MapPut("/{id}/status", async (
            string id,
            [FromBody] UpdateUserStatusRequest request,
            [FromServices] ISender sender,
            CancellationToken ct = default) =>
        {
            var result = await sender.Send(
                new UpdateUserStatusCommand(
                    id,
                    request.IsActive,
                    request.LockoutDays,
                    request.Reason),
                ct);
            return Results.Ok(result);
        })
        .WithName("UpdateUserStatus")
        .WithSummary("Kích hoạt hoặc khóa tài khoản người dùng và thu hồi toàn bộ phiên đăng nhập khi khóa (Admin Only - FR-BKE-017)")
        .Produces<UserListItemDto>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .ProducesProblem(StatusCodes.Status401Unauthorized)
        .ProducesProblem(StatusCodes.Status403Forbidden)
        .ProducesProblem(StatusCodes.Status404NotFound)
        .RequireAuthorization("AdminOnly");

        return app;
    }
}

public class UpdateUserProfileRequest
{
    public string DisplayName { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
}

public class UpdateUserRoleRequest
{
    public string Role { get; set; } = string.Empty;
}

public class UpdateUserStatusRequest
{
    public bool IsActive { get; set; }
    public int? LockoutDays { get; set; }
    public string? Reason { get; set; }
}

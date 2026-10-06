using CulinaryBlog.Application.Features.Users.Commands.UpdateUserProfile;
using CulinaryBlog.Application.Features.Users.Queries.GetCurrentUserProfile;
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

        group.MapGet("/me", async (
            [FromServices] ISender sender,
            CancellationToken ct) =>
        {
            var result = await sender.Send(new GetCurrentUserProfileQuery(), ct);
            return result is not null ? Results.Ok(result) : Results.Unauthorized();
        })
        .WithName("GetCurrentUser")
        .WithSummary("Lấy thông tin hồ sơ cá nhân của người dùng hiện tại")
        .RequireAuthorization();

        group.MapPut("/me", async (
            [FromServices] ISender sender,
            [FromBody] UpdateUserProfileCommand command,
            CancellationToken ct) =>
        {
            var result = await sender.Send(command, ct);
            return result is not null ? Results.Ok(result) : Results.Unauthorized();
        })
        .WithName("UpdateCurrentUser")
        .WithSummary("Cập nhật thông tin hồ sơ cá nhân")
        .RequireAuthorization();

        return app;
    }
}

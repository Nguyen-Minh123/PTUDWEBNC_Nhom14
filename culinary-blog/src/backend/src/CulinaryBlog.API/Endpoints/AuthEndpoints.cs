using CulinaryBlog.Application.Features.Auth.Commands.Logout;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace CulinaryBlog.API.Endpoints;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/auth")
            .WithTags("Auth")
            .WithOpenApi();

        group.MapPost("/logout", async (
            [FromServices] ISender sender,
            [FromBody] LogoutRequest request,
            CancellationToken ct) =>
        {
            if (string.IsNullOrWhiteSpace(request.RefreshToken))
            {
                return Results.BadRequest("RefreshToken is required.");
            }

            await sender.Send(new LogoutCommand(request.RefreshToken), ct);
            return Results.NoContent();
        })
        .WithName("Logout")
        .WithSummary("Đăng xuất (Revoke Refresh Token)")
        .RequireAuthorization(); // Requires auth to logout

        return app;
    }
}

public class LogoutRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}

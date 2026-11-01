using CulinaryBlog.Application.Features.Auth.Commands.ChangePassword;
using CulinaryBlog.Application.Features.Auth.Commands.ForgotPassword;
using CulinaryBlog.Application.Features.Auth.Commands.GoogleLogin;
using CulinaryBlog.Application.Features.Auth.Commands.Login;
using CulinaryBlog.Application.Features.Auth.Commands.Logout;
using CulinaryBlog.Application.Features.Auth.Commands.RefreshTokens;
using CulinaryBlog.Application.Features.Auth.Commands.Register;
using CulinaryBlog.Application.Features.Auth.Commands.ResetPassword;
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

        // 1. Đăng ký tài khoản mới (FR-AUTH-001)
        group.MapPost("/register", async (
            [FromServices] ISender sender,
            [FromBody] RegisterRequest request,
            CancellationToken ct) =>
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return Results.BadRequest("Email và Mật khẩu không được để trống.");
            }

            var displayName = string.IsNullOrWhiteSpace(request.DisplayName)
                ? request.Email.Split('@')[0]
                : request.DisplayName;

            var command = new RegisterCommand(
                request.Email,
                request.Password,
                displayName,
                request.FirstName,
                request.LastName);

            var result = await sender.Send(command, ct);
            return Results.Created($"/api/v1/users/{result.User.Id}", result);
        })
        .WithName("Register")
        .WithSummary("Đăng ký tài khoản mới (Local Register)")
        .AllowAnonymous();

        // 2. Đăng nhập Email/Mật khẩu (FR-AUTH-002) - Áp dụng Rate Limiting 5 req/phút
        group.MapPost("/login", async (
            [FromServices] ISender sender,
            [FromBody] LoginRequest request,
            CancellationToken ct) =>
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return Results.BadRequest("Email và Mật khẩu không được để trống.");
            }

            var result = await sender.Send(new LoginCommand(request.Email, request.Password), ct);
            return Results.Ok(result);
        })
        .WithName("Login")
        .WithSummary("Đăng nhập bằng Email và Mật khẩu")
        .RequireRateLimiting("login-policy")
        .AllowAnonymous();

        // 3. Đăng nhập Google OAuth (FR-AUTH-003)
        group.MapPost("/google-login", async (
            [FromServices] ISender sender,
            [FromBody] GoogleLoginRequest request,
            CancellationToken ct) =>
        {
            if (string.IsNullOrWhiteSpace(request.IdToken))
            {
                return Results.BadRequest("IdToken is required.");
            }

            var result = await sender.Send(new GoogleLoginCommand(request.IdToken), ct);
            return Results.Ok(result);
        })
        .WithName("GoogleLogin")
        .WithSummary("Đăng nhập bằng Google (Social Login)")
        .AllowAnonymous();

        // 4. Silent Token Refresh & Rotation (FR-SEC-002, FR-SEC-004, FR-FTE-029)
        group.MapPost("/refresh-token", async (
            [FromServices] ISender sender,
            [FromBody] RefreshTokenRequest request,
            CancellationToken ct) =>
        {
            if (string.IsNullOrWhiteSpace(request.RefreshToken))
            {
                return Results.BadRequest("RefreshToken is required.");
            }

            var result = await sender.Send(new RefreshTokenCommand(request.RefreshToken), ct);
            return Results.Ok(result);
        })
        .WithName("RefreshToken")
        .WithSummary("Làm mới Access Token & Xoay vòng Refresh Token (Token Rotation)")
        .AllowAnonymous();

        // 5. Đăng xuất (FR-AUTH-005)
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
        .RequireAuthorization();

        // 6. Quên mật khẩu - Sinh mã/liên kết đặt lại mật khẩu (FR-BKE-014)
        group.MapPost("/forgot-password", async (
            [FromServices] ISender sender,
            [FromBody] ForgotPasswordRequest request,
            CancellationToken ct) =>
        {
            if (string.IsNullOrWhiteSpace(request.Email))
            {
                return Results.BadRequest("Email không được để trống.");
            }

            var result = await sender.Send(new ForgotPasswordCommand(request.Email), ct);
            return Results.Ok(result);
        })
        .WithName("ForgotPassword")
        .WithSummary("Yêu cầu mã đặt lại mật khẩu khi quên (Forgot Password)")
        .RequireRateLimiting("login-policy")
        .AllowAnonymous();

        // 7. Đặt lại mật khẩu mới thông qua Token khôi phục (FR-BKE-014)
        group.MapPost("/reset-password", async (
            [FromServices] ISender sender,
            [FromBody] ResetPasswordRequest request,
            CancellationToken ct) =>
        {
            var command = new ResetPasswordCommand(
                request.Email,
                request.Token,
                request.NewPassword,
                request.ConfirmPassword);

            var result = await sender.Send(command, ct);
            return Results.Ok(result);
        })
        .WithName("ResetPassword")
        .WithSummary("Đặt lại mật khẩu mới với mã token khôi phục (Reset Password)")
        .RequireRateLimiting("login-policy")
        .AllowAnonymous();

        // 8. Đổi mật khẩu cho người dùng đã đăng nhập (FR-BKE-014)
        group.MapPost("/change-password", async (
            [FromServices] ISender sender,
            [FromBody] ChangePasswordRequest request,
            CancellationToken ct) =>
        {
            var command = new ChangePasswordCommand(
                request.CurrentPassword,
                request.NewPassword,
                request.ConfirmPassword);

            var result = await sender.Send(command, ct);
            return Results.Ok(result);
        })
        .WithName("ChangePassword")
        .WithSummary("Đổi mật khẩu người dùng đã xác thực (Change Password)")
        .RequireAuthorization();

        return app;
    }
}

public class RegisterRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string? DisplayName { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LogoutRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}

public class GoogleLoginRequest
{
    public string IdToken { get; set; } = string.Empty;
}

public class RefreshTokenRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}

public class ForgotPasswordRequest
{
    public string Email { get; set; } = string.Empty;
}

public class ResetPasswordRequest
{
    public string Email { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;
}

public class ChangePasswordRequest
{
    public string CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;
}

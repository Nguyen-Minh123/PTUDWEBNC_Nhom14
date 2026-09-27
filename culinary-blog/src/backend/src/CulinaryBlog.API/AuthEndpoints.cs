using Carter;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

using CulinaryBlog.Application.Authentication.Contracts;
using CulinaryBlog.Application.Authentication.Commands.Register;
using CulinaryBlog.Application.Authentication.Commands.Login;
using CulinaryBlog.Application.Authentication.Commands.RefreshToken;

namespace CulinaryBlog.API.Endpoints;

public class AuthEndpoints : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("api/auth")
            .WithTags("Authentication")
            .WithOpenApi(); 

        // 1. ENDPOINT ĐĂNG KÝ
        group.MapPost("/register", async (
            [FromBody] RegisterRequest request, 
            [FromServices] ISender sender) =>
        {
            var command = request.Adapt<RegisterCommand>();
            var result = await sender.Send(command);

            // Đổi TypedResults thành Results
            return result.IsSuccess 
                ? Results.Ok(result.Value) 
                : Results.BadRequest(result.Error);
        })
        .WithName("Register")
        .Produces<AuthResponse>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest);

        // 2. ENDPOINT ĐĂNG NHẬP
        group.MapPost("/login", async (
            [FromBody] LoginRequest request, 
            [FromServices] ISender sender) =>
        {
            var command = request.Adapt<LoginCommand>();
            var result = await sender.Send(command);

            return result.IsSuccess 
                ? Results.Ok(result.Value) 
                : Results.Unauthorized();
        })
        .WithName("Login")
        .Produces<AuthResponse>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status401Unauthorized);

        // 3. ENDPOINT CẤP LẠI TOKEN
        group.MapPost("/refresh-token", async (
            [FromBody] RefreshTokenRequest request, 
            [FromServices] ISender sender) =>
        {
            var command = request.Adapt<RefreshTokenCommand>();
            var result = await sender.Send(command);

            return result.IsSuccess 
                ? Results.Ok(result.Value) 
                : Results.BadRequest(result.Error); 
        })
        .WithName("RefreshToken")
        .Produces<AuthResponse>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest);
    }
}
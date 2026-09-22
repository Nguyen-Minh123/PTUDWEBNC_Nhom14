using CulinaryBlog.Application.Authentication.Contracts;
using CulinaryBlog.Domain.Shared;
using MediatR;

namespace CulinaryBlog.Application.Authentication.Commands.RefreshToken;

public record RefreshTokenCommand(
    string AccessToken, 
    string RefreshToken) : IRequest<Result<AuthResponse>>;
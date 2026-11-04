using CulinaryBlog.Application.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Auth.Commands.RefreshTokens;

public record RefreshTokenCommand(string RefreshToken) : IRequest<AuthResponseDto>;

using CulinaryBlog.Application.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Auth.Commands.Register;

public record RegisterCommand(
    string Email,
    string Password,
    string DisplayName,
    string? FirstName = null,
    string? LastName = null
) : IRequest<AuthResponseDto>;

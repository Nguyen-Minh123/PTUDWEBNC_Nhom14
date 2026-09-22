using CulinaryBlog.Application.Authentication.Contracts;
using CulinaryBlog.Domain.Shared;
using MediatR;

namespace CulinaryBlog.Application.Authentication.Commands.Login;

public record LoginCommand(
    string Email, 
    string Password) : IRequest<Result<AuthResponse>>;
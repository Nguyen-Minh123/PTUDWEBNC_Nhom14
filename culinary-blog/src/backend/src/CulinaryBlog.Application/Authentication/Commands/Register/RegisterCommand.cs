using CulinaryBlog.Application.Authentication.Contracts;
using CulinaryBlog.Domain.Shared;
using MediatR;

// Đây chính là dòng namespace mà trình biên dịch đang tìm kiếm
namespace CulinaryBlog.Application.Authentication.Commands.Register;

public record RegisterCommand(
    string FirstName, 
    string LastName, 
    string Email, 
    string Password) : IRequest<Result<AuthResponse>>;
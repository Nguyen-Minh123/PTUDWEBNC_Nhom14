namespace culinary-blog.src.backend.src.CulinaryBlog.Application.Features.Auth.Commands;

public record LogoutCommand(string RefreshToken) : IRequest<Unit>;
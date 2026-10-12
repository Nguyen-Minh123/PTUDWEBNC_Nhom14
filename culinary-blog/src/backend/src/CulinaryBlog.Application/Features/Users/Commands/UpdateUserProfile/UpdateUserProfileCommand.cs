using CulinaryBlog.Application.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Users.Commands.UpdateUserProfile;

public record UpdateUserProfileCommand(
    string DisplayName,
    string? Bio,
    string? AvatarUrl) : IRequest<UserProfileDto?>;

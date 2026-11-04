using CulinaryBlog.Application.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Users.Queries.GetCurrentUserProfile;

public record GetCurrentUserProfileQuery : IRequest<UserProfileDto>;

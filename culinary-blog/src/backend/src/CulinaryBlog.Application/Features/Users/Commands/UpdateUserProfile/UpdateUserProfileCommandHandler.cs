using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.DTOs;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Users.Commands.UpdateUserProfile;

public class UpdateUserProfileCommandHandler : IRequestHandler<UpdateUserProfileCommand, UserProfileDto?>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly ICurrentUserService _currentUserService;

    public UpdateUserProfileCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
    {
        _dbContext = dbContext;
        _currentUserService = currentUserService;
    }

    public async Task<UserProfileDto?> Handle(UpdateUserProfileCommand request, CancellationToken cancellationToken)
    {
        var currentUserId = _currentUserService.UserId;
        if (string.IsNullOrWhiteSpace(currentUserId))
        {
            return null;
        }

        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == currentUserId, cancellationToken);

        if (user == null)
        {
            return null;
        }

        user.UpdateProfile(request.DisplayName, request.Bio, request.AvatarUrl);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return user.Adapt<UserProfileDto>();
    }
}

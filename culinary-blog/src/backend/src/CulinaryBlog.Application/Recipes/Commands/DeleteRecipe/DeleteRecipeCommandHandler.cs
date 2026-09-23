using CulinaryBlog.Application.Common.Caching;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace CulinaryBlog.Application.Recipes.Commands.DeleteRecipe;

public sealed record DeleteRecipeCommand(Guid RecipeId) : IRequest<Unit>;

public sealed class DeleteRecipeCommandHandler : IRequestHandler<DeleteRecipeCommand, Unit>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;
    private readonly ICacheService _cacheService;
    private readonly IBackgroundJobQueue _backgroundJobQueue;
    private readonly ILogger<DeleteRecipeCommandHandler> _logger;

    public DeleteRecipeCommandHandler(
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService,
        ICacheService cacheService,
        IBackgroundJobQueue backgroundJobQueue,
        ILogger<DeleteRecipeCommandHandler> logger)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
        _cacheService = cacheService;
        _backgroundJobQueue = backgroundJobQueue;
        _logger = logger;
    }

    public async Task<Unit> Handle(DeleteRecipeCommand request, CancellationToken cancellationToken)
    {
        var recipe = await _unitOfWork.Recipes.GetByIdWithDetailsAsync(
            request.RecipeId,
            cancellationToken);

        if (recipe is null)
        {
            throw new KeyNotFoundException($"Recipe '{request.RecipeId}' was not found.");
        }

        if (!CanDelete(recipe))
        {
            throw new UnauthorizedAccessException("You do not have permission to delete this recipe.");
        }

        var imageUrls = recipe.Images
            .Select(x => x.OriginalUrl)
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        _unitOfWork.Recipes.Remove(recipe);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        foreach (var imageUrl in imageUrls)
        {
            _backgroundJobQueue.EnqueueDeleteFile(imageUrl);
        }

        await _cacheService.RemoveByPrefixAsync(CacheKeys.RecipesInvalidatePrefix, cancellationToken);
        await _cacheService.RemoveByPrefixAsync(CacheKeys.SearchInvalidatePrefix, cancellationToken);

        if (!string.IsNullOrWhiteSpace(recipe.Slug))
        {
            await _cacheService.RemoveAsync(CacheKeys.RecipeBySlug(recipe.Slug), cancellationToken);
        }

        await _cacheService.RemoveAsync(CacheKeys.RecipeById(recipe.Id), cancellationToken);

        _logger.LogInformation(
            "Recipe deleted. RecipeId={RecipeId}, Slug={Slug}, ImageCount={ImageCount}",
            recipe.Id,
            recipe.Slug,
            imageUrls.Length);

        return Unit.Value;
    }

    private bool CanDelete(Recipe recipe)
    {
        if (_currentUserService.IsInRole("Admin"))
        {
            return true;
        }

        return !string.IsNullOrWhiteSpace(_currentUserService.UserId)
               && string.Equals(recipe.AuthorId, _currentUserService.UserId, StringComparison.Ordinal);
    }
}
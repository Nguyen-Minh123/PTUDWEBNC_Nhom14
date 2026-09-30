using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Features.Recipes;
using CulinaryBlog.Domain.Common;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Commands;

public sealed record CreateRecipeCommand(
    string Title,
    string Slug,
    string Description,
    string Instructions,
    int PrepTime,
    int CookTime,
    int Servings,
    RecipeDifficulty Difficulty,
    Guid CategoryId,
    string AuthorId,
    RecipeNutritionDto? Nutrition) : IRequest<RecipeLifecycleDto>;

public sealed record UpdateRecipeCommand(
    Guid Id,
    string Title,
    string Slug,
    string Description,
    string Instructions,
    int PrepTime,
    int CookTime,
    int Servings,
    RecipeDifficulty Difficulty,
    Guid CategoryId,
    RecipeNutritionDto? Nutrition) : IRequest<RecipeLifecycleDto?>;

public sealed record PublishRecipeCommand(Guid Id) : IRequest<RecipeLifecycleDto?>;

public sealed record ArchiveRecipeCommand(Guid Id) : IRequest<RecipeLifecycleDto?>;

public sealed class CreateRecipeCommandHandler(IUnitOfWork unitOfWork)
    : IRequestHandler<CreateRecipeCommand, RecipeLifecycleDto>
{
    public async Task<RecipeLifecycleDto> Handle(
        CreateRecipeCommand request,
        CancellationToken cancellationToken)
    {
        var slug = RecipeSlugNormalizer.Normalize(request.Slug);
        if (await unitOfWork.Recipes.SlugExistsAsync(slug, cancellationToken: cancellationToken))
        {
            throw new RecipeSlugConflictException(slug);
        }

        var recipe = new Recipe(
            request.Title,
            slug,
            request.Description,
            request.Instructions,
            request.PrepTime,
            request.CookTime,
            request.Servings,
            request.Difficulty,
            request.CategoryId,
            request.AuthorId,
            request.Nutrition?.ToEntity());

        await unitOfWork.Recipes.AddAsync(recipe, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return RecipeLifecycleDto.FromEntity(recipe);
    }
}

public sealed class UpdateRecipeCommandHandler(IUnitOfWork unitOfWork)
    : IRequestHandler<UpdateRecipeCommand, RecipeLifecycleDto?>
{
    public async Task<RecipeLifecycleDto?> Handle(
        UpdateRecipeCommand request,
        CancellationToken cancellationToken)
    {
        var recipe = await unitOfWork.Recipes.GetByIdAsync(request.Id, cancellationToken);
        if (recipe is null)
        {
            return null;
        }

        var slug = RecipeSlugNormalizer.Normalize(request.Slug);
        if (await unitOfWork.Recipes.SlugExistsAsync(slug, request.Id, cancellationToken))
        {
            throw new RecipeSlugConflictException(slug);
        }

        recipe.UpdateDetails(
            request.Title,
            slug,
            request.Description,
            request.Instructions,
            request.PrepTime,
            request.CookTime,
            request.Servings,
            request.Difficulty,
            request.CategoryId);

        if (request.Nutrition is not null)
        {
            recipe.SetNutrition(request.Nutrition.ToEntity());
        }

        recipe.UpdatedAt = DateTimeOffset.UtcNow;
        unitOfWork.Recipes.Update(recipe);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return RecipeLifecycleDto.FromEntity(recipe);
    }

}

public sealed class PublishRecipeCommandHandler(IUnitOfWork unitOfWork)
    : IRequestHandler<PublishRecipeCommand, RecipeLifecycleDto?>
{
    public async Task<RecipeLifecycleDto?> Handle(
        PublishRecipeCommand request,
        CancellationToken cancellationToken)
    {
        var recipe = await unitOfWork.Recipes.GetByIdWithDetailsAsync(request.Id, cancellationToken);
        if (recipe is null)
        {
            return null;
        }

        if (recipe.Status == RecipeStatus.Published)
        {
            throw new RecipeAlreadyPublishedException();
        }

        if (recipe.Ingredients.Count == 0 || recipe.Steps.Count == 0)
        {
            throw new DomainException("Recipe must have at least one ingredient and one step before publishing.");
        }

        recipe.Publish();
        recipe.UpdatedAt = DateTimeOffset.UtcNow;
        unitOfWork.Recipes.Update(recipe);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return RecipeLifecycleDto.FromEntity(recipe);
    }
}

public sealed class ArchiveRecipeCommandHandler(IUnitOfWork unitOfWork)
    : IRequestHandler<ArchiveRecipeCommand, RecipeLifecycleDto?>
{
    public async Task<RecipeLifecycleDto?> Handle(
        ArchiveRecipeCommand request,
        CancellationToken cancellationToken)
    {
        var recipe = await unitOfWork.Recipes.GetByIdAsync(request.Id, cancellationToken);
        if (recipe is null)
        {
            return null;
        }

        recipe.Archive();
        recipe.UpdatedAt = DateTimeOffset.UtcNow;
        unitOfWork.Recipes.Update(recipe);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return RecipeLifecycleDto.FromEntity(recipe);
    }
}

internal static class RecipeSlugNormalizer
{
    public static string Normalize(string value)
    {
        var slug = value.Trim()
            .ToLowerInvariant()
            .Replace(' ', '-')
            .Replace('_', '-');

        while (slug.Contains("--", StringComparison.Ordinal))
        {
            slug = slug.Replace("--", "-", StringComparison.Ordinal);
        }

        return slug.Trim('-');
    }
}
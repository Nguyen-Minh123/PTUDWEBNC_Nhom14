using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Queries;

public sealed record ListRecipesQuery(
    int Page = 1,
    int PageSize = 10,
    Guid? CategoryId = null,
    RecipeStatus Status = RecipeStatus.Published) : IRequest<RecipeLifecyclePageDto>;

public sealed record GetRecipeByIdQuery(Guid Id) : IRequest<RecipeLifecycleDto?>;

public sealed class ListRecipesQueryHandler(IUnitOfWork unitOfWork)
    : IRequestHandler<ListRecipesQuery, RecipeLifecyclePageDto>
{
    public async Task<RecipeLifecyclePageDto> Handle(
        ListRecipesQuery request,
        CancellationToken cancellationToken)
    {
        var recipes = await unitOfWork.Recipes.GetPagedAsync(
            request.Page,
            request.PageSize,
            request.CategoryId,
            request.Status,
            cancellationToken: cancellationToken);
        var count = await unitOfWork.Recipes.CountAsync(
            request.CategoryId,
            request.Status,
            cancellationToken: cancellationToken);

        return new RecipeLifecyclePageDto(
            recipes.Select(RecipeLifecycleDto.FromEntity).ToArray(),
            count,
            request.Page,
            request.PageSize);
    }
}

public sealed class GetRecipeByIdQueryHandler(IUnitOfWork unitOfWork)
    : IRequestHandler<GetRecipeByIdQuery, RecipeLifecycleDto?>
{
    public async Task<RecipeLifecycleDto?> Handle(
        GetRecipeByIdQuery request,
        CancellationToken cancellationToken)
    {
        var recipe = await unitOfWork.Recipes.GetByIdWithDetailsAsync(request.Id, cancellationToken);
        return recipe is null ? null : RecipeLifecycleDto.FromEntity(recipe);
    }
}
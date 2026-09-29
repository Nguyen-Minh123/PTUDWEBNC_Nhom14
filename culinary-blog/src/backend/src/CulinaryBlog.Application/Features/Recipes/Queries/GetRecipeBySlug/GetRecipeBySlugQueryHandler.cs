using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.DTOs;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Queries.GetRecipeBySlug;

public class GetRecipeBySlugQueryHandler : IRequestHandler<GetRecipeBySlugQuery, RecipeDetailDto?>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetRecipeBySlugQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<RecipeDetailDto?> Handle(GetRecipeBySlugQuery request, CancellationToken cancellationToken)
    {
        var recipe = await _unitOfWork.Recipes.GetBySlugWithDetailsAsync(request.Slug, cancellationToken);
        return recipe?.Adapt<RecipeDetailDto>();
    }
}

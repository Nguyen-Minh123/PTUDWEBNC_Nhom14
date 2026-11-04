using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Models;
using CulinaryBlog.Application.DTOs;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Recipes.Queries.SearchRecipes;

public class SearchRecipesQueryHandler : IRequestHandler<SearchRecipesQuery, PaginatedResult<RecipeSummaryDto>>
{
    private readonly IUnitOfWork _unitOfWork;

    public SearchRecipesQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<PaginatedResult<RecipeSummaryDto>> Handle(SearchRecipesQuery request, CancellationToken cancellationToken)
    {
        var recipes = await _unitOfWork.Recipes.GetPagedAsync(
            page: request.Page,
            pageSize: request.PageSize,
            keyword: request.SearchTerm,
            status: CulinaryBlog.Domain.Entities.RecipeStatus.Published,
            cancellationToken: cancellationToken);

        var totalCount = await _unitOfWork.Recipes.CountAsync(
            keyword: request.SearchTerm,
            status: CulinaryBlog.Domain.Entities.RecipeStatus.Published,
            cancellationToken: cancellationToken);

        var items = recipes.Adapt<List<RecipeSummaryDto>>();

        return new PaginatedResult<RecipeSummaryDto>(items, totalCount, request.Page, request.PageSize);
    }
}

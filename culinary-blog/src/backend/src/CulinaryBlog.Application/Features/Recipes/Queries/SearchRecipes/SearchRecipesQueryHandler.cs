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

        var items = recipes.Select(r => new RecipeSummaryDto(
            r.Id,
            r.Title,
            r.Slug,
            r.Description,
            r.PrepTime,
            r.CookTime,
            r.Servings,
            r.Difficulty,
            r.Status,
            r.CategoryId,
            r.AuthorId,
            r.CreatedAt.UtcDateTime,
            r.UpdatedAt?.UtcDateTime,
            r.Category?.Name,
            r.Author?.DisplayName ?? r.Author?.UserName,
            r.Images.FirstOrDefault(i => i.IsPrimary)?.MediumUrl ?? r.Images.FirstOrDefault()?.MediumUrl,
            r.PrepTime + r.CookTime,
            4.8,
            18,
            r.Nutrition != null ? new RecipeNutritionDto(
                r.Nutrition.Calories,
                r.Nutrition.Protein,
                r.Nutrition.Carbohydrates,
                r.Nutrition.Fat,
                r.Nutrition.Fiber,
                r.Nutrition.Sodium) : null
        )).ToList();

        return new PaginatedResult<RecipeSummaryDto>(items, totalCount, request.Page, request.PageSize);
    }
}

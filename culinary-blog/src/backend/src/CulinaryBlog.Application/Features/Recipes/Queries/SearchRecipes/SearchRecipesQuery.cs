using CulinaryBlog.Application.Common.Models;
using CulinaryBlog.Application.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Queries.SearchRecipes;

public record SearchRecipesQuery(
    string SearchTerm,
    int Page = 1,
    int PageSize = 10
) : IRequest<PaginatedResult<RecipeSummaryDto>>;

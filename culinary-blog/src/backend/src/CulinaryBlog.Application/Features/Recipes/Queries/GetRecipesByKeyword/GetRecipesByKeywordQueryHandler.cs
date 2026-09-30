using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NpgsqlTypes;

namespace CulinaryBlog.Application.Features.Recipes.Queries.GetRecipesByKeyword;

/// <summary>
/// Handler xử lý truy vấn tìm Recipe theo từ khóa.
/// </summary>
public sealed class GetRecipesByKeywordQueryHandler
    : IRequestHandler<GetRecipesByKeywordQuery, IReadOnlyList<RecipeSearchResultDto>>
{
    // Tên shadow property đã khai báo trong RecipeConfiguration.
    private const string SearchVectorPropertyName = "SearchVector";

    // Cấu hình full-text search đã dùng cho SearchVector.
    private const string FullTextSearchConfig = "simple";

    private readonly IApplicationDbContext _dbContext;

    public GetRecipesByKeywordQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<RecipeSearchResultDto>> Handle(
        GetRecipesByKeywordQuery request,
        CancellationToken cancellationToken)
    {
        var keyword = request.Keyword?.Trim();

        if (string.IsNullOrWhiteSpace(keyword))
        {
            return Array.Empty<RecipeSearchResultDto>();
        }

        var take = request.Take <= 0 ? 20 : Math.Min(request.Take, 100);

        // Chuyển keyword thành tsquery.
        var tsQuery = EF.Functions.WebSearchToTsQuery(FullTextSearchConfig, keyword);

        // Query cơ sở trên Recipe.
        var baseQuery = _dbContext.Recipes
            .AsNoTracking()
            .Where(recipe =>
                EF.Property<NpgsqlTsVector>(recipe, SearchVectorPropertyName)
                    .Matches(tsQuery));

        // Sắp xếp theo độ phù hợp bằng RankCoverDensity.
        var results = await baseQuery
            .OrderByDescending(recipe =>
                EF.Property<NpgsqlTsVector>(recipe, SearchVectorPropertyName)
                    .RankCoverDensity(tsQuery))
            .ThenByDescending(recipe => recipe.PublishedAt)
            .ThenByDescending(recipe => recipe.CreatedAt)
            .Take(take)
            .Select(recipe => new RecipeSearchResultDto
            {
                Id = recipe.Id,
                Title = recipe.Title,
                Slug = recipe.Slug,
                Description = recipe.Description,
                PrepTime = recipe.PrepTime,
                CookTime = recipe.CookTime,
                Servings = recipe.Servings,
                Difficulty = (int)recipe.Difficulty,
                Status = (int)recipe.Status,
                CategoryId = recipe.CategoryId,
                AuthorId = recipe.AuthorId,
                PublishedAt = recipe.PublishedAt
            })
            .ToListAsync(cancellationToken);

        return results;
    }
}
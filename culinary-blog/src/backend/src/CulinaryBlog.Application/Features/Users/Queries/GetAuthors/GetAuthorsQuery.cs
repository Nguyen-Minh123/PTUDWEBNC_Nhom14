using CulinaryBlog.Application.Common.Models;
using CulinaryBlog.Application.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Users.Queries.GetAuthors;

/// <summary>
/// Query công khai lấy danh sách các tác giả / đầu bếp ẩm thực kèm số lượng công thức đã xuất bản (FR-BKE-016, FR-FTE-045).
/// </summary>
public record GetAuthorsQuery(
    string? SearchTerm = null,
    int PageNumber = 1,
    int PageSize = 12,
    string? Sort = "-publishedRecipeCount") : IRequest<PagedResult<AuthorSummaryDto>>;

using Asp.Versioning;
using Asp.Versioning.Builder;
using CulinaryBlog.Application.Features.Categories;
using CulinaryBlog.Application.Features.Categories.Queries.GetAllCategories;
using MediatR;
using Microsoft.AspNetCore.RateLimiting;

namespace CulinaryBlog.API.Endpoints;

/// <summary>
/// Định nghĩa toàn bộ endpoint liên quan đến danh mục.
/// Hiện tại ưu tiên endpoint đọc danh sách danh mục kèm thống kê số bài viết.
/// </summary>
public static class CategoriesEndpoints
{
    /// <summary>
    /// Phiên bản API đang áp dụng cho nhóm Categories.
    /// </summary>
    private static readonly ApiVersion V1 = new(1, 0);

    /// <summary>
    /// Gắn các endpoint của Categories vào ứng dụng.
    /// </summary>
    /// <param name="app">Endpoint route builder của ứng dụng.</param>
    /// <returns>Ứng dụng sau khi đã map route Categories.</returns>
    public static IEndpointRouteBuilder MapCategoriesEndpoints(this IEndpointRouteBuilder app)
    {
        // Tạo version set cho nhóm endpoint Categories.
        // Đây là bước bắt buộc để endpoint gắn được metadata version.
        var versionSet = app.NewApiVersionSet()
            .HasApiVersion(V1)
            .ReportApiVersions()
            .Build();

        // Route group gốc cho Categories theo chuẩn:
        // /api/v{version:apiVersion}/categories
        var categoriesGroup = app.MapGroup("/api/v{version:apiVersion}/categories")
            .WithApiVersionSet(versionSet)
            .WithTags("Categories");

        // GET /api/v1/categories
        // Trả về danh sách danh mục kèm thống kê số bài viết.
        categoriesGroup.MapGet("/", GetAllCategoriesAsync)
            .MapToApiVersion(V1)
            .RequireRateLimiting("api-policy")
            .WithName("GetAllCategoriesV1");

        return app;
    }

    /// <summary>
    /// Lấy danh sách danh mục kèm thống kê số bài viết trong từng danh mục.
    /// Dữ liệu sẽ được xử lý bởi Application layer, nơi đã có caching behavior.
    /// </summary>
    /// <param name="sender">MediatR sender để gửi query.</param>
    /// <param name="cancellationToken">Token hủy request.</param>
    /// <returns>Danh sách danh mục dạng DTO.</returns>
    private static async Task<IResult> GetAllCategoriesAsync(
        ISender sender,
        CancellationToken cancellationToken)
    {
        // Gửi query xuống Application layer.
        // Handler sẽ thực hiện:
        // - kiểm tra cache
        // - nếu cache miss thì truy vấn PostgreSQL
        // - trả về danh sách CategorySummaryDto
        var categories = await sender.Send(new GetAllCategoriesQuery(), cancellationToken);

        return Results.Ok(categories);
    }
}
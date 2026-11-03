using CulinaryBlog.Application.Features.Recipes.Images;
using CulinaryBlog.Application.Features.Recipes.Images.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CulinaryBlog.API.Endpoints;

/// <summary>
/// Endpoint group quản lý ảnh công thức.
/// Hỗ trợ upload ảnh, đặt ảnh chính và xóa ảnh.
/// </summary>
public static class RecipeImagesEndpoints
{
    // Theo SRS: ảnh upload tối đa 5MB và chỉ nhận một số MIME type nhất định.
    private const long MaxImageSizeBytes = 5 * 1024 * 1024;

    // Danh sách MIME type được phép theo đặc tả.
    private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif"
    };

    /// <summary>
    /// Đăng ký toàn bộ route cho module ảnh công thức.
    /// </summary>
    public static IEndpointRouteBuilder MapRecipeImagesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/recipes/{id:guid}/images")
            .WithTags("Recipe Images")
            .RequireAuthorization();

        // Upload một ảnh mới cho recipe.
        group.MapPost("", UploadImage)
            .WithName("UploadRecipeImage")
            .Produces<RecipeImageDto>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesValidationProblem();

        // Đặt một ảnh làm ảnh chính.
        group.MapPatch("/{imageId:guid}/primary", SetPrimaryImage)
            .WithName("SetPrimaryRecipeImage")
            .Produces<RecipeImageDto>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        // Xóa một ảnh khỏi recipe.
        group.MapDelete("/{imageId:guid}", DeleteImage)
            .WithName("DeleteRecipeImage")
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    /// <summary>
    /// Upload ảnh mới cho recipe.
    /// Endpoint này:
    /// 1) kiểm tra file rỗng;
    /// 2) kiểm tra dung lượng;
    /// 3) kiểm tra MIME type;
    /// 4) chuyển tiếp sang Application layer qua MediatR.
    /// </summary>
    private static async Task<IResult> UploadImage(
        Guid id,
        [FromForm] IFormFile file,
        [FromForm] string? altText,
        [FromForm] int orderIndex,
        ISender sender,
        CancellationToken cancellationToken)
    {
        // Kiểm tra input tối thiểu trước khi đi vào handler.
        var validationError = ValidateUploadRequest(file);
        if (validationError is not null)
        {
            return validationError;
        }

        // Tạo command cho use case upload ảnh.
        var command = new UploadRecipeImageCommand(
            id,
            file,
            altText,
            orderIndex);

        // Dispatch sang Application layer.
        var result = await sender.Send(command, cancellationToken);

        // Trả về 201 Created kèm đường dẫn resource vừa tạo.
        return Results.Created($"/api/v1/recipes/{id}/images/{result.Id}", result);
    }

    /// <summary>
    /// Đặt ảnh của recipe làm ảnh chính.
    /// </summary>
    private static async Task<IResult> SetPrimaryImage(
        Guid id,
        Guid imageId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new SetPrimaryRecipeImageCommand(id, imageId),
            cancellationToken);

        return Results.Ok(result);
    }

    /// <summary>
    /// Xóa ảnh của recipe.
    /// </summary>
    private static async Task<IResult> DeleteImage(
        Guid id,
        Guid imageId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        await sender.Send(new DeleteRecipeImageCommand(id, imageId), cancellationToken);
        return Results.NoContent();
    }

    /// <summary>
    /// Kiểm tra dữ liệu file upload ở mức API boundary.
    /// Mục tiêu là chặn request sai càng sớm càng tốt trước khi đi xuống handler.
    /// </summary>
    private static IResult? ValidateUploadRequest(IFormFile? file)
    {
        if (file is null)
        {
            return Results.BadRequest(new ProblemDetails
            {
                Title = "File is required.",
                Detail = "Bạn phải chọn một file ảnh để upload.",
                Status = StatusCodes.Status400BadRequest
            });
        }

        if (file.Length <= 0)
        {
            return Results.BadRequest(new ProblemDetails
            {
                Title = "File is empty.",
                Detail = "File ảnh không được rỗng.",
                Status = StatusCodes.Status400BadRequest
            });
        }

        if (file.Length > MaxImageSizeBytes)
        {
            return Results.BadRequest(new ProblemDetails
            {
                Title = "File is too large.",
                Detail = "File ảnh vượt quá giới hạn 5MB theo đặc tả.",
                Status = StatusCodes.Status400BadRequest
            });
        }

        if (string.IsNullOrWhiteSpace(file.ContentType) || !AllowedContentTypes.Contains(file.ContentType))
        {
            return Results.BadRequest(new ProblemDetails
            {
                Title = "Unsupported image format.",
                Detail = "Chỉ chấp nhận image/jpeg, image/png, image/webp và image/avif.",
                Status = StatusCodes.Status400BadRequest
            });
        }

        return null;
    }
}
using System.Security.Cryptography;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Features.Recipes.Images;
using CulinaryBlog.Application.Features.Recipes.Images.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CulinaryBlog.API.Endpoints;

/// <summary>
/// Endpoint group quản lý ảnh công thức và tải lên phương tiện truyền thông (FR-BKE-018).
/// Hỗ trợ upload ảnh công thức, đặt ảnh chính, xóa ảnh và upload media tổng quát (/api/v1/media/upload).
/// </summary>
public static class RecipeImagesEndpoints
{
    private const long MaxImageSizeBytes = 5 * 1024 * 1024;

    private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif"
    };

    public static IEndpointRouteBuilder MapRecipeImagesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/recipes/{id:guid}/images")
            .WithTags("Recipe Images")
            .RequireAuthorization();

        group.MapPost("", UploadImage)
            .WithName("UploadRecipeImage")
            .DisableAntiforgery()
            .Produces<RecipeImageDto>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesValidationProblem();

        group.MapPatch("/{imageId:guid}/primary", SetPrimaryImage)
            .WithName("SetPrimaryRecipeImage")
            .Produces<RecipeImageDto>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        group.MapDelete("/{imageId:guid}", DeleteImage)
            .WithName("DeleteRecipeImage")
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);

        // Endpoint tổng quát upload ảnh công thức / ảnh đại diện / ảnh danh mục (FR-BKE-018)
        var mediaGroup = app.MapGroup("/api/v1/media")
            .WithTags("Media Upload")
            .RequireAuthorization();

        mediaGroup.MapPost("/upload", UploadMedia)
            .WithName("UploadMedia")
            .WithSummary("Tải lên hình ảnh công thức, ảnh đại diện hoặc ảnh danh mục (FR-BKE-018)")
            .WithDescription("Kiểm tra dung lượng tối đa 5MB, định dạng MIME (JPEG, PNG, WEBP, AVIF), magic bytes và đẩy lên MinIO / Local Storage.")
            .DisableAntiforgery()
            .Produces<MediaUploadResponseDto>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        return app;
    }

    private static async Task<IResult> UploadImage(
        Guid id,
        [FromForm] IFormFile file,
        [FromForm] string? altText,
        [FromForm] int orderIndex,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var validationError = ValidateUploadRequest(file);
        if (validationError is not null)
        {
            return validationError;
        }

        var command = new UploadRecipeImageCommand(
            id,
            file,
            altText,
            orderIndex);

        var result = await sender.Send(command, cancellationToken);

        return Results.Created($"/api/v1/recipes/{id}/images/{result.Id}", result);
    }

    private static async Task<IResult> UploadMedia(
        [FromForm] IFormFile file,
        [FromForm] string? folder,
        [FromServices] IFileStorageService fileStorageService,
        CancellationToken cancellationToken)
    {
        var validationError = ValidateUploadRequest(file);
        if (validationError is not null)
        {
            return validationError;
        }

        await using var bufferStream = new MemoryStream();
        await file.CopyToAsync(bufferStream, cancellationToken);
        bufferStream.Position = 0;

        using var sha256 = SHA256.Create();
        var checksum = Convert.ToHexString(sha256.ComputeHash(bufferStream)).ToLowerInvariant();
        bufferStream.Position = 0;

        var normalizedFolder = string.IsNullOrWhiteSpace(folder)
            ? "media"
            : folder.Trim().Trim('/', '\\').ToLowerInvariant();
        var ext = file.ContentType.ToLowerInvariant() switch
        {
            "image/jpeg" => ".jpg",
            "image/png" => ".png",
            "image/webp" => ".webp",
            "image/avif" => ".avif",
            _ => ".jpg"
        };
        var objectKey = $"{normalizedFolder}/{Guid.NewGuid():N}{ext}";

        var publicUrl = await fileStorageService.UploadAsync(
            bufferStream,
            objectKey,
            file.ContentType,
            bufferStream.Length,
            cancellationToken);

        var response = new MediaUploadResponseDto(
            Url: publicUrl,
            ObjectKey: objectKey,
            ContentType: file.ContentType,
            FileSize: bufferStream.Length,
            ChecksumSha256: checksum);

        return Results.Created(publicUrl, response);
    }

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

    private static async Task<IResult> DeleteImage(
        Guid id,
        Guid imageId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        await sender.Send(new DeleteRecipeImageCommand(id, imageId), cancellationToken);
        return Results.NoContent();
    }

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

    public sealed record MediaUploadResponseDto(
        string Url,
        string ObjectKey,
        string ContentType,
        long FileSize,
        string ChecksumSha256);
}

using System.Text;
using Amazon.S3;
using Amazon.S3.Model;
using CulinaryBlog.Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CulinaryBlog.Infrastructure.Storage;

/// <summary>
/// Triển khai IFileStorageService bằng MinIO thông qua AWS SDK for .NET (AWSSDK.S3).
///
/// Hành vi theo SRS:
/// - Upload ảnh công thức lên bucket public-read.
/// - Tên object unique: {folder}/{Guid.NewGuid()}{ext}.
/// - Max size: 5MB.
/// - Chỉ cho phép JPEG/PNG/WebP/AVIF.
/// - Validate magic bytes, không tin vào Content-Type.
/// - Delete theo public URL, idempotent nếu object không tồn tại.
/// </summary>
public sealed class MinioStorageService : IFileStorageService
{
    private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5 MB

    private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif"
    };

    private readonly IAmazonS3 _s3Client;
    private readonly ILogger<MinioStorageService> _logger;
    private readonly string _bucketName;
    private readonly string _defaultFolder;
    private readonly Uri _publicBaseUri;

    public MinioStorageService(
        IAmazonS3 s3Client,
        IConfiguration configuration,
        ILogger<MinioStorageService> logger)
    {
        _s3Client = s3Client;
        _logger = logger;

        _bucketName = configuration["Minio:BucketName"] ?? "culinary-blog";
        _defaultFolder = NormalizeFolder(configuration["Minio:DefaultFolder"] ?? "recipes");

        var publicBaseUrl =
            configuration["Minio:PublicBaseUrl"]
            ?? configuration["Minio:Endpoint"]
            ?? throw new InvalidOperationException("Missing Minio:PublicBaseUrl or Minio:Endpoint.");

        _publicBaseUri = new Uri(NormalizeBaseUrl(publicBaseUrl), UriKind.Absolute);
    }

    public async Task<string> UploadAsync(
        Stream fileStream,
        string fileName,
        string contentType,
        long length,
        CancellationToken cancellationToken = default)
    {
        if (fileStream is null)
        {
            throw new ArgumentNullException(nameof(fileStream));
        }

        ValidateUploadArguments(fileName, contentType, length);

        var bytes = await ReadAllBytesAsync(fileStream, cancellationToken);
        ValidateMagicBytes(bytes, contentType);

        var extension = GetExtension(fileName, contentType);
        var objectKey = $"{_defaultFolder}/{Guid.NewGuid():N}{extension}";

        await EnsureBucketExistsAsync(cancellationToken);

        await using var uploadStream = new MemoryStream(bytes, writable: false);

        var putRequest = new PutObjectRequest
        {
            BucketName = _bucketName,
            Key = objectKey,
            InputStream = uploadStream,
            ContentType = contentType,
            AutoCloseStream = false
        };

        await _s3Client.PutObjectAsync(putRequest, cancellationToken);

        var publicUrl = BuildPublicUrl(objectKey);

        _logger.LogInformation(
            "Uploaded file to MinIO. Bucket={Bucket}, Key={Key}, Url={Url}",
            _bucketName,
            objectKey,
            publicUrl);

        return publicUrl;
    }

    public async Task DeleteAsync(
        string fileUrl,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(fileUrl))
        {
            _logger.LogWarning("DeleteAsync skipped because fileUrl is empty.");
            return;
        }

        var objectKey = ExtractObjectKeyFromPublicUrl(fileUrl);

        try
        {
            var deleteRequest = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = objectKey
            };

            await _s3Client.DeleteObjectAsync(deleteRequest, cancellationToken);

            _logger.LogInformation(
                "Deleted file from MinIO. Bucket={Bucket}, Key={Key}",
                _bucketName,
                objectKey);
        }
        catch (AmazonS3Exception ex) when (IsMissingObject(ex))
        {
            // Idempotent requirement from SRS:
            // object không tồn tại thì không throw.
            _logger.LogInformation(
                "DeleteAsync ignored missing object. Bucket={Bucket}, Key={Key}",
                _bucketName,
                objectKey);
        }
    }

    private async Task EnsureBucketExistsAsync(CancellationToken cancellationToken)
    {
        try
        {
            var headRequest = new GetBucketLocationRequest
            {
                BucketName = _bucketName
            };

            _ = await _s3Client.GetBucketLocationAsync(headRequest, cancellationToken);
            return;
        }
        catch (AmazonS3Exception ex) when (IsMissingObject(ex))
        {
            // bucket chưa có hoặc không truy cập được -> tạo mới bên dưới
        }

        try
        {
            var putBucketRequest = new PutBucketRequest
            {
                BucketName = _bucketName
            };

            await _s3Client.PutBucketAsync(putBucketRequest, cancellationToken);

            _logger.LogInformation("Created MinIO bucket {Bucket}.", _bucketName);
        }
        catch (AmazonS3Exception ex) when (IsBucketAlreadyExists(ex))
        {
            // Bucket đã tồn tại ở nơi khác / do race condition.
            _logger.LogDebug("Bucket {Bucket} already exists.", _bucketName);
        }
    }

    private static void ValidateUploadArguments(string fileName, string contentType, long length)
    {
        if (string.IsNullOrWhiteSpace(fileName))
        {
            throw new ArgumentException("File name is required.", nameof(fileName));
        }

        if (length <= 0)
        {
            throw new InvalidDataException("File is empty.");
        }

        if (length > MaxFileSizeBytes)
        {
            throw new InvalidDataException("File size exceeds 5 MB.");
        }

        if (string.IsNullOrWhiteSpace(contentType) || !AllowedContentTypes.Contains(contentType))
        {
            throw new InvalidDataException($"Unsupported content type: {contentType}");
        }
    }

    private static async Task<byte[]> ReadAllBytesAsync(Stream stream, CancellationToken cancellationToken)
    {
        if (stream.CanSeek)
        {
            stream.Position = 0;
        }

        using var memory = new MemoryStream();
        await stream.CopyToAsync(memory, cancellationToken);
        return memory.ToArray();
    }

    private static void ValidateMagicBytes(byte[] bytes, string contentType)
    {
        if (bytes.Length == 0)
        {
            throw new InvalidDataException("File is empty.");
        }

        var ok = contentType.ToLowerInvariant() switch
        {
            "image/jpeg" => IsJpeg(bytes),
            "image/png" => IsPng(bytes),
            "image/webp" => IsWebp(bytes),
            "image/avif" => IsAvif(bytes),
            _ => false
        };

        if (!ok)
        {
            throw new InvalidDataException("File signature does not match the declared image type.");
        }
    }

    private static bool IsJpeg(byte[] signature)
    {
        return signature.Length >= 3
               && signature[0] == 0xFF
               && signature[1] == 0xD8
               && signature[2] == 0xFF;
    }

    private static bool IsPng(byte[] signature)
    {
        byte[] pngMagic = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];

        return signature.Length >= pngMagic.Length
               && pngMagic.SequenceEqual(signature.Take(pngMagic.Length));
    }

    private static bool IsWebp(byte[] signature)
    {
        return signature.Length >= 12
               && signature[0] == (byte)'R'
               && signature[1] == (byte)'I'
               && signature[2] == (byte)'F'
               && signature[3] == (byte)'F'
               && signature[8] == (byte)'W'
               && signature[9] == (byte)'E'
               && signature[10] == (byte)'B'
               && signature[11] == (byte)'P';
    }

    private static bool IsAvif(byte[] signature)
    {
        if (signature.Length < 12)
        {
            return false;
        }

        var boxType = Encoding.ASCII.GetString(signature, 4, 4);
        if (!string.Equals(boxType, "ftyp", StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        var brand = Encoding.ASCII.GetString(signature, 8, 4);
        return brand is "avif" or "avis" or "mif1" or "msf1";
    }

    private static string GetExtension(string fileName, string contentType)
    {
        var extension = Path.GetExtension(fileName);

        if (!string.IsNullOrWhiteSpace(extension))
        {
            return extension.ToLowerInvariant();
        }

        return contentType.ToLowerInvariant() switch
        {
            "image/jpeg" => ".jpg",
            "image/png" => ".png",
            "image/webp" => ".webp",
            "image/avif" => ".avif",
            _ => throw new InvalidDataException("Cannot determine file extension.")
        };
    }

    private string BuildPublicUrl(string objectKey)
    {
        var escapedSegments = objectKey
            .Split('/', StringSplitOptions.RemoveEmptyEntries)
            .Select(Uri.EscapeDataString);

        var escapedObjectPath = string.Join("/", escapedSegments);
        return new Uri(_publicBaseUri, $"{_bucketName}/{escapedObjectPath}").ToString();
    }

    private string ExtractObjectKeyFromPublicUrl(string fileUrl)
    {
        if (!Uri.TryCreate(fileUrl, UriKind.Absolute, out var uri))
        {
            throw new ArgumentException("Invalid fileUrl.", nameof(fileUrl));
        }

        var segments = uri.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);

        if (segments.Length < 2)
        {
            throw new ArgumentException("Invalid MinIO file URL format.", nameof(fileUrl));
        }

        var bucketName = Uri.UnescapeDataString(segments[0]);

        if (!string.Equals(bucketName, _bucketName, StringComparison.OrdinalIgnoreCase))
        {
            throw new ArgumentException(
                $"The URL bucket '{bucketName}' does not match configured bucket '{_bucketName}'.",
                nameof(fileUrl));
        }

        var objectSegments = segments.Skip(1).Select(Uri.UnescapeDataString);
        return string.Join("/", objectSegments);
    }

    private static string NormalizeFolder(string folder)
    {
        var normalized = folder.Trim().Trim('/', '\\');

        return string.IsNullOrWhiteSpace(normalized)
            ? "recipes"
            : normalized.Replace('\\', '/');
    }

    private static string NormalizeBaseUrl(string value)
    {
        var normalized = value.Trim();

        if (!normalized.StartsWith("http://", StringComparison.OrdinalIgnoreCase) &&
            !normalized.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
        {
            normalized = "https://" + normalized.TrimStart('/');
        }

        return normalized.TrimEnd('/');
    }

    private static bool IsMissingObject(AmazonS3Exception ex)
    {
        return ex.StatusCode == System.Net.HttpStatusCode.NotFound
               || string.Equals(ex.ErrorCode, "NoSuchKey", StringComparison.OrdinalIgnoreCase)
               || string.Equals(ex.ErrorCode, "NotFound", StringComparison.OrdinalIgnoreCase)
               || string.Equals(ex.ErrorCode, "NoSuchObject", StringComparison.OrdinalIgnoreCase);
    }

    private static bool IsBucketAlreadyExists(AmazonS3Exception ex)
    {
        return ex.StatusCode == System.Net.HttpStatusCode.Conflict
               || string.Equals(ex.ErrorCode, "BucketAlreadyExists", StringComparison.OrdinalIgnoreCase)
               || string.Equals(ex.ErrorCode, "BucketAlreadyOwnedByYou", StringComparison.OrdinalIgnoreCase);
    }
}
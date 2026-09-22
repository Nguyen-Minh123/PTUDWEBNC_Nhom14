using System.Text;
using CulinaryBlog.Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CulinaryBlog.Infrastructure.Storage;

/// <summary>
/// Dịch vụ lưu trữ file dùng cùng contract với MinIO.
/// 
/// Phiên bản này không phụ thuộc MinIO SDK để tránh lỗi build khi project
/// chưa cài package MinIO. Nó lưu file ra thư mục local và trả về public URL
/// có cùng cấu trúc với bucket/object path.
/// 
/// Khi thêm MinIO SDK đầy đủ, chỉ cần thay phần thân 2 hàm UploadAsync/DeleteAsync.
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

    private readonly ILogger<MinioStorageService> _logger;
    private readonly string _bucketName;
    private readonly string _publicBaseUrl;
    private readonly string _storageRootPath;

    public MinioStorageService(
        IConfiguration configuration,
        ILogger<MinioStorageService> logger)
    {
        _logger = logger;

        _bucketName = configuration["Minio:BucketName"] ?? "culinary-blog";
        _publicBaseUrl = NormalizeBaseUrl(
            configuration["Minio:PublicBaseUrl"]
            ?? configuration["Minio:Endpoint"]
            ?? "https://localhost:9000");

        _storageRootPath = configuration["Minio:LocalStoragePath"]
            ?? Path.Combine(AppContext.BaseDirectory, "storage", "minio", _bucketName);

        Directory.CreateDirectory(_storageRootPath);
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

        var bytes = await ReadAllBytesAsync(fileStream, length, cancellationToken);
        ValidateMagicBytes(bytes, contentType);

        var folder = NormalizeFolder(fileName);
        var extension = GetExtension(fileName, contentType);

        var objectName = $"{folder}/{Guid.NewGuid():N}{extension}";
        var physicalPath = GetPhysicalPath(objectName);

        var directory = Path.GetDirectoryName(physicalPath);
        if (!string.IsNullOrWhiteSpace(directory))
        {
            Directory.CreateDirectory(directory);
        }

        await File.WriteAllBytesAsync(physicalPath, bytes, cancellationToken);

        var publicUrl = BuildPublicUrl(objectName);

        _logger.LogInformation(
            "Stored file successfully. Bucket={Bucket}, Object={Object}, Url={Url}",
            _bucketName,
            objectName,
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

        var objectName = ExtractObjectNameFromPublicUrl(fileUrl);
        var physicalPath = GetPhysicalPath(objectName);

        if (!File.Exists(physicalPath))
        {
            // Idempotent behavior required by SRS:
            // file không tồn tại thì không throw.
            _logger.LogInformation(
                "DeleteAsync ignored missing file. Bucket={Bucket}, Object={Object}",
                _bucketName,
                objectName);
            return;
        }

        try
        {
            File.Delete(physicalPath);
            await TryRemoveEmptyDirectoriesAsync(Path.GetDirectoryName(physicalPath), cancellationToken);

            _logger.LogInformation(
                "Deleted file successfully. Bucket={Bucket}, Object={Object}",
                _bucketName,
                objectName);
        }
        catch (IOException ex)
        {
            _logger.LogError(ex, "Failed to delete file. Bucket={Bucket}, Object={Object}", _bucketName, objectName);
            throw;
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogError(ex, "Access denied while deleting file. Bucket={Bucket}, Object={Object}", _bucketName, objectName);
            throw;
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

    private static async Task<byte[]> ReadAllBytesAsync(
        Stream stream,
        long expectedLength,
        CancellationToken cancellationToken)
    {
        using var memory = new MemoryStream();

        if (stream.CanSeek)
        {
            stream.Position = 0;
        }

        await stream.CopyToAsync(memory, 81920, cancellationToken);

        var bytes = memory.ToArray();

        if (expectedLength > 0 && bytes.LongLength != expectedLength)
        {
            // Không bắt buộc tuyệt đối, nhưng giúp phát hiện dữ liệu lệch.
            // Nếu bạn không muốn check này, có thể bỏ.
        }

        return bytes;
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

    private static string NormalizeFolder(string fileName)
    {
        var folder = Path.GetFileNameWithoutExtension(fileName);

        if (string.IsNullOrWhiteSpace(folder))
        {
            folder = "files";
        }

        return folder.Trim().Replace('\\', '/');
    }

    private string BuildPublicUrl(string objectName)
    {
        var escapedSegments = objectName
            .Split('/', StringSplitOptions.RemoveEmptyEntries)
            .Select(Uri.EscapeDataString);

        var objectPath = string.Join("/", escapedSegments);

        return $"{_publicBaseUrl.TrimEnd('/')}/{_bucketName}/{objectPath}";
    }

    private string ExtractObjectNameFromPublicUrl(string fileUrl)
    {
        if (!Uri.TryCreate(fileUrl, UriKind.Absolute, out var uri))
        {
            throw new ArgumentException("Invalid fileUrl.", nameof(fileUrl));
        }

        var segments = uri.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);

        if (segments.Length < 2)
        {
            throw new ArgumentException("Invalid fileUrl format.", nameof(fileUrl));
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

    private string GetPhysicalPath(string objectName)
    {
        var safeSegments = objectName
            .Split('/', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        var path = _storageRootPath;
        foreach (var segment in safeSegments)
        {
            path = Path.Combine(path, segment);
        }

        return path;
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

    private static async Task TryRemoveEmptyDirectoriesAsync(string? directory, CancellationToken cancellationToken)
    {
        while (!string.IsNullOrWhiteSpace(directory) && Directory.Exists(directory))
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (Directory.EnumerateFileSystemEntries(directory).Any())
            {
                break;
            }

            Directory.Delete(directory);
            directory = Path.GetDirectoryName(directory);
            await Task.Yield();
        }
    }
}
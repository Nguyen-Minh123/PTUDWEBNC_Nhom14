using CulinaryBlog.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;

namespace CulinaryBlog.Infrastructure.Jobs;

/// <summary>
/// Job xóa file khỏi MinIO theo cơ chế bất đồng bộ.
/// 
/// Ghi chú:
/// - SRS yêu cầu job này thường được chạy qua Hangfire.
/// - Bản hiện tại không gắn Hangfire attribute để tránh phụ thuộc package khi build.
/// - Retry policy nên được cấu hình ở lớp scheduling/Hangfire registration.
/// </summary>
public sealed class DeleteFileJob
{
    private readonly IFileStorageService _fileStorageService;
    private readonly ILogger<DeleteFileJob> _logger;

    public DeleteFileJob(
        IFileStorageService fileStorageService,
        ILogger<DeleteFileJob> logger)
    {
        _fileStorageService = fileStorageService;
        _logger = logger;
    }

    /// <summary>
    /// Thực thi xóa file theo public URL.
    /// </summary>
    /// <param name="fileUrl">Public URL của file cần xóa.</param>
    /// <param name="cancellationToken">Token hủy tác vụ.</param>
    public async Task ExecuteAsync(
        string fileUrl,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(fileUrl))
        {
            _logger.LogWarning("DeleteFileJob skipped because fileUrl is empty.");
            return;
        }

        try
        {
            _logger.LogInformation("Deleting file from storage. FileUrl={FileUrl}", fileUrl);

            await _fileStorageService.DeleteAsync(fileUrl, cancellationToken);

            _logger.LogInformation("File deleted successfully. FileUrl={FileUrl}", fileUrl);
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            _logger.LogWarning("DeleteFileJob was cancelled. FileUrl={FileUrl}", fileUrl);
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "DeleteFileJob failed. FileUrl={FileUrl}", fileUrl);
            throw;
        }
    }
}
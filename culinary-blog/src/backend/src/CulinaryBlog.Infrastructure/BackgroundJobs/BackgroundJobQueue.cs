using CulinaryBlog.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;

namespace CulinaryBlog.Infrastructure.BackgroundJobs;

public sealed class BackgroundJobQueue : IBackgroundJobQueue
{
    private readonly ILogger<BackgroundJobQueue> _logger;

    public BackgroundJobQueue(ILogger<BackgroundJobQueue> logger)
    {
        _logger = logger;
    }

    public void EnqueueDeleteFile(string fileUrl)
    {
        _logger.LogInformation("Skip enqueue delete file job (Hangfire not configured). FileUrl={FileUrl}", fileUrl);
    }
}
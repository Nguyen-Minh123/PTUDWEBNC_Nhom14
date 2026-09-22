using MediatR;
using Microsoft.Extensions.Logging;
using CulinaryBlog.Application.Common.Caching;

namespace CulinaryBlog.Application.Common.Behaviors;

/// <summary>
/// MediatR pipeline behavior cho các query có thể cache.
/// 
/// Luồng xử lý:
/// 1. Nếu request không hỗ trợ cache => đi thẳng vào handler.
/// 2. Nếu có cache key hợp lệ => thử lấy từ cache.
/// 3. Cache hit => trả về ngay.
/// 4. Cache miss => gọi handler, sau đó lưu kết quả vào cache theo TTL.
/// </summary>
/// <typeparam name="TRequest">Loại request.</typeparam>
/// <typeparam name="TResponse">Loại response.</typeparam>
public sealed class QueryCacheBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    private readonly ICacheService _cacheService;
    private readonly ILogger<QueryCacheBehavior<TRequest, TResponse>> _logger;

    public QueryCacheBehavior(
        ICacheService cacheService,
        ILogger<QueryCacheBehavior<TRequest, TResponse>> logger)
    {
        _cacheService = cacheService;
        _logger = logger;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (request is not ICacheableQuery cacheableQuery)
        {
            return await next();
        }

        if (cacheableQuery.BypassCache)
        {
            _logger.LogDebug(
                "Cache bypassed for request {RequestName}",
                typeof(TRequest).Name);

            return await next();
        }

        if (string.IsNullOrWhiteSpace(cacheableQuery.CacheKey))
        {
            _logger.LogWarning(
                "Cache key is empty for request {RequestName}. Bypassing cache.",
                typeof(TRequest).Name);

            return await next();
        }

        if (cacheableQuery.CacheDuration <= TimeSpan.Zero)
        {
            _logger.LogWarning(
                "Invalid cache duration for request {RequestName}. Bypassing cache. Duration={Duration}",
                typeof(TRequest).Name,
                cacheableQuery.CacheDuration);

            return await next();
        }

        try
        {
            var cachedResponse = await _cacheService.GetAsync<TResponse>(
                cacheableQuery.CacheKey,
                cancellationToken);

            if (cachedResponse is not null)
            {
                _logger.LogDebug(
                    "Cache hit for request {RequestName}. Key={CacheKey}",
                    typeof(TRequest).Name,
                    cacheableQuery.CacheKey);

                return cachedResponse;
            }

            _logger.LogDebug(
                "Cache miss for request {RequestName}. Key={CacheKey}",
                typeof(TRequest).Name,
                cacheableQuery.CacheKey);

            var response = await next();

            if (response is null)
            {
                return response;
            }

            await _cacheService.SetAsync(
                cacheableQuery.CacheKey,
                response,
                cacheableQuery.CacheDuration,
                cancellationToken);

            _logger.LogDebug(
                "Cached response for request {RequestName}. Key={CacheKey}, TTL={TTL}",
                typeof(TRequest).Name,
                cacheableQuery.CacheKey,
                cacheableQuery.CacheDuration);

            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Cache pipeline failed for request {RequestName}. Fallback to handler.",
                typeof(TRequest).Name);

            return await next();
        }
    }
}
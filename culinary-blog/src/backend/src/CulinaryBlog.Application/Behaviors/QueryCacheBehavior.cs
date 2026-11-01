using CulinaryBlog.Application.Common.Caching;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CulinaryBlog.Application.Behaviors;

/// <summary>
/// Pipeline behavior dùng để cache kết quả của các query có hỗ trợ cache.
///
/// Chức năng:
/// - Đọc cache trước khi query chạy.
/// - Bỏ qua cache nếu request yêu cầu bypass.
/// - Lưu kết quả vào cache sau khi query thành công.
/// - Dùng TTL mặc định từ CacheOptions nếu query không tự khai báo TTL.
/// </summary>
public sealed class QueryCacheBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    private readonly ICacheService _cacheService;
    private readonly CacheOptions _cacheOptions;
    private readonly ILogger<QueryCacheBehavior<TRequest, TResponse>> _logger;

    /// <summary>
    /// Khởi tạo pipeline cache.
    /// </summary>
    public QueryCacheBehavior(
        ICacheService cacheService,
        IOptions<CacheOptions> cacheOptions,
        ILogger<QueryCacheBehavior<TRequest, TResponse>> logger)
    {
        _cacheService = cacheService;
        _cacheOptions = cacheOptions.Value;
        _logger = logger;
    }

    /// <summary>
    /// Xử lý request qua cache trước, sau đó mới gọi handler nếu cần.
    /// </summary>
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        // Chỉ cache những request implement ICacheableQuery.
        if (request is not ICacheableQuery cacheableRequest)
        {
            return await next();
        }

        // Cho phép query chủ động bỏ qua cache.
        if (cacheableRequest.BypassCache)
        {
            _logger.LogInformation(
                "Cache bypassed for query {QueryName} with key {CacheKey}.",
                typeof(TRequest).Name,
                cacheableRequest.CacheKey);

            return await next();
        }

        var cacheKey = cacheableRequest.CacheKey;

        // [MỚI] Đọc cache trước khi thực thi handler.
        var cachedResponse = await _cacheService.GetAsync<TResponse>(cacheKey, cancellationToken);
        if (cachedResponse is not null)
        {
            _logger.LogInformation(
                "Cache hit for query {QueryName} with key {CacheKey}.",
                typeof(TRequest).Name,
                cacheKey);

            return cachedResponse;
        }

        _logger.LogInformation(
            "Cache miss for query {QueryName} with key {CacheKey}.",
            typeof(TRequest).Name,
            cacheKey);

        // Không có cache thì gọi handler thật.
        var response = await next();

        // [MỚI] Không cache response null để tránh ghi trạng thái rỗng không chủ đích.
        if (response is null)
        {
            return response;
        }

        // TTL ưu tiên từ query, nếu không có thì dùng default của hệ thống.
        var ttl = cacheableRequest.CacheDuration ?? _cacheOptions.DefaultTtl;

        // [MỚI] Chỉ lưu cache khi cache đang bật.
        if (_cacheOptions.Enabled)
        {
            await _cacheService.SetAsync(cacheKey, response, ttl, cancellationToken);

            _logger.LogInformation(
                "Cache stored for query {QueryName} with key {CacheKey} and ttl {Ttl}.",
                typeof(TRequest).Name,
                cacheKey,
                ttl);
        }

        return response;
    }
}

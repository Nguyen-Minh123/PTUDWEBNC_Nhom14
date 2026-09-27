using System.Linq;
using System.Text.Json;
using CulinaryBlog.Application.Common.Caching;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CulinaryBlog.Infrastructure.Caching;

/// <summary>
/// Redis cache implementation dựa trên IDistributedCache.
///
/// Điểm khác so với bản dùng StackExchange.Redis:
/// - Không scan key trực tiếp.
/// - Dùng một index nhỏ theo prefix để phục vụ RemoveByPrefixAsync.
/// - Giữ code gọn, dễ build, không phụ thuộc package Redis client trực tiếp.
/// </summary>
public sealed class RedisCacheService : ICacheService
{
    private const string DefaultKeyPrefix = "culinary-blog:";
    private const string IndexPrefix = "__cache_index__:";

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    private static readonly DistributedCacheEntryOptions IndexOptions = new()
    {
        AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(30)
    };

    private readonly IDistributedCache _cache;
    private readonly ILogger<RedisCacheService> _logger;
    private readonly string _keyPrefix;

    public RedisCacheService(
        IDistributedCache cache,
        IConfiguration configuration,
        ILogger<RedisCacheService> logger)
    {
        _cache = cache;
        _logger = logger;

        _keyPrefix = NormalizeRootPrefix(
            configuration["Cache:KeyPrefix"]
            ?? configuration["Redis:InstanceName"]
            ?? DefaultKeyPrefix);
    }

    public async Task<T?> GetAsync<T>(
        string key,
        CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var fullKey = BuildKey(key);
        var payload = await _cache.GetAsync(fullKey, cancellationToken);

        if (payload is null || payload.Length == 0)
        {
            return default;
        }

        try
        {
            return JsonSerializer.Deserialize<T>(payload, JsonOptions);
        }
        catch (JsonException ex)
        {
            _logger.LogWarning(
                ex,
                "Failed to deserialize cache value. Key={CacheKey}, Type={Type}",
                fullKey,
                typeof(T).Name);

            return default;
        }
    }

    public async Task SetAsync<T>(
        string key,
        T value,
        TimeSpan ttl,
        CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (ttl <= TimeSpan.Zero)
        {
            throw new ArgumentOutOfRangeException(nameof(ttl), "TTL must be greater than zero.");
        }

        var fullKey = BuildKey(key);
        var payload = JsonSerializer.SerializeToUtf8Bytes(value, JsonOptions);

        await _cache.SetAsync(
            fullKey,
            payload,
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = ttl
            },
            cancellationToken);

        await AddToIndexAsync(fullKey, ExtractScope(key), cancellationToken);
    }

    public async Task RemoveAsync(
        string key,
        CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var fullKey = BuildKey(key);
        await _cache.RemoveAsync(fullKey, cancellationToken);

        await RemoveFromIndexAsync(fullKey, ExtractScope(key), cancellationToken);
    }

    public async Task RemoveByPrefixAsync(
        string prefix,
        CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var normalizedPrefix = NormalizeLogicalPrefix(prefix);
        var scope = ExtractScope(normalizedPrefix);
        var indexKey = GetIndexKey(scope);

        var trackedKeys = await ReadIndexAsync(indexKey, cancellationToken);
        if (trackedKeys.Count == 0)
        {
            _logger.LogDebug("No cache index entries found for prefix {Prefix}", normalizedPrefix);
            return;
        }

        var fullPrefix = BuildKeyPrefix(normalizedPrefix);
        var keysToDelete = trackedKeys
            .Where(k => k.StartsWith(fullPrefix, StringComparison.OrdinalIgnoreCase))
            .ToArray();

        if (keysToDelete.Length == 0)
        {
            _logger.LogDebug("No cache keys matched prefix {Prefix}", normalizedPrefix);
            return;
        }

        foreach (var cacheKey in keysToDelete)
        {
            await _cache.RemoveAsync(cacheKey, cancellationToken);
        }

        trackedKeys.ExceptWith(keysToDelete);

        if (trackedKeys.Count == 0)
        {
            await _cache.RemoveAsync(indexKey, cancellationToken);
        }
        else
        {
            await SaveIndexAsync(indexKey, trackedKeys, cancellationToken);
        }

        _logger.LogInformation(
            "Removed {Count} cache entries for prefix {Prefix}",
            keysToDelete.Length,
            normalizedPrefix);
    }

    private string BuildKey(string key)
    {
        if (string.IsNullOrWhiteSpace(key))
        {
            throw new ArgumentException("Cache key cannot be empty.", nameof(key));
        }

        var normalized = key.Trim();

        if (normalized.StartsWith(_keyPrefix, StringComparison.OrdinalIgnoreCase))
        {
            return normalized;
        }

        return $"{_keyPrefix}{normalized}";
    }

    private string BuildKeyPrefix(string prefix)
    {
        var normalized = NormalizeLogicalPrefix(prefix);

        if (!normalized.EndsWith(':'))
        {
            normalized += ":";
        }

        return BuildKey(normalized);
    }

    private string NormalizeRootPrefix(string value)
    {
        var normalized = value.Trim();

        if (string.IsNullOrWhiteSpace(normalized))
        {
            return DefaultKeyPrefix;
        }

        if (!normalized.EndsWith(':'))
        {
            normalized += ":";
        }

        return normalized;
    }

    private string NormalizeLogicalPrefix(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Cache prefix cannot be empty.", nameof(value));
        }

        var normalized = value.Trim().TrimEnd('*');

        if (normalized.StartsWith(_keyPrefix, StringComparison.OrdinalIgnoreCase))
        {
            normalized = normalized[_keyPrefix.Length..];
        }

        return normalized;
    }

    private string ExtractScope(string keyOrPrefix)
    {
        var normalized = NormalizeLogicalPrefix(keyOrPrefix);

        var separatorIndex = normalized.IndexOf(':');
        if (separatorIndex < 0)
        {
            return normalized;
        }

        return normalized[..separatorIndex];
    }

    private string GetIndexKey(string scope)
        => $"{_keyPrefix}{IndexPrefix}{scope}";

    private async Task<HashSet<string>> ReadIndexAsync(
        string indexKey,
        CancellationToken cancellationToken)
    {
        var payload = await _cache.GetAsync(indexKey, cancellationToken);
        if (payload is null || payload.Length == 0)
        {
            return new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        }

        try
        {
            var keys = JsonSerializer.Deserialize<HashSet<string>>(payload, JsonOptions);
            return keys is null
                ? new HashSet<string>(StringComparer.OrdinalIgnoreCase)
                : new HashSet<string>(keys, StringComparer.OrdinalIgnoreCase);
        }
        catch (JsonException ex)
        {
            _logger.LogWarning(ex, "Failed to read cache index. IndexKey={IndexKey}", indexKey);
            return new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        }
    }

    private async Task SaveIndexAsync(
        string indexKey,
        HashSet<string> index,
        CancellationToken cancellationToken)
    {
        var payload = JsonSerializer.SerializeToUtf8Bytes(index, JsonOptions);

        await _cache.SetAsync(indexKey, payload, IndexOptions, cancellationToken);
    }

    private async Task AddToIndexAsync(
        string fullKey,
        string scope,
        CancellationToken cancellationToken)
    {
        var indexKey = GetIndexKey(scope);
        var index = await ReadIndexAsync(indexKey, cancellationToken);

        if (index.Add(fullKey))
        {
            await SaveIndexAsync(indexKey, index, cancellationToken);
        }
    }

    private async Task RemoveFromIndexAsync(
        string fullKey,
        string scope,
        CancellationToken cancellationToken)
    {
        var indexKey = GetIndexKey(scope);
        var index = await ReadIndexAsync(indexKey, cancellationToken);

        if (index.Remove(fullKey))
        {
            if (index.Count == 0)
            {
                await _cache.RemoveAsync(indexKey, cancellationToken);
            }
            else
            {
                await SaveIndexAsync(indexKey, index, cancellationToken);
            }
        }
    }
}
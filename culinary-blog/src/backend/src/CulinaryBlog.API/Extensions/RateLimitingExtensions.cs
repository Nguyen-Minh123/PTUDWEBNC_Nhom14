using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;

namespace CulinaryBlog.API.Extensions;

/// <summary>
/// Cấu hình rate limiting cho toàn bộ API.
/// - api-policy: giới hạn chung cho tất cả request.
/// - login-policy: giới hạn chặt hơn cho endpoint đăng nhập.
/// </summary>
public static class RateLimitingExtensions
{
    /// <summary>
    /// Đăng ký rate limiter vào DI container.
    /// </summary>
    public static IServiceCollection AddAppRateLimiting(this IServiceCollection services)
    {
        services.AddRateLimiter(options =>
        {
            // -------------------------------------------------
            // 1. Mã trạng thái trả về khi bị chặn
            // -------------------------------------------------
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

            // -------------------------------------------------
            // 2. Global limiter cho toàn bộ API
            // -------------------------------------------------
            // Nếu endpoint không gắn policy riêng, nó sẽ dùng api-policy mặc định này.
            options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
            {
                var clientKey = GetClientKey(httpContext);

                return RateLimitPartition.GetTokenBucketLimiter(
                    partitionKey: clientKey,
                    factory: _ => new TokenBucketRateLimiterOptions
                    {
                        // Số request tối đa có thể "tích" trong bucket
                        TokenLimit = 120,

                        // Số token được nạp thêm mỗi chu kỳ
                        TokensPerPeriod = 120,

                        // Mỗi phút nạp lại bucket
                        ReplenishmentPeriod = TimeSpan.FromMinutes(1),

                        // Không xếp hàng request chờ
                        QueueLimit = 0,

                        // Nếu queue > 0 thì yêu cầu ưu tiên request cũ hơn
                        QueueProcessingOrder = QueueProcessingOrder.OldestFirst,

                        // Tự động nạp token theo chu kỳ
                        AutoReplenishment = true
                    });
            });

            // -------------------------------------------------
            // 3. Policy riêng cho login
            // -------------------------------------------------
            // 5 lần / 1 phút, không queue => request thứ 6 sẽ nhận 429
            options.AddPolicy("login-policy", httpContext =>
            {
                var clientKey = GetClientKey(httpContext);

                return RateLimitPartition.GetFixedWindowLimiter(
                    partitionKey: clientKey,
                    factory: _ => new FixedWindowRateLimiterOptions
                    {
                        PermitLimit = 5,
                        Window = TimeSpan.FromMinutes(1),
                        QueueLimit = 0,
                        QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                        AutoReplenishment = true
                    });
            });

            // -------------------------------------------------
            // 4. Policy API nếu muốn gắn explicit ở route group
            // -------------------------------------------------
            // Token bucket giống global limiter, dùng để gắn rõ ràng cho group endpoint.
            options.AddPolicy("api-policy", httpContext =>
            {
                var clientKey = GetClientKey(httpContext);

                return RateLimitPartition.GetTokenBucketLimiter(
                    partitionKey: clientKey,
                    factory: _ => new TokenBucketRateLimiterOptions
                    {
                        TokenLimit = 120,
                        TokensPerPeriod = 120,
                        ReplenishmentPeriod = TimeSpan.FromMinutes(1),
                        QueueLimit = 0,
                        QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                        AutoReplenishment = true
                    });
            });

            // -------------------------------------------------
            // 5. Custom response khi bị từ chối
            // -------------------------------------------------
            options.OnRejected = async (context, cancellationToken) =>
            {
                var response = context.HttpContext.Response;

                // Trả đúng 429
                response.StatusCode = StatusCodes.Status429TooManyRequests;

                // Header chuẩn HTTP Retry-After: 60
                response.Headers[HeaderNames.RetryAfter] = "60";

                // Body theo problem+json để frontend dễ xử lý
                response.ContentType = "application/problem+json";

                var problem = new ProblemDetails
                {
                    Title = "Too Many Requests",
                    Status = StatusCodes.Status429TooManyRequests,
                    Detail = "Bạn đã gửi quá nhiều request trong thời gian ngắn. Vui lòng thử lại sau 60 giây.",
                    Instance = context.HttpContext.Request.Path
                };

                await response.WriteAsJsonAsync(problem, cancellationToken);
            };
        });

        return services;
    }

    /// <summary>
    /// Lấy key phân vùng rate limit cho từng client.
    /// Ưu tiên IP thực của client; nếu không có thì dùng fallback an toàn.
    /// </summary>
    private static string GetClientKey(HttpContext context)
    {
        // Nếu bạn chạy sau Nginx và đã cấu hình Forwarded Headers,
        // RemoteIpAddress sẽ là IP thật của client.
        var ip = context.Connection.RemoteIpAddress?.ToString();

        if (!string.IsNullOrWhiteSpace(ip))
        {
            return ip;
        }

        return "anonymous-client";
    }
}
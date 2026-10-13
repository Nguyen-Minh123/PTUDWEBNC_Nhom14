namespace CulinaryBlog.API.Middlewares;

/// <summary>
/// Gắn các security headers bắt buộc cho response.
/// Chỉ áp dụng cho API paths để tránh phá UI như Scalar/Swagger.
/// </summary>
public sealed class SecurityHeadersMiddleware
{
    private readonly RequestDelegate _next;

    public SecurityHeadersMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public Task InvokeAsync(HttpContext context)
    {
        // Chỉ áp dụng cho API/health; nếu muốn áp dụng toàn bộ app thì bỏ điều kiện này
        var path = context.Request.Path.Value ?? string.Empty;
        var isApiRequest = path.StartsWith("/api", StringComparison.OrdinalIgnoreCase)
                           || path.Equals("/health", StringComparison.OrdinalIgnoreCase);

        if (isApiRequest)
        {
            context.Response.OnStarting(() =>
            {
                var headers = context.Response.Headers;

                // Không cho browser tự đoán MIME type
                headers["X-Content-Type-Options"] = "nosniff";

                // Không cho nhúng vào iframe
                headers["X-Frame-Options"] = "DENY";

                // Không gửi referrer
                headers["Referrer-Policy"] = "no-referrer";

                // CSP chặt cho API, không cho load resource ngoài
                headers["Content-Security-Policy"] =
                    "default-src 'none'; " +
                    "base-uri 'none'; " +
                    "frame-ancestors 'none'; " +
                    "form-action 'none';";

                return Task.CompletedTask;
            });
        }

        return _next(context);
    }
}
namespace CulinaryBlog.API.Middlewares;

/// <summary>
/// Gắn Correlation ID cho mỗi request.
/// Nếu client gửi X-Correlation-ID thì dùng lại,
/// nếu không có thì tự sinh mới.
/// </summary>
public sealed class CorrelationIdMiddleware
{
    private const string HeaderName = "X-Correlation-ID";
    private readonly RequestDelegate _next;
    private readonly ILogger<CorrelationIdMiddleware> _logger;

    public CorrelationIdMiddleware(RequestDelegate next, ILogger<CorrelationIdMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Lấy Correlation ID từ request hoặc tự sinh mới
        var correlationId = context.Request.Headers[HeaderName].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(correlationId))
        {
            correlationId = Guid.NewGuid().ToString("N");
        }

        // Lưu vào HttpContext để middleware khác dùng lại
        context.Items[HeaderName] = correlationId;

        // Trả ngược correlation id về client
        context.Response.Headers[HeaderName] = correlationId;

        // Gắn vào logger scope để log có thể trace theo request
        using (_logger.BeginScope(new Dictionary<string, object>
        {
            [HeaderName] = correlationId
        }))
        {
            await _next(context);
        }
    }
}
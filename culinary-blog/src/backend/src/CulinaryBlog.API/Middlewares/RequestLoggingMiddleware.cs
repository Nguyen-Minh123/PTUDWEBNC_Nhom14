using System.Diagnostics;

namespace CulinaryBlog.API.Middlewares;

/// <summary>
/// Ghi log request/response với thời gian xử lý.
/// Middleware này đặt trước ExceptionHandler để vẫn log được kết quả cuối cùng.
/// </summary>
public sealed class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var sw = Stopwatch.StartNew();

        var method = context.Request.Method;
        var path = context.Request.Path.Value ?? "/";
        var correlationId = context.Items["X-Correlation-ID"]?.ToString();

        _logger.LogInformation(
            "Incoming request: {Method} {Path} CorrelationId={CorrelationId}",
            method,
            path,
            correlationId);

        await _next(context);

        sw.Stop();

        _logger.LogInformation(
            "Outgoing response: {Method} {Path} StatusCode={StatusCode} ElapsedMs={ElapsedMs} CorrelationId={CorrelationId}",
            method,
            path,
            context.Response.StatusCode,
            sw.ElapsedMilliseconds,
            correlationId);
    }
}

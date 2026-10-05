using CulinaryBlog.Application.Common.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.API.Middlewares;

/// <summary>
/// Middleware bắt lỗi toàn cục và chuẩn hóa phản hồi.
/// </summary>
public sealed class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ConcurrencyConflictException ex)
        {
            _logger.LogWarning(ex, "Concurrency conflict detected.");

            context.Response.StatusCode = StatusCodes.Status409Conflict;
            await context.Response.WriteAsJsonAsync(new
            {
                title = "Concurrency conflict",
                status = 409,
                detail = ex.Message
            });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            _logger.LogWarning(ex, "EF Core concurrency conflict detected.");

            context.Response.StatusCode = StatusCodes.Status409Conflict;
            await context.Response.WriteAsJsonAsync(new
            {
                title = "Concurrency conflict",
                status = 409,
                detail = "The data was changed by another user. Please reload and try again."
            });
        }
    }
}
using CulinaryBlog.Domain.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CulinaryBlog.API.Infrastructure;

/// <summary>
/// Converts unhandled application exceptions into Problem Details responses.
/// </summary>
public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;
    private readonly IProblemDetailsService _problemDetailsService;

    /// <summary>
    /// Creates an exception handler that logs failures and writes Problem Details.
    /// </summary>
    /// <param name="logger">The application logger.</param>
    /// <param name="problemDetailsService">The service that writes Problem Details.</param>
    public GlobalExceptionHandler(
        ILogger<GlobalExceptionHandler> logger,
        IProblemDetailsService problemDetailsService)
    {
        _logger = logger;
        _problemDetailsService = problemDetailsService;
    }

    /// <summary>
    /// Handles an exception and writes its corresponding Problem Details response.
    /// </summary>
    /// <param name="httpContext">The current HTTP request context.</param>
    /// <param name="exception">The exception to handle.</param>
    /// <param name="cancellationToken">The token used to cancel response writing.</param>
    /// <returns><see langword="true"/> when the exception was handled.</returns>
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "An unhandled exception occurred: {Message}", exception.Message);

        var (statusCode, title) = exception switch
        {
            UserNotFoundException => (StatusCodes.Status404NotFound, "User Not Found"),
            InvalidCredentialsException => (StatusCodes.Status401Unauthorized, "Invalid Credentials"),
            DomainException => (StatusCodes.Status400BadRequest, "Domain Rule Violation"),
            ArgumentException => (StatusCodes.Status400BadRequest, "Invalid Request"),
            _ => (StatusCodes.Status500InternalServerError, "Server Error")
        };

        var problemDetails = new ProblemDetails
        {
            Status = statusCode,
            Title = title,
            Detail = exception.Message,
            Type = $"https://httpstatuses.com/{statusCode}",
            Instance = httpContext.Request.Path
        };

        problemDetails.Extensions.Add("traceId", Activity.Current?.Id ?? httpContext.TraceIdentifier);

        httpContext.Response.StatusCode = statusCode;
        await _problemDetailsService.WriteAsync(new ProblemDetailsContext
        {
            HttpContext = httpContext,
            ProblemDetails = problemDetails
        });

        return true;
    }
}

using CulinaryBlog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace CulinaryBlog.API.HealthChecks;

/// <summary>
/// Checks whether the application database is reachable.
/// </summary>
public sealed class DatabaseHealthCheck(CulinaryBlogDbContext dbContext) : IHealthCheck
{
    /// <summary>
    /// Runs the database connectivity check.
    /// </summary>
    /// <param name="context">The health check execution context.</param>
    /// <param name="cancellationToken">The token used to cancel the check.</param>
    /// <returns>The health status for database connectivity.</returns>
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var canConnect = await dbContext.Database.CanConnectAsync(cancellationToken);
            return canConnect
                ? HealthCheckResult.Healthy("Database is reachable.")
                : HealthCheckResult.Unhealthy("Database is not reachable.");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Database health check failed.", ex);
        }
    }
}

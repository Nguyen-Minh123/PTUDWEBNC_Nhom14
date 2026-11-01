using System.Text.Json;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Common.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.API.Endpoints;

public static class AuditLogEndpoints
{
    private static readonly string[] SupportedActions =
    [
        "Added",
        "Modified",
        "Deleted",
        "SoftDeleted"
    ];

    public static IEndpointRouteBuilder MapAuditLogEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/audit-logs")
            .WithTags("Audit logs")
            .WithOpenApi()
            .RequireAuthorization("AdminOnly");

        group.MapGet("/", async (
            [FromServices] IApplicationDbContext dbContext,
            [FromQuery] string? action = null,
            [FromQuery] string? entityName = null,
            [FromQuery] string? entityId = null,
            [FromQuery] string? actorId = null,
            [FromQuery] DateTimeOffset? fromUtc = null,
            [FromQuery] DateTimeOffset? toUtc = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            CancellationToken cancellationToken = default) =>
        {
            var validationErrors = ValidateQuery(
                action,
                entityName,
                entityId,
                actorId,
                fromUtc,
                toUtc,
                page,
                pageSize,
                out var normalizedAction);

            if (validationErrors.Count > 0)
            {
                return Results.ValidationProblem(validationErrors);
            }

            var query = dbContext.AuditLogs.AsNoTracking();

            if (normalizedAction is not null)
            {
                query = query.Where(log => log.Action == normalizedAction);
            }

            if (!string.IsNullOrWhiteSpace(entityName))
            {
                var normalizedEntityName = entityName.Trim();
                query = query.Where(log => log.EntityName == normalizedEntityName);
            }

            if (!string.IsNullOrWhiteSpace(entityId))
            {
                var normalizedEntityId = entityId.Trim();
                query = query.Where(log => log.EntityId == normalizedEntityId);
            }

            if (!string.IsNullOrWhiteSpace(actorId))
            {
                var normalizedActorId = actorId.Trim();
                query = query.Where(log => log.ActorId == normalizedActorId);
            }

            if (fromUtc.HasValue)
            {
                query = query.Where(log => log.OccurredAtUtc >= fromUtc.Value);
            }

            if (toUtc.HasValue)
            {
                query = query.Where(log => log.OccurredAtUtc <= toUtc.Value);
            }

            var totalCount = await query.CountAsync(cancellationToken);
            var auditLogs = await query
                .OrderByDescending(log => log.OccurredAtUtc)
                .ThenByDescending(log => log.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            var items = auditLogs
                .Select(log => new AuditLogResponse(
                    log.Id,
                    log.OccurredAtUtc,
                    log.ActorId,
                    log.Action,
                    log.EntityName,
                    log.EntityId,
                    ParseJson(log.OldValues),
                    ParseJson(log.NewValues)))
                .ToList();

            return Results.Ok(new PaginatedResult<AuditLogResponse>(items, totalCount, page, pageSize));
        })
        .WithName("GetAuditLogs")
        .WithSummary("Truy vấn nhật ký kiểm toán hệ thống")
        .WithDescription("Lọc và phân trang nhật ký kiểm toán; chỉ dành cho tài khoản Admin.")
        .Produces<PaginatedResult<AuditLogResponse>>(StatusCodes.Status200OK)
        .ProducesValidationProblem()
        .Produces(StatusCodes.Status401Unauthorized)
        .Produces(StatusCodes.Status403Forbidden);

        return app;
    }

    private static Dictionary<string, string[]> ValidateQuery(
        string? action,
        string? entityName,
        string? entityId,
        string? actorId,
        DateTimeOffset? fromUtc,
        DateTimeOffset? toUtc,
        int page,
        int pageSize,
        out string? normalizedAction)
    {
        var errors = new Dictionary<string, string[]>();
        normalizedAction = null;

        if (page < 1)
        {
            errors["page"] = ["Page must be greater than or equal to 1."];
        }

        if (pageSize is < 1 or > 100)
        {
            errors["pageSize"] = ["Page size must be between 1 and 100."];
        }

        if (page >= 1 && pageSize is >= 1 and <= 100
            && ((long)page - 1) * pageSize > int.MaxValue)
        {
            errors["page"] = ["The requested page is too large."];
        }

        if (fromUtc.HasValue && toUtc.HasValue && fromUtc.Value > toUtc.Value)
        {
            errors["fromUtc"] = ["fromUtc must be earlier than or equal to toUtc."];
        }

        if (!string.IsNullOrWhiteSpace(action))
        {
            normalizedAction = SupportedActions.FirstOrDefault(
                supportedAction => string.Equals(
                    supportedAction,
                    action.Trim(),
                    StringComparison.OrdinalIgnoreCase));

            if (normalizedAction is null)
            {
                errors["action"] = ["Action must be Added, Modified, Deleted, or SoftDeleted."];
            }
        }

        ValidateMaximumLength(errors, "entityName", entityName, 200);
        ValidateMaximumLength(errors, "entityId", entityId, 450);
        ValidateMaximumLength(errors, "actorId", actorId, 450);

        return errors;
    }

    private static void ValidateMaximumLength(
        IDictionary<string, string[]> errors,
        string parameterName,
        string? value,
        int maximumLength)
    {
        if (value is not null && value.Trim().Length > maximumLength)
        {
            errors[parameterName] = [$"{parameterName} must not exceed {maximumLength} characters."];
        }
    }

    private static JsonElement? ParseJson(string? value)
    {
        if (value is null)
        {
            return null;
        }

        using var document = JsonDocument.Parse(value);
        return document.RootElement.Clone();
    }
}

public sealed record AuditLogResponse(
    Guid Id,
    DateTimeOffset OccurredAtUtc,
    string? ActorId,
    string Action,
    string EntityName,
    string? EntityId,
    JsonElement? OldValues,
    JsonElement? NewValues);

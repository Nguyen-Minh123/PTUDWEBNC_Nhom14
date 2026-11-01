using System.Text.Json;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace CulinaryBlog.Infrastructure.Persistence.Interceptors;

/// <summary>
/// Tạo bản ghi kiểm toán từ các thay đổi domain ngay trước khi EF Core lưu dữ liệu.
/// </summary>
public sealed class AuditLogInterceptor(ICurrentUserService currentUserService) : SaveChangesInterceptor
{
    private static readonly HashSet<string> SensitivePropertyNames =
    [
        "Password",
        "PasswordHash",
        "Token",
        "TokenHash",
        "Secret",
        "SecurityStamp",
        "ConcurrencyStamp",
        "RowVersion"
    ];

    public override InterceptionResult<int> SavingChanges(
        DbContextEventData eventData,
        InterceptionResult<int> result)
    {
        AddAuditLogs(eventData.Context);
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        AddAuditLogs(eventData.Context);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private void AddAuditLogs(DbContext? context)
    {
        if (context is null)
        {
            return;
        }

        context.ChangeTracker.DetectChanges();

        var changedEntries = context.ChangeTracker
            .Entries()
            .Where(IsAuditableEntry)
            .Where(entry => entry.State is EntityState.Added or EntityState.Modified or EntityState.Deleted)
            .ToList();

        foreach (var entry in changedEntries)
        {
            var oldValues = entry.State == EntityState.Added
                ? new Dictionary<string, object?>()
                : GetValues(entry, useOriginalValues: true);
            var newValues = entry.State == EntityState.Deleted
                ? new Dictionary<string, object?>()
                : GetValues(entry, useOriginalValues: false);
            var action = GetAction(entry, oldValues, newValues);

            context.Set<AuditLog>().Add(new AuditLog
            {
                OccurredAtUtc = DateTimeOffset.UtcNow,
                ActorId = currentUserService.IsAuthenticated ? currentUserService.UserId : null,
                Action = action,
                EntityName = entry.Metadata.ClrType.Name,
                EntityId = GetEntityId(entry),
                OldValues = oldValues.Count == 0 ? null : JsonSerializer.Serialize(oldValues),
                NewValues = newValues.Count == 0 ? null : JsonSerializer.Serialize(newValues)
            });
        }
    }

    private static bool IsAuditableEntry(EntityEntry entry)
    {
        var entityType = entry.Metadata.ClrType;
        return entityType.Namespace == typeof(Recipe).Namespace
            && entityType != typeof(AuditLog)
            && entityType != typeof(ApplicationUser)
            && entityType != typeof(RefreshToken);
    }

    private static Dictionary<string, object?> GetValues(EntityEntry entry, bool useOriginalValues)
    {
        var values = new Dictionary<string, object?>();

        foreach (var property in entry.Properties)
        {
            if (IsSensitiveProperty(property.Metadata.Name))
            {
                continue;
            }

            var value = useOriginalValues ? property.OriginalValue : property.CurrentValue;
            if (entry.State == EntityState.Modified
                && Equals(property.OriginalValue, property.CurrentValue))
            {
                continue;
            }

            values[property.Metadata.Name] = value;
        }

        return values;
    }

    private static bool IsSensitiveProperty(string propertyName) =>
        SensitivePropertyNames.Contains(propertyName)
        || propertyName.Contains("Password", StringComparison.OrdinalIgnoreCase)
        || propertyName.Contains("Token", StringComparison.OrdinalIgnoreCase)
        || propertyName.Contains("Secret", StringComparison.OrdinalIgnoreCase);

    private static string GetAction(
        EntityEntry entry,
        IReadOnlyDictionary<string, object?> oldValues,
        IReadOnlyDictionary<string, object?> newValues)
    {
        if (entry.State == EntityState.Added)
        {
            return "Added";
        }

        if (entry.State == EntityState.Deleted)
        {
            return "Deleted";
        }

        if (oldValues.TryGetValue(nameof(BaseEntity.IsDeleted), out var wasDeleted)
            && newValues.TryGetValue(nameof(BaseEntity.IsDeleted), out var isDeleted)
            && wasDeleted is false
            && isDeleted is true)
        {
            return "SoftDeleted";
        }

        return "Modified";
    }

    private static string? GetEntityId(EntityEntry entry)
    {
        var keyProperties = entry.Metadata.FindPrimaryKey()?.Properties;
        if (keyProperties is null || keyProperties.Count == 0)
        {
            return null;
        }

        return string.Join(
            ",",
            keyProperties.Select(property =>
            {
                var value = entry.State == EntityState.Deleted
                    ? entry.Property(property.Name).OriginalValue
                    : entry.Property(property.Name).CurrentValue;
                return value?.ToString() ?? string.Empty;
            }));
    }
}

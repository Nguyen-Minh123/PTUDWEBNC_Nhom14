using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace CulinaryBlog.Infrastructure.Persistence.Interceptors;

/// <summary>
/// EF Core SaveChanges interceptor để chuyển thao tác xóa vật lý
/// thành xóa mềm cho các entity kế thừa BaseEntity.
/// </summary>
public sealed class SoftDeleteInterceptor : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(
        DbContextEventData eventData,
        InterceptionResult<int> result)
    {
        ApplySoftDelete(eventData.Context);
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        ApplySoftDelete(eventData.Context);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private static void ApplySoftDelete(DbContext? context)
    {
        if (context is null)
        {
            return;
        }

        var utcNow = DateTime.UtcNow;

        var entries = context.ChangeTracker
            .Entries()
            .Where(entry => entry.State == EntityState.Deleted
                && entry.Metadata.FindProperty(nameof(Domain.Entities.BaseEntity.IsDeleted)) is not null)
            .ToList();

        foreach (var entry in entries)
        {
            // Đổi DELETE thành UPDATE
            entry.State = EntityState.Modified;

            // Đánh dấu xóa mềm
            entry.Property(nameof(Domain.Entities.BaseEntity.IsDeleted)).CurrentValue = true;

            SetTimestampIfPresent(entry, nameof(Domain.Entities.BaseEntity.UpdatedAt), utcNow);
            SetTimestampIfPresent(entry, "DeletedAt", utcNow);
        }
    }

    private static void SetTimestampIfPresent(
        Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry entry,
        string propertyName,
        DateTime utcNow)
    {
        var property = entry.Metadata.FindProperty(propertyName);
        if (property is null)
        {
            return;
        }

        entry.Property(propertyName).CurrentValue = property.ClrType == typeof(DateTimeOffset?)
            || property.ClrType == typeof(DateTimeOffset)
                ? new DateTimeOffset(utcNow, TimeSpan.Zero)
                : utcNow;
    }
}
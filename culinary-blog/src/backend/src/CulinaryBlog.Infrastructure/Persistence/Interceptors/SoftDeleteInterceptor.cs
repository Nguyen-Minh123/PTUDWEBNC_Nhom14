using CulinaryBlog.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace CulinaryBlog.Infrastructure.Persistence.Interceptors;

/// <summary>
/// EF Core SaveChanges interceptor để chuyển thao tác xóa vật lý
/// thành xóa mềm cho các entity implement ISoftDelete.
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

        var softDeleteEntries = context.ChangeTracker
            .Entries<ISoftDelete>()
            .Where(entry => entry.State == EntityState.Deleted)
            .ToList();

        foreach (var entry in softDeleteEntries)
        {
            // Chuyển từ Deleted sang Unchanged để tránh EF phát sinh DELETE.
            entry.State = EntityState.Unchanged;

            entry.Property(nameof(ISoftDelete.IsDeleted)).CurrentValue = true;
            entry.Property(nameof(ISoftDelete.IsDeleted)).IsModified = true;

            entry.Property(nameof(ISoftDelete.DeletedAt)).CurrentValue = utcNow;
            entry.Property(nameof(ISoftDelete.DeletedAt)).IsModified = true;

            // Tạm thời không gán DeletedBy để tránh kéo thêm phụ thuộc tầng ngoài
            // và tránh xung đột kiểu dữ liệu giữa các lớp hiện tại.
            entry.Property(nameof(ISoftDelete.DeletedBy)).CurrentValue = null;
            entry.Property(nameof(ISoftDelete.DeletedBy)).IsModified = true;
        }
    }
}
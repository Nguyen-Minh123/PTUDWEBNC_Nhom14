using CulinaryBlog.Domain.Common;
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
            .Entries<BaseEntity>()
            .Where(entry => entry.State == EntityState.Deleted)
            .ToList();

        foreach (var entry in entries)
        {
            // Đổi DELETE thành UPDATE
            entry.State = EntityState.Modified;

            // Đánh dấu xóa mềm
            entry.Entity.IsDeleted = true;

            // Nếu BaseEntity có UpdatedAt thì cập nhật thời gian sửa gần nhất
            entry.Entity.UpdatedAt = utcNow;
        }
    }
}
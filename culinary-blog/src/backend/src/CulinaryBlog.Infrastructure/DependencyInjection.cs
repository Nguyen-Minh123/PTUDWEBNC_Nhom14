using CulinaryBlog.Application.Common.Caching;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Infrastructure.BackgroundJobs;
using CulinaryBlog.Infrastructure.Caching;
using CulinaryBlog.Infrastructure.Persistence;
using CulinaryBlog.Infrastructure.Services;
using CulinaryBlog.Infrastructure.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CulinaryBlog.Infrastructure;

/// <summary>
/// Đăng ký toàn bộ dependency của Infrastructure layer.
/// </summary>
public static class DependencyInjection
{
    /// <summary>
    /// Đăng ký EF Core, cache, storage, current user, job queue...
    /// </summary>
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // -------------------------------------------------
        // 1. Đăng ký DbContext
        // -------------------------------------------------
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "Connection string 'DefaultConnection' was not found.");
        }

        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });

        // -------------------------------------------------
        // 2. Map interface DbContext cho Application layer
        // -------------------------------------------------
        services.AddScoped<IApplicationDbContext>(sp =>
            sp.GetRequiredService<ApplicationDbContext>());

        // -------------------------------------------------
        // 3. Đăng ký CurrentUserService
        // -------------------------------------------------
        services.AddHttpContextAccessor();
        services.AddScoped<ICurrentUserService, CurrentUserService>();

        // -------------------------------------------------
        // 4. Đăng ký File Storage
        // -------------------------------------------------
        services.AddScoped<IFileStorageService, MinioStorageService>();

        // -------------------------------------------------
        // 5. Đăng ký Cache
        // -------------------------------------------------
        // Nếu bạn dùng Redis thật thì cấu hình tại đây.
        // Nếu chưa sẵn sàng Redis, bạn có thể thay bằng AddDistributedMemoryCache().
        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = configuration.GetConnectionString("Redis")
                                   ?? configuration["Redis:Configuration"]
                                   ?? "localhost:6379";

            options.InstanceName = configuration["Cache:KeyPrefix"] ?? "culinary-blog:";
        });

        services.AddScoped<ICacheService, RedisCacheService>();

        // -------------------------------------------------
        // 6. Đăng ký Background Job Queue
        // -------------------------------------------------
        services.AddScoped<IBackgroundJobQueue, BackgroundJobQueue>();

        return services;
    }
}
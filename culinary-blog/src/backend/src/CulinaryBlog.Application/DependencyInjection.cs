using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace CulinaryBlog.Application;

// =====================================================
// Đăng ký toàn bộ dịch vụ thuộc Application layer
// =====================================================
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // -------------------------------------------------
        // 1. Đăng ký MediatR
        // -------------------------------------------------
        // Quét toàn bộ handler Command/Query trong assembly Application
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly);
        });

        // -------------------------------------------------
        // 2. Đăng ký FluentValidation
        // -------------------------------------------------
        // Quét toàn bộ validator trong assembly Application
        // Yêu cầu package FluentValidation.DependencyInjectionExtensions
        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);

        // -------------------------------------------------
        // 3. Đăng ký pipeline behaviors
        // -------------------------------------------------
        // Nếu bạn có LoggingBehavior, ValidationBehavior, CachingBehavior...
        // đăng ký ở đây.
        //
        // Ví dụ:
        // services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        // services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        return services;
    }
}
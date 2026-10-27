using Amazon.S3;
using Asp.Versioning;
using Asp.Versioning.Builder;
using CulinaryBlog.API.Endpoints;
using CulinaryBlog.API.Middlewares;
using CulinaryBlog.API.Extensions;
using CulinaryBlog.Application;
using CulinaryBlog.Application.Common.Caching;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Features.Recipes.Queries.GetRecipesByKeyword;
using CulinaryBlog.Infrastructure;
using CulinaryBlog.Infrastructure.Caching;
using CulinaryBlog.Infrastructure.Persistence;
using CulinaryBlog.Infrastructure.Persistence.Interceptors;
using CulinaryBlog.Infrastructure.Services;
using CulinaryBlog.Infrastructure.Storage;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore; // Cần thêm using này để dùng được Scalar

var builder = WebApplication.CreateBuilder(args);

// Khai báo cho ứng dụng biết cách kết nối PostgreSQL thông qua DbContext
builder.Services.AddDbContext<CulinaryBlogDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


// Đăng ký Application layer
builder.Services.AddApplication();
// Đăng ký Infrastructure layer
builder.Services.AddInfrastructure(builder.Configuration);

// =====================================================
// Cấu hình API Versioning cho Minimal APIs
// =====================================================
// - Default v1.0
// - URL segment: /api/v{version:apiVersion}/...
// - ReportApiVersions: trả header version để client biết
builder.Services
    .AddApiVersioning(options =>
    {
        options.DefaultApiVersion = new ApiVersion(1, 0);
        options.AssumeDefaultVersionWhenUnspecified = false;
        options.ReportApiVersions = true;
        options.ApiVersionReader = new UrlSegmentApiVersionReader();
        options.RouteConstraintName = "apiVersion";
    })
    .AddApiExplorer(options =>
    {
        // Giúp API explorer/Swagger nhóm endpoint theo version
        options.GroupNameFormat = "'v'VVV";
        options.SubstituteApiVersionInUrl = true;
    });

// =====================================================
// Đăng ký CORS đa môi trường
// =====================================================
// Development: cho phép localhost:3000
// Production: đọc whitelist từ appsettings.json
var isDevelopment = builder.Environment.IsDevelopment();

//-----------------------------------------------------------------
// =====================================================
// Services
// =====================================================
// MVC Controllers nếu dự án của bạn còn dùng controller-based API.
builder.Services.AddControllers();
// Cho Swagger/OpenAPI endpoint discovery.
builder.Services.AddEndpointsApiExplorer();
// ProblemDetails để chuẩn hóa lỗi trả về API.
builder.Services.AddProblemDetails();

// Đăng ký OpenAPI generator cho Minimal APIs. 
// builder.Services.AddOpenApi();

// Cho phép gọi API từ frontend Next.js hoặc các client khác.
builder.Services.AddCors(options =>
{
    // -------------------------------------------------
    // DevelopmentPolicy
    // -------------------------------------------------
    // Dùng trực tiếp cho Next.js local dev
    options.AddPolicy("DevelopmentPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
            .WithHeaders("Authorization", "Content-Type", "Accept", "X-Correlation-ID")
            .AllowCredentials()
            .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
    });

    // -------------------------------------------------
    // ProductionPolicy
    // -------------------------------------------------
    // Chỉ đăng ký khi thực sự chạy Production
    if (!isDevelopment)
    {
        var allowedOrigins = builder.Configuration
            .GetSection("Cors:AllowedOrigins")
            .Get<string[]>() ?? Array.Empty<string>();

        if (allowedOrigins.Length == 0)
        {
            throw new InvalidOperationException(
                "Cors:AllowedOrigins is empty. Please configure allowed origins in appsettings.json for Production.");
        }

        options.AddPolicy("ProductionPolicy", policy =>
        {
            policy
                .WithOrigins(allowedOrigins)
                .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .WithHeaders("Authorization", "Content-Type", "Accept", "X-Correlation-ID")
                .AllowCredentials()
                .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
        });
    }
});

// =====================================================
// Đăng ký Rate Limiting
// =====================================================
builder.Services.AddAppRateLimiting();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Missing connection string: DefaultConnection");

// Đăng ký MediatR cho CQRS handlers trong Application layer. 
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(GetRecipesByKeywordQuery).Assembly);
});

// Đăng ký SoftDeleteInterceptor để tự động xử lý soft delete. 
builder.Services.AddScoped<IApplicationDbContext>(sp =>
    sp.GetRequiredService<CulinaryBlogDbContext>());

builder.Services.AddScoped<IUnitOfWork>(sp =>
    sp.GetRequiredService<CulinaryBlogDbContext>());

// DbContext chính của hệ thống, dùng PostgreSQL.
builder.Services.AddDbContext<CulinaryBlogDbContext>((sp, options) =>
{
    options.UseNpgsql(connectionString, npgsql =>
    {
        // Chỉ định assembly chứa migration.
        npgsql.MigrationsAssembly(typeof(CulinaryBlogDbContext).Assembly.FullName);
    });

    // Gắn interceptor cho DbContext. 
    options.AddInterceptors(sp.GetRequiredService<SoftDeleteInterceptor>());
});

builder.Services.AddScoped<SoftDeleteInterceptor>();

builder.Services.AddOpenApi();

// HttpContext / Current user
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

// Cache (build-safe fallback)
builder.Services.AddDistributedMemoryCache();
builder.Services.AddScoped<ICacheService, RedisCacheService>();

// MinIO via AWS SDK
builder.Services.AddSingleton<IAmazonS3>(_ =>
{
    var endpoint = builder.Configuration["Minio:Endpoint"]
        ?? throw new InvalidOperationException("Missing Minio:Endpoint.");

    var accessKey = builder.Configuration["Minio:AccessKey"]
        ?? throw new InvalidOperationException("Missing Minio:AccessKey.");

    var secretKey = builder.Configuration["Minio:SecretKey"]
        ?? throw new InvalidOperationException("Missing Minio:SecretKey.");

    var normalizedEndpoint = NormalizeServiceUrl(endpoint);

    var config = new AmazonS3Config
    {
        ServiceURL = normalizedEndpoint,
        ForcePathStyle = true
    };

    return new AmazonS3Client(accessKey, secretKey, config);
});

builder.Services.AddScoped<IFileStorageService, MinioStorageService>();

var app = builder.Build();

// =====================================================
// Middleware
// =====================================================
// Middleware xử lý lỗi toàn cục
app.UseMiddleware<GlobalExceptionMiddleware>();
// Chuẩn hóa exception trả về dạng ProblemDetails.
app.UseExceptionHandler();
// Redirect HTTP -> HTTPS nếu môi trường hỗ trợ.
app.UseHttpsRedirection();
// Cho phép frontend gọi API.
app.UseCors("DefaultCors");

// OpenAPI / Scalar
app.MapOpenApi();
// Mở Scalar UI tại /scalar/v1.
app.MapScalarApiReference();
// Thực hiện API Quản lý Nguyên liệu
app.MapRecipeIngredientsEndpoints();
// Thực hiện API Quản lý Bước thực hiện
app.MapRecipeStepsEndpoints();
// Thực hiện API Upload và Quản lý Hình ảnh
app.MapRecipeImagesEndpoints();
// Thực hiện API Category (Danh mục kèm thống kê số bài viết)
app.MapCategoriesEndpoints();

// ======================================================
// ÁP DỤNG CORS THEO MÔI TRƯỜNG
// ======================================================
// Development: chỉ localhost:3000
// Production: whitelist từ appsettings.json
if (app.Environment.IsDevelopment())
{
    app.UseCors("DevelopmentPolicy");
}
else
{
    app.UseCors("ProductionPolicy");
}

// =====================================================
// Pipeline middleware theo thứ tự yêu cầu
// =====================================================
// Correlation ID: gắn mã theo dõi request
app.UseMiddleware<CorrelationIdMiddleware>();

// Logging: ghi log request/response
app.UseMiddleware<RequestLoggingMiddleware>();

// Exception handler: bắt lỗi và trả RFC7807
app.UseMiddleware<ExceptionHandlingMiddleware>();

// HSTS: chỉ bật khi không phải Development
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

// Security headers: thêm header bảo mật cho response
app.UseMiddleware<SecurityHeadersMiddleware>();


// Rate limiter chạy trước auth để chặn sớm request xấu
app.UseRateLimiter();

// Authentication / Authorization phải nằm sau UseCors
app.UseAuthentication();
app.UseAuthorization();

// =====================================================
// Tạo ApiVersionSet v1.0
// =====================================================
// Đây là bước bắt buộc để endpoint có "associated API version set"
var v1Version = new ApiVersion(1, 0);

var versionSet = app.NewApiVersionSet()
    .HasApiVersion(v1Version)
    .ReportApiVersions()
    .Build();

// =====================================================
// 8. Route root versioned
// =====================================================
// Mọi route API đi qua đây sẽ mang prefix /api/v{version:apiVersion}
var api = app.MapGroup("/api/v{version:apiVersion}")
    .WithApiVersionSet(versionSet);

// =====================================================
// 9. Route group Recipes v1
// =====================================================
var recipes = api.MapGroup("/recipes");

recipes.MapGet("/", () =>
    Results.Ok(new { message = "Recipes v1.0" }))
    .MapToApiVersion(v1Version);

recipes.MapGet("/{id:guid}", (Guid id) =>
    Results.Ok(new { id, message = "Recipe detail v1.0" }))
    .MapToApiVersion(v1Version);

// =====================================================
// 10. Route group Categories v1
// =====================================================
var categories = api.MapGroup("/categories");

categories.MapGet("/", () =>
    Results.Ok(new { message = "Categories v1.0" }))
    .MapToApiVersion(v1Version);

// =====================================================
// 11. Route group Auth v1
// =====================================================
var auth = api.MapGroup("/auth");

auth.MapPost("/login", () =>
    Results.Ok(new { message = "Login v1.0" }))
    .MapToApiVersion(v1Version);

auth.MapPost("/register", () =>
    Results.Ok(new { message = "Register v1.0" }))
    .MapToApiVersion(v1Version);

auth.MapPost("/refresh", () =>
    Results.Ok(new { message = "Refresh v1.0" }))
    .MapToApiVersion(v1Version);

auth.MapPost("/logout", () =>
    Results.Ok(new { message = "Logout v1.0" }))
    .MapToApiVersion(v1Version);

// =====================================================
// Routes
// =====================================================
app.MapControllers();

app.MapGet("/", () => Results.Redirect("/scalar/v1"));

app.MapGet("/health", () => Results.Ok(new
{
    status = "Healthy",
    timestampUtc = DateTime.UtcNow
}));

app.MapGet("/health/live", () => Results.Ok(new
{
    status = "Healthy",
    probe = "live",
    timestampUtc = DateTime.UtcNow
}));

app.MapGet("/health/ready", () => Results.Ok(new
{
    status = "Healthy",
    probe = "ready",
    timestampUtc = DateTime.UtcNow
}));

// =====================================================
// Route groups
// =====================================================

// Ví dụ endpoint công khai / thông thường
api.MapGet("/health", () => Results.Ok(new { status = "Healthy" }))
   .WithName("HealthCheck");

// ===================================================== 
// Minimal API Endpoints 
// ===================================================== 

MapRecipeEndpoints(app);

// ===================================================== 
// App Start 
// =====================================================

app.Run();

// =====================================================
// Local functions
// =====================================================

static void MapRecipeEndpoints(WebApplication app)
{
    // Group cho toàn bộ endpoint liên quan Recipe.
    var recipes = app.MapGroup("/api/recipes")
        .WithTags("Recipes");

    // GET /api/recipes/search?keyword=abc&take=20
    recipes.MapGet("/search", async (
        string? keyword,
        int take,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        // Gửi query xuống Application layer theo CQRS.
        var result = await mediator.Send(
            new GetRecipesByKeywordQuery(keyword ?? string.Empty, take),
            cancellationToken);

        return Results.Ok(result);
    })
    .WithName("SearchRecipesByKeyword")
    .WithSummary("Search recipes by keyword")
    .WithDescription("Search recipes by keyword using PostgreSQL full-text search over SearchVector.")
    .Produces<IReadOnlyList<RecipeSearchResultDto>>(StatusCodes.Status200OK)
    .Produces(StatusCodes.Status200OK);
}

static string NormalizeServiceUrl(string endpoint)
{
    // Loại bỏ khoảng trắng dư thừa.
    var value = endpoint.Trim();

    if (!value.StartsWith("http://", StringComparison.OrdinalIgnoreCase) &&
        !value.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
    {
        value = "http://" + value.TrimStart('/');
    }

    // Bỏ slash cuối để tránh lỗi ghép URL.
    return value.TrimEnd('/');
}

//-----------------------------------------------------------------
// var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi();
//     app.MapScalarApiReference(); // Chỉ giữ đúng 1 dòng này!

//     app.MapGet("/", () => "Hello World! Culinary Blog Backend is running on .NET 10.");
// }
// app.Run();

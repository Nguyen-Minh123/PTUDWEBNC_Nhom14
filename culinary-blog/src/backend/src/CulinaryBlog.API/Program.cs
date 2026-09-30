using Amazon.S3;
using CulinaryBlog.API.Endpoints;
using CulinaryBlog.Application.Common.Caching;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Features.Recipes.Queries.GetRecipesByKeyword;
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
builder.Services.AddOpenApi();

// Cho phép gọi API từ frontend Next.js hoặc các client khác.
builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultCors", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

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

using Amazon.S3;
using CulinaryBlog.Application.Common.Caching;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Infrastructure.Caching;
using CulinaryBlog.Infrastructure.Persistence;
using CulinaryBlog.Infrastructure.Persistence.Interceptors;
using CulinaryBlog.Infrastructure.Services;
using CulinaryBlog.Infrastructure.Storage;
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
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddProblemDetails();

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

builder.Services.AddDbContext<CulinaryBlogDbContext>(options =>
{
    options.UseNpgsql(connectionString, npgsql =>
    {
        npgsql.MigrationsAssembly(typeof(CulinaryBlogDbContext).Assembly.FullName);
    });
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
app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseCors("DefaultCors");

// OpenAPI / Scalar
app.MapOpenApi();
app.MapScalarApiReference();

// =====================================================
// Routes
// =====================================================
app.MapControllers();

app.MapGet("/", () => Results.Redirect("/scalar"));

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

app.Run();

static string NormalizeServiceUrl(string endpoint)
{
    var value = endpoint.Trim();

    if (!value.StartsWith("http://", StringComparison.OrdinalIgnoreCase) &&
        !value.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
    {
        value = "http://" + value.TrimStart('/');
    }

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

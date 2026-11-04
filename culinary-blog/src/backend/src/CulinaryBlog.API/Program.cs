using System.Text.Json.Serialization;
using Amazon.S3;
using Asp.Versioning;
using CulinaryBlog.API.Authorization;
using CulinaryBlog.API.Endpoints;
using CulinaryBlog.API.Extensions;
using CulinaryBlog.API.HealthChecks;
using CulinaryBlog.API.Middlewares;
using CulinaryBlog.API.OpenApi;
using CulinaryBlog.Application;
using CulinaryBlog.Application.Common.Caching;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Infrastructure.Authorization;
using CulinaryBlog.Infrastructure.Caching;
using CulinaryBlog.Infrastructure.Persistence;
using CulinaryBlog.Infrastructure.Persistence.Interceptors;
using CulinaryBlog.Infrastructure.Services;
using CulinaryBlog.Infrastructure.Storage;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using Scalar.AspNetCore;
using Serilog;
using System.Security.Claims;
using System.Text;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, services, loggerConfiguration) =>
    loggerConfiguration
        .ReadFrom.Configuration(context.Configuration)
        .Enrich.FromLogContext());

// =====================================================
// Services
// =====================================================

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddProblemDetails();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.Configure<Microsoft.AspNetCore.Mvc.JsonOptions>(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// 1. Phân quyền tập trung (RBAC, Policy-based, Resource-based)
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "CulinaryBlog";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "CulinaryBlogClient";
var jwtSigningKey = builder.Configuration["Jwt:SigningKey"] 
    ?? builder.Configuration["Jwt:Secret"] 
    ?? "super-secret-key-that-is-very-long-for-hmac-sha256-1234567890";

var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSigningKey));

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.MapInboundClaims = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = !string.IsNullOrEmpty(builder.Configuration["Jwt:Issuer"]),
            ValidIssuer = jwtIssuer,
            ValidateAudience = !string.IsNullOrEmpty(builder.Configuration["Jwt:Audience"]),
            ValidAudience = jwtAudience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = signingKey,
            ValidateLifetime = true,
            RequireExpirationTime = true,
            ClockSkew = TimeSpan.FromSeconds(30),
            NameClaimType = "sub",
            RoleClaimType = "role",
            ValidAlgorithms = [SecurityAlgorithms.HmacSha256]
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("AuthorOrAdmin", policy => policy.RequireRole("Author", "Admin"));
    options.AddPolicy("CanPublishRecipe", policy => policy.RequireRole("Author", "Admin"));
    options.AddPolicy(RecipeAuthorizationPolicies.AuthenticatedUser, policy => policy.RequireAuthenticatedUser());
    options.AddPolicy(RecipeAuthorizationPolicies.OwnerOrAdmin, policy => policy
        .RequireAuthenticatedUser()
        .AddRequirements(new RecipeOwnerOrAdminRequirement()));
});

builder.Services.AddSingleton<IAuthorizationHandler, RecipeAuthorizationHandler>();
builder.Services.AddSingleton<IAuthorizationHandler, RecipeOwnerOrAdminHandler>();

builder.Services.AddExceptionHandler<CulinaryBlog.API.Infrastructure.GlobalExceptionHandler>();

// 2. CORS Policy đa môi trường (Development & Production)
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevelopmentPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://127.0.0.1:3000")
              .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
              .WithHeaders("Authorization", "Content-Type", "Accept", "X-Correlation-ID")
              .AllowCredentials();
    });

    options.AddPolicy("ProductionPolicy", policy =>
    {
        var allowed = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
            ?? ["https://culinaryblog.vn", "https://www.culinaryblog.vn"];
        policy.WithOrigins(allowed)
              .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE")
              .WithHeaders("Authorization", "Content-Type", "Accept", "X-Correlation-ID")
              .AllowCredentials()
              .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
    });
});

// 3. Rate Limiting nâng cao (.NET 10 - Fixed Window & Token Bucket) (FR-INF-005)
builder.Services.AddAppRateLimiting();

// 4. API Versioning cho Minimal APIs
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
    options.ApiVersionReader = new UrlSegmentApiVersionReader();
});

builder.Services.AddHealthChecks()
    .AddCheck("self", () => Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult.Healthy("Self check passed."), tags: ["live"])
    .AddCheck<DatabaseHealthCheck>("database", tags: ["ready"]);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Missing connection string: DefaultConnection");

builder.Services.AddDbContext<CulinaryBlogDbContext>(options =>
{
    options.UseNpgsql(connectionString, npgsql =>
    {
        npgsql.MigrationsAssembly(typeof(CulinaryBlogDbContext).Assembly.FullName);
    });
    options.ConfigureWarnings(w =>
        w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning));

    if (builder.Environment.IsDevelopment())
    {
        options.LogTo(
            Console.WriteLine,
            new[] { Microsoft.EntityFrameworkCore.DbLoggerCategory.Database.Command.Name },
            LogLevel.Information);
    }
});

builder.Services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<CulinaryBlogDbContext>());
builder.Services.AddScoped<SoftDeleteInterceptor>();

// 5. OpenAPI 3.1 & Scalar UI
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = OpenApiSpecVersion.OpenApi3_1;
    options.AddDocumentTransformer<BearerSecuritySchemeTransformer>();
});

builder.Services.AddApplication();
builder.Services.AddScoped<IPasswordResetTokenService, PasswordResetTokenService>();

// HttpContext / Current user
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IGoogleAuthService, GoogleAuthService>();
builder.Services.AddScoped<IPasswordHasherService, PasswordHasherService>();
builder.Services.AddScoped<IRecipeRepository, CulinaryBlog.Infrastructure.Persistence.Repositories.RecipeRepository>();
builder.Services.AddScoped<IUnitOfWork, CulinaryBlog.Infrastructure.Persistence.Repositories.UnitOfWork>();

// Cache
builder.Services.AddDistributedMemoryCache();
builder.Services.AddScoped<ICacheService, RedisCacheService>();

// MinIO via AWS SDK (kèm fallback giá trị mặc định cho môi trường Dev)
builder.Services.AddSingleton<IAmazonS3>(_ =>
{
    var endpoint = builder.Configuration["Minio:Endpoint"] ?? "http://localhost:9000";
    var accessKey = builder.Configuration["Minio:AccessKey"] ?? "minioadmin";
    var secretKey = builder.Configuration["Minio:SecretKey"] ?? "minioadmin";

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

if (app.Environment.IsDevelopment())
{
    await using var scope = app.Services.CreateAsyncScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<CulinaryBlogDbContext>();
    await dbContext.Database.MigrateAsync();
    if (dbContext.Database.IsRelational())
    {
        await dbContext.Database.ExecuteSqlRawAsync(
            """
            ALTER TABLE "AspNetUsers" ADD COLUMN IF NOT EXISTS "FirstName" text NOT NULL DEFAULT '';
            ALTER TABLE "AspNetUsers" ADD COLUMN IF NOT EXISTS "LastName" text NOT NULL DEFAULT '';
            ALTER TABLE "AspNetUsers" ADD COLUMN IF NOT EXISTS "DisplayName" character varying(150) NOT NULL DEFAULT '';
            ALTER TABLE "AspNetUsers" ADD COLUMN IF NOT EXISTS "Bio" character varying(1000);
            ALTER TABLE "AspNetUsers" ADD COLUMN IF NOT EXISTS "AvatarUrl" character varying(500);
            ALTER TABLE "AspNetUsers" ADD COLUMN IF NOT EXISTS "IsActive" boolean NOT NULL DEFAULT TRUE;
            ALTER TABLE "AspNetUsers" ADD COLUMN IF NOT EXISTS "CreatedAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;
            ALTER TABLE "AspNetUsers" ADD COLUMN IF NOT EXISTS "UpdatedAt" timestamp with time zone;

            ALTER TABLE "RecipeImages" ADD COLUMN IF NOT EXISTS "ObjectKey" character varying(500) NOT NULL DEFAULT '';
            ALTER TABLE "RecipeImages" ADD COLUMN IF NOT EXISTS "ContentType" character varying(100) NOT NULL DEFAULT 'image/jpeg';
            ALTER TABLE "RecipeImages" ADD COLUMN IF NOT EXISTS "FileSize" bigint NOT NULL DEFAULT 0;
            ALTER TABLE "RecipeImages" ADD COLUMN IF NOT EXISTS "ChecksumSha256" character varying(64);
            ALTER TABLE "RecipeImages" ADD COLUMN IF NOT EXISTS "Width" integer;
            ALTER TABLE "RecipeImages" ADD COLUMN IF NOT EXISTS "Height" integer;
            ALTER TABLE "RecipeImages" ADD COLUMN IF NOT EXISTS "StorageProvider" character varying(50) NOT NULL DEFAULT 'MinIO';
            """);
    }
    await new CulinaryBlog.Infrastructure.Persistence.RecipeDataSeeder(dbContext).SeedAsync();
}

// =====================================================
// Middleware Pipeline (FR-INF-006)
// =====================================================
app.UseMiddleware<CorrelationIdMiddleware>();
app.UseMiddleware<RequestLoggingMiddleware>();
app.UseExceptionHandler();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseMiddleware<SecurityHeadersMiddleware>();

var corsPolicy = app.Environment.IsDevelopment() ? "DevelopmentPolicy" : "ProductionPolicy";
app.UseCors(corsPolicy);

app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

// OpenAPI / Scalar UI
app.MapOpenApi();
app.MapScalarApiReference(options =>
{
    options.WithTitle("Culinary Blog API")
           .WithTheme(ScalarTheme.Purple);
});

// Sub-endpoints
app.MapRecipeIngredientsEndpoints();
app.MapRecipeStepsEndpoints();
app.MapRecipeImagesEndpoints();

// =====================================================
// Routes
// =====================================================
app.MapControllers();
app.MapRecipeEndpoints();
app.MapCategoryEndpoints();
app.MapAuthEndpoints();
app.MapUserEndpoints();

app.MapGet("/", () => Results.Redirect("/scalar/v1"))
    .WithName("GetApiDocumentation")
    .WithSummary("Mở giao diện tài liệu API")
    .WithDescription("Chuyển hướng đến Scalar UI.")
    .Produces(StatusCodes.Status302Found);

app.MapHealthChecks("/health")
    .WithName("HealthCheck")
    .WithSummary("Kiểm tra tình trạng hệ thống")
    .WithDescription("Kiểm tra tất cả các health checks đã đăng ký.");

app.MapHealthChecks("/health/live", new HealthCheckOptions
{
    Predicate = healthCheck => healthCheck.Tags.Contains("live")
})
    .WithName("LivenessCheck")
    .WithSummary("Kiểm tra ứng dụng còn hoạt động")
    .WithDescription("Chỉ kiểm tra tiến trình ứng dụng, không phụ thuộc dịch vụ bên ngoài.");

app.MapHealthChecks("/health/ready", new HealthCheckOptions
{
    Predicate = healthCheck => healthCheck.Tags.Contains("ready")
})
    .WithName("ReadinessCheck")
    .WithSummary("Kiểm tra ứng dụng sẵn sàng phục vụ")
    .WithDescription("Kiểm tra các phụ thuộc cần thiết để phục vụ request.");

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

/// <summary>Provides the API entry point for hosting and integration tests.</summary>
public partial class Program
{
}

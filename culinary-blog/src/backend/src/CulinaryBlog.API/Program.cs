using Microsoft.OpenApi.Models;
using CulinaryBlog.Infrastructure.Services;
using CulinaryBlog.Infrastructure.Storage;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using CulinaryBlog.Application.Authentication.Commands.Register;
using CulinaryBlog.Application.Contracts.Services;
using Microsoft.AspNetCore.Identity;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Application.Contracts.Persistence;
using CulinaryBlog.Infrastructure;
using Carter;
using CulinaryBlog.Application.Common.Interfaces;
using Amazon.S3;
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Khai's infrastructure extensions
builder.Services.AddInfrastructure(builder.Configuration);

// Add rate limiting (Minh)
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("login-policy", policy =>
    {
        policy.PermitLimit = 5; 
        policy.Window = TimeSpan.FromMinutes(1); 
        policy.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        policy.QueueLimit = 0;
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddProblemDetails();
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        document.Components ??= new OpenApiComponents();
        document.Components.SecuritySchemes.Add("Bearer", new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            Description = "Input your Bearer token to access this API"
        });

        document.SecurityRequirements.Add(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                Array.Empty<string>()
            }
        });

        return Task.CompletedTask;
    });
});
builder.Services.AddCarter();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(RegisterCommand).Assembly));

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

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

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? Array.Empty<string>())
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseExceptionHandler();
app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors("AllowFrontend");    
app.UseRateLimiter();            
app.UseAuthentication();         
app.UseAuthorization();          

app.MapControllers();
app.MapCarter();

app.MapGet("/", () => Results.Redirect("/scalar"));
app.MapGet("/health", () => Results.Ok(new { status = "Healthy", timestampUtc = DateTime.UtcNow }));
app.MapGet("/health/live", () => Results.Ok(new { status = "Healthy", probe = "live", timestampUtc = DateTime.UtcNow }));
app.MapGet("/health/ready", () => Results.Ok(new { status = "Healthy", probe = "ready", timestampUtc = DateTime.UtcNow }));

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<CulinaryBlog.Infrastructure.Persistence.CulinaryBlogDbContext>();
    db.Database.Migrate();
}

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




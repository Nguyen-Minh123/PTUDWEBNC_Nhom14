using System.Net.Mime;
using System.Reflection;
using System.Text;
using System.Text.Json;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Infrastructure.Caching;
using CulinaryBlog.Infrastructure.Persistence;
using CulinaryBlog.Infrastructure.Persistence.Interceptors;
using CulinaryBlog.Infrastructure.Storage;
//using Hangfire;
//using Hangfire.PostgreSql;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.AspNetCore.Diagnostics.HealthChecks;
//using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
//using Serilog;
//using Serilog.Events;
//using Minio;
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

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Missing connection string: DefaultConnection");

    options.UseNpgsql(connectionString);
});

builder.Services.AddScoped<SoftDeleteInterceptor>();

// OpenAPI + Scalar
// 1. Đăng ký dịch vụ sinh tài liệu OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(); // Chỉ giữ đúng 1 dòng này!
    
    app.MapGet("/", () => "Hello World! Culinary Blog Backend is running on .NET 10.");
}

// =====================================================
// App
// =====================================================
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseCors("DefaultCors");

app.MapControllers();

//app.MapGet("/", () => Results.Redirect("/scalar"));

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

//-----------------------------------------------------------------

app.Run();

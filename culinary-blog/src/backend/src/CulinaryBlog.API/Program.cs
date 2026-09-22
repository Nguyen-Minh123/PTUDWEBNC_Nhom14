using CulinaryBlog.API.Middlewares;
using CulinaryBlog.Application;
using CulinaryBlog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Đăng ký xử lý ngoại lệ toàn cục theo chuẩn RFC 7807 Problem Details
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// Đăng ký các dịch vụ tầng Application (MediatR, FluentValidation, ValidationBehavior)
builder.Services.AddApplication();

// Khai báo cho ứng dụng biết cách kết nối PostgreSQL thông qua DbContext
builder.Services.AddDbContext<CulinaryBlogDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Sử dụng Global Exception Handler
app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapGet("/", () => "Hello World! Culinary Blog Backend is running on .NET 10.");
}

app.Run();
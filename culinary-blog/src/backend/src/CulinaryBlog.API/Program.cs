using Carter;
using CulinaryBlog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using CulinaryBlog.Application.Authentication.Commands.Register;
using CulinaryBlog.Application.Contracts.Services;
using Microsoft.AspNetCore.Identity;
using CulinaryBlog.Domain.Entities;

// THÊM MỚI: Bổ sung using để nhận diện Interface IApplicationDbContext
using CulinaryBlog.Application.Contracts.Persistence; 

var builder = WebApplication.CreateBuilder(args);

// Khai báo kết nối PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// THÊM MỚI: Ánh xạ Interface của tầng Application với DbContext của tầng Infrastructure
builder.Services.AddScoped<IApplicationDbContext, ApplicationDbContext>();

// ĐĂNG KÝ IDENTITY
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Đăng ký dịch vụ
builder.Services.AddOpenApi();
builder.Services.AddCarter();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(RegisterCommand).Assembly));

// Bypass tạm thời JwtService
builder.Services.AddScoped<IJwtService>(sp => throw new NotImplementedException("Tạm thời bypass để test Register"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    
    app.MapGet("/", () => "Hello World! Culinary Blog Backend is running on .NET 10.");
}

app.MapCarter();
app.Run();
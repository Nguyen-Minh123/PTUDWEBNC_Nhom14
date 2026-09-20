using CulinaryBlog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Khai báo cho ứng dụng biết cách kết nối PostgreSQL thông qua DbContext
builder.Services.AddDbContext<CulinaryBlogDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapGet("/", () => "Hello World! Culinary Blog Backend is running on .NET 10.");
}

app.Run();
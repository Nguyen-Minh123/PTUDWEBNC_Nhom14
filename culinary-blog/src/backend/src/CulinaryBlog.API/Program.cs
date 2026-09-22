using Carter;
using CulinaryBlog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using CulinaryBlog.Application.Authentication.Commands.Register;
using CulinaryBlog.Application.Contracts.Services;
using Microsoft.AspNetCore.Identity;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Application.Contracts.Persistence;
using CulinaryBlog.Infrastructure.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// ==========================================
// 1. CẤU HÌNH DATABASE & IDENTITY
// ==========================================
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IApplicationDbContext, ApplicationDbContext>();

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// ==========================================
// 2. CẤU HÌNH JWT & AUTHENTICATION
// ==========================================
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection(JwtSettings.SectionName));
builder.Services.AddScoped<IJwtService, JwtService>(); // Đã đăng ký Service thật, xóa dòng ném Exception

var jwtSettings = builder.Configuration.GetSection(JwtSettings.SectionName).Get<JwtSettings>();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings!.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
    };
});
builder.Services.AddAuthorization();

// ==========================================
// 3. CẤU HÌNH CORS VÀ RATE LIMITING
// ==========================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? Array.Empty<string>())
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("login-policy", policy =>
    {
        policy.PermitLimit = 5; // Tối đa 5 request đăng nhập/đăng ký
        policy.Window = TimeSpan.FromMinutes(1); // Trong 1 phút
        policy.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        policy.QueueLimit = 0;
    });
});

// ==========================================
// 4. CẤU HÌNH CÁC DỊCH VỤ KHÁC
// ==========================================
builder.Services.AddOpenApi();
builder.Services.AddCarter();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(RegisterCommand).Assembly));

var app = builder.Build();

// ==========================================
// 5. MIDDLEWARE PIPELINE (THỨ TỰ BẮT BUỘC)
// ==========================================
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.MapGet("/", () => "Hello World! Culinary Blog Backend is running on .NET.");
}

// Trình tự bảo mật chuẩn:
app.UseCors("AllowFrontend");    // 1. Mở cửa cho Next.js gọi API
app.UseRateLimiter();            // 2. Chặn spam trước khi vào logic
app.UseAuthentication();         // 3. Xác thực người dùng (Kiểm tra Token)
app.UseAuthorization();          // 4. Phân quyền (Check Role)

app.MapCarter();
app.Run();
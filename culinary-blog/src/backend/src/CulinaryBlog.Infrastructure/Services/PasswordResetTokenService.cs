using System.Security.Cryptography;
using System.Text;
using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using Microsoft.Extensions.Configuration;

namespace CulinaryBlog.Infrastructure.Services;

/// <summary>
/// Dịch vụ sinh và kiểm thực Token khôi phục mật khẩu chuẩn HMAC-SHA256, tự động hủy khi SecurityStamp thay đổi.
/// </summary>
public class PasswordResetTokenService : IPasswordResetTokenService
{
    private readonly byte[] _key;

    public PasswordResetTokenService(IConfiguration configuration)
    {
        var secret = configuration["Jwt:SigningKey"]
            ?? configuration["Jwt__SigningKey"]
            ?? "super-secret-key-that-is-very-long-for-hmac-sha256-1234567890";
        _key = Encoding.UTF8.GetBytes(secret);
    }

    public string GenerateToken(ApplicationUser user, TimeSpan? lifespan = null)
    {
        var expiresAt = DateTimeOffset.UtcNow.Add(lifespan ?? TimeSpan.FromMinutes(15)).ToUnixTimeSeconds();
        var securityStamp = user.SecurityStamp ?? user.PasswordHash ?? string.Empty;
        var payload = $"{user.Id}:{user.Email}:{expiresAt}:{securityStamp}";

        using var hmac = new HMACSHA256(_key);
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
        var signature = Convert.ToHexString(hash);

        var tokenData = $"{user.Id}|{expiresAt}|{signature}";
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(tokenData))
            .Replace("+", "-")
            .Replace("/", "_")
            .TrimEnd('=');
    }

    public bool ValidateToken(ApplicationUser user, string token)
    {
        if (string.IsNullOrWhiteSpace(token)) return false;

        try
        {
            var base64 = token.Replace("-", "+").Replace("_", "/");
            switch (base64.Length % 4)
            {
                case 2: base64 += "=="; break;
                case 3: base64 += "="; break;
            }

            var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(base64));
            var parts = decoded.Split('|');
            if (parts.Length != 3) return false;

            var userId = parts[0];
            if (!long.TryParse(parts[1], out var expiresAt)) return false;
            var providedSignature = parts[2];

            if (userId != user.Id) return false;

            // Kiểm tra hạn sử dụng (TTL)
            if (DateTimeOffset.UtcNow.ToUnixTimeSeconds() > expiresAt) return false;

            // Kiểm tra tính toàn vẹn và SecurityStamp hiện tại của user
            var securityStamp = user.SecurityStamp ?? user.PasswordHash ?? string.Empty;
            var payload = $"{user.Id}:{user.Email}:{expiresAt}:{securityStamp}";

            using var hmac = new HMACSHA256(_key);
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
            var expectedSignature = Convert.ToHexString(hash);

            return CryptographicOperations.FixedTimeEquals(
                Encoding.UTF8.GetBytes(expectedSignature),
                Encoding.UTF8.GetBytes(providedSignature));
        }
        catch
        {
            return false;
        }
    }
}

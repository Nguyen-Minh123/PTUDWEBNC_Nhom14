using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Common.Security;

/// <summary>
/// Helper quản lý và phân giải vai trò (RBAC: Admin, Author, User) của người dùng từ bảng AspNetRoles / AspNetUserRoles.
/// </summary>
public static class UserRoleHelper
{
    public const string Admin = "Admin";
    public const string Author = "Author";
    public const string User = "User";

    public static readonly IReadOnlyList<string> SupportedRoles = [Admin, Author, User];

    /// <summary>
    /// Chuẩn hóa tên vai trò hợp lệ theo chuẩn hệ thống (Admin, Author, User).
    /// </summary>
    public static string? NormalizeRoleName(string? role)
    {
        if (string.IsNullOrWhiteSpace(role))
        {
            return null;
        }

        var trimmed = role.Trim();
        return SupportedRoles.FirstOrDefault(r => string.Equals(r, trimmed, StringComparison.OrdinalIgnoreCase));
    }

    /// <summary>
    /// Xác định vai trò chính (cao nhất) của người dùng từ danh sách các vai trò.
    /// </summary>
    public static string GetPrimaryRole(IEnumerable<string> roles)
    {
        var roleSet = new HashSet<string>(roles, StringComparer.OrdinalIgnoreCase);
        if (roleSet.Contains(Admin))
        {
            return Admin;
        }

        if (roleSet.Contains(Author))
        {
            return Author;
        }

        return User;
    }

    /// <summary>
    /// Lấy danh sách vai trò của một người dùng từ cơ sở dữ liệu (kèm fallback tương thích dữ liệu cũ).
    /// </summary>
    public static async Task<List<string>> GetUserRolesAsync(
        IApplicationDbContext dbContext,
        ApplicationUser user,
        CancellationToken cancellationToken = default)
    {
        var dbRoles = await (
            from ur in dbContext.UserRoles.AsNoTracking()
            join r in dbContext.Roles.AsNoTracking() on ur.RoleId equals r.Id
            where ur.UserId == user.Id && r.Name != null
            select r.Name!)
            .ToListAsync(cancellationToken);

        if (dbRoles.Count > 0)
        {
            return OrderRoles(dbRoles);
        }

        return GetFallbackRoles(user.Email);
    }

    /// <summary>
    /// Lấy bản đồ vai trò của nhiều người dùng trong một truy vấn duy nhất (tránh lỗi N+1 query).
    /// </summary>
    public static async Task<Dictionary<string, List<string>>> GetUsersRolesMapAsync(
        IApplicationDbContext dbContext,
        IEnumerable<ApplicationUser> users,
        CancellationToken cancellationToken = default)
    {
        var userList = users.ToList();
        var userIds = userList.Select(u => u.Id).ToList();

        var rolePairs = await (
            from ur in dbContext.UserRoles.AsNoTracking()
            join r in dbContext.Roles.AsNoTracking() on ur.RoleId equals r.Id
            where userIds.Contains(ur.UserId) && r.Name != null
            select new { ur.UserId, RoleName = r.Name! })
            .ToListAsync(cancellationToken);

        var grouped = rolePairs
            .GroupBy(x => x.UserId, StringComparer.Ordinal)
            .ToDictionary(
                g => g.Key,
                g => OrderRoles(g.Select(x => x.RoleName)),
                StringComparer.Ordinal);

        var result = new Dictionary<string, List<string>>(StringComparer.Ordinal);
        foreach (var u in userList)
        {
            if (grouped.TryGetValue(u.Id, out var roles) && roles.Count > 0)
            {
                result[u.Id] = roles;
            }
            else
            {
                result[u.Id] = GetFallbackRoles(u.Email);
            }
        }

        return result;
    }

    /// <summary>
    /// Gán vai trò cho người dùng trong bảng AspNetUserRoles (tự động khởi tạo AspNetRoles nếu chưa có).
    /// </summary>
    public static async Task<List<string>> AssignRoleAsync(
        IApplicationDbContext dbContext,
        string userId,
        string primaryRole,
        CancellationToken cancellationToken = default)
    {
        var normalizedPrimary = NormalizeRoleName(primaryRole)
            ?? throw new ArgumentException($"Vai trò '{primaryRole}' không hợp lệ.", nameof(primaryRole));

        var targetRoleNames = normalizedPrimary switch
        {
            Admin => new[] { Admin, Author, User },
            Author => new[] { Author, User },
            _ => new[] { User }
        };

        var existingRoles = await dbContext.Roles.ToListAsync(cancellationToken);
        var allKnownRoles = existingRoles
            .Concat(dbContext.Roles.Local)
            .Where(r => !string.IsNullOrWhiteSpace(r.Name));

        var roleByName = allKnownRoles
            .GroupBy(r => r.Name!, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);

        foreach (var roleName in SupportedRoles)
        {
            if (!roleByName.ContainsKey(roleName))
            {
                var newRole = new IdentityRole<string>
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = roleName,
                    NormalizedName = roleName.ToUpperInvariant(),
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                };
                dbContext.Roles.Add(newRole);
                roleByName[roleName] = newRole;
            }
        }

        var currentUserRoles = await dbContext.UserRoles
            .Where(ur => ur.UserId == userId)
            .ToListAsync(cancellationToken);

        var localUserRoles = dbContext.UserRoles.Local
            .Where(ur => ur.UserId == userId)
            .ToList();

        var rolesToRemove = currentUserRoles.Concat(localUserRoles).Distinct().ToList();
        if (rolesToRemove.Count > 0)
        {
            dbContext.UserRoles.RemoveRange(rolesToRemove);
        }

        foreach (var roleName in targetRoleNames)
        {
            var roleEntity = roleByName[roleName];
            dbContext.UserRoles.Add(new IdentityUserRole<string>
            {
                UserId = userId,
                RoleId = roleEntity.Id
            });
        }

        return targetRoleNames.ToList();
    }

    public static List<string> GetFallbackRoles(string? email)
    {
        if (!string.IsNullOrWhiteSpace(email) && email.Contains("admin", StringComparison.OrdinalIgnoreCase))
        {
            return [Admin, Author, User];
        }

        return [Author, User];
    }

    private static List<string> OrderRoles(IEnumerable<string> roles)
    {
        var distinct = roles
            .Select(NormalizeRoleName)
            .Where(r => r != null)
            .Select(r => r!)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        return SupportedRoles
            .Where(sr => distinct.Contains(sr, StringComparer.OrdinalIgnoreCase))
            .ToList();
    }
}

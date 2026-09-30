using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Common.Interfaces;

/// <summary>
/// Abstraction của DbContext ở tầng Application.
/// 
/// Mục đích:
/// - Tách Application layer khỏi EF Core implementation cụ thể.
/// - Giúp handler/query/service chỉ phụ thuộc vào interface.
/// - Dễ test bằng mock/fake khi viết unit test.
/// </summary>
public interface IApplicationDbContext
{
    DbSet<RefreshToken> RefreshTokens { get; }
    /// <summary>
    /// Tập hợp Category để truy vấn và thao tác dữ liệu.
    /// </summary>
    DbSet<Category> Categories { get; }

    /// <summary>
    /// Tập hợp Recipe để truy vấn và thao tác dữ liệu.
    /// </summary>
    DbSet<Recipe> Recipes { get; }

    /// <summary>
    /// Tập hợp RecipeStep để truy vấn và thao tác dữ liệu.
    /// </summary>
    DbSet<RecipeStep> RecipeSteps { get; }

    /// <summary>
    /// Tập hợp RecipeIngredient để truy vấn và thao tác dữ liệu.
    /// </summary>
    DbSet<RecipeIngredient> RecipeIngredients { get; }

    /// <summary>
    /// Tập hợp RecipeImage để truy vấn và thao tác dữ liệu.
    /// </summary>
    DbSet<RecipeImage> RecipeImages { get; }

    /// <summary>
    /// Lưu toàn bộ thay đổi đang được tracking xuống database bất đồng bộ.
    /// </summary>
    /// <param name="cancellationToken">Token hủy tác vụ từ HTTP request hoặc pipeline.</param>
    /// <returns>Số lượng bản ghi bị ảnh hưởng.</returns>
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
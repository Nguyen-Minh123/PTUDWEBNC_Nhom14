namespace CulinaryBlog.Application.Common.Security;

using CulinaryBlog.Application.Common.Interfaces;

/// <summary>
/// Helper dùng chung để kiểm tra quyền của người dùng hiện tại.
/// </summary>
public static class CurrentUserAuthorization
{
    /// <summary>
    /// Kiểm tra người dùng hiện tại có quyền quản lý recipe hay không.
    /// Có quyền nếu:
    /// - là Admin, hoặc
    /// - là chính tác giả của recipe.
    /// </summary>
    public static bool CanManageRecipe(ICurrentUserService currentUser, string authorId)
    {
        if (!currentUser.IsAuthenticated)
        {
            return false;
        }

        if (currentUser.IsInRole("Admin"))
        {
            return true;
        }

        return string.Equals(currentUser.UserId, authorId, StringComparison.Ordinal);
    }
}
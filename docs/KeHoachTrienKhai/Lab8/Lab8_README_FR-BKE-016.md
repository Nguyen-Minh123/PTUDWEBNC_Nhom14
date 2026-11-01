# Kế Hoạch & Báo Cáo Triển Khai Task `FR-BKE-016`: Xây dựng API Quản lý Người dùng & Tác giả (`/api/v1/users`)

- **Thành viên phụ trách**: Nguyễn Nhất Minh (`2312690`)
- **Nhánh làm việc**: `2312690-Minh`
- **Giai đoạn**: Lab 8 (Tuần 8)
- **Trạng thái**: ✅ Hoàn thành (Done)

---

## 1. Mục tiêu nhiệm vụ
Xây dựng hệ thống RESTful API quản lý người dùng và danh sách tác giả ẩm thực tuân thủ kiến trúc Clean Architecture + CQRS (MediatR):
1. **`GET /api/v1/users`** (`AdminOnly`): Truy vấn danh sách người dùng có phân trang (`PagedResult<UserListItemDto>`), tìm kiếm theo tên hiển thị/họ tên/email, lọc theo vai trò (`Admin`, `Author`, `User`) và trạng thái hoạt động (`isActive`), đồng thời thống kê tổng số công thức (`recipeCount`) và số công thức đã xuất bản (`publishedRecipeCount`) của từng người dùng.
2. **`GET /api/v1/users/authors`** (`AllowAnonymous`): Truy vấn công khai danh sách các đầu bếp / tác giả ẩm thực (`PagedResult<AuthorSummaryDto>`) kèm số lượng bài viết đã đóng góp, hỗ trợ tìm kiếm theo tên/tiểu sử và sắp xếp theo số lượng công thức.
3. **`GET /api/v1/users/{id}`** (`AllowAnonymous`): Truy vấn thông tin chi tiết của một người dùng / tác giả theo ID.
4. **Khắc phục triệt để các lỗi tồn đọng từ các Lab trước**:
   - Chuẩn hóa encoding UTF-8 và sửa lỗi nội suy chuỗi (`string interpolation`) trong `ApplicationUser.cs`.
   - Đồng bộ hóa JWT Claim `"role"` & `ClaimTypes.Role` cũng như `Issuer`/`Audience` giữa `JwtService.cs`, `CurrentUserService.cs` và `Program.cs`.
   - Mở rộng `IApplicationDbContext` với `Roles` (`AspNetRoles`) và `UserRoles` (`AspNetUserRoles`), xây dựng `UserRoleHelper` để phân giải vai trò thực tế từ cơ sở dữ liệu thay vì hardcode.

---

## 2. Các tệp tin đã tạo mới / cập nhật
- `src/backend/src/CulinaryBlog.Domain/Entities/ApplicationUser.cs`: Chuẩn hóa UTF-8, bổ sung thuộc tính `IsLockedOut`, hoàn thiện `Activate()` và `Deactivate()`.
- `src/backend/src/CulinaryBlog.Application/Common/Interfaces/IApplicationDbContext.cs`: Bổ sung `DbSet<IdentityRole<string>> Roles` và `DbSet<IdentityUserRole<string>> UserRoles`.
- `src/backend/src/CulinaryBlog.Application/Common/Security/UserRoleHelper.cs`: Helper phân giải và gán vai trò RBAC (`Admin`, `Author`, `User`) tránh lỗi N+1 query.
- `src/backend/src/CulinaryBlog.Application/DTOs/UserManagementDtos.cs`: Định nghĩa `UserListItemDto` và `AuthorSummaryDto`.
- `src/backend/src/CulinaryBlog.Application/Features/Users/Queries/GetUsers/GetUsersQuery.cs` & `GetUsersQueryHandler.cs`.
- `src/backend/src/CulinaryBlog.Application/Features/Users/Queries/GetAuthors/GetAuthorsQuery.cs` & `GetAuthorsQueryHandler.cs`.
- `src/backend/src/CulinaryBlog.Application/Features/Users/Queries/GetUserById/GetUserByIdQuery.cs` & `GetUserByIdQueryHandler.cs`.
- `src/backend/src/CulinaryBlog.API/Endpoints/UserEndpoints.cs`: Đăng ký các Minimal API endpoints `/api/v1/users`, `/api/v1/users/authors`, `/api/v1/users/{id}`.

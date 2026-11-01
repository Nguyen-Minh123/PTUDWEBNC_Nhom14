# Kế Hoạch & Báo Cáo Triển Khai Task `FR-BKE-017`: Xây dựng API Phân quyền & Khóa tài khoản cho Admin

- **Thành viên phụ trách**: Nguyễn Nhất Minh (`2312690`)
- **Nhánh làm việc**: `2312690-Minh`
- **Giai đoạn**: Lab 8 (Tuần 8)
- **Trạng thái**: ✅ Hoàn thành (Done)

---

## 1. Mục tiêu nhiệm vụ
Xây dựng các endpoints quản trị bảo mật dành riêng cho `Admin` (`RequireAuthorization("AdminOnly")`):
1. **`PUT /api/v1/users/{id}/role`**: Thay đổi quyền hạn (`Admin`, `Author`, `User`) của người dùng trong bảng `AspNetUserRoles`, cập nhật `SecurityStamp`, và tích hợp cơ chế bảo vệ chống tự hạ quyền Admin (`Self-demotion Guard`).
2. **`PUT /api/v1/users/{id}/status`**: Kích hoạt (`isActive = true`) hoặc khóa tài khoản (`isActive = false`, cập nhật `LockoutEnd`), tích hợp cơ chế bảo vệ chống tự khóa tài khoản (`Self-lockout Guard`), đồng thời **thu hồi tức thì toàn bộ phiên đăng nhập (`RefreshTokens`)** của người dùng bị khóa (`IsRevoked = true`).
3. **Kiểm thử tự động (Unit Tests)**: Bổ sung bộ kiểm thử `UserManagementTests.cs` kiểm chứng đầy đủ các kịch bản phân trang, lọc, phân quyền, khóa/mở khóa tài khoản và thu hồi RefreshToken.

---

## 2. Các tệp tin đã tạo mới / cập nhật
- `src/backend/src/CulinaryBlog.Application/Features/Users/Commands/UpdateUserRole/UpdateUserRoleCommand.cs`, `UpdateUserRoleCommandValidator.cs`, `UpdateUserRoleCommandHandler.cs`.
- `src/backend/src/CulinaryBlog.Application/Features/Users/Commands/UpdateUserStatus/UpdateUserStatusCommand.cs`, `UpdateUserStatusCommandValidator.cs`, `UpdateUserStatusCommandHandler.cs`.
- `src/backend/src/CulinaryBlog.API/Endpoints/UserEndpoints.cs`: Đăng ký `PUT /api/v1/users/{id}/role` và `PUT /api/v1/users/{id}/status`.
- `src/backend/tests/CulinaryBlog.UnitTests/Users/UserManagementTests.cs`: Bộ Unit Tests kiểm thử `FR-BKE-016` và `FR-BKE-017`.
- `src/backend/culinary-blog.http`: Bổ sung các kịch bản kiểm thử HTTP cho `/api/v1/users`, `/api/v1/users/authors`, `/api/v1/users/{id}/role`, `/api/v1/users/{id}/status`.

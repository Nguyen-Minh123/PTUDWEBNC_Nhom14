# Kế hoạch & Báo cáo Triển khai Task FR-BKE-014 (Lab 7)

- **Thành viên phụ trách:** Nguyễn Nhất Minh (2312690-Minh)
- **Vai trò:** Trưởng nhóm / Backend
- **Mã Task:** `FR-BKE-014`
- **Tên Task:** Hiện thực hóa API Quên mật khẩu & Đổi mật khẩu (Identity Reset/Change Password)

---

## 1. Mục tiêu
Hiện thực hóa trọn vẹn cụm tính năng quản lý mật khẩu bảo mật cao cho Culinary Blog:
1. **Quên mật khẩu (`forgot-password`):** Tạo mã Token khôi phục mật khẩu bảo mật (HMAC-SHA256 kèm TTL 15 phút), tự động vô hiệu hóa sau khi đổi hoặc khi `SecurityStamp` thay đổi. Chống user enumeration theo khuyến nghị OWASP.
2. **Đặt lại mật khẩu (`reset-password`):** Kiểm tra tính hợp lệ của token, áp dụng bộ kiểm tra độ phức tạp mật khẩu bằng FluentValidation (chữ hoa, chữ thường, số, ký tự đặc biệt), cập nhật password hash, xoay vòng `SecurityStamp` và thu hồi toàn bộ Refresh Token của tài khoản.
3. **Đổi mật khẩu (`change-password`):** Endpoint yêu cầu đăng nhập (`[Authorize]`), kiểm tra mật khẩu hiện tại, bắt buộc mật khẩu mới khác mật khẩu cũ, cập nhật password hash mới và thu hồi các refresh token cũ.

---

## 2. Các Endpoint API được bổ sung

| Phương thức | Đường dẫn Endpoint | Xác thực | Rate Limit | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/forgot-password` | Anonymous | 5 req/phút | Yêu cầu mã token đặt lại mật khẩu |
| `POST` | `/api/v1/auth/reset-password` | Anonymous | 5 req/phút | Đặt lại mật khẩu mới với token khôi phục |
| `POST` | `/api/v1/auth/change-password` | Bearer Token | Mặc định | Đổi mật khẩu cho người dùng hiện tại |

---

## 3. Kiến trúc & Các thành phần đã triển khai
1. **Application Layer:**
   - `IPasswordResetTokenService`: Hợp đồng dịch vụ sinh và kiểm thực token một lần.
   - `ForgotPasswordCommand`, `ForgotPasswordCommandValidator`, `ForgotPasswordCommandHandler`.
   - `ResetPasswordCommand`, `ResetPasswordCommandValidator`, `ResetPasswordCommandHandler`.
   - `ChangePasswordCommand`, `ChangePasswordCommandValidator`, `ChangePasswordCommandHandler`.
   - DTOs: `ForgotPasswordResponseDto`, `AuthMessageResponseDto`.
2. **Infrastructure Layer:**
   - `PasswordResetTokenService`: Hiện thực HMAC-SHA256, URL-safe Base64 token mã hóa `UserId`, `ExpiryTimestamp`, `Signature` gắn chặt với `SecurityStamp`.
3. **API Layer:**
   - Map 3 endpoints trong `AuthEndpoints.cs`.
   - Cập nhật `GlobalExceptionHandler.cs` chuẩn hóa RFC 7807 ProblemDetails khi phát sinh lỗi `FluentValidation.ValidationException`.
4. **Kiểm thử (Unit Tests):**
   - Bộ 6 kịch bản kiểm thử tự động trong `CulinaryBlog.UnitTests/Auth/AuthPasswordTests.cs`.
   - Kịch bản kiểm thử HTTP trong `culinary-blog.http` (scenarios 16, 17, 18).

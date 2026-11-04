# Kế hoạch & Báo cáo Triển khai Task FR-FTE-033 (Lab 7)

- **Thành viên phụ trách:** Nguyễn Nhất Minh (2312690-Minh)
- **Vai trò:** Trưởng nhóm / Backend & Core Auth
- **Mã Task:** `FR-FTE-033`
- **Tên Task:** Xây dựng giao diện và tích hợp API Đổi mật khẩu (Change Password)

---

## 1. Mục tiêu
Cung cấp tính năng đổi mật khẩu cho người dùng đã đăng nhập để nâng cao mức độ an toàn tài khoản:
1. **Tích hợp vào Dashboard:** Thêm thẻ điều hướng và tab "Đổi Mật Khẩu & Bảo Mật" (`/dashboard?tab=security`) trong khu vực quản trị cá nhân.
2. **Form Đổi mật khẩu bảo mật cao:**
   - Trường nhập *Mật khẩu hiện tại* (kèm nút ẩn/hiện).
   - Trường nhập *Mật khẩu mới* (kèm thanh đo độ mạnh mật khẩu và kiểm tra không trùng mật khẩu cũ).
   - Trường *Xác nhận mật khẩu mới* (kiểm tra khớp dữ liệu).
3. **Kết nối API & Quản lý phiên:**
   - Gửi yêu cầu tới `POST /api/v1/auth/change-password` kèm Authorization Bearer token.
   - Khi thành công: hiển thị thông báo Toast thành công, tự động thu hồi phiên làm việc (`clearSession()`) và chuyển hướng về `/login` sau 1.5 giây.

---

## 2. Các thành phần đã triển khai
- **`app/(dashboard)/dashboard/page.tsx`:** Tích hợp tab `security` cùng form đổi mật khẩu và xử lý gọi API.
- **`app/(dashboard)/layout.tsx`:** Bổ sung mục điều hướng `Đổi Mật Khẩu & Bảo Mật` trên Sidebar và Menu Mobile.
- **`services/authService.ts`:** Bổ sung phương thức `changePassword(payload, token)`.
- **`types/auth.dto.ts`:** Khai báo kiểu `ChangePasswordRequestDto`.

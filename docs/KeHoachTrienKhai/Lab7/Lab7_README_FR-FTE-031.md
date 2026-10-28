# Kế hoạch & Báo cáo Triển khai Task FR-FTE-031 (Lab 7)

- **Thành viên phụ trách:** Nguyễn Nhất Minh (2312690-Minh)
- **Vai trò:** Trưởng nhóm / Backend & Core Auth
- **Mã Task:** `FR-FTE-031`
- **Tên Task:** Hoàn thiện tích hợp API Đăng nhập, Đăng ký & Đăng xuất trên Frontend

---

## 1. Mục tiêu
Kết nối hoàn chỉnh luồng xác thực người dùng trên giao diện người dùng Next.js 16 App Router với Backend .NET 10:
1. **Đăng nhập (`/login`):** Gửi thông tin đăng nhập đến `POST /api/v1/auth/login`, đồng bộ token và thông tin người dùng vào Zustand `useAuthStore` và NextAuth session, xử lý chuyển hướng về trang trước đó (`callbackUrl`) hoặc `/dashboard`.
2. **Đăng ký (`/register`):** Tiếp nhận thông tin từ form Đăng ký, kiểm tra tính hợp lệ bằng React Hook Form / client validation, gọi API `POST /api/v1/auth/register`, tự động lưu phiên xác thực và thông báo thành công.
3. **Đăng xuất (`Logout`):** Tích hợp nút Đăng xuất trên cả Header chính và Sidebar Dashboard; gọi API `POST /api/v1/auth/logout` để thu hồi (revoke) Refresh Token ở Backend, xóa toàn bộ state trong Zustand `clearSession()` và hoàn tất qua NextAuth `signOut({ callbackUrl: '/login' })`.

---

## 2. Các thành phần đã triển khai
- **`services/authService.ts`:**
  - Hoàn thiện các phương thức `login`, `register`, `logout`.
  - Chuẩn hóa việc bắt và ném lỗi HTTP (400, 401, 409) để giao diện hiển thị chi tiết mã lỗi chuẩn RFC 7807 (Problem Details).
- **`app/(auth)/login/page.tsx`:** Tích hợp form đăng nhập với cơ chế lưu token và báo lỗi trực quan.
- **`app/(auth)/register/page.tsx`:** Tích hợp form đăng ký với thước đo độ mạnh mật khẩu và xử lý lỗi trùng email (Conflict).
- **`components/layout/Header.tsx`:** Tích hợp nút Đăng xuất tại menu dropdown hồ sơ; đồng bộ hiển thị avatar từ `auth-store` và `session`.
- **`app/(dashboard)/layout.tsx`:** Bổ sung nút Đăng xuất ở chân Sidebar và Menu Mobile.

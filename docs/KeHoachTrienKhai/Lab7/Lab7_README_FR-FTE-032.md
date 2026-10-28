# Kế hoạch & Báo cáo Triển khai Task FR-FTE-032 (Lab 7)

- **Thành viên phụ trách:** Nguyễn Nhất Minh (2312690-Minh)
- **Vai trò:** Trưởng nhóm / Backend & Core Auth
- **Mã Task:** `FR-FTE-032`
- **Tên Task:** Xây dựng giao diện và tích hợp API Quên mật khẩu (Forgot/Reset Password)

---

## 1. Mục tiêu
Xây dựng luồng khôi phục tài khoản hoàn chỉnh cho người dùng khi quên mật khẩu:
1. **Trang Quên mật khẩu (`/forgot-password`):** Cung cấp form nhập Email, gửi yêu cầu tới API `POST /api/v1/auth/forgot-password`. Trong môi trường thử nghiệm (Development), hỗ trợ nhận và hiển thị mã token kèm nút 1-Click chuyển tiếp sang trang đặt lại mật khẩu.
2. **Trang Đặt lại mật khẩu (`/reset-password`):** Tự động điền email và token từ Query parameters; cung cấp form nhập mật khẩu mới, kiểm tra độ phức tạp của mật khẩu thời gian thực (Password Strength Meter); gửi dữ liệu tới `POST /api/v1/auth/reset-password`.

---

## 2. Các thành phần đã triển khai
- **`app/(auth)/forgot-password/page.tsx`:** Giao diện thẻ hiện đại với icon `KeyRound`, hỗ trợ kiểm thử tiện lợi.
- **`app/(auth)/reset-password/page.tsx`:** Giao diện nhập token và mật khẩu mới bọc trong `<Suspense>`, có thanh đo bảo mật mật khẩu và nút ẩn/hiện mật khẩu.
- **`services/authService.ts`:** Bổ sung phương thức `forgotPassword(email)` và `resetPassword(payload)`.
- **`types/auth.dto.ts`:** Bổ sung định nghĩa kiểu `ForgotPasswordRequestDto`, `ForgotPasswordResponseDto`, `ResetPasswordRequestDto`.

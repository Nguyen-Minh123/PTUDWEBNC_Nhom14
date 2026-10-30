# Lab 6 - README - FR-FTE-023

## [FR-FTE-023] Cài đặt store quản lý trạng thái xác thực `auth-store.ts` (Zustand)

### 1) Mục tiêu
- Tập trung hóa trạng thái xác thực ở phía client.
- Giảm việc đọc session rải rác trong nhiều component.
- Chuẩn hóa các trạng thái: `isAuthenticated`, `user`, `roles`, `accessToken`, `status`.
- Hỗ trợ các thao tác cơ bản: `login`, `logout`, `setUser`, `hydrate`, `clearAuth`.
- Giữ đúng ranh giới: **store chỉ quản lý trạng thái**, không thay thế xác thực/ phân quyền ở backend.

### 2) Ma trận quyền đã được xác nhận
| Vai trò | Trạng thái xác thực | Quyền UI chính | Ghi chú |
|---|---|---|---|
| Guest | Chưa đăng nhập | Xem trang công khai, vào đăng nhập/đăng ký | Không có quyền quản trị |
| Author | Đã đăng nhập | Vào Dashboard, tạo/sửa/xóa công thức của mình | Quyền thao tác nội dung cá nhân |
| Admin | Đã đăng nhập | Toàn quyền như Author + quản lý hệ thống | Có thêm quyền quản trị danh mục và nội dung |

**Kết luận:** `auth-store` chỉ lưu trạng thái và role hiện hành; quyết định truy cập cuối cùng vẫn phải được backend và middleware xác nhận.

### 3) Hiện trạng đã kiểm tra
- Dự án đã có các khu vực liên quan đến xác thực và điều hướng:
  - `auth.ts`
  - `middleware.ts`
  - `components/layout/Navbar.tsx`
  - `app/(dashboard)/dashboard/page.tsx`
  - `app/(dashboard)/dashboard/DashboardPage.tsx`
- Giao diện hiện đang đọc session trực tiếp ở một số nơi.
- Chưa có một store xác thực trung tâm để đồng bộ trạng thái giữa Navbar, Dashboard và các trang bảo vệ.
- Có nhu cầu rõ ràng về một nguồn dữ liệu thống nhất để:
  - hiển thị menu theo vai trò,
  - xử lý logout,
  - đồng bộ sau khi đăng nhập/cập nhật hồ sơ,
  - giảm lỗi lệch trạng thái giữa các component.

### 4) Kế hoạch triển khai
1. Tạo `auth-store.ts` bằng Zustand.
2. Khai báo state tối thiểu:
   - `user`
   - `roles`
   - `accessToken`
   - `refreshToken` nếu dự án đang dùng
   - `isAuthenticated`
   - `status` (`loading | authenticated | unauthenticated`)
3. Tạo actions:
   - `setAuth`
   - `setUser`
   - `setTokens`
   - `clearAuth`
   - `hydrateAuth`
4. Đồng bộ với nguồn xác thực hiện có:
   - NextAuth session hoặc API auth hiện tại.
5. Cập nhật các component đang đọc session trực tiếp:
   - `Navbar.tsx`
   - `DashboardPage.tsx`
   - các guard nếu có
6. Kiểm tra vòng đời:
   - đăng nhập
   - refresh trang
   - đổi role
   - logout
   - truy cập route bảo vệ

### 5) File dự kiến thay đổi
- `src/store/auth-store.ts`
- `src/components/layout/Navbar.tsx`
- `src/app/(dashboard)/dashboard/DashboardPage.tsx`
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/services/authService.ts` nếu cần đồng bộ phản hồi đăng nhập
- `src/types/auth.dto.ts` nếu cần chuẩn hóa kiểu dữ liệu session/user

### 6) Kiểm tra và ghi nhận
- Kiểm tra `isAuthenticated` sau khi đăng nhập thành công.
- Kiểm tra `clearAuth` sau khi logout.
- Kiểm tra render của Navbar theo từng role.
- Kiểm tra refresh trang vẫn giữ đúng trạng thái auth.
- Kiểm tra route `/dashboard` chỉ hiển thị đúng khi đã xác thực.
- Ghi nhận console/network để tránh trạng thái UI lệch với session thực.

### 7) Trạng thái
- **Đang triển khai**
- Mức độ hoàn thành: **khoảng 85%**
- Phần còn lại tập trung vào đồng bộ tích hợp và kiểm thử thực tế.

### 8) Giải thích code để trình bày
- **Vì sao dùng Zustand:** nhẹ, nhanh, ít boilerplate, phù hợp quản lý state client.
- **Vì sao tách auth-store:** tránh lặp logic đọc session ở nhiều component.
- **Vì sao không nhét authorization vào store:** quyền truy cập thật phải được backend/middleware xác nhận.
- **Ý nghĩa của `hydrateAuth`:** giúp khôi phục trạng thái sau khi reload trang.
- **Ý nghĩa của `clearAuth`:** đảm bảo logout xóa sạch trạng thái cũ và tránh hiển thị sai UI.
- **Ý nghĩa của `status`:** cho phép UI phân biệt đang tải, đã đăng nhập hay chưa.

### 9) Câu hỏi giáo viên có thể hỏi
1. Vì sao không dùng `useState` thay cho Zustand?
2. `auth-store` khác gì với session của NextAuth?
3. Store có nên lưu access token không? Vì sao?
4. Vì sao vẫn cần `middleware.ts` dù đã có auth-store?
5. Làm thế nào để tránh trạng thái UI sai sau khi refresh?
6. Khi đổi role từ Author sang Admin, store cập nhật thế nào?
7. Nếu token hết hạn, store xử lý ra sao?
8. Vì sao `auth-store` không được dùng để quyết định quyền cuối cùng?

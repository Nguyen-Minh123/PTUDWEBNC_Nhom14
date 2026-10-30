# Lab 6 - README - FR-FTE-024

## [FR-FTE-024] Cài đặt store quản lý giao diện người dùng `ui-store.ts` (Zustand)

### 1) Mục tiêu
- Tập trung hóa các trạng thái giao diện ở phía client.
- Giảm việc truyền props qua nhiều tầng component.
- Chuẩn hóa các trạng thái UI dùng chung như:
  - `sidebarOpen`
  - `dropdownOpen`
  - `modalOpen`
  - `theme`
  - `loading`
  - `toast`
- Đảm bảo giao diện phản hồi nhất quán giữa các trang như Navbar, Dashboard và các màn hình quản trị.

### 2) Ma trận quyền đã được xác nhận
| Vai trò | Quyền UI chính | Ghi chú |
|---|---|---|
| Guest | Xem giao diện công khai, mở/đóng menu, xem thông báo UI | Không có quyền thao tác quản trị |
| Author | Dùng các thành phần UI của Dashboard, form, toast, modal | Chỉ thao tác trong phạm vi nội dung của mình |
| Admin | Dùng toàn bộ UI như Author + khu vực quản trị | Có thể truy cập thêm các màn hình quản trị |

**Kết luận:** `ui-store` không quyết định quyền truy cập, mà chỉ điều khiển trạng thái hiển thị giao diện theo vai trò đã được xác thực.

### 3) Hiện trạng đã kiểm tra
- Dự án hiện có các component liên quan trực tiếp đến UI:
  - `components/layout/Navbar.tsx`
  - `components/dashboard/Toast.tsx`
  - `components/dashboard/LoadingState.tsx`
  - `components/dashboard/DashboardTabs.tsx`
  - `components/dashboard/RecipeFilterBar.tsx`
- Một số trạng thái UI đang được quản lý nội bộ trong từng component.
- Chưa có store trung tâm để đồng bộ các trạng thái mở/đóng, loading, toast hoặc modal.
- Nhu cầu thực tế:
  - đóng/mở dropdown ổn định,
  - hiển thị toast dùng chung,
  - đồng bộ loading state,
  - hỗ trợ mở rộng theme hoặc sidebar sau này.

### 4) Kế hoạch triển khai
1. Tạo `ui-store.ts` bằng Zustand.
2. Khai báo state tối thiểu:
   - `sidebarOpen`
   - `dropdownOpen`
   - `modalOpen`
   - `loading`
   - `toast`
   - `theme`
3. Tạo actions:
   - `toggleSidebar`
   - `setSidebarOpen`
   - `toggleDropdown`
   - `setDropdownOpen`
   - `openModal`
   - `closeModal`
   - `setLoading`
   - `showToast`
   - `hideToast`
   - `setTheme`
4. Tách các state đang nằm rải rác trong component về store.
5. Đồng bộ UI giữa:
   - Navbar
   - Dashboard
   - Loading/Toast components
6. Kiểm tra khả năng tái sử dụng cho các trang khác trong tương lai.

### 5) File dự kiến thay đổi
- `src/store/ui-store.ts`
- `src/components/layout/Navbar.tsx`
- `src/components/dashboard/Toast.tsx`
- `src/components/dashboard/LoadingState.tsx`
- `src/app/(dashboard)/dashboard/DashboardPage.tsx`
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/components/dashboard/DashboardTabs.tsx` nếu cần điều khiển UI chung

### 6) Kiểm tra và ghi nhận
- Kiểm tra đóng/mở dropdown trong Navbar.
- Kiểm tra hiển thị toast từ nhiều nơi khác nhau.
- Kiểm tra loading state khi tải dữ liệu dashboard.
- Kiểm tra modal hoặc sidebar nếu được bổ sung sau này.
- Ghi nhận console và hành vi UI khi chuyển trang hoặc reload.

### 7) Trạng thái
- **Đang triển khai**
- Mức độ hoàn thành dự kiến: **80%**
- Phần còn lại là tích hợp vào component thực tế và kiểm thử hành vi hiển thị.

### 8) Giải thích code để trình bày
- **Vì sao dùng Zustand:** gọn, dễ dùng, phù hợp quản lý UI state toàn cục.
- **Vì sao tách `ui-store`:** tránh lặp lại logic open/close trong nhiều component.
- **Vì sao không gộp vào auth-store:** UI state và auth state có vòng đời khác nhau.
- **Ý nghĩa của `toast` trong store:** giúp hiển thị thông báo thống nhất ở nhiều màn hình.
- **Ý nghĩa của `loading`:** cho phép đồng bộ trạng thái chờ khi fetch dữ liệu hoặc chuyển trang.
- **Ý nghĩa của `theme`/`sidebarOpen`:** tạo nền cho mở rộng giao diện sau này.

### 9) Câu hỏi giáo viên có thể hỏi
1. Vì sao không giữ state UI ngay trong từng component?
2. `ui-store` khác gì `auth-store`?
3. Có nên lưu mọi trạng thái UI vào store không? Vì sao?
4. `toast` trong store xử lý đồng bộ như thế nào?
5. Khi chuyển trang thì `dropdownOpen` có nên giữ nguyên không?
6. Store này có làm tăng độ phức tạp của dự án không?
7. Làm sao để tránh store bị phình to khi thêm nhiều UI state?
8. Khi nào nên dùng local state thay vì Zustand?

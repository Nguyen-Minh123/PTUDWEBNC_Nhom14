# Lab 6 - README - FR-FTE-026

## [FR-FTE-026] Thiết kế giao diện tĩnh Trang Dashboard quản trị cá nhân

### 1) Mục tiêu
- Xây dựng giao diện tĩnh cho Dashboard cá nhân theo mô hình card-based.
- Trình bày rõ các khối: banner, thống kê, danh sách công thức, bộ lọc, hồ sơ cá nhân.
- Tách UI khỏi API để dễ kiểm thử và dễ mở rộng sau này.

### 2) Ma trận quyền đã được xác nhận
- Guest: không truy cập Dashboard.
- Author: truy cập Dashboard, quản lý hồ sơ và công thức của mình.
- Admin: toàn bộ quyền như Author, phù hợp mở rộng quản trị.

### 3) Hiện trạng đã kiểm tra
- Đã có route Dashboard theo Next.js App Router.
- Đã có các component nền:
  - DashboardPage
  - DashboardHeader
  - DashboardStats
  - DashboardTabs
  - RecipeFilterBar
  - RecipeGrid
  - RecipeCard
  - ProfileForm
  - Toast
  - LoadingState
- SRS xác nhận `/dashboard` là màn hình CSR bắt buộc cho Author/Admin.

### 4) Kế hoạch triển khai
1. Dựng khung Dashboard tĩnh.
2. Tách các khối giao diện thành component nhỏ.
3. Gắn dữ liệu mẫu để kiểm tra bố cục.
4. Chuẩn hóa loading, empty state, toast.
5. Kiểm tra điều hướng từ Navbar.
6. Chuẩn bị thay dữ liệu tĩnh bằng API/store.

### 5) File dự kiến thay đổi
- `src/frontend/src/app/(dashboard)/dashboard/page.tsx`
- `src/frontend/src/app/(dashboard)/dashboard/loading.tsx`
- `src/frontend/src/app/(dashboard)/dashboard/DashboardPage.tsx`
- `src/frontend/src/components/dashboard/DashboardHeader.tsx`
- `src/frontend/src/components/dashboard/DashboardStats.tsx`
- `src/frontend/src/components/dashboard/DashboardTabs.tsx`
- `src/frontend/src/components/dashboard/RecipeFilterBar.tsx`
- `src/frontend/src/components/dashboard/RecipeGrid.tsx`
- `src/frontend/src/components/dashboard/RecipeCard.tsx`
- `src/frontend/src/components/dashboard/ProfileForm.tsx`
- `src/frontend/src/components/dashboard/Toast.tsx`
- `src/frontend/src/components/dashboard/LoadingState.tsx`

### 6) Kiểm tra và ghi nhận
- Mở route `/dashboard`.
- Kiểm tra tab Công Thức / Hồ Sơ.
- Kiểm tra loading, empty state, toast.
- Kiểm tra nút tạo công thức mới và điều hướng từ Navbar.
- Ghi nhận lỗi layout nếu có trên mobile/desktop.

### 7) Trạng thái
- Đang hoàn thiện giao diện tĩnh.
- Mức độ hoàn thành ước tính: 90%.

### 8) Giải thích code để trình bày
- DashboardPage: component điều phối.
- DashboardHeader: banner chào mừng.
- DashboardStats: số liệu tổng quan.
- DashboardTabs: chuyển tab.
- RecipeFilterBar: lọc trạng thái công thức.
- RecipeGrid / RecipeCard: hiển thị danh sách công thức.
- ProfileForm: chỉnh sửa hồ sơ.
- Toast / LoadingState: phản hồi trạng thái UI.

### 9) Câu hỏi giáo viên có thể hỏi
1. Vì sao Dashboard nên thiết kế theo hướng card-based?
2. Vì sao cần tách DashboardPage thành nhiều component nhỏ?
3. Giao diện tĩnh khác gì giao diện có dữ liệu thật?
4. Vì sao `/dashboard` phải là CSR?
5. LoadingState và Toast giúp gì cho UX?
6. Khi nào nên thay dữ liệu mẫu bằng API thật?
7. Làm sao để Dashboard dễ mở rộng?
8. Vì sao form hồ sơ nên tách riêng?
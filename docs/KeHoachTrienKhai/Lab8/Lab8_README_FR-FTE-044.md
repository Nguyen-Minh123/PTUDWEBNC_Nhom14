# Kế Hoạch & Báo Cáo Triển Khai Task `FR-FTE-044`: Xây dựng Trang Quản trị Người dùng (`/dashboard/users`)

- **Thành viên phụ trách**: Nguyễn Nhất Minh (`2312690`)
- **Nhánh làm việc**: `2312690-Minh`
- **Giai đoạn**: Lab 8 (Tuần 8)
- **Trạng thái**: ✅ Hoàn thành (Done)

---

## 1. Mục tiêu nhiệm vụ
Xây dựng trang giao diện Quản trị Người dùng (`/dashboard/users`) dành cho `Admin`:
1. **Thống kê tổng quan (KPI Cards)**: Hiển thị tổng số tài khoản, số lượng Quản trị viên (`Admin`), số lượng Đầu bếp/Tác giả (`Author`), và số lượng tài khoản đang bị khóa (`Locked`).
2. **Tìm kiếm, Lọc & Phân trang**: Tìm kiếm theo tên hiển thị, họ tên hoặc email (kèm debounce 300ms), lọc theo vai trò (`Admin`, `Author`, `User`) và trạng thái (`Đang hoạt động`, `Đã khóa`), sắp xếp theo ngày tham gia hoặc số lượng công thức đóng góp.
3. **Thao tác Phân quyền & Khóa tài khoản**:
   - Hộp thoại (Modal) **Phân quyền người dùng** (`PUT /api/v1/users/{id}/role`) cho phép chọn giữa `Admin`, `Author`, `User` kèm giải thích quyền hạn rõ ràng.
   - Hộp thoại (Modal) **Khóa / Mở khóa tài khoản** (`PUT /api/v1/users/{id}/status`) cho phép chọn thời hạn khóa (7 ngày, 30 ngày, 90 ngày, vĩnh viễn), nhập lý do khóa và thông báo thu hồi tức thì toàn bộ phiên đăng nhập (`RefreshTokens`).
   - Tự động vô hiệu hóa nút tự hạ quyền hoặc tự khóa đối với tài khoản Admin đang đăng nhập.

---

## 2. Các tệp tin đã tạo mới / cập nhật
- `src/frontend/src/types/user.dto.ts` & `src/frontend/src/types/index.ts`: Định nghĩa các kiểu dữ liệu `UserListItemDto`, `AuthorSummaryDto`, `UserRoleType`, `GetUsersQueryParams`, `UpdateUserRoleRequestDto`, `UpdateUserStatusRequestDto`.
- `src/frontend/src/services/userService.ts`: Tích hợp API `/v1/users`, `/v1/users/authors`, `/v1/users/{id}/role`, `/v1/users/{id}/status`.
- `src/frontend/src/app/(dashboard)/dashboard/users/page.tsx`: Giao diện trang Quản trị Người dùng (`/dashboard/users`).
- `src/frontend/src/app/(dashboard)/layout.tsx`: Bổ sung liên kết điều hướng `Quản Lý Người Dùng` (`/dashboard/users`) trên Sidebar.

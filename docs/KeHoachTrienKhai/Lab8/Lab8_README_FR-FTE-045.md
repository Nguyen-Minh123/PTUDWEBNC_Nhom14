# Kế Hoạch & Báo Cáo Triển Khai Task `FR-FTE-045`: Xây dựng Trang Danh sách Tác giả ẩm thực (`/authors`)

- **Thành viên phụ trách**: Nguyễn Nhất Minh (`2312690`)
- **Nhánh làm việc**: `2312690-Minh`
- **Giai đoạn**: Lab 8 (Tuần 8)
- **Trạng thái**: ✅ Hoàn thành (Done)

---

## 1. Mục tiêu nhiệm vụ
Xây dựng trang công khai **Cộng đồng Đầu bếp & Tác giả Ẩm thực** (`/authors`) giới thiệu các đầu bếp sáng tạo của hệ thống Culinary Blog:
1. **Banner Cộng đồng & Thống kê**: Hiển thị tổng số đầu bếp/tác giả hoạt động và tổng số công thức nấu ăn đã được xuất bản.
2. **Tìm kiếm & Sắp xếp linh hoạt**: Hỗ trợ tìm kiếm tác giả theo tên hiển thị, tiểu sử hoặc email (kèm debounce 300ms) và sắp xếp theo số lượng công thức đã xuất bản (`-publishedRecipeCount`), thời gian gia nhập (`-joinedAt`), hoặc tên (`A → Z` / `Z → A`).
3. **Thẻ Tác giả (`Author Card`) & Modal Hồ sơ Chi tiết**:
   - Hiển thị ảnh đại diện, danh hiệu (`Master Chef`, `Đầu Bếp Sáng Tạo`, `Ban Biên Tập`), tiểu sử, số lượng công thức đã xuất bản và ngày tham gia.
   - Cho phép mở Modal xem hồ sơ chi tiết hoặc chuyển sang trang tìm kiếm các món ăn của tác giả đó.
4. **Cập nhật Thanh điều hướng (`Header.tsx`)**: Bổ sung mục **Đầu Bếp & Tác Giả** (`/authors`), **Danh Mục** (`/categories`) và lối tắt **Quản trị người dùng** (`/dashboard/users`).

---

## 2. Các tệp tin đã tạo mới / cập nhật
- `src/frontend/src/app/(main)/authors/page.tsx`: Giao diện trang Danh sách Tác giả ẩm thực công khai (`/authors`).
- `src/frontend/src/components/layout/Header.tsx`: Cập nhật thanh điều hướng chính với liên kết `/authors`, `/categories` và `/dashboard/users`.
- `TASKS.md`: Cập nhật danh sách và trạng thái hoàn thành nhiệm vụ Lab 8 của Nguyễn Nhất Minh (`FR-BKE-016`, `FR-BKE-017`, `FR-FTE-044`, `FR-FTE-045`).

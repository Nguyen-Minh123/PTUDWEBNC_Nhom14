# Kế hoạch triển khai Lab 8 — `FR-FTE-047`: Xây dựng Trang Quản trị Danh mục cho Admin (`/dashboard/categories`)

- **Thành viên phụ trách**: Nguyễn Thế Khải (`2312640`)
- **Nhánh triển khai**: `2312640-Khai`
- **Trạng thái**: ✅ Hoàn thành 100%

---

## 1. Mục tiêu nhiệm vụ
Xây dựng giao diện Quản trị Danh mục Ẩm thực dành riêng cho Admin tại đường dẫn `/dashboard/categories`:
1. Kiểm tra phân quyền `Admin` nghiêm ngặt phía Client & Server (`AdminOnly`).
2. Hiển thị thống kê tổng số danh mục, tổng số bài viết thuộc các danh mục và thanh tìm kiếm theo tên/slug/mô tả.
3. Hỗ trợ đầy đủ các thao tác CRUD danh mục:
   - **Thêm mới danh mục (`POST /api/v1/categories`)**: Tự động sinh `slug` chuẩn tiếng Việt không dấu từ tên danh mục, tích hợp `ImageUploader` để tải ảnh đại diện danh mục lên MinIO qua `POST /api/v1/media/upload`.
   - **Chỉnh sửa danh mục (`PUT /api/v1/categories/{id}`)**: Cập nhật tên, slug, thứ tự hiển thị (`orderIndex`), mô tả và ảnh đại diện.
   - **Xóa danh mục (`DELETE /api/v1/categories/{id}`)**: Xác nhận trước khi xóa và hiển thị cảnh báo nếu danh mục đang chứa công thức.

---

## 2. Các tệp tin chính đã thực hiện
- `culinary-blog/src/frontend/src/app/(dashboard)/dashboard/categories/page.tsx`
- `culinary-blog/src/frontend/src/app/(dashboard)/layout.tsx`

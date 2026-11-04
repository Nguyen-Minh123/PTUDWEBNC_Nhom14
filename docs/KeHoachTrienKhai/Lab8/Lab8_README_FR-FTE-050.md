# Lab 8 — FR-FTE-050: Xây dựng Trang Cập nhật / Chỉnh sửa Công thức (/recipes/[id]/edit) kèm RowVersion

## 1. Mục tiêu

Xây dựng trang giao diện cập nhật và chỉnh sửa công thức ẩm thực (`/recipes/[id]/edit`) theo kiến trúc Next.js App Router, cung cấp biểu mẫu quản trị toàn diện các trường thông tin (tổng quan, nguyên liệu, các bước, dinh dưỡng, hình ảnh) và tích hợp cơ chế kiểm soát đồng thời lạc quan (Optimistic Concurrency Control) thông qua `RowVersion` nhằm phát hiện và cảnh báo xung đột (HTTP 409 Conflict).

## 2. Phạm vi triển khai

- **Khởi tạo Route `/recipes/[id]/edit`**:
  - `culinary-blog/src/frontend/src/app/(dashboard)/recipes/[id]/edit/page.tsx`: Tiếp nhận `params.id`, nạp chi tiết công thức hiện tại bằng hook `useRecipeDetail`.
  - Hiển thị skeleton và thông báo lỗi khi công thức không tồn tại hoặc không thể tải dữ liệu.
- **Biểu mẫu chỉnh sửa toàn diện**:
  - Chỉnh sửa thông tin cơ bản: Tiêu đề, slug tùy chỉnh, mô tả, danh mục, độ khó, thời gian chuẩn bị và nấu, khẩu phần ăn.
  - Quản lý chỉ số dinh dưỡng 6 trường (Calories, Protein, Carbohydrates, Fat, Fiber, Sodium).
  - Quản trị động danh sách nguyên liệu: Thêm, sửa tên, số lượng, đơn vị, ghi chú và xóa.
  - Quản trị các bước nấu: Thêm bước, đổi tiêu đề, thời gian đếm ngược (timer), hướng dẫn chi tiết và xóa bước.
  - Quản trị thư viện ảnh: Tải thêm ảnh bằng `ImageUploader`, xóa ảnh đã lưu và chọn ảnh đại diện chính.
- **Xử lý Concurrency Token (`RowVersion`)**:
  - Nhận và lưu giữ giá trị `RowVersion` từ backend (.NET EF Core concurrency token).
  - Gửi kèm `RowVersion` trong payload gọi `PUT /api/v1/recipes/{id}`.
  - Khi phát hiện mã lỗi `HTTP 409 Concurrency Conflict`: Hiển thị khung cảnh báo màu đỏ nổi bật về xung đột dữ liệu phiên làm việc, kèm nút *"Tải lại dữ liệu mới nhất (Reload)"* để đồng bộ dữ liệu mới nhất từ máy chủ mà không làm mất trạng thái làm việc của người dùng.
- **Thanh tác vụ cố định (Sticky Action Bar)**:
  - Cung cấp nút Lưu thay đổi, Xuất bản ngay (khi đang ở bản nháp), Lưu trữ và Xóa mềm có xác nhận.

## 3. Danh sách file thay đổi và tạo mới

| STT | Đường dẫn file | Thao tác | Mô tả chi tiết |
| :---: | :--- | :---: | :--- |
| 1 | `culinary-blog/src/frontend/src/app/(dashboard)/recipes/[id]/edit/page.tsx` | Tạo mới | Giao diện trang chỉnh sửa công thức đầy đủ kèm cơ chế xử lý Concurrency Conflict (HTTP 409). |
| 2 | `culinary-blog/src/frontend/src/services/recipeManagementService.ts` | Cập nhật | Bổ sung phương thức `updateRecipe` hỗ trợ RowVersion và phát hiện lỗi 409 Conflict. |

## 4. Kiểm chứng kết quả

- Đóng gói thành công trang `/recipes/[id]/edit` dạng Server/Dynamic route (`ƒ`).
- Kiểm tra tính tương thích Concurrency Token với backend `UpdateRecipeCommandHandler.cs`.


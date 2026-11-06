# Lab 8 — FR-FTE-051: Xây dựng luồng chuyển đổi trạng thái công thức (Draft → Published → Archived / Deleted)

## 1. Mục tiêu

Xây dựng và hoàn thiện luồng chuyển đổi vòng đời công thức ẩm thực (`Draft` → `Published` → `Archived` / `Deleted`) trên toàn bộ hệ thống giao diện (Trang chi tiết `/recipes/[id]`, Bảng điều khiển tác giả `/dashboard`, Trang chỉnh sửa `/recipes/[id]/edit`), tuân thủ chặt chẽ các ràng buộc quy tắc nghiệp vụ Domain (Domain Rules).

## 2. Phạm vi triển khai

- **Ma trận chuyển đổi trạng thái (State Transition Matrix)**:
  - `Draft` → `Published`: Kiểm tra điều kiện bắt buộc tối thiểu 1 nguyên liệu và 1 bước thực hiện trước khi cho phép gọi API xuất bản (`POST /api/v1/recipes/{id}/publish`).
  - `Published` → `Archived`: Chuyển công thức vào kho lưu trữ (`POST /api/v1/recipes/{id}/archive`), ẩn khỏi trang chủ công khai nhưng vẫn hiển thị trong quản trị tác giả.
  - `Archived` → `Published`: Cho phép tái xuất bản trở lại khi tác giả muốn mở lại bài viết.
  - `Delete`: Thực hiện xóa mềm (`DELETE /api/v1/recipes/{id}`) với hộp thoại xác nhận trực quan nhằm chống thao tác vô ý của người dùng.
- **Hệ thống nhãn trạng thái (Status Badges)**:
  - `Draft`: Màu vàng cam (Amber / Vàng).
  - `Published`: Màu xanh lục (Emerald / Xanh lá).
  - `Archived`: Màu xám đá (Stone / Xám).
- **Tích hợp giao diện người dùng**:
  - `RecipeCard` trong Dashboard: Hiển thị đúng nhãn trạng thái, bổ sung nút *Sửa* liên kết tới `/recipes/[id]/edit`, các nút thao tác nhanh *Xuất bản*, *Lưu trữ*, *Tái xuất bản* và xác nhận *Xóa*.
  - `RecipeHero` tại trang chi tiết: Hiển thị huy hiệu trạng thái khi công thức chưa xuất bản công khai, bổ sung nút chuyển nhanh đến trang chỉnh sửa.
  - Thanh tác vụ tại trang Chỉnh sửa: Cung cấp đầy đủ các nút chuyển đổi trạng thái đồng bộ với backend.

## 3. Danh sách file thay đổi và tạo mới

| STT | Đường dẫn file | Thao tác | Mô tả chi tiết |
| :---: | :--- | :---: | :--- |
| 1 | `culinary-blog/src/frontend/src/components/dashboard/RecipeCard.tsx` | Cập nhật | Bổ sung nút Chỉnh sửa, cải tiến badge trạng thái và tích hợp xác nhận xóa mềm. |
| 2 | `culinary-blog/src/frontend/src/app/(dashboard)/recipes/[id]/edit/page.tsx` | Cập nhật | Tích hợp các nút chuyển đổi trạng thái trực tiếp trên thanh lưu trữ. |
| 3 | `culinary-blog/src/frontend/src/components/recipe-detail/RecipeHero.tsx` | Cập nhật | Bổ sung nhãn trạng thái và nút chuyển hướng Chỉnh sửa công thức. |
| 4 | `culinary-blog/src/frontend/src/services/recipeManagementService.ts` | Cập nhật | Đồng bộ phương thức `publishRecipe`, `archiveRecipe`, `deleteRecipe`. |

## 4. Kiểm chứng kết quả

- Thử nghiệm các thao tác xuất bản, lưu trữ và xóa đều hoạt động chính xác với cả backend thực tế và bộ nhớ cục bộ fallback.


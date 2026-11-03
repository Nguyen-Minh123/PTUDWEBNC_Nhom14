# Lab 8 — FR-FTE-049: Hoàn thiện Trang Thêm mới Công thức (/recipes/new) tích hợp Upload ảnh thực tế

## 1. Mục tiêu

Nâng cấp và hoàn thiện trang Tạo công thức mới (`/recipes/new` / `(dashboard)/recipes/new`) với quy trình Wizard 4 bước trực quan, tích hợp sâu linh kiện `ImageUploader` hỗ trợ kéo thả tệp, kiểm tra định dạng/dung lượng (JPEG, PNG, WEBP, tối đa 5MB) và tải lên đa tệp hình ảnh thực tế lên hệ thống lưu trữ backend/MinIO.

## 2. Phạm vi triển khai

- **Tích hợp linh kiện `ImageUploader` vào Bước 4**:
  - Hỗ trợ tải lên đa tệp hình ảnh (tối đa 10 ảnh) từ thiết bị của người dùng với tính năng kéo thả trực quan.
  - Kiểm tra và xác thực ràng buộc định dạng ảnh (`image/jpeg`, `image/png`, `image/webp`) và giới hạn dung lượng 5MB mỗi tệp theo SRS.
  - Cho phép người dùng linh hoạt lựa chọn ảnh đại diện chính (`primaryImageId`) cho công thức.
  - Hỗ trợ fallback URL ảnh trực tiếp khi cần thiết.
- **Bổ sung các chỉ số dinh dưỡng (FR-DVO-002)**:
  - Cho phép người dùng nhập 6 chỉ số dinh dưỡng: Calories, Protein, Carbohydrates, Fat, Fiber, Sodium ngay tại bước 1.
- **Hoàn thiện kết nối API Backend & Xử lý ngoại tuyến**:
  - Gửi `FullRecipeSubmission` qua `recipeManagementService.submitFullRecipe`.
  - Tự động gọi endpoint tải ảnh `POST /api/v1/recipes/{id}/images` với `FormData` bao gồm `file`, `altText`, `isPrimary`, `orderIndex`.
  - Cơ chế fallback bộ nhớ cục bộ khi backend offline.

## 3. Danh sách file thay đổi và tạo mới

| STT | Đường dẫn file | Thao tác | Mô tả chi tiết |
| :---: | :--- | :---: | :--- |
| 1 | `culinary-blog/src/frontend/src/app/(dashboard)/recipes/new/CreateRecipeWizard.tsx` | Cập nhật | Tích hợp ImageUploader kéo thả, chọn ảnh chính, thêm chỉ số dinh dưỡng và gọi upload ảnh thực tế. |
| 2 | `culinary-blog/src/frontend/src/app/(dashboard)/recipes/new/page.tsx` | Cập nhật | Cập nhật nhãn định danh nhiệm vụ Lab 8 • FR-FTE-049 và mô tả hướng dẫn. |
| 3 | `culinary-blog/src/frontend/src/services/recipeManagementService.ts` | Cập nhật | Mở rộng FullRecipeSubmission hỗ trợ upload mảng tệp `images: File[]`. |

## 4. Kiểm chứng kết quả

- Chạy kiểm tra tĩnh `npx tsc --noEmit` đạt 0 lỗi.
- Đóng gói ứng dụng `npm run build` thành công.


# Kế hoạch triển khai Lab 8 — `FR-FTE-046`: Xây dựng Component `ImageUploader` kéo thả, xem trước và kiểm tra dung lượng

- **Thành viên phụ trách**: Nguyễn Thế Khải (`2312640`)
- **Nhánh triển khai**: `2312640-Khai`
- **Trạng thái**: ✅ Hoàn thành 100%

---

## 1. Mục tiêu nhiệm vụ
Xây dựng bộ Component tải ảnh và thư viện ảnh dùng chung trên toàn hệ thống Frontend Next.js:
1. **`ImageUploader` (`src/components/upload/ImageUploader.tsx`)**:
   - Hỗ trợ kéo thả (`Drag & Drop`) hoặc chọn nhiều file từ máy tính.
   - Kiểm tra định dạng MIME (`JPEG`, `PNG`, `WEBP`, `AVIF`), giới hạn số lượng file và dung lượng tối đa (`5 MB`).
   - Tạo `ObjectURL` xem trước tức thì (`Preview`) và tự động thu hồi bộ nhớ (`URL.revokeObjectURL`) khi unmount.
   - Hỗ trợ chọn ảnh chính (`Primary Image`), xóa từng ảnh hoặc xóa toàn bộ.
2. **`RecipeImageGallery` (`src/components/recipe/RecipeImageGallery.tsx`) & Trang `/recipe-gallery`**:
   - Hiển thị bộ sưu tập ảnh công thức kèm chế độ xem phóng to và chuyển đổi ảnh mượt mà.

---

## 2. Các tệp tin chính đã thực hiện
- `culinary-blog/src/frontend/src/components/upload/ImageUploader.tsx`
- `culinary-blog/src/frontend/src/components/recipe/RecipeImageGallery.tsx`
- `culinary-blog/src/frontend/src/app/(main)/recipe-gallery/page.tsx`

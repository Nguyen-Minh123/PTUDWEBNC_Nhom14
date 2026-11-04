# Kế hoạch triển khai Lab 8 — `FR-BKE-018`: Xây dựng API Upload ảnh công thức & ảnh đại diện (`POST /api/v1/media/upload`)

- **Thành viên phụ trách**: Nguyễn Thế Khải (`2312640`)
- **Nhánh triển khai**: `2312640-Khai`
- **Trạng thái**: ✅ Hoàn thành 100%

---

## 1. Mục tiêu nhiệm vụ
Xây dựng và hoàn thiện hệ thống API tải lên hình ảnh cho công thức, ảnh đại diện người dùng và ảnh danh mục:
1. **`POST /api/v1/recipes/{id:guid}/images`**: Upload ảnh gắn trực tiếp vào aggregate `Recipe`, tự động chọn ảnh đầu tiên làm `IsPrimary = true`, tính toán `ChecksumSha256` và lưu metadata vào bảng `RecipeImages`.
2. **`PATCH /api/v1/recipes/{id:guid}/images/{imageId:guid}/primary`**: Đặt một ảnh bất kỳ của công thức làm ảnh bìa chính.
3. **`DELETE /api/v1/recipes/{id:guid}/images/{imageId:guid}`**: Xóa metadata ảnh trong DB, tự động chuyển quyền `IsPrimary` cho ảnh kế tiếp và dọn dẹp file vật lý trên MinIO.
4. **`POST /api/v1/media/upload`**: API tải lên ảnh đa năng (dùng cho ảnh đại diện, ảnh danh mục, ảnh bước nấu) trả về `url`, `objectKey`, `contentType`, `fileSize` và `checksumSha256`.

---

## 2. Các tệp tin chính đã thực hiện
- `culinary-blog/src/backend/src/CulinaryBlog.API/Endpoints/RecipeImagesEndpoints.cs`
- `culinary-blog/src/backend/src/CulinaryBlog.Application/Features/Recipes/Images/Handlers/UploadRecipeImageCommandHandler.cs`
- `culinary-blog/src/backend/src/CulinaryBlog.Application/Features/Recipes/Images/Handlers/DeleteRecipeImageCommandHandler.cs`
- `culinary-blog/src/backend/src/CulinaryBlog.Application/Features/Recipes/Images/Handlers/SetPrimaryRecipeImageCommandHandler.cs`

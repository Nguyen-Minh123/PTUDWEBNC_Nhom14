# Kế hoạch triển khai Lab 8 — `FR-INF-007`: Hoàn thiện dịch vụ Upload ảnh thực tế lên MinIO / Local Storage & Xử lý ảnh

- **Thành viên phụ trách**: Nguyễn Thế Khải (`2312640`)
- **Nhánh triển khai**: `2312640-Khai`
- **Trạng thái**: ✅ Hoàn thành 100%

---

## 1. Mục tiêu nhiệm vụ
Hoàn thiện tầng Infrastructure lưu trữ đối tượng (`MinioStorageService`) và cấu hình bảng `RecipeImages` (`RecipeImageConfiguration`), hỗ trợ:
1. Tự động khởi tạo bucket `culinary-blog` và gắn chính sách `public-read` (`s3:GetObject`) trên MinIO.
2. Kiểm tra dung lượng tối đa `5 MB`, kiểm tra MIME type (`image/jpeg`, `image/png`, `image/webp`, `image/avif`) và xác thực chữ ký nhị phân (`Magic Bytes`) chống giả mạo phần mở rộng file.
3. Tính toán mã băm `SHA-256` (`ChecksumSha256`) để kiểm tra toàn vẹn dữ liệu.
4. Hỗ trợ cơ chế **Local Storage Fallback** (`wwwroot/uploads/`) khi MinIO tạm thời không khả dụng, giúp hệ thống luôn hoạt động ổn định trên mọi môi trường.

---

## 2. Các tệp tin chính đã thực hiện
- `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Storage/MinioStorageService.cs`
- `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/RecipeImage.cs`
- `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/Configurations/RecipeImageConfiguration.cs`

---

## 3. Hướng dẫn kiểm thử
1. Khởi chạy container `culinary-minio` trên cổng `9000` (hoặc chạy ở chế độ Local Fallback).
2. Thực hiện tải ảnh qua endpoint `POST /api/v1/media/upload` hoặc `POST /api/v1/recipes/{id}/images`.
3. Kiểm tra URL trả về có thể mở trực tiếp trên trình duyệt.

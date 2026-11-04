# Lab 4 - README - FR-INF-003
## [FR-INF-003] Kế hoạch triển khai API Upload và Quản lý Hình ảnh (RecipeImage) với MinIO S3

### 1. Mục tiêu
- Hiện thực API upload hình ảnh cho `Recipe`.
- Lưu file vào MinIO theo chuẩn S3-compatible storage.
- Quản lý metadata ảnh trong database: URL gốc, ảnh phụ, alt text, thứ tự hiển thị, ảnh chính.
- Đảm bảo ảnh đầu tiên tự động được đánh dấu là ảnh chính.
- Hỗ trợ xóa ảnh an toàn, đồng thời dọn file vật lý trong MinIO.
- Đáp ứng yêu cầu về bảo mật, kiểm tra định dạng và giới hạn dung lượng.

### 2. Ma trận quyền đã được xác nhận

| Vai trò | Upload ảnh | Cập nhật ảnh chính | Xóa ảnh | Xem ảnh |
|---|---:|---:|---:|---:|
| Author của Recipe | Có | Có | Có | Có |
| Admin | Có | Có | Có | Có |
| Người dùng khác | Không | Không | Không | Có |

**Ghi chú:**  
- Quyền được kiểm tra theo `Owner` hoặc `Role = Admin`.
- Hệ thống không cho phép sửa/xóa ảnh của recipe không thuộc quyền quản lý.

### 3. Hiện trạng đã kiểm tra
- Đã có entity `RecipeImage` trong Domain.
- Đã có `Recipe` aggregate chứa danh sách ảnh.
- Đã có `IFileStorageService` để làm việc với object storage.
- Đã có `MinioStorageService` ở tầng Infrastructure.
- Đã có nền tảng Minimal API, MediatR, EF Core, và cấu trúc Clean Architecture.
- Cần đồng bộ lại chữ ký upload file theo `Stream, fileName, contentType, length`.
- Cần kiểm tra lại logic quyền theo `IsInRole("Admin")` thay vì phụ thuộc `IsAdmin`.

### 4. Kế hoạch triển khai
1. Tạo command và DTO cho upload / đặt ảnh chính / xóa ảnh.
2. Tạo validator cho:
   - file không rỗng,
   - đúng MIME type,
   - đúng dung lượng,
   - alt text và thứ tự hợp lệ.
3. Kiểm tra quyền theo tác giả hoặc Admin.
4. Upload file vào MinIO bằng tên duy nhất để tránh ghi đè.
5. Lưu metadata vào `RecipeImage`.
6. Khi ảnh đầu tiên được thêm vào, tự động set `IsPrimary = true`.
7. Khi xóa ảnh chính, chọn ảnh còn lại đầu tiên làm ảnh chính mới.
8. Trả response rõ ràng theo chuẩn REST.

### 5. File dự kiến thay đổi
#### Domain
- `CulinaryBlog.Domain/Entities/RecipeImage.cs`
- `CulinaryBlog.Domain/Entities/Recipe.cs`

#### Application
- `CulinaryBlog.Application/Features/Recipes/Images/RecipeImageDto.cs`
- `CulinaryBlog.Application/Features/Recipes/Images/Commands/UploadRecipeImageCommand.cs`
- `CulinaryBlog.Application/Features/Recipes/Images/Commands/SetPrimaryRecipeImageCommand.cs`
- `CulinaryBlog.Application/Features/Recipes/Images/Commands/DeleteRecipeImageCommand.cs`
- `CulinaryBlog.Application/Features/Recipes/Images/Handlers/*`
- `CulinaryBlog.Application/Features/Recipes/Images/Validators/*`

#### Infrastructure
- `CulinaryBlog.Infrastructure/Storage/MinioStorageService.cs`
- `CulinaryBlog.Infrastructure/Persistence/Configurations/RecipeImageConfiguration.cs`
- `CulinaryBlog.Infrastructure/Persistence/ApplicationDbContext.cs`

#### API
- `CulinaryBlog.API/Endpoints/RecipeImagesEndpoints.cs`
- `CulinaryBlog.API/Program.cs`
- `CulinaryBlog.API/Middlewares/GlobalExceptionMiddleware.cs` (nếu cần chuẩn hóa lỗi)

### 6. Kiểm tra và ghi nhận
- Test upload ảnh hợp lệ.
- Test upload ảnh sai định dạng.
- Test upload ảnh quá dung lượng.
- Test đặt ảnh chính.
- Test xóa ảnh chính và tự động chọn ảnh chính mới.
- Test quyền với Author.
- Test quyền với Admin.
- Test truy cập trái phép trả `403 Forbidden`.
- Test file không tồn tại trả `404 Not Found`.

### 7. Trạng thái
**Trạng thái hiện tại:** Đang triển khai và hoàn thiện đồng bộ giữa Application, Infrastructure và API.  
**Mức độ hoàn thành ước tính:** 80%

### 8. Giải thích code để trình bày
- `RecipeImage` là entity lưu metadata ảnh, không lưu binary trong database.
- `MinIO` chỉ chịu trách nhiệm lưu file vật lý và trả về public URL.
- API nhận file qua `multipart/form-data`.
- Application layer xử lý nghiệp vụ và quyền truy cập.
- Khi upload, hệ thống sinh tên file duy nhất để tránh trùng lặp.
- Khi xóa ảnh chính, hệ thống tự tìm ảnh còn lại đầu tiên để thay thế.
- Kiểm tra quyền dựa trên `IsInRole("Admin")` và `UserId` của tác giả.

### 9. Câu hỏi giáo viên có thể hỏi
1. Vì sao chọn MinIO thay vì lưu trực tiếp vào database?
2. Vì sao ảnh được tách thành entity riêng `RecipeImage`?
3. Làm sao hệ thống tránh ghi đè file khi nhiều người upload cùng lúc?
4. Vì sao ảnh đầu tiên được đặt làm ảnh chính?
5. Nếu xóa ảnh chính thì hệ thống xử lý thế nào?
6. Vì sao kiểm tra quyền ở Application layer chứ không đặt toàn bộ ở API?
7. Làm sao kiểm tra file upload là ảnh thật, không chỉ dựa vào extension?
8. Nếu MinIO lỗi giữa chừng thì dữ liệu database có bị lệch không?
9. Có cần background job để dọn file xóa không?
10. Làm sao mở rộng để sinh ảnh medium và thumbnail sau khi upload?

---

**Kết luận:**  
Chức năng quản lý hình ảnh là một phần quan trọng của Culinary Blog vì ảnh ảnh hưởng trực tiếp đến trải nghiệm người dùng. Việc triển khai theo Clean Architecture giúp tách rõ trách nhiệm, dễ kiểm thử, dễ mở rộng và đảm bảo tính nhất quán giữa API, database và object storage.
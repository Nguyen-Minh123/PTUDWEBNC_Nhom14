# Lab 5 — FR-DVO-006: XML Documentation Comments và endpoint metadata

## Mục tiêu

Bật tạo XML documentation cho API và chuẩn hóa metadata mô tả cho các route công thức, health check và route gốc, để tài liệu OpenAPI/Scalar có tên, mô tả và response status phù hợp.

## Hiện trạng đã kiểm tra

- API target `net10.0`; `CulinaryBlog.API.csproj` chưa bật `GenerateDocumentationFile`.
- Các recipe routes đã có tên và summary, nhưng chưa có descriptions và phần lớn chưa khai báo đầy đủ response metadata.
- Route gốc và các health check chưa được đặt tên hoặc mô tả trong OpenAPI.
- `RecipeEndpoints` dùng `.WithOpenApi()`, API đã đánh dấu phương thức này obsolete sau khi nâng OpenAPI package ở FR-DVO-005.

## Kế hoạch triển khai

1. Bật `GenerateDocumentationFile` cho API project.
2. Bổ sung XML `<summary>` cho API endpoint mapper và các public API types/methods thuộc project cần thiết để tạo tài liệu.
3. Chuẩn hóa `.WithName()`, `.WithSummary()`, `.WithDescription()` và response metadata cho từng recipe endpoint, gồm các mã thành công/lỗi phù hợp.
4. Bổ sung metadata cho `/`, `/health`, `/health/live` và `/health/ready`.
5. Loại bỏ lời gọi `.WithOpenApi()` đã obsolete khi không còn cần thiết; giữ hành vi endpoint và truy cập hiện tại.
6. Build API, kiểm tra XML documentation file được tạo và xác minh metadata hiển thị trong OpenAPI/Scalar.

## File dự kiến thay đổi

- `culinary-blog/src/backend/src/CulinaryBlog.API/CulinaryBlog.API.csproj`
- `culinary-blog/src/backend/src/CulinaryBlog.API/Endpoints/RecipeEndpoints.cs`
- `culinary-blog/src/backend/src/CulinaryBlog.API/Program.cs`
- `culinary-blog/src/backend/src/CulinaryBlog.API/HealthChecks/DatabaseHealthCheck.cs`
- `culinary-blog/src/backend/src/CulinaryBlog.API/Infrastructure/GlobalExceptionHandler.cs`

Không dự kiến thêm file mã nguồn mới cho task này.

## Kiểm tra và ghi nhận

- `dotnet build` cho API project thành công với 0 warning và 0 error.
- XML documentation file `CulinaryBlog.API.xml` được tạo; XML summary của `RecipeEndpoints` xuất hiện trong file.
- OpenAPI có 10 operations (các recipe routes và route `/`); tất cả có operationId, summary, description và responses.
- Scalar trả HTTP 200 sau redirect; `/health/live` vẫn trả HTTP 200.
- Không cần Docker/WSL để build hoặc kiểm tra document endpoint; health check database phụ thuộc cấu hình database đang chạy.

## Trạng thái

- [x] Triển khai
- [x] Kiểm tra
- [ ] Chờ xác nhận của người dùng trước khi commit/push task này

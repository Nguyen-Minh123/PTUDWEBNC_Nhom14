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
- [x] Commit/push `5fc7223` lên `2312634-Huy`

## Giải thích code để trình bày

### XML documentation và metadata của route

`GenerateDocumentationFile` trong `CulinaryBlog.API.csproj` yêu cầu compiler tạo `CulinaryBlog.API.xml` từ các XML comment trong source. `<summary>` mô tả type/member cho người đọc và công cụ; XML file là đầu vào để tích hợp mô tả trong API documentation khi hỗ trợ được bật. Đây không phải file OpenAPI và cũng không thay thế metadata HTTP.

Trong `RecipeEndpoints.cs`, các phương thức `.WithName()`, `.WithSummary()` và `.WithDescription()` tạo metadata có ý nghĩa khác nhau:

- **Name** là operation identifier ổn định, hữu ích cho client/tooling.
- **Summary** là nhãn ngắn gọn trong danh sách operations.
- **Description** giải thích behavior, dữ liệu hoặc rule của endpoint.
- **Produces / ProducesValidationProblem** khai báo response schema/status dự kiến để OpenAPI mô tả các nhánh thành công và lỗi.

Route `/`, health routes và recipe routes được mô tả riêng. Health checks được map bằng `MapHealthChecks`; theo kiểm tra document ở task này, generator không đưa chúng vào danh sách operations dù metadata trên endpoint có thể được gắn.

### Vì sao bỏ `.WithOpenApi()`

Phiên bản OpenAPI package sau khi nâng cấp đánh dấu lời gọi `.WithOpenApi()` trong pattern cũ là obsolete. Metadata fluent hiện dùng trực tiếp trên endpoint; bỏ lời gọi cũ loại warning mà không đổi URL hay logic xử lý request.

### Câu hỏi thầy có thể hỏi

- **XML comments có tự động tạo endpoint không?** Không. Chúng mô tả symbol/code; route vẫn được đăng ký bằng `MapGet`, `MapPost`... và metadata endpoint.
- **`.Produces` có ép handler trả status đó không?** Không. Nó mô tả response có thể có cho OpenAPI; handler vẫn phải thực sự trả đúng status.
- **Vì sao health check chưa xuất hiện trong OpenAPI?** Generator hiện không tạo operation cho `MapHealthChecks` trong cấu hình đã kiểm tra; endpoint vẫn chạy và dùng được như HTTP route bình thường.

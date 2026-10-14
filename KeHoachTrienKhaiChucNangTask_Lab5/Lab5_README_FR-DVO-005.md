# Lab 5 — FR-DVO-005: OpenAPI 3.1, Scalar UI và Bearer Security Scheme

## Mục tiêu

Hoàn thiện tài liệu API theo chuẩn OpenAPI 3.1, giữ Scalar làm giao diện tra cứu và khai báo Bearer JWT Security Scheme để người dùng có thể nhập token khi thử API.

## Hiện trạng đã kiểm tra

- Backend là ASP.NET Core Minimal API, target `net10.0`.
- `Microsoft.AspNetCore.OpenApi` và `Scalar.AspNetCore` đã được khai báo; `Program.cs` đã gọi `AddOpenApi()`, `MapOpenApi()` và `MapScalarApiReference()`.
- Phiên bản OpenAPI hiện tại là 9.0.0 và phụ thuộc OpenAPI.NET 1.6.17, không có hỗ trợ xuất OpenAPI 3.1.
- API chạy theo profile Development tại `http://localhost:5075`; Scalar hiện được phục vụ tại `/scalar`.
- Chưa có khai báo Bearer Security Scheme trong OpenAPI.

## Kế hoạch triển khai

1. Nâng phiên bản tập trung `Microsoft.AspNetCore.OpenApi` và `Scalar.AspNetCore` trong `culinary-blog/src/backend/Directory.Packages.props` để tương thích .NET 10 và OpenAPI.NET mới.
2. Cấu hình `OpenApiVersion` trong `culinary-blog/src/backend/src/CulinaryBlog.API/Program.cs` thành OpenAPI 3.1.
3. Đăng ký Bearer JWT Security Scheme trong OpenAPI components để Scalar nhận biết cơ chế nhập token.
4. Giữ nguyên đường dẫn tài liệu OpenAPI và Scalar hiện tại, không áp đặt yêu cầu Bearer lên toàn bộ API khi các endpoint chưa được bảo vệ tương ứng.
5. Restore và build API project để kiểm tra cấu hình và các thay đổi.

## File dự kiến thay đổi

- `culinary-blog/src/backend/src/CulinaryBlog.API/Program.cs`
- `culinary-blog/src/backend/Directory.Packages.props`

Không dự kiến thêm package hoặc file mã nguồn mới cho task này; Scalar và OpenAPI đã có sẵn trong project.

## Kiểm tra và ghi nhận

- Chạy `dotnet build` cho API project.
- Nếu môi trường và cấu hình ứng dụng cho phép, kiểm tra tài liệu OpenAPI và Scalar tại endpoint hiện hữu.
- Task cấu hình tài liệu không yêu cầu Docker/WSL. Việc khởi chạy ứng dụng có thể cần các dịch vụ/cấu hình backend hiện có.

## Trạng thái

- [x] Triển khai
- [x] Kiểm tra (build thành công; OpenAPI trả phiên bản 3.1.1; Scalar trả HTTP 200 sau redirect)
- [x] Commit/push `e6f20a8` lên `2312634-Huy`

## Giải thích code để trình bày

### Luồng tạo OpenAPI document

Trong `Program.cs`, `AddOpenApi` đăng ký dịch vụ sinh OpenAPI; `MapOpenApi` ở phần cấu hình ứng dụng mới tạo route phục vụ document. Scalar UI được map riêng và đọc document đó để hiển thị trang tương tác. Như vậy, generator và giao diện tài liệu là hai phần phối hợp nhưng không phải cùng một middleware.

`options.OpenApiVersion = OpenApiSpecVersion.OpenApi3_1` yêu cầu generator xuất document theo chuẩn 3.1. Phiên bản package phải đủ mới để hỗ trợ lựa chọn này; nếu package cũ, chỉ đổi setting có thể không biên dịch hoặc không tạo đúng document.

### Bearer Security Scheme

Document transformer chạy khi document được tạo. Nó bảo đảm `Components` và `SecuritySchemes` tồn tại, rồi thêm scheme tên `Bearer`:

| Cấu hình | Ý nghĩa |
| --- | --- |
| `Type = Http` | Authentication dùng HTTP Authorization header. |
| `Scheme = "bearer"` | Header theo dạng `Authorization: Bearer <token>`. |
| `BearerFormat = "JWT"` | Gợi ý loại token cho tài liệu/UI; không tự xác minh token. |

Khai báo scheme chỉ cung cấp thông tin cho OpenAPI/Scalar. Nó không bảo vệ endpoint và cũng không tự gắn yêu cầu xác thực lên tất cả operation. Quyền endpoint do Authentication/Authorization middleware và metadata route quyết định ở task FR-BKE-009.

### Câu hỏi thầy có thể hỏi

- **Scalar có phải thư viện sinh OpenAPI không?** Không. ASP.NET Core OpenAPI sinh document; Scalar trình bày và cho phép thử document đó.
- **Vì sao không đặt security requirement global?** Tại task này chưa phải mọi endpoint đều được bảo vệ. Requirement global sẽ làm tài liệu nói sai rằng route đọc cũng cần token.
- **BearerFormat có xác minh token là JWT không?** Không. Đây chỉ là metadata mô tả; việc xác minh chữ ký, issuer, audience và hạn dùng thuộc JWT authentication ở FR-BKE-009.

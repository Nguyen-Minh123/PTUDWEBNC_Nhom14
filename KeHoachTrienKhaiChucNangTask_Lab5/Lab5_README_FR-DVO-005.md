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
- [ ] Chờ xác nhận của người dùng trước khi commit/push task này

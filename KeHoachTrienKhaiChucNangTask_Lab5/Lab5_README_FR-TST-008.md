# Lab 5 — FR-TST-008: Integration Tests cho ma trận phân quyền

## Mục tiêu

Kiểm thử qua HTTP pipeline của ASP.NET Core rằng authentication/authorization cho recipe routes tuân theo ma trận quyền FR-BKE-009, dùng `TestAuthHandler` để cấp danh tính kiểm thử và không phụ thuộc identity provider thật.

## Ma trận cần xác nhận

| Tình huống | Kết quả mong đợi |
| --- | --- |
| Anonymous gọi các endpoint đọc | Được phép đi qua authorization |
| Anonymous gọi create/update/publish/archive/delete | `401 Unauthorized` |
| User sở hữu recipe thực hiện thao tác ghi | Được phép qua authorization |
| User khác sở hữu recipe thực hiện thao tác ghi | `403 Forbidden` |
| Admin thao tác trên recipe của user khác | Được phép qua authorization |

Các endpoint có thể cần kết quả nghiệp vụ hoặc dữ liệu recipe giả lập; test host sẽ thay các dịch vụ cần thiết bằng test doubles để không phụ thuộc PostgreSQL, MinIO hay token thật.

## Kế hoạch triển khai

1. Kiểm tra hạ tầng integration test hiện có và các dependency của recipe endpoints.
2. Bổ sung `Microsoft.AspNetCore.Mvc.Testing` cùng project reference tới API trong test project nếu cần để host API bằng `WebApplicationFactory<Program>`.
3. Tạo `TestAuthHandler` đọc header kiểm thử để phát danh tính anonymous/user/owner/Admin.
4. Cấu hình `WebApplicationFactory` cho môi trường test, JWT configuration hợp lệ và test doubles cần thiết; tránh migration/seed kết nối database thật.
5. Viết HTTP integration tests cho endpoint đọc và các nhánh 401/403/owner/Admin trong ma trận.
6. Chạy integration test project, sửa lỗi phát sinh từ chính phần test mới và ghi kết quả thực tế tại đây.

## File và thay đổi

- `culinary-blog/src/backend/Directory.Packages.props` — quản lý phiên bản `Microsoft.AspNetCore.Mvc.Testing` tương thích .NET 10.
- `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/CulinaryBlog.IntegrationTests.csproj` — dependency và project reference phục vụ host API.
- `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/RecipeAuthorizationMatrixTests.cs` — test host, `TestAuthHandler` và test matrix (đã được người dùng xác nhận tạo file mới).
- Không sửa `UnitTest1.cs` vì đang chứa các bài kiểm thử PostgreSQL hiện có, không liên quan trực tiếp tới matrix auth.

Không cần Docker/WSL nếu test doubles cô lập được các dịch vụ ứng dụng khỏi PostgreSQL và MinIO. Nếu không thể cô lập bằng hạ tầng test đang có, sẽ nêu rõ điều kiện trước khi yêu cầu chạy test phụ thuộc dịch vụ ngoài.

## Trạng thái

- [x] Tạo kế hoạch trước khi bắt đầu triển khai
- [x] Được xác nhận tạo file test mới
- [x] Triển khai TestServer/TestAuthHandler và test doubles không cần dịch vụ ngoài
- [x] Chạy filtered integration tests: 22 passed, 0 failed
- [ ] Chờ xác nhận của người dùng trước khi commit/push task này

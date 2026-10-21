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
- [x] Commit/push `be72aad` lên `2312634-Huy`

## Giải thích test code để trình bày

### TestServer và factory

`WebApplicationFactory<Program>` khởi động ứng dụng thật trong `TestServer`, nên request đi qua routing, authentication middleware, authorization middleware và endpoint handler mà không mở cổng mạng. `ConfigureWebHost` đặt environment thành `Testing`; điều kiện startup chỉ chạy migration/seeder ở `Development`, vì vậy test không chạm PostgreSQL. JWT settings giả chỉ giúp ứng dụng hoàn tất đăng ký service; request identity được cung cấp bởi `TestAuthHandler`, không cần token ký thật.

### TestAuthHandler

Handler đọc `X-Test-User` và `X-Test-Role` để tạo claims:

- Không có user header: trả `NoResult`, được xem là anonymous.
- Có user header: tạo principal có `NameIdentifier` và `sub`.
- Có role header: thêm claim role mà `IsInRole("Admin")` sử dụng.

Đây là cơ chế kiểm thử thay thế, chỉ đăng ký trong test host; nó không thay thế hay làm yếu JWT authentication production.

### Test doubles và HTTP assertions

`RecipeRepositoryStub` cung cấp một recipe cố định có owner xác định; `UnitOfWorkStub` và `RecipeSenderStub` đáp ứng các dependency sau khi request đã qua authorization. Các request vẫn gọi endpoint bằng HTTP, nhưng không kết nối database hoặc gọi command handler thật. Lệnh bị từ chối dừng trước `ISender`, nhờ đó test tập trung vào lớp phân quyền.

`TheoryData` tái sử dụng cùng assertion cho nhiều route: public reads, năm thao tác mutation, user khác và Admin. Test thành công cho create còn đọc response `authorId` để xác nhận server dùng claim chứ không dùng `authorId` giả gửi trong request.

Tập hợp có 22 trường hợp: 4 public read, 5 anonymous mutation, 5 owner mutation, 4 non-owner denial và 4 Admin mutation. Chạy bằng `dotnet test` với filter `FullyQualifiedName~RecipeAuthorizationMatrixTests`.

### Câu hỏi thầy có thể hỏi

- **Đây có còn là integration test nếu dùng stub?** Có: request đi qua host HTTP và middleware thật; dependency dữ liệu/command được thay thế để cô lập concern đang kiểm tra.
- **Vì sao không dùng PostgreSQL?** Ma trận quyền không cần persistence thật; test doubles giúp chạy ổn định và tập trung vào status/auth.
- **TestAuthHandler có được dùng khi deploy không?** Không. Nó chỉ nằm trong integration test project và được đăng ký trong `ConfigureTestServices`.

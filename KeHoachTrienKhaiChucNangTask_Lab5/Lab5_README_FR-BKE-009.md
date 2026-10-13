# Lab 5 — FR-BKE-009: RBAC và Resource-Based Authorization

## Mục tiêu

Thêm JWT Bearer authentication và bảo vệ các thao tác ghi recipe bằng quyền đăng nhập, vai trò Admin và quyền sở hữu recipe; giữ các thao tác đọc công khai.

## Ma trận quyền đã được xác nhận

| Thao tác | Anonymous | User đã xác thực | Admin |
| --- | --- | --- | --- |
| Liệt kê, xem chi tiết, tìm kiếm recipe | Cho phép | Cho phép | Cho phép |
| Tạo recipe | 401 | Cho phép; server gán author từ claim | Cho phép; server gán author từ claim |
| Sửa, publish, archive, xóa recipe của chính mình | 401 | Cho phép | Cho phép |
| Sửa, publish, archive, xóa recipe của người khác | 401 | 403 | Cho phép |

JWT issuer, audience và signing key được lấy từ configuration/environment; không lưu khóa bí mật trong repository.

## Hiện trạng đã kiểm tra

- API chưa đăng ký authentication/authorization middleware; các recipe routes hiện đều cho phép anonymous.
- `ICurrentUserService` đã đọc UserId từ `NameIdentifier`, `sub` hoặc `userId`.
- Recipe lưu `AuthorId`; repository có thể nạp recipe theo id trước khi đánh giá quyền tài nguyên.
- Package `Microsoft.AspNetCore.Authentication.JwtBearer` đang được quản lý tập trung ở phiên bản 9.0.0; API target .NET 10.
- `culinary-blog.http` có các request ghi recipe chưa gắn bearer token; cần cập nhật để phản ánh quyền mới.

## Kế hoạch triển khai

1. Nâng `Microsoft.AspNetCore.Authentication.JwtBearer` lên phiên bản tương thích .NET 10 và thêm package reference trực tiếp vào API.
2. Cấu hình JWT Bearer validation an toàn cho issuer, audience, signing key, thời hạn và role claims; fail rõ ràng khi thiếu cấu hình bắt buộc.
3. Đăng ký authorization policy cho user đã xác thực và requirement/handler resource-based kiểm tra `Recipe.AuthorId` hoặc role `Admin`.
4. Bật middleware Authentication/Authorization đúng thứ tự; giữ các route đọc công khai, bảo vệ create và các thao tác ghi theo ma trận quyền.
5. Gán `AuthorId` khi tạo recipe từ identity claim, không tin `AuthorId` do client gửi.
6. Cập nhật `culinary-blog.http` để các request ghi dùng bearer token do người chạy cung cấp.
7. Cho phép `WebApplicationFactory` truy cập entry point `Program` để FR-TST-008 có thể kiểm thử host thật với `TestAuthHandler`.
8. Cập nhật hướng dẫn cấu hình JWT hiện có; không tạo khóa mẫu hoặc commit secret.

## File dự kiến thay đổi

- `culinary-blog/src/backend/Directory.Packages.props`
- `culinary-blog/src/backend/src/CulinaryBlog.API/CulinaryBlog.API.csproj`
- `culinary-blog/src/backend/src/CulinaryBlog.API/Program.cs`
- `culinary-blog/src/backend/src/CulinaryBlog.API/Endpoints/RecipeEndpoints.cs`
- `culinary-blog/src/backend/src/CulinaryBlog.API/Authorization/RecipeAuthorization.cs` (mới)
- `culinary-blog/src/backend/culinary-blog.http`
- `README.md` (hướng dẫn cấu hình JWT)

Không thay đổi logic database/domain ngoài phần cần dùng để đánh giá quyền recipe.

## Kiểm tra và ghi nhận

- `dotnet build .\culinary-blog\src\backend\src\CulinaryBlog.API\CulinaryBlog.API.csproj`: thành công, 0 warning, 0 error.
- `culinary-blog.http`: xác nhận đủ 15 request và 15 assertion; chưa gửi request tới API đang chạy vì cần PostgreSQL, JWT do identity provider phát hành và cấu hình local tương ứng.
- FR-TST-008 sẽ bổ sung integration tests cho anonymous, owner, user khác và Admin; task này chỉ chuẩn bị policy/host.
- Việc gọi write endpoints cần JWT được phát hành bởi identity provider có cùng issuer/audience/signing key. Không cần Docker/WSL để build; chạy ứng dụng Development vẫn phụ thuộc PostgreSQL.

## Trạng thái

- [x] Triển khai
- [x] Kiểm tra build và số lượng kịch bản HTTP
- [ ] Kiểm thử tích hợp ma trận quyền (FR-TST-008)
- [ ] Chờ xác nhận của người dùng trước khi commit/push task này

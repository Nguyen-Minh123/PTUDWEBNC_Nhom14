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
- FR-TST-008 đã bổ sung integration tests cho anonymous, owner, user khác và Admin; 22/22 test được xác nhận pass.
- Việc gọi write endpoints cần JWT được phát hành bởi identity provider có cùng issuer/audience/signing key. Không cần Docker/WSL để build; chạy ứng dụng Development vẫn phụ thuộc PostgreSQL.

## Trạng thái

- [x] Triển khai
- [x] Kiểm tra build và số lượng kịch bản HTTP
- [x] Kiểm thử tích hợp ma trận quyền (FR-TST-008): 22 test pass
- [x] Commit/push `c8ea119` lên `2312634-Huy`

## Giải thích code để trình bày

### Đăng ký và xác minh JWT (`Program.cs`)

API đọc `Jwt:Issuer`, `Jwt:Audience` và `Jwt:SigningKey` từ configuration, cho phép cung cấp bằng environment variables như `Jwt__Issuer`. Thiếu giá trị bắt buộc hoặc key ngắn hơn 32 byte sẽ ném `InvalidOperationException` ngay khi khởi động; fail-fast giúp tránh một cấu hình nửa hoạt động, nửa bảo mật.

`AddAuthentication(...).AddJwtBearer(...)` đăng ký handler kiểm tra Bearer token. Các `Validate...` bật kiểm tra issuer, audience, signing key và lifetime; `RequireExpirationTime` không chấp nhận token không có hạn hết hiệu lực; `ValidAlgorithms` giới hạn chữ ký ở HS256. `ClockSkew` cho phép sai lệch đồng hồ nhỏ một phút. API xác minh token được cấp ở nơi khác, không triển khai endpoint phát hành token.

`MapInboundClaims = false` giữ nguyên tên claim trong JWT. `NameClaimType = "sub"` và `RoleClaimType = "role"` nói cho framework biết claim nào đại diện user/role; `CurrentUserService` và test handler vẫn hỗ trợ thêm các dạng user-id hiện hành trong project.

### Hai lớp authorization

Policy `AuthenticatedUser` chỉ kiểm tra danh tính đã đăng nhập. Policy `OwnerOrAdmin` bổ sung `RecipeOwnerOrAdminRequirement`; handler nhận cả `ClaimsPrincipal` và đối tượng `Recipe`:

1. API nạp recipe theo ID; nếu không có resource thì trả `404`.
2. `AuthorizeAsync` gọi requirement handler với user và recipe đó.
3. Handler cho phép role `Admin`, hoặc user ID khớp với `Recipe.AuthorId`.
4. User đã đăng nhập nhưng không đạt requirement nhận `403`; anonymous bị challenge và nhận `401`.

Tách policy đăng nhập khỏi kiểm tra resource giúp tái sử dụng rule owner/Admin trên từng resource. Middleware được gọi theo thứ tự `UseAuthentication()` rồi `UseAuthorization()`: bước đầu tạo principal từ token, bước sau áp dụng policy route.

### Trust boundary khi tạo recipe

Endpoint tạo ghi đè `AuthorId` trong command bằng `ICurrentUserService.UserId`. Vì vậy, giá trị gửi trong JSON của client không quyết định quyền sở hữu; đây là ranh giới tin cậy quan trọng. Các endpoint đọc vẫn `.AllowAnonymous()`, đúng ma trận quyền đã được xác nhận.

### Câu hỏi thầy có thể hỏi

- **401 khác 403 thế nào?** 401 là chưa được xác thực; 403 là đã xác thực nhưng không có quyền đối với resource.
- **Vì sao phải nạp recipe trước khi kiểm tra quyền?** Quyền phụ thuộc `AuthorId` của chính recipe; không thể đánh giá owner chỉ từ route ID.
- **Scheme OpenAPI có thay cho JWT middleware không?** Không. OpenAPI mô tả cách gọi API; middleware mới xác minh credential trong request.
- **Ai phát hành JWT?** Identity provider của môi trường. API này chỉ xác thực token theo issuer/audience/key đã cấu hình.

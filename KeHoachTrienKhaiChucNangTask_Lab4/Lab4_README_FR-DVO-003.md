# Lab 4 — FR-DVO-003: Health Check Endpoints

## Mục tiêu

Cung cấp endpoint để hệ thống triển khai/giám sát phân biệt được tiến trình
API còn sống với việc API đã sẵn sàng phục vụ request phụ thuộc vào database.

## Hiện trạng đã đối chiếu

- `Program.cs` đã đăng ký health check `self` gắn tag `live` và
  `DatabaseHealthCheck` gắn tag `ready`.
- Các route `/health`, `/health/live` và `/health/ready` đã được ánh xạ.
- `DatabaseHealthCheck` gọi `CanConnectAsync` để kiểm tra PostgreSQL và trả
  trạng thái Unhealthy nếu không kết nối được.
- Chưa thấy integration test health endpoint trong các file test hiện có; cần
  bổ sung kiểm tra response của ba route và tính độc lập của liveness với DB.

## Phạm vi triển khai / đối chiếu

- Giữ liveness chỉ phản ánh tiến trình ứng dụng, không gọi DB hay dịch vụ ngoài.
- Readiness chạy các kiểm tra dependency cần thiết để nhận request, hiện tại là
  database.
- Bảo đảm các route trả status HTTP phù hợp với health report: healthy khi các
  kiểm tra được chọn thành công, unhealthy khi dependency bắt buộc lỗi.
- Viết integration test cho ba route, gồm tình huống database sẵn sàng và
  không sẵn sàng nếu test host có thể mô phỏng được.

## File liên quan

| File | Vai trò / vị trí cần xem |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Program.cs` | Đăng ký checks và map `/health`, `/health/live`, `/health/ready`. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/HealthChecks/DatabaseHealthCheck.cs` | Kiểm tra khả năng kết nối database bằng EF Core. |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/` | Thêm test HTTP cho các health endpoint theo mẫu WebApplicationFactory đang có. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/CulinaryBlog.API.csproj` | API đã tham chiếu ASP.NET Core health-check APIs trong shared framework; không thêm package nếu không phát sinh yêu cầu. |

## Luồng xử lý và giải thích

1. `AddHealthChecks()` tạo registry chứa các check đã đăng ký.
2. Check `self` gắn tag `live`, chỉ trả Healthy để trả lời câu hỏi “process có
   đang chạy không?”.
3. `DatabaseHealthCheck` gắn tag `ready`; nó dùng `CanConnectAsync` với
   cancellation token của request để tránh chờ vô hạn khi bị hủy.
4. `/health` không lọc tag nên tổng hợp tất cả check; `/health/live` chỉ chọn
   check tag `live`; `/health/ready` chỉ chọn tag `ready`.
5. Bộ điều phối có thể dùng liveness để restart process bị treo và readiness
   để tạm ngừng gửi traffic khi database chưa sẵn sàng.

## Ghi chú kiến thức cần trình bày

- **Liveness và readiness không giống nhau:** API có thể đang chạy nhưng chưa
  thể xử lý công việc do database mất kết nối.
- **Vì sao dùng tag và `Predicate`?** Cho phép mỗi route chỉ chạy nhóm checks
  phù hợp; nếu đưa database vào liveness, sự cố DB có thể làm hệ thống restart
  API liên tục dù process vẫn hoạt động.
- **Vì sao truyền cancellation token?** Cho phép hủy truy vấn kiểm tra khi
  client hoặc host dừng request.
- Health endpoint không nên trả thông tin bí mật như connection string,
  username hoặc chi tiết exception ra bên ngoài.

## Kiểm tra sau triển khai

- Test `/health/live` thành công khi dependency database bị ngắt/mô phỏng lỗi.
- Test `/health/ready` thành công khi database truy cập được và trả unhealthy
  khi database không truy cập được.
- Test `/health` tổng hợp checks đã đăng ký.
- Chạy integration-test project và xác nhận test không yêu cầu một PostgreSQL
  cục bộ ngoài ý muốn; nếu cần dependency thật thì dùng cấu hình test riêng.

## Git

- Nhánh làm việc: `2312634-Huy`.
- Endpoint và check cơ bản đã tồn tại; README này ghi kế hoạch kiểm thử/đối
  chiếu, không khẳng định test health đã có.

# README – Kế hoạch triển khai chức năng `FR-INF-005`

## 1. Mục tiêu
Thiết lập Rate Limiting nâng cao cho Culinary Blog để:
- ngăn brute-force tại endpoint đăng nhập;
- giới hạn lưu lượng truy cập tổng thể cho toàn bộ API;
- bảo vệ hệ thống khi có request tăng đột biến;
- trả về phản hồi rõ ràng khi vượt giới hạn.

## 2. Ma trận quyền đã được xác nhận
| Nhóm endpoint | Chính sách | Cơ chế | Mức giới hạn | Ghi chú |
|---|---|---|---|---|
| Login | `login-policy` | Fixed Window | 5 request / 1 phút | Chặn brute-force |
| Toàn bộ API | `api-policy` | Token Bucket | 100–200 request / 1 phút / client | Bảo vệ hệ thống chung |

## 3. Hiện trạng đã kiểm tra
- Backend đã có pipeline middleware và có thể chèn `UseRateLimiter()`.
- Dự án chạy theo Minimal API nên có thể gắn policy theo route group hoặc endpoint.
- Endpoint đăng nhập là điểm cần kiểm soát chặt nhất vì dễ bị thử mật khẩu hàng loạt.
- API hiện cần một cơ chế giới hạn chung để giảm tải và bảo vệ hạ tầng.

## 4. Kế hoạch triển khai
1. Cài và kích hoạt `AddRateLimiter()` trong `Program.cs`.
2. Tạo `login-policy` theo Fixed Window với 5 request/phút và `QueueLimit = 0`.
3. Tạo `api-policy` theo Token Bucket cho toàn bộ API.
4. Cấu hình response `429 Too Many Requests` kèm header `Retry-After: 60`.
5. Gắn policy riêng cho endpoint Login.
6. Test thực tế bằng chuỗi request liên tiếp để xác nhận hành vi chặn đúng.

## 5. File dự kiến thay đổi
- `CulinaryBlog.API/Program.cs`
- `CulinaryBlog.API/Extensions/RateLimitingExtensions.cs` (nếu tách extension riêng)
- `CulinaryBlog.API/Endpoints/AuthEndpoints.cs` hoặc file chứa endpoint Login
- `CulinaryBlog.API/appsettings.json` (nếu muốn đưa ngưỡng vào cấu hình)

## 6. Kiểm tra và ghi nhận
### Kiểm tra bắt buộc
- Gửi 6 request liên tiếp vào Login trong 1 phút và nhận đúng mã `429`.
- Header `Retry-After: 60` xuất hiện trong response.
- Các endpoint khác vẫn hoạt động theo mức giới hạn chung.
- Không làm hỏng CORS, Authentication và Authorization trong pipeline.

### Ghi nhận
- Lưu lại kết quả test và log của request bị chặn.
- Ghi nhận IP hoặc client key được dùng để phân vùng rate limit.
- Xác nhận hành vi theo đúng môi trường triển khai.

## 7. Trạng thái
**Trạng thái hiện tại:** Đã cấu hình xong logic rate limiting cơ bản, đang kiểm tra thực tế với endpoint Login và toàn bộ API.

## 8. Giải thích code để trình bày
- `FixedWindowRateLimiter`: đếm số request trong một cửa sổ thời gian cố định.
- `TokenBucketRateLimiter`: cho phép một lượng request nhất định, token được nạp lại theo chu kỳ.
- `QueueLimit = 0`: request vượt ngưỡng bị từ chối ngay, không xếp hàng.
- `OnRejected`: xử lý response khi bị chặn, trả `429 Too Many Requests`.
- `Retry-After`: thông báo thời gian chờ hợp lệ trước khi gửi lại request.
- `GlobalLimiter`: áp dụng giới hạn chung cho toàn API.
- `RequireRateLimiting("login-policy")`: gắn chính sách riêng cho login.

## 9. Câu hỏi giáo viên có thể hỏi
1. Vì sao Login cần giới hạn chặt hơn các endpoint khác?
2. Khác nhau giữa Fixed Window và Token Bucket là gì?
3. Vì sao `QueueLimit = 0` phù hợp với login?
4. `429 Too Many Requests` có ý nghĩa gì?
5. `Retry-After` giúp ích gì cho client?
6. Làm sao xác định client key để áp dụng giới hạn theo người dùng hoặc IP?
7. Rate limiting có thay thế được xác thực không?
8. Nếu chạy sau Nginx thì rate limiting nên dựa trên IP nào?
9. Cách kiểm tra policy đã hoạt động đúng trong thực tế là gì?

## 10. Kết luận
FR-INF-005 giúp Culinary Blog chống lạm dụng API và giảm rủi ro brute-force. Thiết kế này ưu tiên:
- kiểm soát sớm,
- phản hồi rõ ràng,
- giới hạn hợp lý theo từng nhóm endpoint,
- dễ mở rộng khi hệ thống tăng tải.

# README – Kế hoạch triển khai chức năng `FR-INF-006`

## 1. Mục tiêu
Thiết lập Security Headers và pipeline middleware bảo mật cho Culinary Blog để:
- tăng mức an toàn cho response HTTP;
- giảm rủi ro MIME sniffing, clickjacking và rò rỉ thông tin;
- chuẩn hóa thứ tự middleware để preflight `OPTIONS` không bị chặn sai;
- bảo đảm hệ thống sẵn sàng hơn cho môi trường triển khai thật.

## 2. Ma trận quyền đã được xác nhận
| Thành phần | Áp dụng | Mục đích | Ghi chú |
|---|---|---|---|
| Correlation ID | Tất cả request | Theo dõi và truy vết log | Hỗ trợ debug end-to-end |
| Logging Middleware | Tất cả request | Ghi nhận request/response | Phục vụ quan sát hệ thống |
| Exception Middleware | Tất cả request | Trả lỗi thống nhất | Theo RFC 7807 |
| HSTS | Production | Ép dùng HTTPS | Không bật ở Development |
| CORS | Trước Auth | Cho phép frontend gọi API | Preflight không bị chặn |
| Authentication | Endpoint cần xác thực | Xác minh danh tính | Sau CORS |
| Authorization | Endpoint cần phân quyền | Kiểm soát quyền truy cập | Sau Authentication |
| Rate Limiter | Toàn bộ API | Giới hạn request | Đặt sau Auth theo thiết kế hiện tại |
| Security Headers | API response | Tăng mức bảo mật HTTP | Chỉ áp dụng cho API/health |

## 3. Hiện trạng đã kiểm tra
- Dự án đã có pipeline middleware cơ bản.
- Backend chạy theo Minimal API nên có thể chèn middleware theo đúng thứ tự.
- CORS, Rate Limiting và Middleware xử lý lỗi đã được chuẩn bị.
- Cần bổ sung các security headers bắt buộc và đảm bảo thứ tự pipeline không ảnh hưởng đến preflight request.

## 4. Kế hoạch triển khai
1. Tạo middleware riêng cho Correlation ID, Logging, Exception Handling và Security Headers.
2. Sắp xếp thứ tự pipeline đúng chuẩn: CorrelationId → Logging → ExceptionHandler → HSTS → CORS → Authentication → Authorization → Rate Limiter.
3. Gắn `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` và `Content-Security-Policy`.
4. Chỉ bật HSTS ở Production.
5. Kiểm tra `OPTIONS preflight` để bảo đảm không bị chặn bởi Auth.
6. Ghi nhận response headers và xác nhận hoạt động trên trình duyệt / frontend.

## 5. File dự kiến thay đổi
- `CulinaryBlog.API/Program.cs`
- `CulinaryBlog.API/Middlewares/CorrelationIdMiddleware.cs`
- `CulinaryBlog.API/Middlewares/RequestLoggingMiddleware.cs`
- `CulinaryBlog.API/Middlewares/ExceptionHandlingMiddleware.cs`
- `CulinaryBlog.API/Middlewares/SecurityHeadersMiddleware.cs`
- `CulinaryBlog.API/appsettings.json` (nếu cần bổ sung cấu hình)

## 6. Kiểm tra và ghi nhận
### Kiểm tra bắt buộc
- Response headers có đầy đủ:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: no-referrer`
  - `Content-Security-Policy`
- Preflight `OPTIONS` không bị chặn bởi Authentication.
- CORS vẫn hoạt động bình thường với frontend Next.js.
- HSTS chỉ xuất hiện ở Production.

### Ghi nhận
- Ghi lại kết quả kiểm tra response headers.
- Ghi nhận các request preflight thành công.
- Xác nhận không có xung đột giữa Security Headers và middleware khác.

## 7. Trạng thái
**Trạng thái hiện tại:** Đã triển khai cấu trúc middleware và security headers, đang kiểm tra thực tế trên response headers và hành vi preflight.

## 8. Giải thích code để trình bày
- `CorrelationIdMiddleware`: gắn mã theo dõi cho từng request để debug và đối soát log.
- `RequestLoggingMiddleware`: đo thời gian xử lý và ghi log request/response.
- `ExceptionHandlingMiddleware`: bắt lỗi tập trung và trả phản hồi chuẩn hóa.
- `SecurityHeadersMiddleware`: thêm các header bảo mật bắt buộc vào response.
- `UseHsts()`: ép trình duyệt dùng HTTPS ở Production.
- `UseCors()` trước Auth: bảo đảm preflight `OPTIONS` được xử lý đúng trước khi xác thực.

## 9. Câu hỏi giáo viên có thể hỏi
1. Vì sao cần đặt CORS trước Authentication?
2. Preflight `OPTIONS` là gì và tại sao dễ bị lỗi?
3. `X-Frame-Options: DENY` giúp chống tấn công nào?
4. `X-Content-Type-Options: nosniff` có tác dụng gì?
5. Vì sao HSTS không nên bật ở Development?
6. Correlation ID giúp ích gì cho việc truy vết lỗi?
7. Có xung đột nào giữa Security Headers và frontend không?
8. Vì sao nên tách middleware xử lý lỗi riêng?

## 10. Kết luận
FR-INF-006 giúp Culinary Blog nâng mức bảo mật tầng HTTP và chuẩn hóa pipeline middleware. Thiết kế này ưu tiên:
- rõ ràng,
- dễ kiểm soát,
- dễ debug,
- và an toàn hơn khi triển khai thật.

# Lab 4 — FR-DVO-004: Structured Logging bằng Serilog

## Mục tiêu

Ghi log có cấu trúc xuyên suốt API để có thể lọc theo mức độ, request, mã
correlation và thời gian xử lý; cấu hình được theo môi trường và không ghi
thông tin bí mật của người dùng.

## Hiện trạng đã đối chiếu

- `Program.cs` đã thay logging provider bằng Serilog và nạp cấu hình từ
  `appsettings.json`.
- `appsettings.json` đã cấu hình Console sink với compact JSON formatter,
  minimum level và enrichers.
- Pipeline đặt `CorrelationIdMiddleware` trước `RequestLoggingMiddleware`;
  request logger ghi method, path, status code, elapsed milliseconds và
  correlation ID bằng message template có property.
- API project đã tham chiếu các gói `Serilog.AspNetCore`,
  `Serilog.Settings.Configuration`, `Serilog.Sinks.Console` và
  `Serilog.Formatting.Compact`.
- Chưa thấy test chuyên biệt kiểm tra log event/property; cần cân nhắc bổ sung
  test bằng logger sink trong bộ test nếu yêu cầu task cần xác nhận cấu trúc.

## Phạm vi triển khai / đối chiếu

- Xác nhận mọi log ứng dụng đi qua Serilog, cấu hình lấy từ settings thay vì
  viết sink cố định trong code.
- Giữ structured properties thay vì nội suy chuỗi trước khi gọi logger.
- Kiểm tra correlation ID được tái sử dụng từ header hoặc sinh mới, phản hồi
  trả lại header và log request/response dùng cùng giá trị.
- Rà soát mức log của framework và nội dung nhạy cảm; không log token, mật
  khẩu, body nhạy cảm hoặc connection string.
- Bổ sung test/kiểm tra cấu hình nếu cần, không thêm lại package đã được tham
  chiếu.

## File liên quan

| File | Vai trò / vị trí cần xem |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Program.cs` | `UseSerilog(...)` và thứ tự correlation/request logging middleware. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/appsettings.json` | Minimum level, sink Console, compact JSON formatter và enrichment. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/appsettings.Development.json` | Logging overrides theo môi trường phát triển. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Middlewares/CorrelationIdMiddleware.cs` | Đọc/tạo `X-Correlation-ID`, lưu vào context, trả về response và mở logger scope. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Middlewares/RequestLoggingMiddleware.cs` | Structured log cho request, response và elapsed time. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/CulinaryBlog.API.csproj` | Các package Serilog đã được tham chiếu. |
| `culinary-blog/src/backend/Directory.Packages.props` | Phiên bản package được quản lý tập trung. |

## Luồng xử lý và giải thích

1. `UseSerilog` cấu hình host đọc section `Serilog` trong settings và bật
   `FromLogContext`; ứng dụng dùng cùng pipeline logging thay vì chỉ log ra
   console theo cấu hình mặc định.
2. `CorrelationIdMiddleware` lấy `X-Correlation-ID` từ request hoặc sinh GUID,
   lưu vào `HttpContext.Items`, trả lại response header và tạo logger scope.
3. `RequestLoggingMiddleware` chạy quanh phần còn lại của pipeline; stopwatch
   đo elapsed time, log đầu vào trước khi gọi middleware tiếp theo và log status
   sau khi request hoàn tất.
4. Các placeholder như `{Method}`, `{Path}`, `{StatusCode}` trở thành property
   riêng trong event log. Compact JSON formatter xuất dữ liệu phù hợp cho hệ
   thống thu thập log đọc máy.
5. Enricher thêm metadata môi trường/process để hỗ trợ truy vấn, nhưng không
   thay thế correlation ID hoặc thuộc tính nghiệp vụ cần thiết.

## Ghi chú kiến thức cần trình bày

- **Structured logging khác log chuỗi thường thế nào?** Property vẫn được giữ
  thành trường dữ liệu để lọc/tổng hợp; log nội suy thường chỉ còn một câu văn.
- **Vì sao đặt correlation middleware trước request logger?** Request logger
  cần correlation ID đã có trong context để gắn cùng mã vào log đầu và cuối.
- **Vì sao đo thời gian bằng `Stopwatch`?** Đây là bộ đếm thời gian phù hợp để
  đo elapsed time, không bị sai khi đồng hồ hệ thống đổi.
- **Vì sao cấu hình sink qua settings?** Có thể đổi output/mức log theo môi
  trường mà không sửa source code.
- Không ghi Authorization header, token, password hay dữ liệu cá nhân không
  cần thiết vào log; log có cấu trúc không làm dữ liệu nhạy cảm an toàn hơn.

## Kiểm tra sau triển khai

- Build API project để xác nhận binding cấu hình và Serilog packages.
- Chạy API cục bộ, gửi request có và không có `X-Correlation-ID`; xác nhận
  response header và hai log event dùng chung correlation ID.
- Quan sát output Console là JSON hợp lệ, có property method/path/status/time.
- Kiểm tra mức log Microsoft theo cấu hình và xác nhận không xuất token hoặc
  connection string.

## Git

- Nhánh làm việc: `2312634-Huy`.
- Serilog và middleware logging đã có trong mã nguồn; tài liệu này ghi lại cấu
  hình, cách giải thích và các kiểm tra cần thực hiện.

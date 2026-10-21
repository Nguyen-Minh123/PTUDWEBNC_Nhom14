# README – Kế hoạch triển khai chức năng `FR-INF-004`

## 1. Mục tiêu
Thiết lập CORS Policy đa môi trường cho backend Culinary Blog để:
- cho phép frontend Next.js ở môi trường phát triển gọi API ổn định;
- giới hạn rõ origin hợp lệ ở môi trường production;
- hỗ trợ credentials mà không dùng wildcard `*`;
- giảm lỗi preflight và tăng tính an toàn khi tích hợp frontend - backend.

## 2. Ma trận quyền đã được xác nhận
| Môi trường | Origin được phép | Methods | Headers | Credentials | Cache preflight |
|---|---|---|---|---|---|
| Development | `http://localhost:3000` | `GET, POST, PUT, PATCH, DELETE, OPTIONS` | `Authorization, Content-Type, Accept, X-Correlation-ID` | Có | 10 phút |
| Production | Đọc từ `appsettings.json` | `GET, POST, PUT, PATCH, DELETE, OPTIONS` | `Authorization, Content-Type, Accept, X-Correlation-ID` | Có | 10 phút |

## 3. Hiện trạng đã kiểm tra
- Dự án đã có backend theo Clean Architecture.
- Frontend Next.js chạy tách biệt với backend.
- CORS trước đây dùng kiểu mở, chưa phù hợp khi bật credentials.
- Yêu cầu của hệ thống cần tách rõ cấu hình theo môi trường để tránh rủi ro triển khai production.

## 4. Kế hoạch triển khai
1. Tạo CORS policy riêng cho Development và Production.
2. Đưa whitelist production vào `appsettings.json`.
3. Áp dụng `AllowCredentials()` nhưng không dùng `AllowAnyOrigin()`.
4. Gắn `UseCors()` trước `Authentication` và `Authorization`.
5. Kiểm tra request thật từ Next.js và xác nhận response không bị chặn.
6. Ghi nhận kết quả và cập nhật trạng thái công việc.

## 5. File dự kiến thay đổi
- `CulinaryBlog.API/Program.cs`
- `CulinaryBlog.API/appsettings.json`
- `CulinaryBlog.API/appsettings.Development.json` (nếu cần)
- `CulinaryBlog.API/Extensions/CorsExtensions.cs` (nếu tách extension riêng)

## 6. Kiểm tra và ghi nhận
### Kiểm tra bắt buộc
- Frontend Next.js gọi API thành công từ `http://localhost:3000`.
- Production chỉ nhận các origin nằm trong whitelist.
- Preflight `OPTIONS` không bị chặn bởi authentication.
- Không xuất hiện `*` khi dùng credentials.

### Ghi nhận
- Lưu log lỗi nếu origin không hợp lệ.
- Xác nhận lại header phản hồi và hành vi preflight sau khi build.

## 7. Trạng thái
**Trạng thái hiện tại:** Đã hoàn thành cấu hình, đang kiểm tra tích hợp thực tế với frontend và môi trường production.

## 8. Giải thích code để trình bày
- `WithOrigins(...)`: chỉ định rõ origin được phép truy cập.
- `WithMethods(...)`: giới hạn các HTTP method cần dùng.
- `WithHeaders(...)`: chỉ cho phép các header phục vụ xác thực và correlation id.
- `AllowCredentials()`: cho phép gửi cookie hoặc thông tin xác thực.
- `SetPreflightMaxAge(...)`: giúp trình duyệt cache preflight, giảm số lần OPTIONS.
- `UseCors(...)` đặt trước Auth: để preflight không bị chặn khi chưa qua xác thực.

## 9. Câu hỏi giáo viên có thể hỏi
1. Vì sao không dùng `AllowAnyOrigin()` khi bật `AllowCredentials()`?
2. Tại sao cần tách CORS theo môi trường?
3. Preflight `OPTIONS` là gì và vì sao nó quan trọng?
4. Vì sao `UseCors()` phải đặt trước `UseAuthentication()`?
5. Whitelist production nên đặt ở đâu và vì sao?
6. `X-Correlation-ID` có vai trò gì trong debug và quan sát hệ thống?
7. Nếu frontend deploy sang domain mới thì cần thay đổi gì?

## 10. Kết luận
FR-INF-004 là nền tảng cho việc tích hợp frontend - backend an toàn, rõ ràng và dễ mở rộng. Thiết kế hiện tại ưu tiên nguyên tắc:
- an toàn trước,
- tường minh theo môi trường,
- hỗ trợ phát triển nhanh nhưng không hy sinh kiểm soát ở production.

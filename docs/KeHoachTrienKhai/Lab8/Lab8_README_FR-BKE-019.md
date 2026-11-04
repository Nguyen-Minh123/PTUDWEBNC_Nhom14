# Lab 8 - Kế hoạch triển khai FR-BKE-018

## 1. Nhiệm vụ

**FR-BKE-018 - Xây dựng API truy vấn Nhật ký Hệ thống (`/api/v1/audit-logs`).**

API cung cấp trang nhật ký kiểm toán cho giao diện quản trị. Endpoint chỉ dành cho
Admin, trả về dữ liệu phân trang và cho phép lọc các bản ghi để tra cứu.

## 2. Hiện trạng liên quan

- FR-DVO-007 đã bổ sung entity `AuditLog`, `DbSet<AuditLog>` và migration tạo bảng
  `AuditLogs` với JSONB cho dữ liệu cũ/mới.
- API hiện sử dụng Minimal API theo nhóm endpoint, đăng ký route tập trung trong
  `CulinaryBlog.API/Program.cs`.
- Policy `AdminOnly` và mô hình phân trang `PaginatedResult<T>` đã có sẵn.
- Các endpoint đọc dữ liệu thường dùng `AsNoTracking`, kiểm tra tham số trước khi
  truy vấn, rồi trả `Results.ValidationProblem` nếu đầu vào không hợp lệ.

## 3. Ý tưởng triển khai

1. Tạo nhóm `GET /api/v1/audit-logs`, áp dụng policy `AdminOnly` cho toàn bộ nhóm.
2. Truy vấn `IApplicationDbContext.AuditLogs` bằng `AsNoTracking`.
3. Hỗ trợ lọc tùy chọn theo `action`, `entityName`, `entityId`, `actorId`,
   `fromUtc` và `toUtc`; kiểm tra khoảng thời gian trước khi truy vấn.
4. Hỗ trợ `page` (mặc định 1) và `pageSize` (mặc định 20, tối đa 100), trả về
   `PaginatedResult<AuditLogResponse>` theo contract phân trang sẵn có.
5. Sắp xếp mới nhất trước theo `OccurredAtUtc`, dùng `Id` làm khóa phụ để kết quả
   giữa các trang ổn định khi nhiều log có cùng thời điểm.
6. Chỉ trả các trường cần cho quản trị: actor, hành động, entity/ID, thời điểm và
   JSON thay đổi cũ/mới. Không trả dữ liệu xác thực; các giá trị password/token/
   secret đã bị loại ở tầng FR-DVO-007.
7. Thêm ví dụ request vào file `.http` để có thể kiểm tra nhanh endpoint, quyền và
   validation.

## 4. File dự kiến sửa/thêm

### File dự kiến mới

- `culinary-blog/src/backend/src/CulinaryBlog.API/Endpoints/AuditLogEndpoints.cs`
  - Định nghĩa query parameters, kiểm tra đầu vào, truy vấn EF Core, response DTO
    cục bộ và metadata OpenAPI.

### File dự kiến sửa

- `culinary-blog/src/backend/src/CulinaryBlog.API/Program.cs`
  - Đăng ký `MapAuditLogEndpoints()` trong nhóm routes.
- `culinary-blog/src/backend/culinary-blog.http`
  - Thêm request mẫu cho danh sách log, lọc và phân trang; dùng token từ biến môi
    trường theo quy ước hiện tại.

### Kiểm thử liên quan

- Kiểm tra xác thực Admin, truy vấn mặc định, lọc, phân trang, validation và không
  lộ dữ liệu nhạy cảm trong FR-TST-010.
- API cần database đã áp dụng migration `AddAuditLogs` để truy vấn bảng mới.

> Endpoint file là file mã nguồn mới; sẽ chỉ tạo sau khi được duyệt theo yêu cầu
> xác nhận trước khi bổ sung file mới.

## 5. Hợp đồng API dự kiến

```http
GET /api/v1/audit-logs?page=1&pageSize=20&action=Modified&entityName=Recipe
GET /api/v1/audit-logs?actorId=<id>&fromUtc=<ISO-8601>&toUtc=<ISO-8601>
```

- `200 OK`: danh sách dạng `PaginatedResult<AuditLogResponse>`.
- `400 Bad Request`: phân trang hoặc khoảng thời gian không hợp lệ.
- `401 Unauthorized`: chưa đăng nhập.
- `403 Forbidden`: đã đăng nhập nhưng không có role Admin.

Tên và kiểu dữ liệu response sẽ bám sát `AuditLog` hiện có; mọi JSON thay đổi được
trả dưới dạng JSON hợp lệ, không biến thành dữ liệu mã hóa hoặc chuỗi escaped lồng.

## 6. Ghi chú triển khai và giải thích

- **AdminOnly** bảo vệ log vì nội dung audit có thể chứa thay đổi nghiệp vụ riêng tư.
- **AsNoTracking** tránh EF Core theo dõi các bản ghi chỉ đọc và giảm chi phí bộ nhớ.
- **Count + Skip/Take** cung cấp tổng số kết quả và tải đúng trang được yêu cầu.
- **Sắp xếp có khóa phụ** tránh log cùng timestamp đổi vị trí giữa các request.
- **Validation trước khi truy vấn** ngăn tham số sai và giới hạn page size nhằm giữ
  truy vấn có chi phí dự đoán được.

## 7. Công cụ/môi trường dự kiến

- .NET SDK để build backend và chạy kiểm thử.
- PostgreSQL có schema đã áp dụng migration `AddAuditLogs` để xác minh truy vấn thực tế.
- Có thể dùng Docker Desktop nếu PostgreSQL chưa chạy trên máy; không cần WSL nếu
  PostgreSQL/Docker và .NET SDK dùng được trực tiếp trên Windows.

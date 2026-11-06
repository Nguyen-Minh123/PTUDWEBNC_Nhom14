# Lab 8 - Kế hoạch triển khai FR-DVO-007

## 1. Nhiệm vụ

**FR-DVO-007 - Xây dựng Hệ thống Audit Logging (Nhật ký kiểm toán hệ thống).**

Mục tiêu là ghi lại có cấu trúc các thay đổi dữ liệu quan trọng để có thể truy vết
ai đã thao tác, thao tác gì, trên bản ghi nào và vào thời điểm nào. Đây là phần nền
tảng dữ liệu cho API truy vấn nhật ký FR-BKE-018 và trang xem nhật ký FR-FTE-048.

## 2. Hiện trạng liên quan

- Dự án dùng .NET, EF Core và PostgreSQL; `CulinaryBlogDbContext` nằm trong tầng
  Infrastructure.
- `ICurrentUserService` đã cung cấp danh tính người dùng hiện tại.
- `BaseEntity` có các trường `CreatedAt`, `CreatedBy`, `UpdatedAt`, `UpdatedBy`
  và thông tin xóa mềm. Các trường này chỉ mô tả trạng thái hiện tại của bản ghi,
  không lưu lịch sử từng lần thay đổi.
- Chưa tìm thấy entity hoặc luồng Audit Log chuyên biệt trong backend.

## 3. Ý tưởng triển khai

1. Tạo entity `AuditLog` để lưu thời gian UTC, người thực hiện, loại hành động,
   tên loại entity, khóa bản ghi và ảnh chụp thay đổi trước/sau.
2. Dùng EF Core `SaveChangesInterceptor` để đọc các entry được thêm, sửa hoặc xóa
   trong lần lưu; tạo bản ghi audit tương ứng. Thao tác xóa mềm cần được ghi nhận
   như một thay đổi, không nhầm với xóa cứng.
3. Lấy người thao tác từ `ICurrentUserService`; nếu là tác vụ không có HTTP user,
   lưu người thực hiện ở trạng thái không xác định thay vì làm hỏng thao tác lưu.
4. Đăng ký interceptor với DbContext tại composition root. Chỉ ghi nhận các entity
   thuộc phạm vi nghiệp vụ cần kiểm toán; tránh tự ghi audit cho chính `AuditLog`
   để không tạo vòng lặp.
5. Không đưa mật khẩu, token, dữ liệu xác thực hoặc bí mật cấu hình vào ảnh chụp
   trước/sau. Cần rà soát các trường nhạy cảm trước khi serialize.
6. Tạo migration PostgreSQL để tạo bảng và chỉ mục phục vụ truy vấn theo thời gian,
   người thao tác và entity.

## 4. File dự kiến sửa/thêm

### File dự kiến sửa

- `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/CulinaryBlogDbContext.cs`
  - Khai báo `DbSet<AuditLog>` và cấu hình bảng, độ dài, chỉ mục, kiểu dữ liệu.
- `culinary-blog/src/backend/src/CulinaryBlog.API/Program.cs`
  - Đăng ký và gắn interceptor vào DbContext đang được API sử dụng.
- `culinary-blog/src/backend/src/CulinaryBlog.Application/Common/Interfaces/IApplicationDbContext.cs`
  - Chỉ thêm `DbSet<AuditLog>` nếu các truy vấn phía Application cần truy cập tập hợp này.

### File dự kiến mới

- `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/AuditLog.cs`
  - Mô hình dữ liệu nhật ký kiểm toán.
- `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/Interceptors/AuditLogInterceptor.cs`
  - Thu thập thay đổi EF Core, lấy actor và tạo bản ghi audit an toàn.
- Migration EF Core cùng file metadata/snapshot tương ứng trong
  `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/Migrations/`.
- Kiểm thử tập trung cho việc ghi nhận thao tác và lọc dữ liệu nhạy cảm sẽ được
  phối hợp với task FR-TST-010, không gộp vào commit của task này nếu không cần thiết.

> Các file mã nguồn mới và migration chỉ được tạo sau khi được duyệt, theo yêu cầu
> xác nhận trước khi bổ sung file mới.

## 5. Phạm vi và tiêu chí hoàn thành

- Tạo được nhật ký với actor, hành động, entity/key, thời gian UTC và dữ liệu thay
  đổi được kiểm soát.
- Tạo/sửa/xóa mềm được phân loại nhất quán; không audit đệ quy.
- Hoạt động cả khi không có người dùng HTTP hiện tại.
- Nội dung nhạy cảm không bị ghi vào log.
- Migration áp dụng được trên PostgreSQL và không thay đổi/xóa dữ liệu nghiệp vụ
  hiện có.
- Build backend và kiểm thử liên quan chạy đạt; các kiểm thử bổ sung của Lab 8
  được tập trung ở FR-TST-010.

## 6. Ghi chú triển khai và giải thích

- **Entity** là cấu trúc dữ liệu miền được EF Core ánh xạ thành bảng.
- **SaveChangesInterceptor** chạy quanh lệnh lưu của EF Core, nhờ đó có thể quan
  sát thay đổi từ nhiều handler mà không phải chèn logic audit lặp lại ở từng API.
- **Actor** là danh tính thực hiện thao tác; dịch vụ hiện tại lấy danh tính từ
  request, còn tác vụ nền có thể không có actor.
- **Ảnh chụp trước/sau** hỗ trợ truy vết, nhưng phải loại bỏ trường nhạy cảm và
  giới hạn nội dung để log không trở thành nơi lưu bí mật.
- Việc tạo migration là cần thiết để cấu trúc bảng trong PostgreSQL khớp với mô
  hình Entity Framework.

## 7. Công cụ/môi trường dự kiến

- .NET SDK và Entity Framework Core CLI để build, tạo/kiểm tra migration và chạy test.
- PostgreSQL (có thể chạy qua Docker nếu cấu hình dự án yêu cầu) để áp dụng migration
  và xác minh bảng/index thực tế.
- Không cần thao tác với WSL nếu .NET SDK và PostgreSQL/Docker đang dùng được trên Windows.

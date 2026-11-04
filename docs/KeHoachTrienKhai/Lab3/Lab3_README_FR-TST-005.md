# Lab 3 — FR-TST-005: Bật SQL Logging và đo hiệu năng AsNoTracking

## Mục tiêu

So sánh truy vấn đọc entity có tracking với `AsNoTracking`, xác nhận hai chế độ
trả cùng số lượng recipe và quan sát thời gian thực thi/số entity được EF Core
theo dõi.

## Hiện trạng đã đối chiếu

- Test `AsNoTracking_reports_query_timing_and_does_not_track_entities` ở
  `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/UnitTest1.cs`
  migrate database, seed khi chưa có recipe, làm nóng truy vấn, rồi chạy 10 lần
  cho mỗi chế độ.
- Kết quả thời gian được ghi qua `ITestOutputHelper`; test đồng thời xác nhận
  kết quả hai query bằng nhau và ChangeTracker rỗng sau truy vấn no-tracking.
- `CreateDbContext()` hiện chỉ cấu hình `UseNpgsql`; chưa bật EF Core SQL
  logging. Cần bổ sung logging theo output của test để đáp ứng đầy đủ mã task.
- Đây là phép đo tham khảo phụ thuộc môi trường và kích thước dữ liệu, không
  phải benchmark thống kê để cam kết một tỷ lệ tăng tốc cố định.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/UnitTest1.cs` | Bật EF Core SQL logging vào test output mà không bật sensitive-data logging; đo tracking/no-tracking trên cùng query và ghi thời gian, trạng thái ChangeTracker. |
| `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/Repositories/RecipeRepository.cs` | Đối chiếu các truy vấn đọc đã dùng `AsNoTracking` và include navigation cần thiết. |
| `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/CulinaryBlogDbContext.cs` | Nơi cấu hình model liên quan nếu cần bảo đảm query test khớp schema. |

## Ý tưởng và giải thích code

1. Chuẩn bị database và dữ liệu trước phần đo; truy vấn warm-up không tính vào
   thời gian để giảm ảnh hưởng khởi tạo lần đầu.
2. Thực hiện cùng một query gồm `Include` các collection và `AsSplitQuery` ở
   cả hai chế độ. Cách này giữ nội dung truy vấn giống nhau để so sánh công
   bằng hơn.
3. Ở lượt tracking, EF Core tạo entry trong `ChangeTracker`; ghi lại số entity
   được theo dõi. Ở lượt no-tracking, gọi `AsNoTracking()` trên `IQueryable`
   trước khi thực thi để EF Core không giữ trạng thái entity.
4. Lặp query cùng số lần cho mỗi chế độ; xóa tracker giữa các lượt tracking để
   tránh entity từ vòng trước ảnh hưởng kết quả quan sát.
5. So sánh số lượng recipe trả về nhằm bảo đảm tối ưu hóa không đổi dữ liệu
   kết quả. In ms/query qua output test để người chạy có số liệu xem xét.

Để bật SQL logging, cấu hình `DbContextOptionsBuilder.LogTo` với
`ITestOutputHelper` trong `CreateDbContext` (hoặc `ILoggerFactory` tương đương).
Nếu cần dùng `_output`, chuyển helper tạo context từ `static` sang instance.
Không bật `EnableSensitiveDataLogging` trong test dùng dữ liệu thật; logging câu
SQL không cần tiết lộ giá trị parameter.

`AsNoTracking` phù hợp với dữ liệu chỉ đọc vì EF Core không cần lưu snapshot
trạng thái cho cập nhật. Nếu cần sửa entity rồi `SaveChanges`, phải dùng query
có tracking hoặc attach entity theo cách phù hợp.

## Kiểm tra cần chạy

- Chạy `AsNoTracking_reports_query_timing_and_does_not_track_entities` với
  PostgreSQL được cấu hình.
- Xác nhận câu SQL được ghi vào test output và sensitive-data logging vẫn tắt.
- Kiểm tra số recipe hai chế độ bằng nhau, tracked entity count lớn hơn 0 và
  tracker rỗng sau truy vấn no-tracking.
- Đọc kết quả thời gian như số liệu quan sát; chạy nhiều lượt trên cùng môi
  trường nếu cần so sánh đáng tin cậy hơn.

## Câu hỏi có thể được hỏi

- **Tracking dùng để làm gì?** Theo dõi thay đổi entity để EF Core phát hiện và
  ghi cập nhật khi gọi `SaveChanges`.
- **Vì sao `AsNoTracking` thường phù hợp cho query đọc?** Nó giảm công việc
  quản lý trạng thái entity không cần cập nhật.
- **`AsSplitQuery` có tác dụng gì ở đây?** Tách truy vấn khi load nhiều
  collection, tránh một join lớn nhân bản dòng dữ liệu; được giữ giống nhau
  trong hai trường hợp để phép so sánh tập trung vào tracking.
- **Thời gian đo có chứng minh chắc chắn no-tracking nhanh hơn không?** Không;
  timer đơn giản chịu ảnh hưởng cache, database, tải máy và kích thước dữ liệu.

## Trạng thái

- [x] Đã xác định test đo và query đọc liên quan.
- [ ] Bật SQL logging theo test output, chạy integration test trên PostgreSQL
  và lưu ý môi trường khi diễn giải thời gian.

# Lab 5 — FR-TST-007: 15 kịch bản kiểm thử API tự động

## Mục tiêu

Tạo `culinary-blog.http` dùng REST Client để chạy 15 kiểm thử theo request, xác minh status code và một số dữ liệu phản hồi của API hiện có.

## Hiện trạng đã kiểm tra

- Chưa có file `.http` trong repository.
- API chạy theo profile HTTP tại `http://localhost:5075`.
- Các route công thức hỗ trợ list, lookup theo slug/id, full-text search, create/update, publish/archive và delete.
- Request cần dữ liệu recipe/category có sẵn; backend Development chạy migration và seeder khi khởi động.
- Publish recipe thiếu nguyên liệu hoặc bước thực hiện trả lỗi Domain Rule (400); kịch bản sẽ kiểm tra hành vi hiện hành này thay vì giả định publish thành công.

## Kế hoạch triển khai

1. Tạo `culinary-blog/src/backend/culinary-blog.http`, dùng biến `baseUrl` trỏ đến profile HTTP hiện có.
2. Viết đúng 15 request, mỗi request có `client.test` kiểm tra status và/hoặc response.
3. Lấy recipe/category/author id và slug từ response của request danh sách đã đặt tên, tránh hard-code GUID ngẫu nhiên.
4. Chạy lần lượt kịch bản phụ thuộc theo thứ tự: list seed → lookup → create → read/update/publish/archive/delete.
5. Thêm các ca 404 và 400 cho tham số phân trang, trạng thái và từ khóa rỗng.

## Danh sách 15 kịch bản dự kiến

1. Lấy danh sách recipe thành công.
2. Lấy recipe seed theo slug thành công.
3. Tìm kiếm full-text thành công.
4. Tạo recipe hợp lệ (201).
5. Lấy recipe vừa tạo theo id (200).
6. Cập nhật recipe vừa tạo (200).
7. Publish recipe chưa có steps/ingredients, xác nhận lỗi nghiệp vụ (400).
8. Archive recipe vừa tạo (200).
9. Xóa mềm recipe vừa tạo (204).
10. Lấy recipe theo id không tồn tại (404).
11. Lấy recipe theo slug không tồn tại (404).
12. Truy vấn với `page` không hợp lệ (400).
13. Truy vấn với `pageSize` vượt giới hạn (400).
14. Truy vấn với `status` không hợp lệ (400).
15. Tìm kiếm với từ khóa rỗng (400).

## File dự kiến thay đổi

- `culinary-blog/src/backend/culinary-blog.http`

Không dự kiến thêm package, file mã nguồn hay thay đổi cấu hình ứng dụng.

## Kiểm tra và ghi nhận

- Đã xác nhận có đúng 15 request, 15 trường hợp được đánh số và 15 `client.test` assertions.
- URL, body, biến response và status kỳ vọng được đối chiếu với endpoint/DTO và domain rules hiện hành.
- Chưa chạy các request trên server thật: API Development hiện dừng khi khởi động do DI chưa đăng ký `IApplicationDbContext`; cần xử lý cấu hình khởi động và database ở môi trường riêng trước khi chạy file.
- Chạy thực tế cần API đang chạy cùng PostgreSQL và dữ liệu recipe seed; môi trường backend hiện dùng Docker Compose để chạy hạ tầng. Task này chỉ tạo test file, không tự khởi động hay thay đổi container.

## Trạng thái

- [ ] Triển khai
- [x] Kiểm tra cấu trúc/đếm đủ 15 test
- [ ] Chờ xác nhận của người dùng trước khi commit/push task này

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

- [x] Triển khai
- [x] Kiểm tra cấu trúc/đếm đủ 15 test
- [x] Commit/push `e1f3d63` lên `2312634-Huy`

## Giải thích file `.http` để trình bày

### Biến, thứ tự và dữ liệu giữa các request

- `@baseUrl` gom địa chỉ host để đổi môi trường ở một chỗ.
- `@accessToken` đọc token từ biến môi trường local. Token không được ghi vào file version-control.
- `# @name seedRecipes` đặt tên response của request đầu. REST Client sau đó có thể đọc `slug` và `categoryId` từ JSON response thay vì giả định giá trị seed.
- `# @name createRecipe` lưu response create; `createdRecipeId` dùng cùng resource cho các bước get/update/publish/archive/delete.
- Request có phụ thuộc biến phải chạy theo thứ tự từ trên xuống và cần REST Client extension xử lý các biến response.

### Vì sao mỗi request có assertion riêng

Block `client.test` chạy sau từng request, đọc `response.status` và fail rõ ràng nếu khác status kỳ vọng. Điều này phân biệt lỗi API ở từng bước thay vì chỉ nhìn thấy response cuối cùng. Status được chọn theo contract hiện tại: create `201`, read/update/action `200`, soft-delete `204`, lỗi đầu vào `400`, resource không tồn tại `404`.

Các request 1–9 kiểm tra luồng tuần tự trên dữ liệu seed và recipe mới; request 10–11 kiểm tra not-found; request 12–15 kiểm tra validation cho page, page size, status và từ khóa search. Request 7 cố tình publish recipe không có step/ingredient để xác nhận domain rule hiện hành trả `400`, không phải một tình huống thành công giả định.

Sau FR-BKE-009, các request ghi đính kèm Bearer token và request tạo không gửi `authorId`: API xác định tác giả từ claim đã xác thực, tránh tin dữ liệu quyền hạn do client tự khai báo.

### Giới hạn khi chạy

Đây là kịch bản REST Client chạy với API đang hoạt động, không phải test tự khởi tạo server. Cần cấu hình PostgreSQL/seed và biến `CULINARY_BLOG_ACCESS_TOKEN`; FR-TST-008 là bộ integration test chạy tự động trong TestServer, không phụ thuộc các dịch vụ đó.

### Câu hỏi thầy có thể hỏi

- **Vì sao không hard-code ID?** ID/slug seed được lấy từ response của API, nên kịch bản phù hợp với seed data thực tế hơn.
- **Vì sao phải chạy đúng thứ tự?** Request sau dùng response variable của request trước, ví dụ ID vừa tạo.
- **Vì sao test publish mong đợi 400?** Recipe được tạo không có ingredients/steps, vi phạm rule trước khi có thể publish.

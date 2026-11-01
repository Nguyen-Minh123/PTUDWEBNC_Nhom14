# Lab 3 - README - FR-DOM-003
## Kế hoạch triển khai chức năng: Định nghĩa `CategoryNotFoundException`

### 1. Mục tiêu
Thiết kế và chuẩn hóa exception nghiệp vụ cho module Category nhằm:
- biểu diễn rõ lỗi “không tìm thấy danh mục” ở tầng Domain;
- tách biệt lỗi nghiệp vụ với lỗi hệ thống;
- hỗ trợ mapping sang HTTP 404 ở tầng API;
- giúp mã nguồn dễ đọc, dễ kiểm thử và dễ mở rộng.

### 2. Ma trận quyền đã được xác nhận
Chức năng này không phải chức năng phân quyền trực tiếp. Tuy nhiên, để đảm bảo đúng nghiệp vụ:
- **Admin**: có thể tạo/sửa/xóa Category, khi thao tác với Category không tồn tại thì hệ thống phải trả lỗi phù hợp.
- **Author/Contributor**: có thể đọc dữ liệu Category nếu được cấp quyền truy cập nghiệp vụ.
- **Guest/User thường**: chỉ nhận thông báo lỗi chuẩn hóa khi truy vấn vào Category không tồn tại.

Kết luận: FR-DOM-003 không thêm quyền mới, nhưng phải dùng đúng chuẩn phản hồi lỗi cho mọi vai trò liên quan.

### 3. Hiện trạng đã kiểm tra
Đã kiểm tra và xác nhận:
- dự án có cấu trúc Clean Architecture;
- Domain đã có nền tảng cho lỗi nghiệp vụ như `DomainException`;
- module Category đã có nhu cầu xử lý trường hợp không tìm thấy dữ liệu;
- có thể tái sử dụng exception này trong các use case như: xem chi tiết, cập nhật, xóa Category.

### 4. Kế hoạch triển khai
Kế hoạch thực hiện gồm 4 bước:
1. Tạo lớp base `DomainException` nếu chưa có.
2. Tạo `CategoryNotFoundException` trong Domain.
3. Dùng exception này tại Application layer khi truy vấn Category thất bại.
4. Map exception sang HTTP 404 tại API layer bằng middleware hoặc exception handler.

### 5. File dự kiến thay đổi
Các file dự kiến liên quan:
- `src/backend/src/CulinaryBlog.Domain/Common/Exceptions/DomainException.cs`
- `src/backend/src/CulinaryBlog.Domain/Entities/Categories/CategoryNotFoundException.cs`
- `src/backend/src/CulinaryBlog.Application/...` các handler dùng Category
- `src/backend/src/CulinaryBlog.API/...` middleware / exception mapping

### 6. Kiểm tra và ghi nhận
Sau khi triển khai cần kiểm tra:
- build toàn bộ solution không lỗi;
- exception được ném đúng khi Category không tồn tại;
- API trả về HTTP 404 thay vì 500;
- thông điệp lỗi rõ ràng, có thể dùng cho log và debug;
- unit test hoặc integration test cho các trường hợp không tìm thấy Category.

### 7. Trạng thái
**Trạng thái hiện tại:** Đã triển khai phần Domain exception cơ bản, đang ở bước tích hợp vào Application/API và hoàn thiện kiểm thử.

### 8. Giải thích code để trình bày
Khi trình bày trước hội đồng, có thể giải thích ngắn gọn như sau:

- `DomainException` là lớp gốc cho các lỗi nghiệp vụ.
- `CategoryNotFoundException` kế thừa từ `DomainException` để biểu diễn lỗi “không tìm thấy Category”.
- Exception này giúp tách logic nghiệp vụ ra khỏi logic giao tiếp HTTP.
- Khi handler không tìm thấy dữ liệu, thay vì trả về `null`, hệ thống ném exception để API xử lý thống nhất.
- Cách làm này giúp code rõ ràng, dễ bảo trì và dễ mở rộng cho các module khác.

### 9. Câu hỏi giáo viên có thể hỏi
1. Vì sao không trả về `null` thay vì dùng exception?
2. Vì sao `CategoryNotFoundException` nên nằm ở Domain layer?
3. `DomainException` khác gì so với `Exception` thông thường?
4. Khi nào hệ thống sẽ trả về 404 thay vì 500?
5. Exception này có thể tái sử dụng cho module nào khác?
6. Nếu Category không tồn tại khi xóa, xử lý ở tầng nào là phù hợp nhất?
7. Làm sao đảm bảo exception này không làm lộ chi tiết hệ thống?
8. Vì sao cần chuẩn hóa lỗi theo kiến trúc Clean Architecture?

### 10. Kết luận
FR-DOM-003 giúp chuẩn hóa cách xử lý lỗi nghiệp vụ của module Category.  
Việc định nghĩa `CategoryNotFoundException` không chỉ giải quyết yêu cầu hiện tại mà còn tạo nền tảng cho các lỗi nghiệp vụ khác trong toàn hệ thống.
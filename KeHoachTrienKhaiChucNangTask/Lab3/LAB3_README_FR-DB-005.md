# Lab 3 - README - FR-DB-005
## Kế hoạch triển khai chức năng: Mở rộng Full-Text Search cho trường `Instructions`

### 1. Mục tiêu
Mở rộng cơ chế Full-Text Search của hệ thống Culinary Blog để tìm kiếm được cả nội dung trong trường `Instructions`.  
Mục tiêu chính:
- tăng độ chính xác của kết quả tìm kiếm;
- cho phép người dùng tìm recipe theo bước hướng dẫn nấu;
- nâng cao trải nghiệm search trên dữ liệu nội dung dài;
- giữ nguyên kiến trúc sạch, không làm bẩn Domain layer.

### 2. Ma trận quyền đã được xác nhận
Chức năng này không thay đổi phân quyền, chỉ mở rộng phạm vi dữ liệu được tìm kiếm.

- **Admin**: giám sát và kiểm tra hiệu năng search.
- **Author/Contributor**: tìm kiếm recipe theo nội dung hướng dẫn.
- **Guest/User thường**: tìm kiếm recipe công khai theo từ khóa trong `Instructions`.
- **Hệ thống**: chỉ mở rộng nguồn dữ liệu search, không thay đổi logic quyền truy cập.

Kết luận: FR-DB-005 là thay đổi ở tầng dữ liệu và truy vấn, không phát sinh quyền mới.

### 3. Hiện trạng đã kiểm tra
Đã kiểm tra và xác nhận:
- hệ thống đã có `SearchVector` và `GIN Index`;
- search hiện tại mới bao phủ `Title` và `Description`;
- trường `Instructions` là dữ liệu dài và có giá trị tìm kiếm cao;
- `RecipeConfiguration.cs` là nơi phù hợp để mở rộng biểu thức search;
- query handler đang dùng PostgreSQL full-text search nên có thể mở rộng trực tiếp.

### 4. Kế hoạch triển khai
Kế hoạch thực hiện gồm 4 bước:
1. Cập nhật biểu thức `SearchVector` để включают `Instructions`.
2. Giữ nguyên shadow property và `GIN Index` hiện có.
3. Tạo migration để đồng bộ cấu trúc database.
4. Kiểm tra lại query search và hiệu năng bằng `EXPLAIN ANALYZE`.

### 5. File dự kiến thay đổi
Các file dự kiến liên quan:
- `src/backend/src/CulinaryBlog.Infrastructure/Persistence/Configurations/RecipeConfiguration.cs`
- `src/backend/src/CulinaryBlog.Infrastructure/Persistence/Migrations/...`
- `src/backend/src/CulinaryBlog.Infrastructure/Persistence/Extensions/RecipeSearchExtensions.cs`
- `src/backend/src/CulinaryBlog.Application/Features/Recipes/Queries/GetRecipesByKeyword/...`

### 6. Kiểm tra và ghi nhận
Sau khi triển khai cần kiểm tra:
- migration chạy thành công;
- `SearchVector` đã bao gồm `Instructions`;
- truy vấn tìm kiếm trả về đúng kết quả khi keyword nằm trong phần hướng dẫn;
- `GIN Index` vẫn được sử dụng;
- `EXPLAIN ANALYZE` không cho thấy `Seq Scan` trên bảng lớn;
- kết quả search phù hợp hơn so với phiên bản chỉ tìm theo tiêu đề và mô tả.

### 7. Trạng thái
**Trạng thái hiện tại:** Đã phân tích và sẵn sàng mở rộng `SearchVector` cho `Instructions`, đang chờ migration và kiểm thử thực tế trên database.

### 8. Giải thích code để trình bày
Khi trình bày trước hội đồng, có thể giải thích ngắn gọn như sau:

- `Instructions` là phần mô tả cách nấu chi tiết nên chứa nhiều thông tin hữu ích cho tìm kiếm.
- Khi thêm `Instructions` vào `SearchVector`, hệ thống tìm được cả recipe có từ khóa nằm trong bước hướng dẫn.
- Việc này không thay đổi logic nghiệp vụ của Recipe, chỉ mở rộng phạm vi search.
- Cấu hình vẫn nằm ở Infrastructure để giữ Domain sạch.
- `GIN Index` giúp duy trì hiệu năng dù dữ liệu tăng lên.

### 9. Câu hỏi giáo viên có thể hỏi
1. Vì sao cần thêm `Instructions` vào search?
2. Thêm `Instructions` có làm chậm hệ thống không?
3. Vì sao không chỉ search theo `Title` và `Description`?
4. `SearchVector` được cập nhật ở đâu?
5. Tại sao vẫn dùng `GIN Index` sau khi mở rộng search?
6. Khi nào nên đưa một trường vào full-text search?
7. Có rủi ro gì nếu `Instructions` quá dài?
8. Làm sao kiểm tra query có dùng index hay không?
9. Vì sao thay đổi này thuộc Infrastructure chứ không phải Domain?
10. Nếu muốn search thêm `Category` hoặc `Tags` thì xử lý như thế nào?

### 10. Kết luận
FR-DB-005 giúp hệ thống tìm kiếm sâu hơn vào nội dung của recipe, đặc biệt là phần `Instructions`.  
Đây là bước mở rộng tự nhiên của Full-Text Search, giúp Culinary Blog trở nên thực tế hơn, thân thiện hơn với người dùng và vẫn giữ đúng kiến trúc Clean Architecture.
# Lab 3 - README - FR-DB-004
## Kế hoạch triển khai chức năng: Khởi tạo cấu trúc `SearchVector` & `GIN Index`

### 1. Mục tiêu
Triển khai cơ chế **Full-Text Search** cho hệ thống Culinary Blog bằng PostgreSQL, nhằm:
- tìm kiếm Recipe nhanh hơn theo từ khóa;
- tối ưu hiệu năng truy vấn trên dữ liệu lớn;
- chuẩn hóa kiến trúc tìm kiếm ở tầng Infrastructure;
- chuẩn bị nền tảng cho mở rộng tìm kiếm theo nhiều trường dữ liệu trong tương lai.

### 2. Ma trận quyền đã được xác nhận
Chức năng này **không thay đổi quyền truy cập**, nhưng ảnh hưởng đến cách người dùng sử dụng tính năng tìm kiếm.

- **Admin**: có thể kiểm tra, giám sát và tối ưu cấu hình search.
- **Author/Contributor**: có thể tạo và tìm kiếm Recipe của mình.
- **Guest/User thường**: có thể tìm kiếm Recipe công khai.
- **Hệ thống**: chỉ cho phép truy vấn dữ liệu được index và không làm thay đổi logic phân quyền hiện có.

Kết luận: FR-DB-004 là chức năng hạ tầng dữ liệu, không phát sinh quyền mới.

### 3. Hiện trạng đã kiểm tra
Đã kiểm tra và xác nhận:
- project đang dùng PostgreSQL 16;
- bảng `Recipes` đã có các trường dữ liệu phù hợp cho tìm kiếm;
- `RecipeConfiguration.cs` là nơi phù hợp để khai báo ánh xạ `SearchVector`;
- hệ thống cần hỗ trợ truy vấn tìm kiếm theo từ khóa trên `Title`, `Description`, và `Instructions`;
- có thể dùng `GIN index` để tăng tốc truy vấn full-text search.

### 4. Kế hoạch triển khai
Kế hoạch thực hiện gồm 4 bước:
1. Tạo `SearchVector` dưới dạng **shadow property** trong EF Core.
2. Sinh `SearchVector` từ các trường nội dung quan trọng của `Recipe`.
3. Tạo `GIN Index` trên cột `SearchVector`.
4. Kiểm tra lại query search để đảm bảo PostgreSQL dùng index thay vì quét toàn bảng.

### 5. File dự kiến thay đổi
Các file dự kiến liên quan:
- `src/backend/src/CulinaryBlog.Infrastructure/Persistence/Configurations/RecipeConfiguration.cs`
- `src/backend/src/CulinaryBlog.Infrastructure/Persistence/Extensions/RecipeSearchExtensions.cs`
- `src/backend/src/CulinaryBlog.Infrastructure/Persistence/Migrations/...`
- `src/backend/src/CulinaryBlog.Application/Features/Recipes/Queries/GetRecipesByKeyword/...`

### 6. Kiểm tra và ghi nhận
Sau khi triển khai cần kiểm tra:
- migration được tạo đúng;
- cột `SearchVector` sinh ra chính xác;
- `GIN Index` tồn tại trên bảng `Recipes`;
- query tìm kiếm có dùng index;
- kết quả search đúng với nội dung người dùng nhập;
- `EXPLAIN ANALYZE` cho thấy hiệu năng tốt hơn so với `Seq Scan`.

### 7. Trạng thái
**Trạng thái hiện tại:** Đã thiết kế xong cấu trúc `SearchVector` và `GIN Index`, đang ở bước tích hợp migration và kiểm tra hiệu năng thực tế.

### 8. Giải thích code để trình bày
Khi trình bày trước hội đồng, có thể giải thích ngắn gọn như sau:

- `SearchVector` là cột phục vụ full-text search trong PostgreSQL.
- Cột này được sinh từ các trường nội dung quan trọng như `Title`, `Description`, `Instructions`.
- `GIN Index` giúp PostgreSQL tra cứu từ khóa nhanh hơn nhiều so với quét toàn bảng.
- Việc đặt cấu hình này trong `RecipeConfiguration.cs` giúp giữ Domain sạch, không phụ thuộc chi tiết database.
- Đây là tối ưu ở tầng hạ tầng, không làm thay đổi logic nghiệp vụ của Recipe.

### 9. Câu hỏi giáo viên có thể hỏi
1. Vì sao không dùng `LIKE '%keyword%'` thay cho `SearchVector`?
2. Vì sao `SearchVector` nên đặt ở Infrastructure thay vì Domain?
3. `GIN Index` khác gì so với index thường?
4. Vì sao cần dùng shadow property?
5. `SearchVector` nên chứa những trường nào và vì sao?
6. Khi nào PostgreSQL chọn `Seq Scan` thay vì `Index Scan`?
7. `EXPLAIN ANALYZE` giúp đánh giá hiệu năng như thế nào?
8. Nếu dữ liệu tăng gấp 10 lần, cách này có còn hiệu quả không?
9. Có thể mở rộng search cho `Category` hoặc `Author` không?
10. Làm sao đảm bảo search nhanh mà không ảnh hưởng đến ghi dữ liệu?

### 10. Kết luận
FR-DB-004 là bước quan trọng để nâng cao hiệu năng tìm kiếm của Culinary Blog.  
Việc khởi tạo `SearchVector` và `GIN Index` giúp hệ thống:
- tìm kiếm chính xác hơn;
- phản hồi nhanh hơn;
- dễ mở rộng trong tương lai;
- phù hợp với kiến trúc Clean Architecture.
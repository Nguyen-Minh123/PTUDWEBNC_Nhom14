# Lab 3 - README - FR-DB-006  
## Kế hoạch triển khai chức năng: Phân tích hiệu năng truy vấn bằng `EXPLAIN ANALYZE`

### 1. Mục tiêu
Đánh giá hiệu năng truy vấn tìm kiếm Recipe trên PostgreSQL để xác định:
- truy vấn có đang sử dụng `GIN Index` hay không;
- mức độ tối ưu của Full-Text Search;
- thời gian thực thi thực tế khi dữ liệu tăng lên;
- các điểm nghẽn cần cải thiện trước khi đưa vào vận hành.

### 2. Ma trận quyền đã được xác nhận
Chức năng này không thay đổi quyền truy cập dữ liệu, nhưng phục vụ cho việc đánh giá và tối ưu hệ thống.

- **Admin**: có thể theo dõi hiệu năng và điều chỉnh cấu hình database.
- **Developer/Reviewer**: có thể đọc báo cáo `EXPLAIN ANALYZE` để đánh giá chất lượng truy vấn.
- **Author/Contributor**: không tác động trực tiếp, nhưng hưởng lợi từ tìm kiếm nhanh hơn.
- **Guest/User thường**: không có thay đổi về quyền, chỉ nhận kết quả tìm kiếm tốt hơn.

Kết luận: FR-DB-006 là hoạt động kiểm chứng hiệu năng, không tạo quyền mới.

### 3. Hiện trạng đã kiểm tra
Đã kiểm tra và xác nhận:
- hệ thống đã có `SearchVector` và `GIN Index`;
- query search đã dùng PostgreSQL Full-Text Search;
- kết quả tìm kiếm cần được đánh giá bằng dữ liệu thực tế thay vì suy đoán;
- PostgreSQL hỗ trợ `EXPLAIN (ANALYZE, BUFFERS, VERBOSE)` để đo chính xác thời gian và cách thực thi;
- đây là bước cần thiết trước khi kết luận cấu hình search đã đủ tốt.

### 4. Kế hoạch triển khai
Kế hoạch thực hiện gồm 4 bước:
1. Xác định câu SQL thực tế được EF Core sinh ra cho truy vấn tìm kiếm.
2. Chạy `EXPLAIN ANALYZE` trên câu truy vấn đó trong PostgreSQL.
3. Đọc các chỉ số quan trọng như `Seq Scan`, `Bitmap Index Scan`, `Execution Time`, `Rows`, `Buffers`.
4. Ghi nhận kết quả và đề xuất tối ưu nếu truy vấn chưa dùng đúng index hoặc còn chậm.

### 5. File dự kiến thay đổi
Các file dự kiến liên quan:
- `src/backend/src/CulinaryBlog.Application/Features/Recipes/Queries/GetRecipesByKeyword/GetRecipesByKeywordQueryHandler.cs`
- `src/backend/src/CulinaryBlog.Infrastructure/Persistence/Configurations/RecipeConfiguration.cs`
- `src/backend/src/CulinaryBlog.Infrastructure/Persistence/Extensions/RecipeSearchExtensions.cs`
- `docs/adr/...` hoặc tài liệu báo cáo hiệu năng nếu cần lưu kết quả phân tích

### 6. Kiểm tra và ghi nhận
Sau khi triển khai cần kiểm tra:
- câu truy vấn thực tế có đúng với query search trong ứng dụng;
- PostgreSQL có dùng `Bitmap Index Scan` trên `GIN Index` hay không;
- có xuất hiện `Seq Scan` không;
- `Execution Time` có ở mức chấp nhận được không;
- dữ liệu phân tích có đủ cơ sở để kết luận tối ưu hay chưa;
- nếu chậm, xác định nguyên nhân nằm ở lọc, sắp xếp hay số lượng bản ghi.

### 7. Trạng thái
**Trạng thái hiện tại:** Đã phân tích phương pháp đo hiệu năng, đang chờ chạy `EXPLAIN ANALYZE` trên môi trường PostgreSQL thực tế để ghi nhận kết quả cuối cùng.

### 8. Giải thích code để trình bày
Khi trình bày trước hội đồng, có thể giải thích ngắn gọn như sau:

- `EXPLAIN ANALYZE` cho biết PostgreSQL thực sự xử lý câu lệnh như thế nào.
- Nếu có `Bitmap Index Scan`, nghĩa là database đang tận dụng `GIN Index` tốt.
- Nếu xuất hiện `Seq Scan`, nghĩa là truy vấn đang quét toàn bảng và có nguy cơ chậm khi dữ liệu lớn.
- `Execution Time` cho biết thời gian thực thi thật, không phải thời gian ước lượng.
- Việc phân tích này giúp chứng minh hệ thống không chỉ đúng chức năng mà còn hợp lý về hiệu năng.

### 9. Câu hỏi giáo viên có thể hỏi
1. Vì sao không chỉ nhìn kết quả đúng/sai mà còn phải dùng `EXPLAIN ANALYZE`?
2. `Seq Scan` và `Bitmap Index Scan` khác nhau như thế nào?
3. Vì sao `GIN Index` phù hợp với Full-Text Search?
4. `Execution Time` có ý nghĩa gì trong đánh giá hiệu năng?
5. Nếu truy vấn đúng nhưng chậm thì có được xem là đạt không?
6. Làm sao biết PostgreSQL đang dùng index thật sự?
7. Khi nào nên tối ưu truy vấn thay vì chỉ tối ưu index?
8. Vì sao cần kiểm tra hiệu năng trước khi triển khai rộng?
9. `BUFFERS` giúp ích gì khi phân tích truy vấn?
10. Nếu dữ liệu tăng gấp 10 lần thì kết quả hiện tại có còn chấp nhận được không?

### 10. Kết luận
FR-DB-006 là bước kiểm chứng quan trọng để đánh giá chất lượng toàn bộ cơ chế tìm kiếm của Culinary Blog.  
Việc dùng `EXPLAIN ANALYZE` giúp xác nhận hệ thống không chỉ hoạt động đúng, mà còn vận hành hiệu quả, có cơ sở tối ưu và sẵn sàng mở rộng trong tương lai.

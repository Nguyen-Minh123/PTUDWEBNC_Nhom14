# Lab 3 — FR-TST-004: Kiểm thử thuật toán unaccent cho Full-Text Search

## Mục tiêu

Xác nhận PostgreSQL Full-Text Search có thể tìm văn bản tiếng Việt khi query
không gõ dấu, đồng thời không khớp một từ khóa không liên quan.

## Hiện trạng đã đối chiếu

- Kiểm thử tích hợp nằm trong
  `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/UnitTest1.cs`,
  test `Unaccent_matches_accented_text_in_full_text_search`.
- Test hiện chạy trực tiếp câu SQL trên PostgreSQL: so sánh nội dung tiếng Việt
  có dấu với từ khóa không dấu và một từ khóa khác.
- Cấu hình SearchVector của EF Core dùng `unaccent` trên các trường recipe; test
  trực tiếp xác nhận hành vi của PostgreSQL extension, không thay thế kiểm thử
  đầy đủ endpoint hoặc LINQ query của ứng dụng.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/UnitTest1.cs` | Giữ test tích hợp cho đối chiếu positive/negative; thêm chú thích giải thích vì sao cần extension và ý nghĩa từng kết quả. |
| `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/CulinaryBlogDbContext.cs` | Đối chiếu biểu thức tạo SearchVector có `unaccent` cho các trường được tìm kiếm. |
| `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/Migrations/20260929161740_AddSearchVector.cs` | Xác nhận migration cài extension và tạo cột/index tìm kiếm đúng với model. |

## Ý tưởng và giải thích code

1. Mở kết nối Npgsql đến database tích hợp được cấu hình qua
   `ConnectionStrings__DefaultConnection`.
2. Bảo đảm extension `unaccent` tồn tại trong database; PostgreSQL cần extension
   này để chuẩn hóa ký tự có dấu.
3. Tạo `tsvector` từ văn bản có dấu sau khi chuẩn hóa, sau đó tạo `tsquery` từ
   từ khóa không dấu. Kết quả `true` xác nhận hai dạng văn bản khớp.
4. Dùng một từ khóa khác làm negative case. Kết quả `false` giúp phát hiện test
   luôn trả true hoặc câu query bị viết quá rộng.
5. Ứng dụng lưu SearchVector dạng computed column và dùng PostgreSQL full-text
   operator để lọc; migration, extension và model phải cùng định nghĩa một
   phép chuẩn hóa nhất quán.

## Kiểm tra cần chạy

- Chạy test `Unaccent_matches_accented_text_in_full_text_search` trên PostgreSQL
  có quyền cài/đã cài extension `unaccent`.
- Xác nhận positive case trả `true`, negative case trả `false`.
- Nếu database test chạy trong container riêng, chuẩn bị connection string và
  extension tại database đó; InMemory provider không thực thi được SQL
  `to_tsvector`/`unaccent`.

## Câu hỏi có thể được hỏi

- **`unaccent` giải quyết vấn đề gì?** Loại bỏ dấu khỏi văn bản để truy vấn
  không dấu có thể khớp dữ liệu tiếng Việt có dấu.
- **Vì sao có cả positive và negative case?** Positive xác nhận tính năng cần
  có; negative xác nhận truy vấn không khớp tùy tiện.
- **Vì sao dùng PostgreSQL thật?** `unaccent`, `tsvector` và `tsquery` là hành
  vi riêng của PostgreSQL, không được mô phỏng đầy đủ bởi EF InMemory.
- **Test này chứng minh toàn bộ API search chưa?** Chưa; test chứng minh phép
  chuẩn hóa và đối sánh SQL. API/handler còn cần kiểm thử tích hợp riêng.

## Trạng thái

- [x] Đã xác định kiểm thử và cấu hình SearchVector liên quan.
- [ ] Chạy test cần PostgreSQL và xác nhận extension trong database test.

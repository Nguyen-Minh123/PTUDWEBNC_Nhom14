# Lab 3 — FR-DOM-004: Định nghĩa RecipeNotFoundException

## Mục tiêu

Biểu diễn trường hợp không tìm thấy recipe bằng một exception miền có kiểu rõ
ràng và mang theo ID đã được yêu cầu, để tầng Application/API có thể phân biệt
với lỗi kỹ thuật khác.

## Hiện trạng đã đối chiếu

- `RecipeNotFoundException` hiện được khai báo cùng file với
  `RecipeSlugConflictException` tại
  `culinary-blog/src/backend/src/CulinaryBlog.Domain/Exceptions/RecipeSlugConflictException.cs`.
- Exception nhận `Guid id`, kế thừa `DomainException` và đưa ID vào thông báo.
- Các command như publish, archive, update và delete đã ném exception khi
  không tìm thấy recipe; `GlobalExceptionHandler` ánh xạ nó thành HTTP 404.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Exceptions/RecipeSlugConflictException.cs` | Định nghĩa/ghi chú class `RecipeNotFoundException(Guid id)`; cân nhắc tách sang file cùng tên nếu quy ước mỗi exception một file được áp dụng. |
| `culinary-blog/src/backend/src/CulinaryBlog.Application/Features/Recipes/Commands/PublishRecipe/PublishRecipeCommandHandler.cs` | Ném exception khi truy vấn không tìm thấy recipe. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Infrastructure/GlobalExceptionHandler.cs` | Ánh xạ exception sang status 404/Problem Details. |
| `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/` | Bổ sung assertion kiểm tra hành vi handler/domain nếu chưa có test phù hợp. |

## Ý tưởng triển khai và giải thích code

1. Kế thừa `DomainException` để exception được nhận diện là lỗi nghiệp vụ của
   domain, khác với lỗi hệ thống hoặc lỗi lập trình.
2. Constructor nhận `Guid id` của recipe cần tìm; thông báo giữ ngữ cảnh để
   debug, nhưng không cần trả chi tiết nội bộ không phù hợp cho client.
3. Tầng Application phát exception tại nơi nhận kết quả null từ repository.
   Tầng Domain không phụ thuộc ASP.NET nên không quyết định status HTTP.
4. Global exception handler dịch kiểu exception thành HTTP 404 và response
   Problem Details; nhờ vậy API có phản hồi nhất quán cho client.

## Kiểm tra cần chạy

- Unit test handler với ID không tồn tại và xác nhận đúng loại exception được
  ném.
- Kiểm tra exception giữ đúng ý nghĩa resource và API trả HTTP 404.
- Chạy build backend để xác nhận namespace và quan hệ tham chiếu Domain →
  Application/API đúng chiều.

## Câu hỏi có thể được hỏi

- **Vì sao không ném `Exception` chung?** Kiểu riêng cho phép xử lý 404 có chủ
  đích và tránh nhầm với lỗi không dự kiến.
- **Vì sao exception nhận ID?** Để giữ ngữ cảnh resource bị thiếu cho log và
  thông báo lỗi.
- **Tại sao Domain không trả HTTP 404?** Domain không nên phụ thuộc framework
  web; ánh xạ HTTP thuộc trách nhiệm API.

## Trạng thái

- [x] Đã tìm thấy exception và các nơi gọi hiện có.
- [ ] Nên bổ sung test handler/API để xác nhận luồng 404 đầu-cuối.

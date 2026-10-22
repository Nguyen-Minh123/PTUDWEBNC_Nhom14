# Lab 3 — FR-DOM-005: Định nghĩa RecipeAlreadyPublishedException

## Mục tiêu

Tạo exception miền biểu đạt thao tác publish một recipe đã publish trước đó,
giúp domain rule được thể hiện bằng kiểu lỗi cụ thể thay vì exception chung.

## Hiện trạng đã đối chiếu

- Exception nằm tại
  `culinary-blog/src/backend/src/CulinaryBlog.Domain/Common/RecipeAlreadyPublishedException.cs`,
  kế thừa `InvalidOperationException` và có thông báo cố định.
- `Recipe.Publish()` hiện chỉ đặt `Status` thành `Published` và giữ nguyên
  `PublishedAt` đã có; phương thức chưa ném `RecipeAlreadyPublishedException`.
- `CulinaryBlog.UnitTests/UnitTest1.cs` có assertion mong đợi exception khi gọi
  `Publish()` lần hai, nhưng
  `CulinaryBlog.UnitTests/CulinaryBlog.UnitTests.csproj` hiện loại file này
  khỏi compile. Cần đưa test vào tập test được chạy và đồng bộ hành vi với
  assertion trước khi xem task đã hoàn chỉnh.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Common/RecipeAlreadyPublishedException.cs` | Định nghĩa exception chuyên biệt và giải thích tình huống nghiệp vụ. |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/Recipe.cs` | Trong `Publish`, kiểm tra trạng thái hiện tại trước khi thay đổi; ném exception chuyên biệt nếu đã Published. |
| `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/UnitTest1.cs` và `CulinaryBlog.UnitTests.csproj` | Xác nhận publish lần đầu thành công và lần kế tiếp trả đúng exception; bảo đảm file test được compile/chạy. |

## Ý tưởng triển khai và giải thích code

1. Kiểm tra trạng thái recipe ở đầu phương thức `Publish`; thực hiện guard trước
   khi sửa `Status` hoặc `PublishedAt` để thao tác lỗi không tạo side effect.
2. Nếu trạng thái đã là `Published`, ném `RecipeAlreadyPublishedException`.
   Kiểu riêng mô tả đúng domain rule và giúp caller/test bắt lỗi chính xác.
3. Với recipe chưa publish, đặt trạng thái thành `Published`. Gán
   `PublishedAt` từ tham số hoặc UTC hiện tại; toán tử `??=` giữ timestamp đã có
   nếu có.
4. Test hai nhánh: publish hợp lệ và publish lặp. Nhánh lặp phải xác nhận đúng
   exception cùng trạng thái/timestamp không bị thay đổi ngoài ý muốn.

## Kiểm tra cần chạy

- Chạy test domain/unit cho `Recipe.Publish`.
- Xác nhận test dùng đúng `RecipeAlreadyPublishedException`, không bị pass bởi
  một `InvalidOperationException` không liên quan.
- Chạy các test/application flow publish khác để bảo đảm không phá luồng publish
  lần đầu hoặc API error mapping.

## Câu hỏi có thể được hỏi

- **Vì sao kiểm tra trạng thái trước khi gán?** Để tuân thủ domain rule và tránh
  thay đổi một phần object rồi mới báo lỗi.
- **Tại sao không dùng exception tổng quát?** Exception chuyên biệt nói rõ lỗi
  nghiệp vụ, thuận tiện cho test và xử lý thống nhất.
- **`??=` trong `PublishedAt` có tác dụng gì?** Chỉ gán thời gian hiện tại khi
  chưa có giá trị, không ghi đè timestamp đã lưu.

## Trạng thái

- [x] Đã tìm thấy class exception, method domain và assertion liên quan.
- [ ] Cần đồng bộ `Recipe.Publish()` với unit test và chạy kiểm thử.

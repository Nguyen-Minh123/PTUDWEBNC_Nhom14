# Lab 2 — FR-TST-002: Hiện thực hóa Domain Rules xuất bản công thức

## Mục tiêu

Ngăn recipe chuyển sang trạng thái Published nếu thiếu ít nhất một ingredient
hoặc một step, đồng thời bảo đảm lần publish hợp lệ ghi nhận trạng thái và thời
điểm xuất bản theo quy tắc nghiệp vụ.

## Hiện trạng đã đối chiếu

- `Recipe.Publish()` kiểm tra aggregate phải có ít nhất một ingredient và một
  step; recipe đã Published bị chặn bằng `RecipeAlreadyPublishedException`.
- `PublishRecipeCommandHandler` chỉ điều phối: nạp recipe, gọi domain method,
  sau đó lưu unit of work. Lỗi domain được API ánh xạ thành HTTP 400.
- Đã thêm `RecipePublishRuleTests.cs` cho thiếu ingredients, thiếu steps,
  publish hợp lệ và publish lặp.
- Bốn test `RecipePublishRuleTests` đã pass khi build test project mà không
  rebuild project references; build chuẩn toàn bộ test project bị chặn bởi
  lỗi compile trong `RecipeDataSeeder.cs` cục bộ.
- `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/UnitTest1.cs` có các
  test về thiếu ingredient/step và publish lần đầu/lặp lại, nhưng
  `CulinaryBlog.UnitTests.csproj` hiện loại `UnitTest1.cs` khỏi compile. Không
  thể coi các assertion trong file này là test đang chạy.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/Recipe.cs` | Kiểm tra collection nội bộ trước khi publish; không đổi status/time nếu vi phạm rule. |
| `culinary-blog/src/backend/src/CulinaryBlog.Application/Features/Recipes/Commands/PublishRecipe/PublishRecipeCommandHandler.cs` | Orchestrate use case; domain method bảo vệ invariant trước khi save. |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Common/RecipeAlreadyPublishedException.cs` | Exception riêng cho publish lặp, kế thừa `DomainException` để API trả domain-rule status. |
| `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/RecipePublishRuleTests.cs` | Kiểm tra thiếu ingredients, thiếu steps, state/timestamp, publish hợp lệ và publish lặp. |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/RecipeAuthorizationMatrixTests.cs` | Test hiện có xác nhận authorization; domain rule được kiểm tra trực tiếp qua unit test. |

## Ý tưởng triển khai

1. Điều kiện “phải có ingredients và steps” là invariant của Recipe, nên
   `Recipe.Publish()` kiểm tra trực tiếp collection mà aggregate sở hữu.
2. Nếu recipe đã Published, ném `RecipeAlreadyPublishedException`; exception
   kế thừa `DomainException` để GlobalExceptionHandler trả HTTP 400 thay vì 500.
3. Khi bất kỳ rule nào vi phạm, ném exception trước khi đổi status hoặc
   `PublishedAt`; map exception ra response HTTP theo GlobalExceptionHandler.
4. Test từng nhánh độc lập: thiếu ingredient, thiếu step, đủ cả hai và publish
   lặp. Xác nhận trạng thái không đổi khi thao tác thất bại.
5. Test handler với repository/unit-of-work fake để xác nhận không gọi
   `SaveChangesAsync` khi rule không đạt; test endpoint riêng để kiểm tra HTTP
   contract.

## Kiểm tra sau triển khai

- Unit test Domain/handler phải được test runner discover và chạy. Test mới
  nằm trong file riêng, không bị `Compile Remove="UnitTest1.cs"` loại bỏ.
- Chạy test cases vi phạm/hợp lệ và xác nhận state/timestamp/save call.
- Khi API build được, có thể bổ sung test HTTP riêng cho publish-invalid để
  xác nhận GlobalExceptionHandler chuyển domain failure thành HTTP 400.
- Build backend sau khi xác định seeder cục bộ đã được đồng bộ với Domain API.

## Giải thích code để trình bày

- Aggregate root `Recipe` phù hợp để bảo vệ invariant liên quan collection
  `Steps` và `Ingredients`, bởi nó sở hữu và kiểm soát các collection này.
- Command handler điều phối use case, đọc dữ liệu và lưu thay đổi; không nên là
  nơi duy nhất bảo vệ invariant nếu entity còn được gọi từ đường khác.
- Kiểm tra trước khi đổi trạng thái tránh object rơi vào trạng thái nửa thành
  công khi rule thất bại.
- Unit test domain xác nhận quy tắc độc lập HTTP/database; integration test
  xác nhận exception được chuyển thành kết quả HTTP đúng.

## Trạng thái

- [x] Đưa invariant về Domain aggregate và thêm unit test trong file được compile.
- [x] Chạy focused tests: 4 passed với Domain assembly đã build.
- [ ] Chạy lại qua build chuẩn sau khi lỗi compile ở seeder cục bộ được xử lý.

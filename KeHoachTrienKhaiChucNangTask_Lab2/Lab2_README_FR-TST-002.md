# Lab 2 — FR-TST-002: Hiện thực hóa Domain Rules xuất bản công thức

## Mục tiêu

Ngăn recipe chuyển sang trạng thái Published nếu thiếu ít nhất một ingredient
hoặc một step, đồng thời bảo đảm lần publish hợp lệ ghi nhận trạng thái và thời
điểm xuất bản theo quy tắc nghiệp vụ.

## Hiện trạng đã đối chiếu

- `PublishRecipeCommandHandler` hiện kiểm tra `Ingredients` và `Steps`; thiếu
  một trong hai thì ném `DomainException`, sau đó gọi `recipe.Publish()` và
  lưu unit of work.
- `Recipe.Publish()` trong `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/Recipe.cs`
  hiện chỉ cập nhật status và `PublishedAt`; rule thành phần bắt buộc chưa nằm
  trực tiếp ở method Domain.
- `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/UnitTest1.cs` có các
  test về thiếu ingredient/step và publish lần đầu/lặp lại, nhưng
  `CulinaryBlog.UnitTests.csproj` hiện loại `UnitTest1.cs` khỏi compile. Không
  thể coi các assertion trong file này là test đang chạy.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/Recipe.cs` | Chốt vị trí chịu trách nhiệm của rule; nếu chuyển rule vào aggregate, expose kiểm tra theo collection và ném domain exception cụ thể. |
| `culinary-blog/src/backend/src/CulinaryBlog.Application/Features/Recipes/Commands/PublishRecipe/PublishRecipeCommandHandler.cs` | Giữ handler làm orchestration; nạp recipe, gọi domain operation, lưu thay đổi và truyền cancellation token. |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Common/RecipeAlreadyPublishedException.cs` | Dùng exception cụ thể cho publish lặp nếu quy tắc task yêu cầu không cho publish lại. |
| `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/` | Đưa test domain vào file được compile; kiểm tra thiếu ingredients, thiếu steps, hợp lệ, publish lặp và timestamp. |
| `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/CulinaryBlog.UnitTests.csproj` | Bỏ exclude test file cũ hoặc chuyển test sang file test được project compile. |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/` | Thêm HTTP test cho endpoint publish: resource không tồn tại, rule violation và publish thành công. |

## Ý tưởng triển khai

1. Xác định ranh giới domain/application nhất quán: điều kiện “phải có
   ingredients và steps” là invariant của Recipe nếu recipe không bao giờ
   được publish khi thiếu thành phần. Khi đó `Recipe.Publish()` nên tự bảo vệ
   invariant để mọi caller đều tuân thủ.
2. Nếu giữ validation ở command handler theo thiết kế hiện tại, bảo đảm mọi
   đường gọi publish đều đi qua handler; không nhân đôi rule ở nhiều tầng nếu
   chưa có lý do.
3. Khi vi phạm, ném domain exception rõ nghĩa trước khi đổi status hoặc
   `PublishedAt`; map exception ra response HTTP theo GlobalExceptionHandler.
4. Test từng nhánh độc lập: thiếu ingredient, thiếu step, thiếu cả hai, đủ cả
   hai, và publish lặp nếu rule quy định cấm. Xác nhận trạng thái không đổi khi
   thao tác thất bại.
5. Test handler với repository/unit-of-work fake để xác nhận không gọi
   `SaveChangesAsync` khi rule không đạt; test endpoint riêng để kiểm tra HTTP
   contract.

## Kiểm tra sau triển khai

- Unit test Domain/handler phải được test runner discover và chạy; kiểm tra
  không còn `Compile Remove` loại file chứa các assertion cần thiết.
- Chạy test cases vi phạm/hợp lệ và xác nhận state/timestamp/save call.
- Chạy integration test endpoint publish; xác nhận lỗi nghiệp vụ không bị đổi
  thành HTTP 500 ngoài ý muốn.
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

- [x] Đã xác định rule hiện tại, vị trí kiểm tra và vấn đề test bị loại khỏi build.
- [ ] Chọn ranh giới invariant Domain/Application, đưa test vào project đang
  chạy và xác nhận endpoint publish.

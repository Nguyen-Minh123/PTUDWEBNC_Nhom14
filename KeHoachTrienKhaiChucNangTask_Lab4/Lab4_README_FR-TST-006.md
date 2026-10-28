# Lab 4 — FR-TST-006: Seeder và kiểm thử API mới

## Mục tiêu

Đảm bảo dữ liệu mẫu phục vụ đầy đủ các luồng API recipe, đặc biệt là nguyên
liệu và bước nấu; đồng thời có kiểm thử tự động cho lifecycle API và các
endpoint mới để phát hiện sai lệch giữa HTTP contract, Domain rules và dữ liệu
được lưu.

## Hiện trạng đã đối chiếu

- `RecipeDataSeeder` đã tạo 25 công thức mẫu cùng category, author, ingredients,
  steps và nutrition; recipe được publish sau khi có ingredient/step.
- `RecipeDataSeederTests` đã xác nhận số lượng recipe/category, author, quan hệ
  con, nutrition, trạng thái Published và idempotency.
- `RecipeAuthorizationMatrixTests` đã gửi request thật qua API test host cho
  các thao tác create/update/publish/archive/delete và các vai trò người dùng.
- `RecipeEndpointValidationTests` và `RecipeNutritionContractTests` đã kiểm tra
  một số contract API. Cần rà soát coverage để bổ sung kiểm tra nội dung thay
  đổi và CRUD cho ingredient/step nếu chưa được bao phủ.

## Phạm vi triển khai / đối chiếu

- Giữ seeder phù hợp với constructor/domain API hiện hành; mỗi recipe phải có
  khóa ngoại hợp lệ và tập ingredients/steps thuộc đúng recipe.
- Bảo đảm chạy seed lần hai không nhân đôi category, recipe hoặc quan hệ con.
- Mở rộng integration tests qua HTTP cho CRUD recipe, publish/archive/delete,
  cùng các route nguyên liệu và bước nấu.
- Kiểm tra status code, response body, state sau request, validation, 404,
  401/403 và không để test phụ thuộc vào dữ liệu ngoài test host.
- Tái sử dụng factory/auth handler hiện có trong integration tests thay vì
  tạo một cơ chế xác thực test khác.

## File liên quan

| File | Vai trò / vị trí cần xem |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/RecipeDataSeeder.cs` | Khai báo dữ liệu mẫu, tạo recipe cùng ingredients/steps/nutrition và lưu qua EF Core. |
| `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/Seeder/RecipeDataSeederTests.cs` | Kiểm tra số lượng, tính hợp lệ quan hệ và idempotency của seeder. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Endpoints/RecipeEndpoints.cs` | API tạo/sửa/publish/archive/xóa mềm và response HTTP. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Endpoints/RecipeIngredientsEndpoints.cs` | Route quản lý nguyên liệu của recipe. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Endpoints/RecipeStepsEndpoints.cs` | Route quản lý bước thực hiện. |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/RecipeAuthorizationMatrixTests.cs` | Mẫu test HTTP có identity/role giả lập cho thao tác recipe. |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/RecipeEndpointValidationTests.cs` | Mẫu kiểm tra contract và validation endpoint. |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/RecipeNutritionContractTests.cs` | Mẫu xác minh response contract API. |

## Ý tưởng triển khai và giải thích code

1. Seeder khai báo nguồn dữ liệu mẫu cố định (tên món, nguyên liệu, hướng dẫn)
   và dùng Bogus tạo thuộc tính biến thiên trong khoảng hợp lệ.
2. Tạo category/author trước, sau đó tạo recipe có foreign key hợp lệ. Thêm
   `RecipeIngredient` và `RecipeStep` vào chính recipe để EF Core lưu đúng
   navigation relationship.
3. Chỉ gọi `Publish()` sau khi recipe đã có đủ ingredient và step nhằm tuân
   thủ invariant của Domain; nutrition là dữ liệu giả lập, không phải thông
   tin dinh dưỡng đã được kiểm chứng.
4. Unit test dùng database cô lập để kiểm tra cấu trúc dữ liệu và gọi seeder
   hai lần để xác nhận tính idempotent.
5. Integration test dùng `WebApplicationFactory`/test auth handler gửi HTTP
   request qua routing, middleware, authorization và handler. Mỗi test nên
   kiểm tra response cùng trạng thái dữ liệu cuối, tránh chỉ kiểm tra rằng
   request không phát sinh exception.

## Ghi chú kiến thức cần trình bày

- **Vì sao tách unit test seeder khỏi integration test API?** Unit test seeder
  nhanh và tập trung vào graph dữ liệu; integration test xác minh contract
  xuyên suốt HTTP pipeline.
- **Idempotency có ý nghĩa gì?** Gọi seeder lại không tạo thêm bản ghi trùng,
  rất quan trọng khi ứng dụng chạy khởi động lại nhiều lần.
- **Vì sao recipe phải có steps/ingredients trước khi publish?** Đây là điều
  kiện nghiệp vụ của công thức đã xuất bản, không chỉ là yêu cầu hiển thị.
- **Vì sao test nên xác nhận body và database state?** HTTP 200/201 riêng lẻ
  chưa chứng minh dữ liệu được cập nhật đúng hoặc quan hệ được lưu đúng.
- Dữ liệu sinh bởi Bogus phục vụ phát triển/kiểm thử; không dùng để suy luận
  độ chính xác dinh dưỡng hoặc hành vi dữ liệu thật.

## Kiểm tra sau triển khai

- Chạy `CulinaryBlog.UnitTests`, đặc biệt `RecipeDataSeederTests`.
- Chạy `CulinaryBlog.IntegrationTests` với các lớp recipe lifecycle,
  authorization, validation, nutrition, ingredient và step.
- Bao phủ thêm trường hợp request thành công, dữ liệu không hợp lệ, ID không
  tồn tại, quyền bị từ chối và thao tác trạng thái không hợp lệ.
- Xác nhận test có dữ liệu cô lập, không cần database đang chạy ngoài ý muốn;
  kiểm tra kết quả cuối của recipe, steps và ingredients.

## Git

- Nhánh làm việc: `2312634-Huy`.
- Seeder và một số integration tests đã tồn tại trước khi tạo README; các kiểm
  tra ghi trong phạm vi triển khai là danh sách cần đối chiếu/bổ sung, không
  khẳng định coverage chưa có đã được hoàn thành.

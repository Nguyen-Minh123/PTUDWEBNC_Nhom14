# Lab 3 — FR-TST-003: Mở rộng seeding dữ liệu thực tế bằng Bogus

## Mục tiêu

Tạo dữ liệu mẫu đa dạng, nhất quán và đủ quan hệ để kiểm thử danh sách, chi tiết,
tìm kiếm, nguyên liệu, bước nấu và thông tin dinh dưỡng của công thức. Seeding
phải tuân thủ Domain API, tạo đủ category/author và không tạo bản ghi trùng khi
được gọi lại.

## Hiện trạng đã đối chiếu

- Seeding nằm ở `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/RecipeDataSeeder.cs`;
  thư viện `Bogus` đã được sử dụng thông qua `Faker`.
- Seeder tạo bốn Category, đảm bảo seeder author, sau đó tạo 25 Recipe cùng
  ingredients, steps và sáu giá trị nutrition bằng Bogus.
- Các entity được tạo đúng constructor hiện tại của Domain; recipe chỉ được
  publish sau khi đã có cả ingredient và step.
- `SeedAsync` giữ guard `Recipes.AnyAsync` để tránh thêm dữ liệu lần nữa khi
  database đã có recipe.
- `RecipeDataSeederTests` xác nhận category/author, đủ quan hệ và số lượng bản
  ghi liên quan không tăng ở lần seed thứ hai.
- `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/CulinaryBlog.UnitTests.csproj`
  hiện có `Compile Remove="UnitTest1.cs"`; file này không tham gia compile/test
  của unit-test project.
- Trước khi sửa, build báo lỗi do seeder dùng constructor `Recipe` cũ, gọi
  `AddIngredient`/`AddStep` sai overload và tham chiếu `NutritionInfo`/
  `SetNutritionInfo` không tồn tại. Các lỗi đó đã được xử lý theo API Domain
  hiện hành.
- Build Infrastructure, API, UnitTests và IntegrationTests đều thành công;
  toàn bộ 14 unit tests và 22 authorization + 8 validation/nutrition
  integration tests đã pass.

## File liên quan

| File | Vai trò / nội dung cần kiểm tra |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/RecipeDataSeeder.cs` | Khai báo categories và tập món mẫu; tạo recipe đầy đủ theo constructor Domain, gắn author/category, sinh ingredients/steps/nutrition rồi publish và lưu bằng EF Core. |
| `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/Seeder/RecipeDataSeederTests.cs` | Kiểm tra đủ 4 category, 25 recipe, user tác giả, quan hệ con, trạng thái published và idempotency của recipe/ingredients/steps. |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/Recipe.cs` | Chứa các quy tắc tạo công thức và thêm bước/nguyên liệu mà dữ liệu seed phải tuân thủ. |

## Ý tưởng triển khai và giải thích code

1. Dùng các danh sách dữ liệu nền như tên món, nguyên liệu và hướng dẫn nấu để
   nội dung sinh ra vẫn có ý nghĩa, không phải chuỗi ký tự ngẫu nhiên.
2. Tạo một `Faker` với locale phù hợp; dùng `Random.Int`, `Random.Decimal`,
   `PickRandom` hoặc `ArrayElements` để sinh thời gian, khẩu phần, dinh dưỡng,
   nguyên liệu và bước trong các khoảng hợp lệ. Giá trị Bogus là dữ liệu mẫu,
   không phải số liệu dinh dưỡng đã được kiểm chứng.
3. Tạo quan hệ trước khi lưu: mỗi recipe cần các `RecipeIngredient` và
   `RecipeStep` thuộc đúng recipe; nếu schema bắt buộc category/author thì seed
   các thực thể cha trước và gán khóa ngoại hợp lệ.
4. Kiểm tra dữ liệu đã có trước khi seed hoặc dùng khóa/chiến lược upsert phù
   hợp để chạy lại seeder không tạo bản ghi trùng.
5. Truyền `CancellationToken` qua các lệnh EF Core bất đồng bộ để tác vụ seed
   có thể được hủy theo vòng đời khởi động ứng dụng.

## Kiểm tra cần chạy

- Chạy `CulinaryBlog.UnitTests` và xác nhận test về dữ liệu hợp lệ, đủ quan hệ
  và idempotency đều khớp với cấu trúc recipe hiện hành.
- Xác nhận model bắt buộc category/author có dữ liệu liên kết hợp lệ; không chỉ
  kiểm tra số lượng recipe.
- Chạy seed hai lần trên cùng database và kiểm tra số lượng record không tăng
  ở lần chạy sau.

## Câu hỏi có thể được hỏi

- **Bogus/Faker có tác dụng gì?** Sinh biến thể dữ liệu mẫu có kiểm soát, giúp
  kiểm tra với nhiều nội dung hơn dữ liệu cố định.
- **Vì sao vẫn cần danh sách mẫu?** Faker quyết định biến thể, còn danh sách
  nền đảm bảo nội dung có ý nghĩa nghiệp vụ.
- **Idempotent nghĩa là gì?** Chạy lại cùng một thao tác không làm phát sinh
  thêm dữ liệu trùng ngoài dự kiến.
- **Vì sao phải kiểm tra quan hệ?** Recipe có thể hợp lệ về chuỗi nhưng vẫn lỗi
  khi lưu nếu thiếu khóa ngoại hoặc ingredient/step không thuộc đúng recipe.
- **Dữ liệu có giống nhau giữa các lần chạy không?** Bogus tạo giá trị giả lập;
  ID entity vẫn được sinh mới. Muốn tái lập fixture hoàn toàn cần cấu hình seed
  riêng, còn việc tránh nhân đôi được đảm bảo bởi guard idempotency.

## Trạng thái

- [x] Đồng bộ lời gọi seeder với Domain API hiện hành.
- [x] Kiểm tra seeder tạo dữ liệu đủ quan hệ và chạy lại không nhân đôi.
- [x] Build backend projects và chạy focused/full test suites thành công.

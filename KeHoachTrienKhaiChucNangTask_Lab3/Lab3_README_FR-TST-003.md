# Lab 3 — FR-TST-003: Mở rộng seeding dữ liệu thực tế bằng Bogus

## Mục tiêu

Tạo dữ liệu mẫu đa dạng, nhất quán và đủ quan hệ để kiểm thử danh sách, chi tiết,
tìm kiếm, nguyên liệu, bước nấu và thông tin dinh dưỡng của công thức. Dữ liệu
ngẫu nhiên phải có thể tái tạo khi cần debug và không được tạo bản ghi trùng mỗi
lần ứng dụng khởi động.

## Hiện trạng đã đối chiếu

- Seeding nằm ở `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/RecipeDataSeeder.cs`;
  thư viện `Bogus` đã được sử dụng thông qua `Faker`.
- Bản đang có trong working tree hiện là thay đổi chưa commit. Bản đó tạo tên
  món từ danh sách, sinh ngẫu nhiên nguyên liệu, bước và dinh dưỡng rồi chỉ thêm
  `Recipes`.
- `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/Seeder/RecipeDataSeederTests.cs`
  hiện vẫn mong đợi bốn `Categories`, dữ liệu recipe không rỗng và gọi seeder
  hai lần không nhân đôi dữ liệu. Vì vậy test và seeder hiện tại chưa đồng nhất;
  cần đối chiếu lại trước khi xác nhận task hoàn tất.
- `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/CulinaryBlog.UnitTests.csproj`
  hiện có `Compile Remove="UnitTest1.cs"`; file này không tham gia compile/test
  của unit-test project.
- Build unit-test/integration-test project hiện đang dừng ở các lỗi compile
  trong seeder cục bộ: constructor `Recipe`, `AddIngredient`, `AddStep` và API
  dinh dưỡng được gọi không khớp với Domain model hiện tại. Cần đồng bộ cách
  tạo recipe/ingredient/step/nutrition theo API thực tế rồi build lại.
- Không chỉnh sửa hoặc đưa phần thay đổi cục bộ đang có trong seeder vào commit
  kế hoạch này.

## File liên quan

| File | Vai trò / nội dung cần kiểm tra |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/RecipeDataSeeder.cs` | Khai báo tập dữ liệu mẫu, dùng Bogus tạo thuộc tính biến thiên, tạo công thức cùng các bước/nguyên liệu và lưu bằng EF Core. Đây hiện là file có thay đổi cục bộ chưa commit. |
| `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/Seeder/RecipeDataSeederTests.cs` | Kiểm tra chất lượng dữ liệu tạo ra và tính idempotent của seeder. |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/Recipe.cs` | Chứa các quy tắc tạo công thức và thêm bước/nguyên liệu mà dữ liệu seed phải tuân thủ. |

## Ý tưởng triển khai và giải thích code

1. Dùng các danh sách dữ liệu nền như tên món, nguyên liệu và hướng dẫn nấu để
   nội dung sinh ra vẫn có ý nghĩa, không phải chuỗi ký tự ngẫu nhiên.
2. Tạo một `Faker` với locale phù hợp; dùng `Random.Int`, `Random.Decimal`,
   `PickRandom` hoặc `ArrayElements` để sinh thời gian, khẩu phần, dinh dưỡng,
   nguyên liệu và bước trong các khoảng hợp lệ.
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

## Trạng thái

- [x] Đã xác định mã task và các file liên quan.
- [ ] Cần đồng bộ seeder đang sửa với `RecipeDataSeederTests` và chạy test trước
  khi xác nhận hoàn thành.

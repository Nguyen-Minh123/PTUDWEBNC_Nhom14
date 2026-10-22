# Lab 2 — FR-DVO-002: Cấu hình 6 chỉ số dinh dưỡng

## Mục tiêu

Đồng bộ sáu chỉ số dinh dưỡng của một recipe từ Domain và database qua API đến
frontend: calories, protein, carbohydrates, fat, fiber và sodium. Thống nhất
ý nghĩa, đơn vị, kiểu nullable và cách serialize để dữ liệu hiển thị không bị
mất hoặc dùng nhầm giá trị mặc định.

## Hiện trạng đã đối chiếu

- `RecipeNutrition` trong `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/Recipe.cs`
  hiện có đúng sáu property: `Calories`, `Protein`, `Carbohydrates`, `Fat`,
  `Fiber`, `Sodium`.
- `CulinaryBlogDbContext` cấu hình Nutrition là owned type, lưu cùng bảng
  recipe với các cột prefix `Nutrition_`.
- DTO backend trong
  `culinary-blog/src/backend/src/CulinaryBlog.Application/DTOs/RecipeDtos.cs`
  hiện có `RecipeNutritionDto`; `RecipeEndpoints` map đủ sáu thuộc tính vào
  response chi tiết.
- Frontend `RecipeNutritionDto` đã đồng bộ camelCase với response backend.
  Component hiển thị dữ liệu API và thông báo “Chưa có dữ liệu” cho giá trị
  nullable thay vì thay bằng số mẫu; thanh phần trăm trang trí tĩnh đã bỏ.
- Integration test `RecipeNutritionContractTests` kiểm tra sáu giá trị JSON.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/Recipe.cs` | Bảo đảm sáu giá trị thuộc Nutrition value object, thống nhất nullable và quy ước đơn vị. |
| `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/CulinaryBlogDbContext.cs` | Ánh xạ sáu field vào cột owned-type có tên/precision nhất quán; kiểm tra migration/schema. |
| `culinary-blog/src/backend/src/CulinaryBlog.Application/DTOs/RecipeDtos.cs` | Định nghĩa `RecipeNutritionDto` nullable gồm sáu giá trị và gắn vào `RecipeDetailDto`. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Endpoints/RecipeEndpoints.cs` | Ánh xạ sáu thuộc tính của `Recipe.Nutrition` sang JSON response chi tiết. |
| `culinary-blog/src/frontend/src/types/recipe.dto.ts` | Đồng bộ sáu field nullable với JSON contract camelCase. |
| `culinary-blog/src/frontend/src/components/recipe-detail/RecipeNutrition.tsx` | Hiển thị đơn vị, giá trị từ API hoặc trạng thái chưa có dữ liệu; không hiển thị số dinh dưỡng mẫu như dữ liệu thật. |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/RecipeNutritionContractTests.cs` | Kiểm tra HTTP detail response trả đúng sáu giá trị nutrition. |

## Ý tưởng triển khai

1. Contract backend và frontend dùng chung sáu tên camelCase: `calories`,
   `protein`, `carbohydrates`, `fat`, `fiber`, `sodium`. UI thể hiện calories
   bằng kcal, protein/carbohydrates/fat/fiber bằng g, sodium bằng mg.
2. DTO biểu diễn số liệu nullable; `null` được hiển thị thành “Chưa có dữ liệu”
   thay vì thay bằng giá trị giả.
3. Giữ precision phù hợp cho `decimal`; xác minh owned mapping tạo đúng sáu cột
   và migration không làm mất dữ liệu hiện có.
4. Kiểm thử serialize/deserialize để xác nhận casing camelCase và ánh xạ tên
   backend sang frontend đúng contract.
5. Hiển thị sáu nhãn/đơn vị và bỏ progress bar phần trăm hard-code để UI không
   ngụ ý một đánh giá dinh dưỡng đã được tính.

## Kiểm tra sau triển khai

- Integration/API test `RecipeNutritionContractTests` kiểm tra response JSON
  có đủ sáu chỉ số và giá trị decimal dự kiến.
- Build backend; chạy lint/typecheck/build frontend theo script dự án.
- Application project build, frontend ESLint và TypeScript typecheck đã qua.
  API/integration build chuẩn hiện bị chặn bởi lỗi compile ở seeder cục bộ;
  integration contract test mới compile được khi không build lại project
  references nhưng chưa chạy được với output Infrastructure cũ.
- Kiểm tra migration/schema và màn hình chi tiết recipe với dữ liệu đủ/thiếu
  nutrition.

## Giải thích code để trình bày

- Owned type `RecipeNutrition` là nhóm giá trị thuộc về Recipe, không có vòng
  đời độc lập; EF Core lưu các thuộc tính của nó cùng aggregate.
- `decimal?` vừa giữ độ chính xác cho lượng dinh dưỡng, vừa cho phép biểu diễn
  “chưa có số liệu” khác với giá trị 0.
- DTO là hợp đồng truyền qua API; chỉ thêm field trong entity mà không map sang
  DTO thì frontend sẽ không nhận được dữ liệu đó.
- UI hiển thị “Chưa có dữ liệu” cho `null` để không nhầm giá trị mẫu với dữ
  liệu đã lưu; đơn vị hiển thị cần nhất quán với nguồn nhập số liệu.

## Trạng thái

- [x] Đồng bộ API detail contract và frontend cho sáu field.
- [x] Thêm integration contract test cho sáu giá trị.
- [x] Frontend lint/typecheck và Application build đã qua.
- [ ] Chạy API/integration test trên các project references được build đồng bộ
  sau khi lỗi compile seeder cục bộ được xử lý.

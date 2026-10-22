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
  hiện chưa có property Nutrition trong `RecipeDetailDto`.
- Frontend `RecipeNutritionDto` có sáu chỉ số nhưng field/đơn vị dùng tên khác
  (`proteinGrams`, `carbsGrams`, `sodiumMg`) và có aliases tương thích cũ.
  Component hiển thị fallback mẫu, nên cần phân biệt rõ dữ liệu thật và demo.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/Recipe.cs` | Bảo đảm sáu giá trị thuộc Nutrition value object, thống nhất nullable và quy ước đơn vị. |
| `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/CulinaryBlogDbContext.cs` | Ánh xạ sáu field vào cột owned-type có tên/precision nhất quán; kiểm tra migration/schema. |
| `culinary-blog/src/backend/src/CulinaryBlog.Application/DTOs/RecipeDtos.cs` | Thêm Nutrition DTO vào response chi tiết nếu task yêu cầu trả dữ liệu dinh dưỡng qua API. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Endpoints/RecipeEndpoints.cs` | Ánh xạ `Recipe.Nutrition` sang response; bảo đảm create/update round-trip đầy đủ sáu chỉ số. |
| `culinary-blog/src/frontend/src/types/recipe.dto.ts` | Đồng bộ tên field và đơn vị với JSON contract backend. |
| `culinary-blog/src/frontend/src/components/recipe-detail/RecipeNutrition.tsx` | Hiển thị sáu chỉ số nhận được; làm fallback có chủ đích thay vì trộn dữ liệu mẫu với dữ liệu thật. |
| `culinary-blog/src/backend/tests/` | Kiểm thử mapping, persistence và API response với sáu giá trị đã biết. |

## Ý tưởng triển khai

1. Chốt đơn vị cho từng giá trị cùng API/backend/frontend; ví dụ calories theo
   kcal, macro/fiber theo g, sodium theo mg. Không chỉ đổi tên property mà
   không quy định đơn vị.
2. Dùng một cấu trúc DTO rõ ràng cho Nutrition và map nhất quán khi tạo, cập
   nhật, trả chi tiết. Nếu cho phép thiếu dữ liệu, biểu diễn `null` và render
   trạng thái chưa có thay vì lấy số mẫu làm giá trị thực.
3. Giữ precision phù hợp cho `decimal`; xác minh owned mapping tạo đúng sáu cột
   và migration không làm mất dữ liệu hiện có.
4. Kiểm thử serialize/deserialize để xác nhận casing camelCase và ánh xạ tên
   backend sang frontend đúng contract.
5. Hiển thị đúng sáu nhãn, đơn vị và giá trị; nếu thanh phần trăm là minh họa
   tĩnh, ghi nhận đó không phải tỷ lệ dinh dưỡng được tính từ nhu cầu cá nhân.

## Kiểm tra sau triển khai

- Unit test mapping sáu field từ Domain sang DTO và round-trip create/update.
- Integration/API test kiểm tra response JSON có đủ sáu chỉ số và giá trị
  decimal dự kiến.
- Build backend; chạy lint/typecheck/build frontend theo script dự án.
- Kiểm tra migration/schema và màn hình chi tiết recipe với dữ liệu đủ/thiếu
  nutrition.

## Giải thích code để trình bày

- Owned type `RecipeNutrition` là nhóm giá trị thuộc về Recipe, không có vòng
  đời độc lập; EF Core lưu các thuộc tính của nó cùng aggregate.
- `decimal?` vừa giữ độ chính xác cho lượng dinh dưỡng, vừa cho phép biểu diễn
  “chưa có số liệu” khác với giá trị 0.
- DTO là hợp đồng truyền qua API; chỉ thêm field trong entity mà không map sang
  DTO thì frontend sẽ không nhận được dữ liệu đó.
- Fallback demo giúp dựng giao diện nhưng không được nhầm với dữ liệu đã lưu.

## Trạng thái

- [x] Đã xác định sáu field trong Domain và các điểm chưa đồng bộ API/frontend.
- [ ] Hoàn thiện contract end-to-end và kiểm chứng bằng test/migration.

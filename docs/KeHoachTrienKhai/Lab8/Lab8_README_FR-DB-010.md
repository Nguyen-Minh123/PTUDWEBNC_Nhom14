# Lab 8 — FR-DB-010: Lưu trữ công thức yêu thích và bộ sưu tập

## Mục tiêu

Chuẩn bị cấu trúc dữ liệu cho hai nhu cầu riêng tư của người dùng đã đăng nhập:

1. Lưu/bỏ lưu một công thức yêu thích.
2. Tạo bộ sưu tập và thêm/bỏ công thức trong từng bộ sưu tập.

Task này chỉ phụ trách mô hình miền và cơ sở dữ liệu. API, giao diện và kiểm thử luồng hoàn chỉnh thuộc các task Lab 8 tiếp theo.

## Hiện trạng đã kiểm tra

- Dự án dùng EF Core 10, PostgreSQL và `CulinaryBlogDbContext`.
- `CulinaryBlogDbContext` đang cấu hình entity trực tiếp trong `OnModelCreating`.
- `Recipe` là aggregate root, có `Guid Id`; `ApplicationUser` kế thừa ASP.NET Core Identity và dùng `string Id`.
- Chưa tìm thấy entity/bảng riêng cho công thức yêu thích hoặc bộ sưu tập trong source hiện tại.
- Migration hiện có trong `CulinaryBlog.Infrastructure/Persistence/Migrations`.

## Quyết định phạm vi đề xuất

- Yêu thích được lưu riêng theo cặp người dùng-công thức; một người dùng không thể lưu trùng cùng công thức.
- Bộ sưu tập do người dùng tạo là riêng tư, thuộc về đúng một tài khoản.
- Một công thức có thể nằm trong nhiều bộ sưu tập của cùng người dùng; một bộ sưu tập không thể có cùng công thức hai lần.
- Yêu thích và bộ sưu tập là dữ liệu liên kết/quản lý cá nhân, được xóa vật lý khi người dùng bỏ lưu hoặc xóa danh sách; thao tác đó không xóa công thức gốc.
- Không thêm chia sẻ/công khai, cộng tác nhiều người dùng, đồng bộ dữ liệu từ người khác hoặc chức năng gợi ý trong task này.

## File dự kiến thêm hoặc sửa

| File | Dự kiến thay đổi |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/RecipeFavorite.cs` | Entity liên kết người dùng với công thức yêu thích; ràng buộc nhận dạng người dùng và công thức. |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/RecipeCollection.cs` | Entity bộ sưu tập riêng tư, có chủ sở hữu và tên đã chuẩn hóa. |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/RecipeCollectionItem.cs` | Entity liên kết bộ sưu tập với công thức, không sở hữu/xóa công thức gốc. |
| `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/CulinaryBlogDbContext.cs` | Khai báo `DbSet` và cấu hình khóa ngoại, chỉ mục duy nhất, độ dài và hành vi xóa. |
| `culinary-blog/src/backend/src/CulinaryBlog.Application/Common/Interfaces/IApplicationDbContext.cs` | Bổ sung các `DbSet` vào abstraction để Application sử dụng ở task API kế tiếp. |
| `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/Migrations/` | Tạo migration thêm bảng, khóa ngoại và chỉ mục; không tự áp dụng lên database đang chạy. |
| `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/Migrations/CulinaryBlogDbContextModelSnapshot.cs` | EF Core cập nhật snapshot cùng migration. |

Đây là danh sách dự kiến để xem xét trước khi tạo source file mới. Nếu quy ước hiện tại cho thấy cần thay đổi danh sách, sẽ dừng và báo trước.

## Hướng triển khai

1. Xây dựng model lưu yêu thích và model bộ sưu tập/liên kết công thức theo kiểu ID hiện có (`string` cho user, `Guid` cho recipe).
2. Cấu hình khóa ngoại tới Identity user và recipe; đặt unique index cho user-recipe yêu thích, tên bộ sưu tập theo chủ sở hữu và bộ sưu tập-recipe.
3. Chọn hành vi cascade/restrict có chủ đích để thao tác với bộ sưu tập không thể xóa công thức gốc.
4. Sinh migration bằng EF Core và rà soát mã migration/snapshot trước khi kết thúc task.
5. Build backend và kiểm tra model/migration; chỉ chạy cập nhật database khi được yêu cầu và có môi trường database phù hợp.

## Giải thích thiết kế

- Bảng yêu thích độc lập với membership bộ sưu tập giúp người dùng có thể yêu thích công thức mà không cần tạo bộ sưu tập.
- Bảng membership riêng cho phép một công thức thuộc nhiều bộ sưu tập, đồng thời unique index ngăn dữ liệu trùng.
- Owner ID được lưu trực tiếp trên bộ sưu tập để task API kế tiếp kiểm tra quyền sở hữu ở phía server; không dựa vào ID do client gửi.
- Khóa ngoại và unique index đặt ở database giúp dữ liệu vẫn nhất quán khi có nhiều request đồng thời.
- Các bảng liên kết không kế thừa `BaseEntity`: interceptor của dự án chuyển việc xóa `BaseEntity` thành soft delete, trong khi bỏ yêu thích/xóa bộ sưu tập cần gỡ liên kết thực sự. FK cascade chỉ xóa liên kết, không xóa `Recipe` khi người dùng bỏ lưu.
- Query filter của các liên kết loại bỏ công thức đã bị soft-delete; điều này cũng tránh EF Core cảnh báo khi một navigation bắt buộc trỏ đến `Recipe` có global query filter.

## Kết quả triển khai

- `RecipeFavorite` lưu `UserId`, `RecipeId` và thời điểm tạo; unique index trên `(UserId, RecipeId)` ngăn lưu yêu thích trùng.
- `RecipeCollection` lưu chủ sở hữu, tên và thời điểm tạo; constructor/`Rename` loại khoảng trắng thừa, từ chối tên trống hoặc dài hơn 100 ký tự. Unique index `(OwnerId, Name)` tránh trùng tên trong cùng tài khoản.
- `RecipeCollectionItem` nối một collection với một recipe và lưu thời điểm thêm; unique index `(CollectionId, RecipeId)` ngăn thêm một công thức hai lần vào cùng bộ sưu tập.
- Ba entity đều có khóa ngoại đến Identity user/recipe; xóa collection vật lý sẽ cascade tới các item, còn xóa item/favorite không xóa recipe.
- `CulinaryBlogDbContext` đăng ký ba `DbSet` và mapping; `IApplicationDbContext` phơi bày các `DbSet` cho các handler ở task API kế tiếp.
- Migration được tạo tại `culinary-blog/src/backend/src/CulinaryBlog.Infrastructure/Persistence/Migrations/20261028112656_AddRecipeFavoritesAndCollections.cs`; designer và model snapshot cũng được cập nhật.

## Kết quả kiểm tra

- `dotnet build` API backend: thành công, 0 warning, 0 error.
- `dotnet test` `CulinaryBlog.UnitTests`: 14/14 test passed.
- `dotnet ef migrations has-pending-model-changes`: model khớp snapshot, không còn thay đổi chưa có migration.
- `git diff --check`: không phát hiện lỗi whitespace.
- Migration chưa được áp dụng lên database. PostgreSQL tại `localhost:5432` hiện không kết nối được; chỉ cần khởi động Docker/PostgreSQL khi nhóm muốn áp dụng migration hoặc chạy kiểm thử cần database.

## Kiểm tra sau triển khai

- Build các project backend liên quan.
- Xác nhận migration có thể được tạo và model snapshot phản ánh entity/index/foreign key dự kiến.
- Kiểm tra unique constraint cho các cặp liên kết và hành vi xóa.
- Không chạy `database update` trên database dùng chung hoặc dữ liệu thật nếu chưa có xác nhận.

## Công cụ và môi trường

- Cần .NET 10 SDK và công cụ EF Core hiện có trong repository để build/sinh migration.
- Không cần cài package mới theo hiện trạng.
- Build và tạo migration không cần Docker. Muốn áp dụng migration và kiểm thử tích hợp với PostgreSQL thì cần database; có thể khởi động PostgreSQL bằng Docker Compose nếu môi trường của nhóm dùng cách đó.

## Git và thứ tự công việc

- Nhánh mục tiêu: `2312634-Huy`; không checkout, merge, sửa hoặc push lên nhánh thành viên khác.
- Task kế tiếp dự kiến phụ thuộc task này: `FR-BKE-016`, rồi `FR-FTE-044` và `FR-TST-010`.
- Chỉ làm `FR-DB-010` trong lượt này. Sau khi hoàn tất sẽ báo kết quả và chờ xác nhận của chủ task trước khi commit/push.
- Các mã task Lab 8 hiện là đề xuất nối tiếp mã đang có trong README, không cập nhật bảng phân công chung khi chưa được yêu cầu.

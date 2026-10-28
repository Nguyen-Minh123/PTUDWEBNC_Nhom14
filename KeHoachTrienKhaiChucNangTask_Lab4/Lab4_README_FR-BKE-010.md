# Lab 4 — FR-BKE-010: API quản lý vòng đời công thức

## Mục tiêu

Hoàn thiện API quản lý công thức từ lúc tạo bản nháp đến khi xuất bản, lưu trữ
hoặc xóa mềm. Các thao tác phải đi qua Application/Domain để giữ quy tắc nghiệp
vụ; endpoint chỉ nhận request, áp dụng quyền truy cập và chuyển kết quả thành
HTTP response.

## Hiện trạng đã đối chiếu

- `RecipeEndpoints` đã ánh xạ các route đọc danh sách/chi tiết, tạo, cập nhật,
  xuất bản, lưu trữ và xóa mềm công thức.
- Các thao tác ghi sử dụng MediatR command handlers; Domain `Recipe` sở hữu
  trạng thái và quy tắc chuyển trạng thái.
- Tạo công thức lấy `AuthorId` từ người dùng đã xác thực, không tin giá trị
  author gửi từ client. Các thao tác trên recipe kiểm tra quyền owner/Admin.
- `RecipeAuthorizationMatrixTests` đã kiểm tra HTTP status theo anonymous,
  owner, user khác và Admin. Cần bảo đảm test nghiệp vụ cũng xác nhận trạng
  thái và nội dung sau mỗi lần chuyển trạng thái, không chỉ xác nhận status.

## Phạm vi triển khai / đối chiếu

- Xác nhận CRUD dùng đúng HTTP semantics, validation và kết quả 404 khi tài
  nguyên không tồn tại.
- Xác nhận Publish chỉ thành công khi recipe thỏa Domain invariants; Archive
  chuyển sang trạng thái Archived; Delete là xóa mềm.
- Xác nhận người tạo không thể giả mạo author ID, và resource chỉ được sửa bởi
  owner hoặc Admin theo policy hiện hành.
- Bổ sung hoặc mở rộng integration tests cho trạng thái sau thao tác, lỗi
  chuyển trạng thái và các trường hợp không tìm thấy.

## File liên quan

| File | Vai trò / vị trí cần xem |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Endpoints/RecipeEndpoints.cs` | Route `/api/v1/recipes`; điểm ánh xạ HTTP, xác thực đầu vào và quyền truy cập. |
| `culinary-blog/src/backend/src/CulinaryBlog.Application/Features/Recipes/Commands/CreateRecipe/CreateRecipeCommandHandler.cs` | Tạo recipe và lưu qua unit of work. |
| `culinary-blog/src/backend/src/CulinaryBlog.Application/Features/Recipes/Commands/UpdateRecipe/UpdateRecipeCommandHandler.cs` | Tìm và cập nhật recipe; phối hợp validation/domain. |
| `culinary-blog/src/backend/src/CulinaryBlog.Application/Features/Recipes/Commands/PublishRecipe/PublishRecipeCommandHandler.cs` | Thực hiện lệnh Publish. |
| `culinary-blog/src/backend/src/CulinaryBlog.Application/Features/Recipes/Commands/ArchiveRecipe/ArchiveRecipeCommandHandler.cs` | Thực hiện lệnh Archive. |
| `culinary-blog/src/backend/src/CulinaryBlog.Application/Recipes/Commands/DeleteRecipe/DeleteRecipeCommandHandler.cs` | Command handler xóa mềm; không xóa vật lý bản ghi. |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/Recipe.cs` | Quy tắc trạng thái và hành vi nghiệp vụ của công thức. |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/RecipeAuthorizationMatrixTests.cs` | Integration test quyền truy cập của các thao tác recipe. |
| `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/RecipePublishRuleTests.cs` | Unit test quy tắc Domain khi xuất bản. |

## Luồng xử lý và giải thích

1. Endpoint nhận request; ASP.NET Core binding và validator kiểm tra cấu trúc,
   dữ liệu đầu vào trước khi gọi Application.
2. Với thao tác ghi, endpoint xác định recipe và kiểm tra Owner/Admin trên
   resource cụ thể. `AuthorId` khi tạo được lấy từ identity phía server để
   ngăn client tạo công thức dưới danh nghĩa người khác.
3. Endpoint gửi command qua `ISender`. Handler gọi repository/unit of work,
   còn quy tắc trạng thái thuộc Domain entity thay vì lặp lại trong endpoint.
4. Kết quả được ánh xạ thành response: tạo mới trả `201 Created`; đọc/cập nhật/
   publish/archive thành công trả `200 OK`; xóa mềm trả `204 No Content`;
   không tồn tại trả `404`; chưa đăng nhập trả `401`; không đủ quyền trả `403`.
5. Kiểm thử cần đọc lại recipe sau command để xác nhận trạng thái đã đổi, và
   thử điều kiện không hợp lệ để chứng minh Domain bảo vệ dữ liệu.

## Ghi chú kiến thức cần trình bày

- **Vì sao dùng command handler?** Tách quy trình nghiệp vụ khỏi lớp HTTP, giúp
  có thể kiểm tra handler/domain mà không phụ thuộc vào request pipeline.
- **Vì sao kiểm tra quyền trên resource?** Chỉ kiểm tra đã đăng nhập chưa đủ;
  cần so sánh người dùng với chủ sở hữu recipe hoặc role Admin để tránh sửa
  tài nguyên của người khác.
- **Xóa mềm khác xóa vật lý thế nào?** Xóa mềm đánh dấu bản ghi đã xóa để các
  truy vấn thông thường bỏ qua nhưng dữ liệu vẫn có thể được kiểm toán/khôi
  phục theo chính sách hệ thống.
- **Vì sao không tự đặt trạng thái ở endpoint?** Trạng thái là invariant của
  Domain; chỉ entity/command nghiệp vụ mới quyết định một chuyển đổi hợp lệ.

## Kiểm tra sau triển khai

- Chạy `CulinaryBlog.UnitTests`, tập trung `RecipePublishRuleTests`.
- Chạy các integration tests `RecipeAuthorizationMatrixTests` và test lifecycle
  mới/mở rộng.
- Bao phủ CRUD thành công, validation, recipe không tồn tại, chuyển trạng thái
  thành công/thất bại, owner/Admin và anonymous.
- Kiểm tra `git diff --check` và bảo đảm không thay đổi hành vi của các endpoint
  nguyên liệu, bước nấu, hình ảnh nằm ngoài phạm vi.

## Git

- Nhánh làm việc: `2312634-Huy`.
- README này là tài liệu kế hoạch/đối chiếu; không hàm ý mọi test còn thiếu đã
  được viết hoặc chạy.

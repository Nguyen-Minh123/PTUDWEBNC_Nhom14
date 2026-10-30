# Lab 4 - README - FR-DB-009

## [FR-DB-009] Xử lý Concurrency Token (RowVersion) chống xung đột khi sửa Công thức

### 1. Mục tiêu
Mục tiêu của chức năng này là ngăn tình trạng **ghi đè dữ liệu khi nhiều người cùng chỉnh sửa một Recipe**.  
Hệ thống cần phát hiện trường hợp dữ liệu đã bị thay đổi trước khi người dùng lưu lại, sau đó trả về phản hồi phù hợp để client tải lại dữ liệu mới nhất.

### 2. Ma trận quyền đã được xác nhận
| Vai trò | Quyền |
|---|---|
| Admin | Được sửa mọi Recipe |
| Author | Được sửa Recipe do chính mình tạo |
| Guest/Anonymous | Không được sửa |
| User khác | Không được sửa Recipe của người khác |

### 3. Hiện trạng đã kiểm tra
- `Recipe` là aggregate root và đã có luồng cập nhật thông tin chính.
- `ICurrentUserService` đã có `UserId`, `IsInRole(...)`, `IsAuthenticated`.
- Hệ thống đã có middleware xử lý lỗi toàn cục.
- Chưa thống nhất hoàn toàn kiểu dữ liệu của `RowVersion` giữa Domain và EF Core.
- Cần kiểm tra lại logic concurrency để tránh so sánh sai kiểu dữ liệu hoặc che khuất property từ `BaseEntity`.

### 4. Kế hoạch triển khai
1. Chuẩn hóa `RowVersion` ở cấp entity dùng chung hoặc cấp `Recipe` theo một kiểu dữ liệu thống nhất.
2. Cấu hình EF Core để đánh dấu `RowVersion` là concurrency token.
3. Cập nhật `UpdateRecipeCommand` để client gửi lại `RowVersion` hiện tại.
4. Trong handler cập nhật:
   - kiểm tra quyền truy cập;
   - kiểm tra `Id + RowVersion`;
   - nếu token không khớp thì trả về xung đột.
5. Bổ sung xử lý `409 Conflict` ở middleware toàn cục.
6. Kiểm thử lại toàn bộ luồng đọc → sửa → phát hiện xung đột.

### 5. File dự kiến thay đổi
- `CulinaryBlog.Domain/Common/BaseEntity.cs`
- `CulinaryBlog.Domain/Entities/Recipe.cs`
- `CulinaryBlog.Infrastructure/Persistence/Configurations/RecipeConfiguration.cs`
- `CulinaryBlog.Application/Features/Recipes/Commands/UpdateRecipe/UpdateRecipeCommand.cs`
- `CulinaryBlog.Application/Features/Recipes/Commands/UpdateRecipe/UpdateRecipeCommandValidator.cs`
- `CulinaryBlog.Application/Features/Recipes/Commands/UpdateRecipe/UpdateRecipeCommandHandler.cs`
- `CulinaryBlog.Application/Common/Exceptions/ConcurrencyConflictException.cs`
- `CulinaryBlog.API/Middlewares/GlobalExceptionMiddleware.cs`
- `CulinaryBlog.API/Endpoints/RecipesEndpoints.cs`

### 6. Kiểm tra và ghi nhận
- Kiểm tra cập nhật thành công khi `RowVersion` khớp.
- Kiểm tra trả về `409 Conflict` khi `RowVersion` cũ.
- Kiểm tra quyền sửa đúng theo Author và Admin.
- Kiểm tra không phát sinh cảnh báo che khuất `RowVersion`.
- Ghi nhận rõ phản hồi API và thông báo lỗi để client xử lý lại.

### 7. Trạng thái
**Trạng thái hiện tại: Đang triển khai / cần đồng bộ lại mô hình concurrency token.**

### 8. Giải thích code để trình bày
- `RowVersion` là cơ chế chống ghi đè dữ liệu theo kiểu optimistic concurrency.
- Khi client đọc dữ liệu, API trả về `RowVersion` hiện tại.
- Khi client cập nhật, API yêu cầu gửi lại `RowVersion` cũ.
- Nếu dữ liệu đã bị sửa trước đó, hệ thống từ chối lưu và trả về `409 Conflict`.
- Cách này giúp tránh việc người dùng vô tình ghi đè thay đổi của người khác.

### 9. Câu hỏi giáo viên có thể hỏi
1. Vì sao cần `RowVersion` thay vì chỉ dựa vào `UpdatedAt`?
2. `409 Conflict` được trả về trong trường hợp nào?
3. Vì sao phải chuẩn hóa kiểu dữ liệu `RowVersion` trên toàn hệ thống?
4. Nếu hai người cùng sửa một Recipe thì hệ thống xử lý ra sao?
5. `ICurrentUserService` hiện tại kiểm tra quyền sửa bằng cách nào?
6. Làm sao để client biết cần tải lại dữ liệu?
7. Vì sao không nên khai báo `RowVersion` trùng ở cả `BaseEntity` và `Recipe`?
8. Khi nào nên dùng optimistic concurrency thay vì pessimistic concurrency?

# Lab 4 - README – FR-DB-007
## [FR-DB-007] Kế hoạch triển khai API Quản lý Nguyên liệu (CRUD RecipeIngredient)

### 1) Mục tiêu
Hiện thực API quản lý nguyên liệu cho từng công thức theo đúng Clean Architecture, bảo đảm CRUD đầy đủ, phân quyền đúng, dữ liệu hợp lệ và dễ kiểm thử.

### 2) Ma trận quyền đã được xác nhận
| Tác nhân | Xem | Thêm | Sửa | Xóa |
|---|---:|---:|---:|---:|
| Author sở hữu Recipe | Có | Có | Có | Có |
| Admin | Có | Có | Có | Có |
| Người dùng khác | Không | Không | Không | Không |
| Khách chưa đăng nhập | Không | Không | Không | Không |

### 3) Hiện trạng đã kiểm tra
- `RecipeIngredient` là entity con của `Recipe`.
- `Recipe` đã có collection `Ingredients`.
- Dự án đã có nền tảng `Minimal API`, `MediatR`, `EF Core`, `FluentValidation`.
- Endpoint dự kiến nằm dưới `/api/v1/recipes/{id}/ingredients`.
- Quy ước response dự kiến: `201 Created`, `200 OK`, `204 No Content`, `403 Forbidden`, `404 Not Found`.

### 4) Kế hoạch triển khai
1. Chuẩn hóa domain entity `RecipeIngredient`.
2. Tạo DTO trả về cho API.
3. Tạo command cho Create / Update / Delete.
4. Tạo validator cho từng command.
5. Viết handler xử lý nghiệp vụ:
   - kiểm tra tồn tại recipe
   - kiểm tra quyền truy cập
   - thêm / sửa / xóa dữ liệu
   - lưu thay đổi bằng `SaveChangesAsync()`
6. Tạo endpoint Minimal API.
7. Kiểm tra lại mapping EF Core và luồng tích hợp.
8. Bổ sung comment ngắn gọn để thuận tiện trình bày.

### 5) File dự kiến thay đổi
#### Domain
- `CulinaryBlog.Domain/Entities/RecipeIngredient.cs`

#### Application
- `CulinaryBlog.Application/Features/Recipes/Ingredients/RecipeIngredientDto.cs`
- `CulinaryBlog.Application/Features/Recipes/Ingredients/Commands/CreateRecipeIngredientCommand.cs`
- `CulinaryBlog.Application/Features/Recipes/Ingredients/Commands/UpdateRecipeIngredientCommand.cs`
- `CulinaryBlog.Application/Features/Recipes/Ingredients/Commands/DeleteRecipeIngredientCommand.cs`
- `CulinaryBlog.Application/Features/Recipes/Ingredients/Validators/CreateRecipeIngredientCommandValidator.cs`
- `CulinaryBlog.Application/Features/Recipes/Ingredients/Validators/UpdateRecipeIngredientCommandValidator.cs`
- `CulinaryBlog.Application/Features/Recipes/Ingredients/Handlers/CreateRecipeIngredientCommandHandler.cs`
- `CulinaryBlog.Application/Features/Recipes/Ingredients/Handlers/UpdateRecipeIngredientCommandHandler.cs`
- `CulinaryBlog.Application/Features/Recipes/Ingredients/Handlers/DeleteRecipeIngredientCommandHandler.cs`

#### API
- `CulinaryBlog.API/Endpoints/RecipeIngredientsEndpoints.cs`
- `CulinaryBlog.API/Program.cs` (đăng ký endpoint)

#### Infrastructure
- `CulinaryBlog.Infrastructure/Persistence/CulinaryBlogDbContext.cs`
- `CulinaryBlog.Infrastructure/Persistence/Configurations/RecipeIngredientConfiguration.cs` (nếu tách riêng)

### 6) Kiểm tra và ghi nhận
#### Kiểm tra bắt buộc
- `POST` tạo mới nguyên liệu cho recipe hợp lệ.
- `PUT` cập nhật nguyên liệu đúng recipe và đúng quyền.
- `DELETE` xóa nguyên liệu đúng recipe và đúng quyền.
- Trả `404` khi recipe hoặc ingredient không tồn tại.
- Trả `403` khi người dùng không có quyền.
- Validate dữ liệu: `Quantity > 0`, `Unit` không rỗng, `Name` đúng độ dài.
- Xác minh `OrderIndex` được lưu và trả về đúng.

#### Ghi nhận sau kiểm thử
- Endpoint hoạt động đúng theo luồng nghiệp vụ.
- Không phát sinh lỗi biên dịch do namespace hoặc chữ ký method.
- Không ảnh hưởng các module `RecipeStep`, `RecipeImage`, `UpdateRecipe`.

### 7) Trạng thái
**Đang triển khai**: đã hoàn thành phần phân tích, thiết kế và khung API; cần test tích hợp cuối cùng trước khi chốt.

### 8) Giải thích code để trình bày
- `RecipeIngredient` là entity con nên luôn đi cùng `Recipe`.
- Handler luôn kiểm tra `Recipe` trước khi thao tác nguyên liệu.
- Quyền được kiểm soát theo resource-based authorization.
- Validation tách riêng để giảm lỗi đầu vào và tăng khả năng bảo trì.
- Minimal API giúp cấu trúc ngắn gọn, rõ ràng, dễ demo.
- Command/Handler giúp tách bạch trách nhiệm và dễ mở rộng.

### 9) Câu hỏi giáo viên có thể hỏi
1. Vì sao nguyên liệu được thiết kế là entity con của `Recipe`?
2. Vì sao chọn Minimal API thay vì Controller?
3. Vì sao phải kiểm tra quyền ở Application Layer?
4. Nếu `Recipe` không tồn tại thì API trả mã gì?
5. Nếu người dùng không phải chủ sở hữu thì xử lý ra sao?
6. Vì sao cần FluentValidation thay vì validate trực tiếp trong handler?
7. `OrderIndex` dùng để làm gì?
8. Nếu xóa nguyên liệu cuối cùng thì hệ thống có ảnh hưởng gì không?
9. Làm sao đảm bảo API này không phá vỡ các module khác?
10. Nếu muốn mở rộng sắp xếp lại nguyên liệu, em sẽ sửa ở đâu?

### Kết luận
FR-DB-007 tập trung vào việc chuẩn hóa luồng quản lý nguyên liệu trong công thức, đảm bảo đúng nghiệp vụ, đúng phân quyền, dễ kiểm thử và đủ thuyết phục khi bảo vệ trước hội đồng.

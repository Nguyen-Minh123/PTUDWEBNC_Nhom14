# Lab 4 - README - FR-DB-008
## [FR-DB-008] Kế hoạch triển khai API Quản lý Bước thực hiện (CRUD RecipeStep & Tự động đánh số thứ tự)

### 1) Mục tiêu
Hiện thực API quản lý bước thực hiện của công thức nấu ăn theo đúng tinh thần Clean Architecture, đảm bảo:
- CRUD cho `RecipeStep`
- Tự động gán `StepNumber` khi thêm mới
- Tự động sắp xếp lại số thứ tự khi xóa một bước
- Dữ liệu nhất quán với mô hình `Recipe` là aggregate root
- Phân quyền đúng theo người sở hữu công thức hoặc vai trò quản trị

### 2) Ma trận quyền đã được xác nhận
| Chức năng | Author | Admin | User khác |
|---|---:|---:|---:|
| Thêm bước | Có | Có | Không |
| Cập nhật bước | Có | Có | Không |
| Xóa bước | Có | Có | Không |
| Xem danh sách bước | Có | Có | Có |

**Ghi chú:**  
- Chức năng ghi dữ liệu chỉ cho phép người sở hữu recipe hoặc quản trị viên.
- `StepNumber` không cho phép nhập thủ công từ client để tránh sai lệch thứ tự.

### 3) Hiện trạng đã kiểm tra
- Domain đã có entity `RecipeStep`.
- `Recipe` đã đóng vai trò aggregate root và có quan hệ chứa các bước thực hiện.
- Hệ thống đang dùng Minimal API, MediatR và EF Core theo kiến trúc phân lớp.
- Logic tự động đánh số đã được xác định:
  - `Create`: lấy `Max(StepNumber) + 1`
  - `Delete`: renumber lại toàn bộ bước còn lại
- Đã thống nhất không cập nhật `StepNumber` trong luồng sửa nội dung thông thường.

### 4) Kế hoạch triển khai
1. Chuẩn hóa entity `RecipeStep`
   - Giữ `StepNumber`, `Title`, `Description`, `TimerMinutes`, `ImageUrl`
   - Tách rõ `UpdateDetails()` và `SetStepNumber()`

2. Tạo Application Layer
   - Command: `CreateRecipeStepCommand`, `UpdateRecipeStepCommand`, `DeleteRecipeStepCommand`
   - Validator cho từng command
   - Handler xử lý quyền, tự động đánh số và renumber

3. Tạo API Endpoint
   - `POST /api/v1/recipes/{id}/steps`
   - `PUT /api/v1/recipes/{id}/steps/{stepId}`
   - `DELETE /api/v1/recipes/{id}/steps/{stepId}`

4. Đồng bộ EF Core
   - Cấu hình quan hệ `Recipe` - `RecipeStep`
   - Cascade delete theo aggregate
   - Kiểm tra unique logic cho `RecipeId + StepNumber`

5. Kiểm thử
   - Thêm bước đầu tiên
   - Thêm nhiều bước liên tiếp
   - Xóa bước giữa danh sách
   - Kiểm tra renumber sau khi xóa
   - Kiểm tra quyền truy cập

### 5) File dự kiến thay đổi
#### Domain
- `CulinaryBlog.Domain/Entities/RecipeStep.cs`
- `CulinaryBlog.Domain/Entities/Recipe.cs`  
  (nếu cần đồng bộ navigation và helper method)

#### Application
- `CulinaryBlog.Application/Features/Recipes/Steps/Commands/CreateRecipeStepCommand.cs`
- `CulinaryBlog.Application/Features/Recipes/Steps/Commands/UpdateRecipeStepCommand.cs`
- `CulinaryBlog.Application/Features/Recipes/Steps/Commands/DeleteRecipeStepCommand.cs`
- `CulinaryBlog.Application/Features/Recipes/Steps/Handlers/CreateRecipeStepCommandHandler.cs`
- `CulinaryBlog.Application/Features/Recipes/Steps/Handlers/UpdateRecipeStepCommandHandler.cs`
- `CulinaryBlog.Application/Features/Recipes/Steps/Handlers/DeleteRecipeStepCommandHandler.cs`
- `CulinaryBlog.Application/Features/Recipes/Steps/Validators/*.cs`
- `CulinaryBlog.Application/Features/Recipes/Steps/RecipeStepDto.cs`

#### API
- `CulinaryBlog.API/Endpoints/RecipeStepsEndpoints.cs`
- `CulinaryBlog.API/Program.cs`

#### Infrastructure
- `CulinaryBlog.Infrastructure/Persistence/Configurations/RecipeConfiguration.cs`
- `CulinaryBlog.Infrastructure/Persistence/ApplicationDbContext.cs`
- `CulinaryBlog.Infrastructure/Persistence/CulinaryBlogDbContext.cs`  
  (nếu có mapping riêng cho `RecipeStep`)

### 6) Kiểm tra và ghi nhận
#### Kiểm tra chức năng
- Tạo step mới: `StepNumber` phải tự tăng
- Xóa step bất kỳ: danh sách còn lại phải được đánh lại từ `1`
- Cập nhật step: chỉ đổi nội dung, không đổi thứ tự
- User không có quyền: phải trả `403 Forbidden`

#### Kiểm tra dữ liệu
- `Title` không rỗng
- `Description` không rỗng
- `TimerMinutes` không âm
- `ImageUrl` hợp lệ nếu có

#### Ghi nhận rủi ro
- Nếu `StepNumber` bị client gửi lên sai, cần bỏ qua và để server kiểm soát
- Nếu xóa nhiều bước đồng thời, cần đảm bảo transaction hoặc cơ chế kiểm soát cạnh tranh
- Nếu dữ liệu lớn, renumber nên được tối ưu bằng truy vấn gọn và rõ ràng

### 7) Trạng thái
**Trạng thái hiện tại:** Đã phân tích xong, đã chốt hướng triển khai, đang trong giai đoạn hiện thực và kiểm thử đồng bộ.

**Đánh giá tiến độ:** 85%

### 8) Giải thích code để trình bày
- `RecipeStep` là thực thể con thuộc `Recipe`, không hoạt động độc lập.
- `StepNumber` được điều khiển ở tầng nghiệp vụ để đảm bảo thứ tự luôn liên tục.
- Khi thêm mới, handler sẽ đọc `Max(StepNumber)` rồi cộng thêm 1.
- Khi xóa, handler lấy toàn bộ bước còn lại và gán lại thứ tự từ đầu.
- `UpdateDetails()` chỉ dùng để cập nhật nội dung, tránh sửa nhầm số thứ tự.
- Phân quyền dựa trên ownership của recipe để đảm bảo đúng trách nhiệm dữ liệu.

### 9) Câu hỏi giáo viên có thể hỏi
1. Vì sao `StepNumber` không cho client nhập trực tiếp?
2. Vì sao khi xóa bước phải renumber lại toàn bộ danh sách?
3. Tại sao `RecipeStep` nên nằm trong aggregate của `Recipe`?
4. Nếu 2 người cùng xóa hoặc thêm bước cùng lúc thì xử lý thế nào?
5. Vì sao `UpdateDetails()` không cập nhật `StepNumber`?
6. Nếu bước có ảnh minh họa thì ảnh được lưu và xóa như thế nào?
7. Tại sao chọn Minimal API thay vì Controller?
8. Làm sao đảm bảo phân quyền chỉ đúng chủ recipe mới được sửa?
9. Cần test những case nào để xác nhận logic tự động đánh số là đúng?
10. Nếu sau này thêm tính năng kéo thả đổi thứ tự bước thì cần thay đổi gì?

---
**Kết luận:**  
Chức năng CRUD `RecipeStep` không chỉ là thao tác dữ liệu đơn thuần mà còn là bài toán giữ ổn định thứ tự, tính nhất quán của aggregate và kiểm soát quyền. Việc tự động đánh số giúp giảm lỗi phía client, tăng tính toàn vẹn dữ liệu và phù hợp với thiết kế nghiệp vụ của hệ thống.

# Lab 7 – README – FR-BKE-015  
## Tối ưu API Danh mục (Get All Categories kèm thống kê số bài viết) & Caching

### 1. Mục tiêu
- Tối ưu API danh mục để trả về danh sách Category kèm số lượng Recipe theo từng danh mục.
- Giảm tải truy vấn database bằng cơ chế cache.
- Đảm bảo dữ liệu trả về đủ cho giao diện navigation và màn hình hiển thị danh mục.
- Giữ đúng kiến trúc Clean Architecture, tách rõ API, Application và Infrastructure.

### 2. Ma trận quyền đã được xác nhận
| Vai trò | Quyền truy cập | Ghi chú |
|---|---|---|
| Khách truy cập | Có | Đọc danh sách danh mục công khai |
| Tác giả | Có | Xem danh mục để tạo/sửa Recipe |
| Quản trị viên | Có | Dùng cho quản trị, thống kê và điều hướng nội dung |
| Người dùng đã đăng nhập | Có | Không yêu cầu quyền đặc biệt vì đây là API đọc |

### 3. Hiện trạng đã kiểm tra
- Dự án đang dùng Minimal APIs, MediatR, EF Core và Redis Cache.
- Entity `Category` đã có quan hệ với `Recipe`.
- `IApplicationDbContext` đã expose `DbSet<Category>` và `DbSet<Recipe>`.
- Đã có nền tảng cache gồm `CacheKeys`, `CacheOptions`, `ICacheableQuery`, `QueryCacheBehavior`.
- API danh mục hiện tại chưa tối ưu theo hướng chỉ trả dữ liệu cần thiết và chưa thống kê số bài viết theo cách gọn nhẹ.

### 4. Kế hoạch triển khai
1. Tạo DTO rút gọn `CategorySummaryDto` để trả về dữ liệu cần thiết.
2. Xây dựng `GetAllCategoriesQuery` và `GetAllCategoriesQueryHandler`.
3. Truy vấn dữ liệu theo hướng `AsNoTracking()` và `Select(...)` để giảm chi phí EF Core.
4. Tính `RecipeCount` ngay trong truy vấn để tránh load toàn bộ danh sách Recipe.
5. Áp dụng `ICacheableQuery` để tự động cache kết quả query.
6. Cấu hình cache key và TTL riêng cho danh sách Category.
7. Map endpoint `GET /api/v1/categories` trong `CategoriesEndpoints.cs`.
8. Xác nhận cache hit/miss và kiểm tra dữ liệu trả về trước khi nghiệm thu.

### 5. File dự kiến thay đổi
#### File thêm mới
- `src/backend/src/CulinaryBlog.Application/Features/Categories/CategorySummaryDto.cs`
- `src/backend/src/CulinaryBlog.Application/Features/Categories/Queries/GetAllCategories/GetAllCategoriesQuery.cs`
- `src/backend/src/CulinaryBlog.Application/Features/Categories/Queries/GetAllCategories/GetAllCategoriesQueryHandler.cs`
- `src/backend/src/CulinaryBlog.API/Endpoints/CategoriesEndpoints.cs`

#### File chỉnh sửa
- `src/backend/src/CulinaryBlog.Application/Common/Caching/CacheKeys.cs`
- `src/backend/src/CulinaryBlog.Application/Common/Caching/CacheOptions.cs`
- `src/backend/src/CulinaryBlog.Application/Common/Caching/ICacheableQuery.cs`
- `src/backend/src/CulinaryBlog.Application/Behaviors/QueryCacheBehavior.cs`
- `src/backend/src/CulinaryBlog.Application/Common/Interfaces/IApplicationDbContext.cs`
- `src/backend/src/CulinaryBlog.Infrastructure/Persistence/CulinaryBlogDbContext.cs`
- `src/backend/src/CulinaryBlog.API/Program.cs`

### 6. Kiểm tra và ghi nhận
- Kiểm tra API trả về đầy đủ các trường: `Id`, `Name`, `Slug`, `Description`, `ImageUrl`, `OrderIndex`, `RecipeCount`.
- Kiểm tra query chỉ đọc bằng `AsNoTracking()`.
- Kiểm tra cache hoạt động đúng: lần đầu cache miss, lần sau cache hit.
- Kiểm tra TTL cache phù hợp với nhu cầu hiển thị danh mục.
- Kiểm tra dữ liệu sau khi cập nhật Category hoặc Recipe có được invalidate đúng hay không.
- Ghi nhận kết quả chạy thực tế và thời gian phản hồi trước/sau tối ưu.

### 7. Trạng thái
**Đang triển khai**  
Phần core của giải pháp đã xác định rõ: DTO, Query, Handler, Cache Behavior và endpoint. Việc còn lại là đồng bộ cache invalidation và kiểm thử thực tế.

### 8. Giải thích code để trình bày
- `CategorySummaryDto`: DTO rút gọn, chỉ giữ dữ liệu cần cho màn hình danh mục.
- `GetAllCategoriesQuery`: query đọc danh sách danh mục và hỗ trợ cache.
- `GetAllCategoriesQueryHandler`: lấy dữ liệu từ database theo hướng tối ưu, không load dư thừa.
- `CacheKeys.CategoriesAll()`: key cache chuẩn hóa cho toàn bộ danh sách category.
- `CacheOptions.CategoriesCache`: TTL riêng cho danh mục.
- `QueryCacheBehavior`: tự động đọc/ghi cache theo từng query.
- `CategoriesEndpoints`: endpoint Minimal API cho route `/api/v1/categories`.

### 9. Câu hỏi giáo viên có thể hỏi
1. Vì sao không trả về toàn bộ entity `Category` mà phải dùng DTO?
2. `RecipeCount` được tính ở đâu và vì sao không đếm ở frontend?
3. Vì sao dùng `AsNoTracking()` cho API đọc?
4. Cache key của danh mục được thiết kế như thế nào để dễ invalidate?
5. Khi nào cần xóa cache của danh mục?
6. Nếu dữ liệu Recipe thay đổi thì cache Category có bị stale không?
7. Vì sao chọn cache cho API này thay vì tối ưu bằng index בלבד?
8. Cơ chế nào đảm bảo API vẫn đúng kiến trúc Clean Architecture?
9. Nếu Redis gặp sự cố thì API có còn hoạt động không?
10. Vì sao TTL của danh mục nên ngắn hơn dữ liệu ít thay đổi khác?

### Kết luận
FR-BKE-015 tập trung vào hai mục tiêu chính: **tăng hiệu năng** và **giữ dữ liệu trả về gọn, đúng nhu cầu**.  
Giải pháp được triển khai theo hướng:
- truy vấn tối ưu,
- cache có kiểm soát,
- invalidate rõ ràng,
- và giữ đúng nguyên tắc phân lớp của dự án Culinary Blog.

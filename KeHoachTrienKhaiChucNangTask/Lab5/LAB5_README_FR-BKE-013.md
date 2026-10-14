# README – Kế hoạch triển khai chức năng `FR-BKE-013`

## 1. Mục tiêu
Thiết lập API Versioning cho backend Culinary Blog bằng `Asp.Versioning.Http` để:
- chuẩn hóa URL theo phiên bản, ví dụ `/api/v{version:apiVersion}/...`;
- giữ ổn định v1.0 trong khi vẫn sẵn sàng mở rộng sang v2.0;
- tránh phá vỡ client hiện tại khi nâng cấp API;
- hỗ trợ quản trị vòng đời API rõ ràng và minh bạch.

## 2. Ma trận quyền đã được xác nhận
| Thành phần | Phiên bản | Trạng thái | Ghi chú |
|---|---|---|---|
| Recipes API | v1.0 | Đang dùng | Cần giữ ổn định |
| Categories API | v1.0 | Đang dùng | Cần giữ ổn định |
| Auth API | v1.0 | Đang dùng | Cần giữ ổn định |
| v2.0 | Dự kiến | Chưa triển khai | Chuẩn bị mở rộng sau này |

## 3. Hiện trạng đã kiểm tra
- Dự án đã chạy theo Minimal APIs.
- Các route group hiện có gồm `recipes`, `categories`, `auth`.
- Hệ thống đã có middleware CORS, rate limiting, security headers và auth pipeline.
- Chưa có versioning tường minh theo URL segment, nên cần bổ sung `ApiVersionSet` và version metadata cho từng nhóm endpoint.

## 4. Kế hoạch triển khai
1. Cài package `Asp.Versioning.Http`.
2. Cấu hình URL path versioning theo mẫu `/api/v{version:apiVersion}/...`.
3. Tạo `ApiVersionSet` cho v1.0 và gắn vào route group gốc.
4. Gắn version metadata cho từng endpoint của `recipes`, `categories`, `auth`.
5. Bật API explorer/version description để hỗ trợ tài liệu API.
6. Kiểm tra lại tương thích với OpenAPI/Scalar và bảo đảm v1.0 không bị phá vỡ.
7. Chuẩn bị cấu trúc để thêm v2.0 sau này mà không ảnh hưởng v1.0.

## 5. File dự kiến thay đổi
- `CulinaryBlog.API/Program.cs`
- `CulinaryBlog.API/Endpoints/RecipesEndpoints.cs`
- `CulinaryBlog.API/Endpoints/CategoriesEndpoints.cs`
- `CulinaryBlog.API/Endpoints/AuthEndpoints.cs`
- `CulinaryBlog.API/CulinaryBlog.API.csproj`
- `Directory.Packages.props` (nếu dùng central package management)

## 6. Kiểm tra và ghi nhận
### Kiểm tra bắt buộc
- Endpoint truy cập đúng dạng `/api/v1/...`
- Request v1.0 hoạt động bình thường
- Không làm gãy các endpoint hiện có
- Sẵn sàng thêm v2.0 bằng route/version mới
- API explorer hiển thị version rõ ràng nếu có tài liệu hóa

### Ghi nhận
- Ghi nhận kết quả chạy thử từng nhóm endpoint.
- Kiểm tra response header và route mapping.
- Xác nhận không còn lỗi `ApiVersionSet` hoặc `AddApiExplorer`.

## 7. Trạng thái
**Trạng thái hiện tại:** Đang hoàn thiện cấu hình versioning cho Minimal APIs, v1.0 đã được thiết kế để giữ ổn định và chuẩn bị mở rộng cho các phiên bản sau.

## 8. Giải thích code để trình bày
- `AddApiVersioning(...)`: đăng ký cơ chế versioning cho API.
- `UrlSegmentApiVersionReader`: đọc version từ URL, phù hợp với `/api/v{version:apiVersion}/...`.
- `ApiVersionSet`: nhóm và quản lý các endpoint theo phiên bản.
- `WithApiVersionSet(...)`: gán bộ version cho route group.
- `MapToApiVersion(...)`: chỉ định endpoint thuộc phiên bản nào.
- `ReportApiVersions()`: trả header version để client biết API hỗ trợ gì.
- `AddApiExplorer()`: hỗ trợ tài liệu hóa API theo phiên bản.

## 9. Câu hỏi giáo viên có thể hỏi
1. Vì sao chọn URL segment versioning thay vì query string hoặc header?
2. `ApiVersionSet` có vai trò gì trong Minimal APIs?
3. Vì sao cần giữ v1.0 ổn định khi thêm v2.0?
4. Nếu không có `AddApiExplorer()` thì ảnh hưởng gì đến tài liệu API?
5. Làm sao để một endpoint chỉ thuộc riêng v1.0?
6. Versioning giúp gì cho bảo trì và mở rộng hệ thống?
7. Có rủi ro gì nếu đổi cấu trúc version không nhất quán?

## 10. Kết luận
FR-BKE-013 là bước nền để Culinary Blog phát triển API có kiểm soát, dễ mở rộng và ít rủi ro phá vỡ client hiện tại. Thiết kế này ưu tiên:
- rõ ràng trong định tuyến,
- ổn định cho v1.0,
- và sẵn sàng cho mở rộng tương lai.
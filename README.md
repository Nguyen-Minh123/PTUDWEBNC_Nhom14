# 🍲 Culinary Blog - Nhóm 14

Dự án phát triển hệ thống Full-Stack cho nền tảng Blog ẩm thực (**Culinary Blog**) theo tiêu chuẩn kiến trúc **Clean Architecture** và tài liệu đặc tả **SRS v1.0.0**. Hệ thống sử dụng **.NET 10 (Minimal APIs)**, **Next.js (App Router)**, **PostgreSQL 16**, **Redis 7**, và **MinIO**.

## 🎯 Mục tiêu Lab & Chuẩn hóa SRS
* **Kiến trúc Nền tảng (Lab 1):** Khởi tạo Clean Architecture 4 tầng, thiết lập CQRS với MediatR, xây dựng API CRUD có phân trang và tích hợp Scalar UI làm tài liệu OpenAPI.
* **Soft Delete Pattern (Lab 2):** Áp dụng xóa mềm (`IsDeleted = true`) cho các thực thể cốt lõi (Recipe, Category) kết hợp Global Query Filters trong EF Core.
* **Bảo mật Nâng cao (Chương 2 & Lab 5):** Mã hóa Refresh Token bằng SHA-256 (`TokenHash varchar(64)`), hiện thực hóa Token Rotation, chống Token Theft, Policy-based & Resource-based Authorization chống BOLA (OWASP API1).
* **Business Rules Khắt khe:** Ràng buộc công thức phải có ít nhất 1 Nguyên liệu và 1 Bước thực hiện mới được phép xuất bản (`RECIPE_PUBLISH_INCOMPLETE`).
* **Cấu trúc Dữ liệu & Sắp xếp:** Chuẩn hóa Owned Entity cho 6 chỉ số dinh dưỡng, tự động hóa số thứ tự bước (`StepNumber` renumbering), cú pháp sắp xếp linh hoạt (`?sort=-field`) và định dạng lỗi chuẩn RFC 7807 Problem Details.

---

## 🛠 Công nghệ Sử dụng
* **Backend:** .NET 10 Minimal APIs, C#, EF Core 10, ASP.NET Core Identity
* **Frontend:** Next.js 16 App Router (Route Groups), TypeScript, Tailwind CSS, TanStack Query v5, Zustand, Axios
* **Database & Caching:** PostgreSQL 16, Redis 7
* **Storage & Background Jobs:** MinIO (S3-compatible Object Storage), Hangfire
* **API Documentation:** OpenAPI 3.1 & Scalar UI (`/scalar/v1`)

---

Chuẩn bị thêm phần kế hoạch quản lý cho các chức năng bài LAB

# 👥 Phân công Nhiệm vụ (Lab 01-06: ✅ Done, Lab 07: ⏳ To Do)
| Thành viên / Vai trò | Mã Issue | Tên Nhiệm vụ chi tiết | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Nguyễn Nhất Minh**<br>*(Trưởng nhóm / Backend)* | **FR-BKE-001** | Dựng Backend Skeleton (.NET 10) | ✅ Done |
| | **FR-BKE-002** | Thiết lập CQRS/MediatR cho Category và Recipe | ✅ Done |
| | **FR-SEC-001** | Chuẩn hóa mã hóa Refresh Token SHA-256 | ✅ Done |
| | **FR-SEC-002** | Thiết lập Token Rotation | ✅ Done |
| | **FR-DOM-001** | Định nghĩa UserNotFoundException (Lab 3) | ✅ Done|
| | **FR-DOM-002** | Định nghĩa InvalidCredentialsException (Lab 3) | ✅ Done |
| | **FR-BKE-003** | Hiện thực API Tìm kiếm nâng cao (Full-Text Search) (Lab 3) | ✅ Done |
| | **FR-BKE-004** | Tối ưu truy vấn API Chi tiết (AsSplitQuery & Eager Loading) (Lab 3) | ✅ Done|
| | **FR-BKE-005** | Cài đặt Global Exception Middleware & Problem Details (Lab 3) | ✅ Done|
| | **FR-BKE-006** | Hoàn thiện Auth API: Đăng xuất & Xem/Cập nhật Hồ sơ cá nhân (Lab 4) | ✅ Done|
| | **FR-BKE-007** | Hiện thực API Quản lý Danh mục (CRUD: Thêm, Sửa, Xóa) cho Admin (Lab 4) | ✅ Done|
| | **FR-BKE-008** | Tích hợp API xác thực Google OAuth 2.0 (Social Login) (Lab 4) | ✅ Done|
| | **FR-BKE-009** | Xử lý Authorization (RBAC và Resource-Based) bảo vệ endpoints (Lab 4) | ✅ Done|
| | **FR-SEC-003** | Chuẩn hóa JWT Bearer & Cấu hình Token Validation nâng cao (Lab 5) | ✅ Done |
| | **FR-BKE-011** | Hiện thực phân quyền RBAC, Policy-based & Fallback Policy (Lab 5) | ✅ Done |
| | **FR-BKE-012** | Hoàn thiện Resource-Based Authorization chống BOLA (OWASP API1) (Lab 5) | ✅ Done |
| | **FR-SEC-004** | Xử lý Token Theft Detection trong Refresh Token Rotation (Lab 5) | ✅ Done |
| | **FR-FTE-027** | Xây dựng lớp tiện ích gọi API (Axios Client Instance & Interceptors) (Lab 6) | ✅ Done |
| | **FR-FTE-028** | Xây dựng lớp tiện ích Xử lý lỗi tập trung & Chuẩn hóa RFC 7807 (Lab 6) | ✅ Done |
| | **FR-FTE-029** | Hiện thực hóa cơ chế Silent Token Refresh Interceptor (Lab 6) | ✅ Done |
| | **FR-FTE-030** | Thiết kế giao diện tĩnh Trang Đăng nhập & Đăng ký (Lab 6) | ✅ Done |
| | **FR-BKE-014** | Hiện thực hóa API Quên mật khẩu & Đổi mật khẩu (Identity Reset/Change Password) (Lab 7) | ✅ Done |
| | **FR-FTE-031** | Hoàn thiện tích hợp API Đăng nhập, Đăng ký & Đăng xuất trên Frontend (Lab 7) | ⏳ To Do |
| | **FR-FTE-032** | Xây dựng giao diện và tích hợp API Quên mật khẩu (Forgot/Reset Password) (Lab 7) | ⏳ To Do |
| | **FR-FTE-033** | Xây dựng giao diện và tích hợp API Đổi mật khẩu (Change Password) (Lab 7) | ⏳ To Do |
| **Nguyễn Thế Khải**<br>*(Database & Infra)* | **FR-DB-001** | Khởi tạo EF Core Migrations | ✅ Done |
| | **FR-DB-002** | Định nghĩa BaseEntity, ApplicationUser | ✅ Done |
| | **FR-DB-003** | Cấu hình PostgreSQL 16 trên Docker | ✅ Done |
| | **FR-INF-001** | Xây dựng Soft Delete Interceptor | ✅ Done |
| | **FR-INF-002** | Tích hợp MinIO Async File Deletion | ✅ Done |
| | **FR-DOM-003** | Định nghĩa CategoryNotFoundException (Lab 3) | ✅ Done |
| | **FR-DB-004** | Khởi tạo cấu trúc SearchVector & GIN Index (Lab 3) | ✅ Done |
| | **FR-DB-005** | Mở rộng Full-Text Search cho trường Instructions (Lab 3) | ✅ Done |
| | **FR-DB-006** | Phân tích hiệu năng truy vấn bằng EXPLAIN ANALYZE (Lab 3) | ✅ Done |
| | **FR-DB-007** | Hiện thực API Quản lý Nguyên liệu (CRUD `RecipeIngredient`) (Lab 4) | ✅ Done|
| | **FR-DB-008** | Hiện thực API Quản lý Bước thực hiện (CRUD `RecipeStep`) (Lab 4) | ✅ Done|
| | **FR-INF-003** | Hiện thực API Upload và Quản lý Hình ảnh (`RecipeImage`) với MinIO (Lab 4) | ✅ Done|
| | **FR-DB-009** | Xử lý Concurrency Token (`RowVersion`) cập nhật Công thức (Lab 4) | ✅ Done|
| | **FR-INF-004** | Thiết lập CORS Policy đa môi trường (Development & Production) (Lab 5) | ✅ Done |
| | **FR-INF-005** | Cấu hình Rate Limiting nâng cao (Fixed Window & Token Bucket) (Lab 5) | ✅ Done |
| | **FR-INF-006** | Cấu hình Security Headers & Pipeline Middleware bảo mật (Lab 5) | ✅ Done |
| | **FR-BKE-013** | Cài đặt và cấu hình API Versioning (`Asp.Versioning.Http`) (Lab 5) | ✅ Done |
| | **FR-FTE-023** | Cài đặt store quản lý trạng thái xác thực (`auth-store.ts`) (Lab 6) | ✅ Done |
| | **FR-FTE-024** | Cài đặt store quản lý giao diện người dùng (`ui-store.ts`) (Lab 6) | ✅ Done |
| | **FR-FTE-025** | Cài đặt store quản lý bộ lọc và tìm kiếm (`filter-store.ts`) (Lab 6) | ✅ Done |
| | **FR-FTE-026** | Thiết kế giao diện tĩnh Trang Dashboard quản trị cá nhân (Lab 6) | ✅ Done |
| | **FR-BKE-015** | Tối ưu API Danh mục (Get All Categories kèm thống kê số bài viết) & Caching (Lab 7) | ⏳ To Do |
| | **FR-FTE-034** | Xây dựng trang xem danh sách tất cả Category (`/categories`) hiển thị dạng lưới (Lab 7) | ⏳ To Do |
| | **FR-FTE-035** | Xây dựng Sidebar danh mục cho Trang chủ và Trang Khám phá (`CategorySidebar`) (Lab 7) | ⏳ To Do |
| | **FR-FTE-036** | Cài đặt chức năng Tìm kiếm (Search Bar, Debounce, Filter by Category, Query Params) (Lab 7) | ⏳ To Do |
| **Phan Thành Huy**<br>*(DevOps & Testing)* | **FR-DVO-001** | Cấu hình docker-compose.yml tổng hợp (Nginx, Postgres, Redis, MinIO) | ✅ Done |
| | **FR-DVO-002** | Cấu hình 6 chỉ số dinh dưỡng | ✅ Done |
| | **FR-TST-001** | Kiểm thử API nâng cao | ✅ Done |
| | **FR-TST-002** | Hiện thực hóa Domain Rules xuất bản công thức | ✅ Done |
| | **FR-DOM-004** | Định nghĩa RecipeNotFoundException (Lab 3) | ✅ Done |
| | **FR-DOM-005** | Định nghĩa RecipeAlreadyPublishedException (Lab 3) | ✅ Done |
| | **FR-DOM-006** | Định nghĩa DuplicateStepNumberException (Lab 3) | ✅ Done |
| | **FR-TST-003** | Mở rộng Seeding Dữ liệu thực tế bằng Bogus (Lab 3) | ✅ Done |
| | **FR-TST-004** | Kiểm thử thuật toán unaccent cho Full-Text Search (Lab 3) | ✅ Done |
| | **FR-TST-005** | Bật SQL Logging & Đo lường hiệu năng AsNoTracking (Lab 3) | ✅ Done |
| | **FR-BKE-010** | Hiện thực API Quản lý vòng đời Công thức (CRUD, Publish, Archive) (Lab 4) | ✅ Done|
| | **FR-DVO-003** | Cài đặt Health Check Endpoints (`/health`, `/health/live`, `/ready`) (Lab 4) | ✅ Done|
| | **FR-DVO-004** | Thiết lập Structured Logging toàn hệ thống bằng `Serilog` (Lab 4) | ✅ Done|
| | **FR-TST-006** | Cập nhật Seeder cho Steps/Ingredients & Viết Test cho API mới (Lab 4) | ✅ Done|
| | **FR-DVO-005** | Tích hợp OpenAPI 3.1 & Scalar UI kèm Bearer Security Scheme (Lab 5) | ✅ Done |
| | **FR-DVO-006** | Bật XML Documentation Comments & Metadata chuẩn cho Endpoints (Lab 5) | ✅ Done |
| | **FR-TST-007** | Xây dựng bộ 15 kịch bản kiểm thử API tự động (`culinary-blog.http`) (Lab 5) | ✅ Done |
| | **FR-TST-008** | Viết Integration Tests kiểm thử ma trận phân quyền (`TestAuthHandler`) (Lab 5) | ✅ Done |
| | **FR-FTE-019** | Xây dựng bộ component điều hướng dùng chung (Header & Footer) (Lab 6) | ✅ Done |
| | **FR-FTE-020** | Xây dựng component Pagination (Phân trang) tái sử dụng (Lab 6) | ✅ Done |
| | **FR-FTE-021** | Xây dựng hệ thống Loading & Skeleton States (Lab 6) | ✅ Done |
| | **FR-FTE-022** | Xây dựng hệ thống Error & User Feedback Components (Toast, EmptyState) (Lab 6) | ✅ Done |
| | **FR-FTE-037** | Xây dựng và tích hợp dữ liệu Trang chi tiết công thức (`/recipes/[slug]` hoặc `[id]`) (Lab 7) | ⏳ To Do |
| | **FR-FTE-038** | Tích hợp hiển thị Nguyên liệu (`Ingredients`), Các bước thực hiện (`Steps`) & Dinh dưỡng (Lab 7) | ⏳ To Do |
| | **FR-FTE-039** | Xây dựng tương tác xem ảnh phóng to & Giao diện Đánh giá/Bình luận cơ bản (Lab 7) | ⏳ To Do |
| | **FR-TST-009** | Viết kịch bản kiểm thử E2E / Integration cho luồng Auth, Search và Xem chi tiết (Lab 7) | ⏳ To Do |
| **Bùi Trung Hiếu**<br>*(Frontend Next.js)* | **FR-FTE-001** | Dựng Frontend Skeleton (Next.js 15 App Router + Tailwind CSS) | ✅ Done |
| | **FR-FTE-002** | Đồng bộ TypeScript Interfaces | ✅ Done |
| | **FR-FTE-003** | Chuẩn hóa cú pháp sắp xếp (?sort=-field) | ✅ Done |
| | **FR-FTE-004** | Thiết lập Validation Behavior | ✅ Done |
| | **FR-DOM-007** | Định nghĩa UnsupportedSortFieldException (Lab 3) | ✅ Done |
| | **FR-FTE-005** | Tích hợp giao diện Tìm kiếm & Comment (Lab 3) | ✅ Done |
| | **FR-FTE-006** | Tích hợp DTO giảm tải dữ liệu (ProjectToType) (Lab 3) | ✅ Done |
| | **FR-FTE-007** | Tích hợp `Auth.js v5` xử lý luồng Login, Logout & Bảo vệ Route (Lab 4) | ✅ Done |
| | **FR-FTE-008** | Xây dựng Dashboard quản lý Profile và danh sách Recipe cá nhân (Lab 4) | ✅ Done |
| | **FR-FTE-009** | Xây dựng Form tạo Recipe đa bước (React Hook Form + Zod) (Lab 4) | ✅ Done |
| | **FR-FTE-010** | Tích hợp API Upload hình ảnh, thêm Bước thực hiện và Nguyên liệu (Lab 4) | ✅ Done |
| | **FR-FTE-011** | Thiết lập môi trường (`.env.local`) & Cấu hình `next.config.ts` tối ưu (Lab 5) | ✅ Done |
| | **FR-FTE-012** | Chuẩn hóa cấu trúc thư mục Next.js 15 App Router theo Route Groups (Lab 5) | ✅ Done |
| | **FR-FTE-013** | Cài đặt & cấu hình thư viện cốt lõi (TanStack Query, Zustand, Axios) (Lab 5) | ✅ Done |
| | **FR-FTE-014** | Cài đặt toàn bộ kiểu dữ liệu TypeScript (TS Types/DTOs) đồng bộ Backend (Lab 5) | ✅ Done |
| | **FR-FTE-015** | Cài đặt và cấu hình bộ thư viện giao diện shadcn/ui (Lab 6) | ✅ Done |
| | **FR-FTE-016** | Xây dựng hệ thống bố cục chung (Layout System) cho Blog App (Lab 6) | ✅ Done |
| | **FR-FTE-017** | Thiết kế giao diện tĩnh Trang chủ & Trang khám phá công thức (Lab 6) | ✅ Done |
| | **FR-FTE-018** | Thiết kế giao diện tĩnh Trang chi tiết công thức (Lab 6) | ✅ Done |
| | **FR-FTE-040** | Hoàn thiện Trang chủ (`/`): Tích hợp Header, Footer, Sidebar và Main Content công thức mới (Lab 7) | ⏳ To Do |
| | **FR-FTE-041** | Xây dựng Component danh sách thẻ công thức (`RecipeCard`, `RecipeGrid`) với Phân trang (Lab 7) | ⏳ To Do |
| | **FR-FTE-042** | Xây dựng Trang hồ sơ cá nhân (`/profile`) xem thông tin tài khoản và danh sách bài viết (Lab 7) | ⏳ To Do |
| | **FR-FTE-043** | Hoàn thiện tính năng Cập nhật hồ sơ (Chỉnh sửa tên, avatar, thông tin giới thiệu) (Lab 7) | ⏳ To Do |
---

## ⚙️ Hướng dẫn Khởi chạy Hệ thống

Để chạy dự án, bạn cần cài đặt sẵn `Docker`, `.NET 10.0 SDK`, và `Node.js`.

### Bước 1: Khởi động các dịch vụ nền (Database, Cache, Storage)
Mở Terminal tại thư mục gốc của dự án và chạy:
```bash
docker compose up -d
```
Lệnh này sẽ tải và chạy ngầm các container:
- **PostgreSQL**: Cơ sở dữ liệu chính (lắng nghe ở cổng `5432`).
- **Redis**: Dùng để lưu trữ bộ nhớ đệm (Cache) (cổng `6379`).
- **MinIO**: Server lưu trữ file hình ảnh chuẩn S3 (cổng `9000` và `9001`).

### Cấu hình biến môi trường JWT cho API (Tùy chọn)
Các endpoint tạo và thay đổi recipe yêu cầu access token dạng Bearer. File `culinary-blog/src/backend/culinary-blog.http` lấy token từ biến môi trường `CULINARY_BLOG_ACCESS_TOKEN`.
```powershell
$env:Jwt__Issuer = "CulinaryBlog"
$env:Jwt__Audience = "CulinaryBlogClient"
$env:Jwt__SigningKey = "super-secret-key-that-is-very-long-for-hmac-sha256-1234567890"
$env:CULINARY_BLOG_ACCESS_TOKEN = "<access-token>"
```

### Bước 2: Cập nhật CSDL và Khởi chạy Backend (.NET Core API)
Di chuyển vào thư mục API:
```bash
cd src/backend/src/CulinaryBlog.API
```
Cập nhật cơ sở dữ liệu:
```bash
dotnet ef database update --project ../CulinaryBlog.Infrastructure
```
Khởi chạy Backend:
```bash
dotnet run
```
> **Tài liệu API:** Truy cập trực tiếp tại trình duyệt: **http://localhost:5075/scalar/v1**

### Bước 3: Cài đặt và Khởi chạy Frontend (Next.js)
Di chuyển vào thư mục Frontend:
```bash
cd src/frontend
```
Cài đặt các gói thư viện (chỉ cần chạy lần đầu):
```bash
npm install
```
Khởi chạy giao diện Web:
```bash
npm run dev
```
> **Lưu ý:** Frontend sẽ khởi chạy tại **http://localhost:3000**.

---

## 🗄️ Nơi lưu trữ Dữ liệu

Dự án phân bổ dữ liệu vào 3 nơi chuyên biệt để tối ưu hiệu năng:
1. **PostgreSQL (`postgres_data` volume)**: Chứa toàn bộ dữ liệu văn bản, thông tin tài khoản, mật khẩu (đã băm), nội dung công thức, danh mục và bình luận.
2. **MinIO Storage (`minio_data` volume)**: Đóng vai trò như ổ cứng đám mây (Cloud Storage) để lưu hình ảnh thật của món ăn và avatar người dùng. Database chỉ lưu đường dẫn (URL) của ảnh.
3. **Redis**: Lưu dữ liệu tạm thời (Cache), phiên hoạt động để truy xuất nhanh và giảm tải cho Database.

---

## 🔗 Danh sách các API cốt lõi

### Xác thực (Authentication)
- `POST /api/v1/auth/register`: Đăng ký tài khoản người dùng mới.
- `POST /api/v1/auth/login`: Xác thực Email/Mật khẩu và cấp `Token JWT`.
- `POST /api/v1/auth/google-login`: Đăng nhập/Đăng ký nhanh bằng tài khoản Google.
- `POST /api/v1/auth/refresh`: Cấp lại Token mới (Token Rotation).

### Công thức nấu ăn (Recipes)
- `GET /api/v1/recipes`: Lấy danh sách công thức (phân trang, lọc theo độ khó, thời gian nấu).
- `GET /api/v1/recipes/search`: Tìm kiếm Full-Text Search không dấu.
- `POST /api/v1/recipes`: Tạo một công thức mới (Yêu cầu có Token).
- `GET /api/v1/recipes/{id}`: Xem chi tiết cách làm và nguyên liệu.
- `PUT /api/v1/recipes/{id}`: Cập nhật công thức (Yêu cầu là tác giả hoặc Admin).
- `POST /api/v1/recipes/{id}/publish`: Xuất bản công thức (Domain Rules).
- `POST /api/v1/recipes/{id}/archive`: Lưu trữ công thức.
- `DELETE /api/v1/recipes/{id}`: Xóa mềm công thức (Yêu cầu là tác giả hoặc Admin).

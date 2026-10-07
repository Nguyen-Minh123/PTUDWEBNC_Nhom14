# 🍲 Culinary Blog - Nhóm 14

Dự án phát triển hệ thống Full-Stack cho nền tảng Blog ẩm thực (**Culinary Blog**) theo tiêu chuẩn kiến trúc **Clean Architecture** và tài liệu đặc tả **SRS v1.0.0**. Hệ thống sử dụng **.NET 10 (Minimal APIs)**, **Next.js (App Router)**, **PostgreSQL 16**, **Redis 7**, và **MinIO**.

## 🎯 Mục tiêu Lab & Chuẩn hóa SRS
* **Kiến trúc Nền tảng (Lab 1):** Khởi tạo Clean Architecture 4 tầng, thiết lập CQRS với MediatR, xây dựng API CRUD có phân trang và tích hợp Scalar UI làm tài liệu OpenAPI[cite: 4].
* **Soft Delete Pattern (Lab 2):** Áp dụng xóa mềm (`IsDeleted = true`) cho các thực thể cốt lõi (Recipe, Category) kết hợp Global Query Filters trong EF Core[cite: 12].
* **Bảo mật Nâng cao (Chương 2):** Mã hóa Refresh Token bằng SHA-256 (`TokenHash varchar(64)`), hiện thực hóa Token Rotation và chống Reuse Attack[cite: 10, 12].
* **Business Rules Khắt khe:** Ràng buộc công thức phải có ít nhất 1 Nguyên liệu và 1 Bước thực hiện mới được phép xuất bản (`RECIPE_PUBLISH_INCOMPLETE`)[cite: 12].
* **Cấu trúc Dữ liệu & Sắp xếp:** Chuẩn hóa Owned Entity cho 6 chỉ số dinh dưỡng, tự động hóa số thứ tự bước (`StepNumber` renumbering), cú pháp sắp xếp linh hoạt (`?sort=-field`) và định dạng lỗi chuẩn RFC 7807[cite: 12].

---

## 🛠 Công nghệ Sử dụng
* **Backend:** .NET 10 Minimal APIs, C#, EF Core 10, ASP.NET Core Identity[cite: 10, 13]
* **Frontend:** Next.js App Router, TypeScript, Tailwind CSS, TanStack Query
* **Database & Caching:** PostgreSQL 16, Redis 7[cite: 13]
* **Storage & Background Jobs:** MinIO (S3-compatible Object Storage), Hangfire[cite: 13]
* **API Documentation:** Scalar UI (`/scalar/v1`)

---

# 👥 Phân công Nhiệm vụ (Lab 01-03: ✅ Done, Lab 04: ⏳ To Do)
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
| | **FR-BKE-006** | Hoàn thiện Auth API: Đăng xuất & Xem/Cập nhật Hồ sơ cá nhân (Lab 4) | ⏳ To Do |
| | **FR-BKE-007** | Hiện thực API Quản lý Danh mục (CRUD: Thêm, Sửa, Xóa) cho Admin (Lab 4) | ⏳ To Do |
| | **FR-BKE-008** | Tích hợp API xác thực Google OAuth 2.0 (Social Login) (Lab 4) | ⏳ To Do |
| | **FR-BKE-009** | Xử lý Authorization (RBAC và Resource-Based) bảo vệ endpoints (Lab 4) | ⏳ To Do |
| **Nguyễn Thế Khải**<br>*(Database & Infra)* | **FR-DB-001** | Khởi tạo EF Core Migrations | ✅ Done |
| | **FR-DB-002** | Định nghĩa BaseEntity, ApplicationUser | ✅ Done |
| | **FR-DB-003** | Cấu hình PostgreSQL 16 trên Docker | ✅ Done |
| | **FR-INF-001** | Xây dựng Soft Delete Interceptor | ✅ Done |
| | **FR-INF-002** | Tích hợp MinIO Async File Deletion | ✅ Done |
| | **FR-DOM-003** | Định nghĩa CategoryNotFoundException (Lab 3) | ✅ Done |
| | **FR-DB-004** | Khởi tạo cấu trúc SearchVector & GIN Index (Lab 3) | ✅ Done |
| | **FR-DB-005** | Mở rộng Full-Text Search cho trường Instructions (Lab 3) | ✅ Done |
| | **FR-DB-006** | Phân tích hiệu năng truy vấn bằng EXPLAIN ANALYZE (Lab 3) | ✅ Done |
| | **FR-DB-007** | Hiện thực API Quản lý Nguyên liệu (CRUD `RecipeIngredient`) (Lab 4) | ⏳ To Do |
| | **FR-DB-008** | Hiện thực API Quản lý Bước thực hiện (CRUD `RecipeStep`) (Lab 4) | ⏳ To Do |
| | **FR-INF-003** | Hiện thực API Upload và Quản lý Hình ảnh (`RecipeImage`) với MinIO (Lab 4) | ⏳ To Do |
| | **FR-DB-009** | Xử lý Concurrency Token (`RowVersion`) cập nhật Công thức (Lab 4) | ⏳ To Do |
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
| | **FR-BKE-010** | Hiện thực API Quản lý vòng đời Công thức (CRUD, Publish, Archive) (Lab 4) | ⏳ To Do |
| | **FR-DVO-003** | Cài đặt Health Check Endpoints (`/health`, `/health/live`, `/ready`) (Lab 4) | ⏳ To Do |
| | **FR-DVO-004** | Thiết lập Structured Logging toàn hệ thống bằng `Serilog` (Lab 4) | ⏳ To Do |
| | **FR-TST-006** | Cập nhật Seeder cho Steps/Ingredients & Viết Test cho API mới (Lab 4) | ⏳ To Do |
| **Bùi Trung Hiếu**<br>*(Frontend Next.js)* | **FR-FTE-001** | Dựng Frontend Skeleton (Next.js 15 App Router + Tailwind CSS) | ✅ Done |
| | **FR-FTE-002** | Đồng bộ TypeScript Interfaces | ✅ Done |
| | **FR-FTE-003** | Chuẩn hóa cú pháp sắp xếp (?sort=-field) | ✅ Done |
| | **FR-FTE-004** | Thiết lập Validation Behavior | ✅ Done |
| | **FR-DOM-007** | Định nghĩa UnsupportedSortFieldException (Lab 3) | ✅ Done |
| | **FR-FTE-005** | Tích hợp giao diện Tìm kiếm & Comment (Lab 3) | ✅ Done |
| | **FR-FTE-006** | Tích hợp DTO giảm tải dữ liệu (ProjectToType) (Lab 3) | ✅ Done |
| | **FR-FTE-007** | Tích hợp `Auth.js v5` xử lý luồng Login, Logout & Bảo vệ Route (Lab 4) | ⏳ To Do |
| | **FR-FTE-008** | Xây dựng Dashboard quản lý Profile và danh sách Recipe cá nhân (Lab 4) | ⏳ To Do |
| | **FR-FTE-009** | Xây dựng Form tạo Recipe đa bước (React Hook Form + Zod) (Lab 4) | ⏳ To Do |
| | **FR-FTE-010** | Tích hợp API Upload hình ảnh, thêm Bước thực hiện và Nguyên liệu (Lab 4) | ⏳ To Do |
---

## ⚙️ Hướng dẫn Khởi chạy Hệ thống
Để chạy dự án, bạn cần cài đặt sẵn `Docker`, `.NET 10.0 SDK` (hoặc tương đương theo version dự án), và `Node.js`.

### Bước 1: Khởi động các dịch vụ nền (Database, Cache, Storage)
Mở Terminal tại thư mục gốc của dự án (thư mục chứa file `docker-compose.yml`) và chạy lệnh:
```bash
docker compose up -d
```
Lệnh này sẽ tải và chạy ngầm các container:
- **PostgreSQL**: Cơ sở dữ liệu chính (lắng nghe ở cổng `5432`).
- **Redis**: Dùng để lưu trữ bộ nhớ đệm (Cache) (cổng `6379`).
- **MinIO**: Server lưu trữ file hình ảnh chuẩn S3 (cổng `9000` và `9001`).

### Bước 2: Cập nhật CSDL và Khởi chạy Backend (.NET Core API)
Di chuyển vào thư mục API:
```bash
cd src/backend/src/CulinaryBlog.API
```
Cập nhật cơ sở dữ liệu (tự động tạo bảng dựa trên code):
```bash
dotnet ef database update --project ../CulinaryBlog.Infrastructure
```
Khởi chạy Backend:
```bash
dotnet run
```
> **Lưu ý:** Backend sẽ chạy tại **http://localhost:5075**. Bạn có thể truy cập `http://localhost:5075/swagger` để xem tài liệu chi tiết của các API.

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

Dưới đây là các API chính được Frontend sử dụng thường xuyên để giao tiếp với hệ thống:

### Xác thực (Authentication)
- `POST /api/auth/login`: Xác thực Email/Mật khẩu và cấp `Token JWT`.
- `POST /api/auth/google`: Đăng nhập/Đăng ký nhanh bằng tài khoản Google.
- `POST /api/auth/refresh`: Cấp lại Token mới khi Token cũ sắp hết hạn.

### Công thức nấu ăn (Recipes)
- `GET /api/recipes`: Lấy danh sách công thức (hỗ trợ tìm kiếm Full-text search không dấu, lọc theo độ khó, thời gian nấu).
- `POST /api/recipes`: Tạo một công thức mới (Yêu cầu phải có Token).
- `GET /api/recipes/{id}`: Xem chi tiết cách làm và nguyên liệu.
- `POST /api/recipes/{id}/images`: Upload hình ảnh của công thức lên server MinIO.

### Tương tác (Comments)
- `GET /api/recipes/{id}/comments`: Tải danh sách bình luận của món ăn.
- `POST /api/recipes/{id}/comments`: Gửi bình luận và đánh giá mới.

### Bước 3: Khởi chạy Frontend (Next.js)

cd src/frontend
npm install
npm run dev

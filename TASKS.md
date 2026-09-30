## 👥 Phân công Nhiệm vụ (Lab 01-03: ✅ Done, Lab 04: ⏳ To Do)

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

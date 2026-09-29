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

## 👥 Phân công Nhiệm vụ (Lab01: ✅ Done, Lab02: ✅ Done, lab03: ⏳ Todo)
| Thành viên / Vai trò | Mã Issue | Tên Nhiệm vụ chi tiết | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Nguyễn Nhất Minh**<br>*(Trưởng nhóm / Backend)* | **FR-BKE-001** | Dựng Backend Skeleton (.NET 10) | ✅ Done |
| | **FR-BKE-002** | Thiết lập CQRS/MediatR cho Category và Recipe | ✅ Done |
| | **FR-SEC-001** | Chuẩn hóa mã hóa Refresh Token SHA-256 | ✅ Done |
| | **FR-SEC-002** | Thiết lập Token Rotation | ✅ Done |
| | **FR-BKE-003** | Hiện thực API Tìm kiếm nâng cao (Full-Text Search) | ⏳ Todo |
| | **FR-BKE-004** | Tối ưu truy vấn API Chi tiết (AsSplitQuery & Eager Loading) | ⏳ Todo |
| **Nguyễn Thế Khải**<br>*(Database & Infra)* | **FR-DB-001** | Khởi tạo EF Core Migrations | ✅ Done |
| | **FR-DB-002** | Định nghĩa BaseEntity, ApplicationUser | ✅ Done |
| | **FR-DB-003** | Cấu hình PostgreSQL 16 trên Docker | ✅ Done |
| | **FR-INF-001** | Xây dựng Soft Delete Interceptor | ✅ Done |
| | **FR-INF-002** | Tích hợp MinIO Async File Deletion | ✅ Done |
| | **FR-DB-004** | Khởi tạo cấu trúc SearchVector & GIN Index | ⏳ Todo |
| | **FR-DB-005** | Mở rộng Full-Text Search cho trường Instructions | ⏳ Todo |
| | **FR-DB-006** | Phân tích hiệu năng truy vấn bằng EXPLAIN ANALYZE | ⏳ Todo |
| **Phan Thành Huy**<br>*(DevOps & Testing)* | **FR-DVO-001** | Cấu hình docker-compose.yml tổng hợp (Nginx, Postgres, Redis, MinIO) | ✅ Done |
| | **FR-DVO-002** | Cấu hình 6 chỉ số dinh dưỡng | ✅ Done |
| | **FR-TST-001** | Kiểm thử API nâng cao | ✅ Done |
| | **FR-TST-002** | Hiện thực hóa Domain Rules xuất bản công thức | ✅ Done |
| | **FR-TST-003** | Mở rộng Seeding Dữ liệu thực tế bằng Bogus | ⏳ Todo |
| | **FR-TST-004** | Kiểm thử thuật toán unaccent cho Full-Text Search | ⏳ Todo |
| | **FR-TST-005** | Bật SQL Logging & Đo lường hiệu năng AsNoTracking | ⏳ Todo |
| **Bùi Trung Hiếu**<br>*(Frontend Next.js)* | **FR-FTE-001** | Dựng Frontend Skeleton (Next.js 15 App Router + Tailwind CSS) | ✅ Done |
| | **FR-FTE-002** | Đồng bộ TypeScript Interfaces | ✅ Done |
| | **FR-FTE-003** | Chuẩn hóa cú pháp sắp xếp (?sort=-field) | ✅ Done |
| | **FR-FTE-004** | Thiết lập Validation Behavior | ✅ Done |
| | **FR-FTE-005** | Tích hợp giao diện Tìm kiếm & Comment | ⏳ Todo |
| | **FR-FTE-006** | Tích hợp DTO giảm tải dữ liệu (ProjectToType) | ⏳ Todo |
---

## ⚙️ Hướng dẫn Khởi chạy Hệ thống (Local Development)
```bash
### Bước 1: Khởi động Hạ tầng (Docker Compose)
Đảm bảo ứng dụng **Docker Desktop** trên máy tính đã được bật và chạy ổn định. Mở Terminal tại thư mục gốc của dự án (`culinary-blog`) và chạy[cite: 13, 15]:

docker compose up -d

### Bước 2: Khởi chạy Backend API (.NET 10)

cd src/backend
dotnet restore
dotnet watch run --project src/CulinaryBlog.API

Tài liệu API Scalar UI: Truy cập trực tiếp tại trình duyệt:
👉 http://localhost:5075/scalar/v1

### Bước 3: Khởi chạy Frontend (Next.js)

cd src/frontend
npm install
npm run dev

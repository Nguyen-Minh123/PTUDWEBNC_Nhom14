* **Full-Stack Vertical Slicing:** Mỗi thành viên tự đảm nhận trọn vẹn luồng dữ liệu (Database $\rightarrow$ API $\rightarrow$ Frontend UI) cho tính năng được giao, tránh tình trạng chia cứng riêng Backend/Frontend[cite: 4].
* **Chéo Code Review:** Người làm Backend tính năng A phải review Code Frontend của tính năng đó và ngược lại.
* **Mock Defense Nội Bộ:** Cuối mỗi tuần, nhóm dành 30 phút luân phiên đóng vai "Thầy cô phản biện" để kiểm tra kiến thức lẫn nhau về luồng dữ liệu, database và xử lý lỗi.

## 🗓️ Lộ Trình Phân Công Chi Tiết 

### 📌 Tuần 1: Khởi Tạo Nền Tảng & Môi Trường 
> **Mục tiêu:** Cả 4 thành viên cùng hiểu cấu trúc hệ thống, chạy thành công môi trường Docker Compose local và dựng khung ứng dụng[cite: 4].

| Thành viên | Phân công công việc | Sản phẩm đầu ra (Deliverables) |
| :--- | :--- | :--- |
| **Nguyễn Nhất Minh** | Dựng Backend Skeleton (.NET 10 Minimal API), cấu hình Clean Architecture 4 tầng (Domain, Application, Infrastructure, Presentation)[cite: 4]. | Codebase Backend chạy được API Hello World, cấu trúc thư mục chuẩn[cite: 4]. |
| **Nguyễn Thế Khải** | Khởi tạo EF Core Migrations, định nghĩa `BaseEntity`, `ApplicationUser` và cấu hình PostgreSQL 16 trên Docker[cite: 4]. | Database schema khởi tạo thành công trên Postgres local[cite: 4]. |
| **Bùi Trung Hiếu** | Dựng Frontend Skeleton (Next.js 15 App Router + TypeScript + Tailwind CSS), dựng Layout chung (Header, Footer, Nav)[cite: 4]. | Khung UI cơ bản responsive trên trình duyệt[cite: 4]. |
| **Phan Thành Huy** | Cấu hình `docker-compose.yml` tổng hợp (Nginx, Postgres, Redis, MinIO), viết API Client Base (Fetch/Axios) phía Frontend[cite: 4]. | Môi trường Docker local khởi chạy trơn tru với 1 câu lệnh[cite: 4]. |

# Phân công nhiệm vụ Lab 1: Kiến trúc Web và RESTful API

**Mục tiêu:** Khởi tạo nền tảng Clean Architecture, thiết lập CQRS với MediatR, tạo API CRUD có phân trang và tích hợp OpenAPI (Scalar) cho dự án Culinary Blog.

## 🧑‍💻 Chi tiết phân công (Sprint 1)

### 1. Nguyễn Nhất Minh (Trưởng nhóm - Backend API & CQRS)
**Nhánh làm việc:** `feature/lab1-cqrs-api`
- **Application Layer:** 
  - Khởi tạo Use Cases cho `Category` và `Recipe` bằng MediatR (tạo các thư mục Commands, Queries).
  - Viết `CreateRecipeCommand`, `GetRecipesQuery` (hỗ trợ phân trang, lọc theo độ khó `Difficulty`, `CategoryId`) và `GetRecipeByIdQuery`.
- **DTO & Mapping:** 
  - Tạo các model `CategoryDto`, `RecipeDetailDto`, `PaginatedResult`.
  - Cấu hình `Mapster` để ánh xạ dữ liệu, tối ưu truy vấn bằng `ProjectToType<T>()`.
- **API Layer:**
  - Thiết kế Minimal APIs (`CategoryEndpoints.cs`, `RecipeEndpoints.cs`) hỗ trợ đầy đủ RESTful CRUD.
  - Triển khai nested resource: `GET /api/v1/categories/{id}/recipes` lấy danh sách công thức theo danh mục.
  - Cấu hình Scalar UI để tự động tạo tài liệu OpenAPI với đầy đủ summary, description và response types.

### 2. Nguyễn Thế Khải (Database & Infrastructure)
**Nhánh làm việc:** `feature/lab1-recipe-entity`
- **Domain Layer:** 
  - Hoàn thiện Entity `Category` với Factory method `Create()` và `Update()`.
  - Tạo Entity `Recipe` với đầy đủ thuộc tính nghiệp vụ: `Title`, `Description`, `Instructions`, `PrepTimeMinutes`, `CookTimeMinutes`, `Servings`, `Difficulty` (enum), `CategoryId`, `AuthorId`.
- **Infrastructure Layer:**
  - Cấu hình ràng buộc dữ liệu Fluent API qua `IEntityTypeConfiguration<Recipe>` và `Category`.
  - Khai báo các bảng (`DbSet`) vào `ApplicationDbContext`.
- **Cơ sở dữ liệu:** Chạy lệnh tạo EF Core Migration và cập nhật cấu trúc bảng xuống PostgreSQL.

### 3. Phan Thành Huy (DevOps & Testing)
**Nhánh làm việc:** `task/lab1-api-testing`
- **Quản trị Local:** Đảm bảo hệ thống Docker Compose (PostgreSQL, Redis, MinIO) hoạt động mượt mà trên máy của tất cả thành viên.
- **Kiểm thử API:** 
  - Viết các kịch bản kiểm thử bằng file `.http` (hoặc curl) cho tất cả các endpoint API.
  - Kiểm thử chuyên sâu các query string nâng cao như phân trang, sắp xếp và bộ lọc custom (lọc theo `minCookTime`, `maxCookTime`, mức độ khó).

### 4. Bùi Trung Hiếu (Frontend Next.js)
**Nhánh làm việc:** `feature/lab1-frontend-types`
- **Đồng bộ Data Model:** Định nghĩa các TypeScript types/interfaces (`Category.ts`, `Recipe.ts`, `PaginatedResult.ts`) sao cho khớp chính xác với chuẩn response JSON của Backend.
- **API Client:** Thiết lập các hàm `fetch` hoặc Axios services chuẩn bị gọi đến các endpoint `/api/v1/categories` và `/api/v1/recipes`.

---
**Quy định Pull Request:**
* Tuyệt đối không đẩy code trực tiếp lên `main`.
* Khi xong task, mở Pull Request từ nhánh cá nhân vào `main`.
* Cần ít nhất 1 thành viên khác (có quyền Write) vào xem tab *Files changed*, chọn **Approve** trước khi gộp nhánh.





# 🍲 Culinary Blog API - Nhóm 14 (Lab 2: Chuẩn hóa SRS & Nâng cao)

Dự án phát triển hệ thống Backend cho nền tảng Blog ẩm thực theo kiến trúc **Clean Architecture**, tuân thủ nghiêm ngặt các tiêu chuẩn kỹ thuật SRS v1.0.0, sử dụng **.NET 10 (Minimal APIs)**, **PostgreSQL**, **Redis**, và **MinIO**.

---

## 🚀 Mục tiêu Lab 2 (Theo Kế hoạch Chuẩn hóa SRS)
* Áp dụng mô hình **Soft Delete Pattern** cho các Aggregate chính (Recipe, Category) kết hợp Global Query Filters[cite: 12].
* Chuẩn hóa bảo mật **Refresh Token Hashing (SHA-256)** và cơ chế Token Rotation[cite: 12].
* Hoàn thiện Business Rules khắt khe cho việc xuất bản công thức ($\ge 1$ nguyên liệu, $\ge 1$ bước)[cite: 12].
* Đồng bộ 6 chỉ số dinh dưỡng (Owned Entity), tự động hóa số thứ tự bước thực hiện (`StepNumber` renumbering) và cấu hình Quantity/Unit Nullable cho nguyên liệu[cite: 12].
* Thống nhất cú pháp sắp xếp (`?sort=-field`) và định dạng lỗi chuẩn RFC 7807 (`VALIDATION_ERROR` - HTTP 400)[cite: 12].

---

## 👥 Phân công nhiệm vụ chi tiết theo Giai đoạn Sprint

| Thành viên | Phụ trách chính | Các Module & Nhiệm vụ Cốt lõi |
| :--- | :--- | :--- |
| **Nguyễn Nhất Minh** *(Nhóm trưởng)* | TV1: Auth & Security | Chuẩn hóa cơ chế mã hóa Refresh Token SHA-256, `JwtService` Token Rotation và chống Reuse Attack[cite: 12]. |
| **Nguyễn Thế Khải** | TV2: Media & Caching | Xây dựng Soft Delete Interceptor, tích hợp MinIO Async File Deletion (Hangfire) và chiến lược Caching (TTL 30m/15m)[cite: 12]. |
| **Phan Thành Huy** | TV3: Recipe & Domain Rules | Hiện thực hóa Domain Rules xuất bản công thức, cấu hình 6 chỉ số dinh dưỡng, tự động hóa `StepNumber` và xử lý nguyên liệu Nullable[cite: 12]. |
| **Bùi Trung Hiếu** | TV4: Search & Validation | Chuẩn hóa cú pháp tham số sắp xếp `?sort=-field`, đồng bộ MediatR ValidationBehavior trả về RFC 7807 (HTTP 400) và kiểm thử tổng hợp[cite: 12]. |

---

## ⚙️ Hướng dẫn Khởi chạy Nhanh

1. Cập nhật mã nguồn mới nhất từ nhánh chung:
   ```bash
   git pull origin main --rebase
   git checkout feature/lab2-srs-standardization
Khôi phục các gói thư viện dự án:

Bash
dotnet restore
Khởi chạy hệ thống cơ sở dữ liệu qua Docker Compose (PostgreSQL, Redis, MinIO):

Bash
docker compose up -d
Chạy ứng dụng Backend:

Bash
dotnet watch run --project src/CulinaryBlog.API
Truy cập giao diện tài liệu API Scalar:
👉 http://localhost:5075/scalar/v1

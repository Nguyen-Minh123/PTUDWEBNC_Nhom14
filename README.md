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

## 👥 Phân công Nhiệm vụ 

| Thành viên | Vai trò chuyên trách | Nhiệm vụ cốt lõi |
| :--- | :--- | :--- |
| **Nguyễn Nhất Minh** *(Nhóm trưởng)* | Backend & Security (TV1) | Dựng Backend Skeleton (.NET 10), thiết lập CQRS/MediatR cho Category/Recipe, chuẩn hóa mã hóa Refresh Token SHA-256 và Token Rotation[cite: 4, 12]. |
| **Nguyễn Thế Khải** | Database & Infrastructure (TV2) | Khởi tạo EF Core Migrations, định nghĩa `BaseEntity`, `ApplicationUser`, cấu hình PostgreSQL 16 trên Docker, xây dựng Soft Delete Interceptor và tích hợp MinIO Async File Deletion[cite: 4, 12]. |
| **Phan Thành Huy** | DevOps & Testing (TV3) | Cấu hình `docker-compose.yml` tổng hợp (Nginx, Postgres, Redis, MinIO), kiểm thử API nâng cao và hiện thực hóa Domain Rules xuất bản công thức, cấu hình 6 chỉ số dinh dưỡng[cite: 4, 12]. |
| **Bùi Trung Hiếu** | Frontend Next.js (TV4) | Dựng Frontend Skeleton (Next.js 15 App Router + Tailwind CSS), đồng bộ TypeScript Interfaces, chuẩn hóa cú pháp sắp xếp (`?sort=-field`) và Validation Behavior[cite: 4, 12, 13]. |

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

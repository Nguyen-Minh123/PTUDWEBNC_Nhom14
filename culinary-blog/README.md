# 🍽️ Culinary Blog - Nhóm 14

Dự án phát triển hệ thống Full-Stack cho nền tảng Blog ẩm thực (**Culinary Blog**) theo tiêu chuẩn kiến trúc **Clean Architecture** và tài liệu đặc tả **SRS v1.0.0**. Hệ thống sử dụng **.NET 10 (Minimal APIs)**, **Next.js (App Router)**, **PostgreSQL 16**, **Redis 7**, và **MinIO**.

---

## 🎯 Mục tiêu Lab & Chuẩn hóa SRS
* **Kiến trúc Nền tảng (Lab 1):** Khởi tạo Clean Architecture 4 tầng, thiết lập CQRS với MediatR, xây dựng API CRUD có phân trang và tích hợp Scalar UI làm tài liệu OpenAPI.
* **Soft Delete Pattern (Lab 2):** Áp dụng xóa mềm (IsDeleted = true) cho các thực thể cốt lõi (Recipe, Category) kết hợp Global Query Filters trong EF Core.
* **Bảo mật Nâng cao (Chương 2):** Mã hóa Refresh Token bằng SHA-256 (TokenHash varchar(64)), hiện thực hóa Token Rotation và chống Reuse Attack.
* **Quy chuẩn Lab 3 (MỚI CẬP NHẬT):** 
  * ✅ **Domain Exceptions:** Đã chia đều nhiệm vụ thiết lập các class kế thừa DomainException cho 4 thành viên (Auth, Category, Recipe, Search).
  * ✅ **Repository & Unit of Work:** Đã hoàn thiện IRecipeRepository và IUnitOfWork với Entity Framework Core.
  * ✅ **API Endpoints:** Đã hoàn thiện 3 API Endpoints cho tính năng Authentication (Register, Login, Refresh Token) thỏa mãn số lượng tối thiểu 2 APIs/thành viên.
  * ✅ **Global Exception Middleware:** Đã tạo GlobalExceptionHandler bắt lỗi toàn cục và trả về chuẩn Problem Details RFC 7807.

---

## 💻 Công nghệ Sử dụng
* **Backend:** .NET 10 Minimal APIs, C#, EF Core 10, ASP.NET Core Identity
* **Frontend:** Next.js App Router, TypeScript, Tailwind CSS, TanStack Query
* **Database & Caching:** PostgreSQL 16, Redis 7
* **Storage & Background Jobs:** MinIO (S3-compatible Object Storage), Hangfire
* **API Documentation:** Scalar UI (/scalar/v1)

---

## 👨‍💻 Phân công Nhiệm vụ (Cập nhật Lab 3)

| Thành viên | Vai trò chuyên trách | Nhiệm vụ cốt lõi |
| :--- | :--- | :--- |
| **Nguyễn Nhất Minh** *(Nhóm trưởng)* | Backend & Security (TV1) | Thiết lập CQRS/MediatR, 3 API Auth (Lab 3) & **Cài đặt Domain Exceptions cho Auth (UserNotFoundException, InvalidCredentialsException)**. |
| **Nguyễn Thế Khải** | Database & Infrastructure (TV2) | Xây dựng Soft Delete Interceptor, IRecipeRepository & IUnitOfWork (Lab 3) & **Cài đặt Domain Exceptions cho Category (CategoryNotFoundException)**. |
| **Phan Thành Huy** | DevOps & Testing (TV3) | Hiện thực hóa Domain Rules xuất bản công thức, cấu hình Docker & **Cài đặt Domain Exceptions cho Recipe (RecipeAlreadyPublishedException, DuplicateStepNumberException, RecipeNotFoundException)**. |
| **Bùi Trung Hiếu** | Frontend Next.js (TV4) | Dựng Frontend Skeleton, hoàn thiện Global Exception Middleware (Lab 3) & **Cài đặt Domain Exceptions cho Search/Validation (UnsupportedSortFieldException)**. |

---

## ⚙️ Hướng dẫn Khởi chạy Hệ thống (Local Development)

### Bước 1: Khởi động Hạ tầng (Docker Compose)
Đảm bảo ứng dụng **Docker Desktop** trên máy tính đã được bật và chạy ổn định. Mở Terminal tại thư mục gốc của dự án (culinary-blog) và chạy:

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


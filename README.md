# Culinary Blog - Nền tảng Chia sẻ Ẩm thực và Nấu ăn

**Nhóm 14:**
* Nguyễn Nhất Minh - 2312690
* Nguyễn Thế Khải - 2312640
* Bùi Trung Hiếu - 2312611
* Phan Thành Huy - 2312634

Culinary Blog là một hệ thống ứng dụng web Full-Stack cho phép người dùng chia sẻ, khám phá và lưu trữ các công thức nấu ăn từ nhiều nền ẩm thực khác nhau. Dự án phát triển hệ thống Full-Stack cho nền tảng Blog ẩm thực (**Culinary Blog**) theo tiêu chuẩn kiến trúc **Clean Architecture** và tài liệu đặc tả **SRS v1.0.0**. Hệ thống sử dụng **.NET 10 (Minimal APIs)**, **Next.js (App Router)**, **PostgreSQL 16**, **Redis 7**, và **MinIO**.

---

## 🚀 Công nghệ sử dụng (Tech Stack)

Dự án được xây dựng dựa trên các công nghệ hiện đại, phân tách rõ ràng giữa Frontend và Backend:

### Backend
* **Framework:** .NET 10 Minimal APIs, ngôn ngữ C#.
* **Kiến trúc:** Clean Architecture kết hợp mô hình CQRS (thư viện MediatR).
* **Xác thực:** JWT (Access Token & Refresh Token Rotation), Google OAuth 2.0, ASP.NET Core Identity.
* **Background Jobs:** Hangfire (xử lý gửi email, tạo thumbnail ảnh, sinh sitemap).
* **Observability:** Serilog (Structured Logging), OpenTelemetry (Distributed Tracing & Metrics).

### Frontend
* **Framework:** Next.js 14+ App Router, TypeScript.
* **Styling & State:** Tailwind CSS, React Hook Form, TanStack Query.
* **Rendering:** Áp dụng SSR (Server-Side Rendering) và ISR (Incremental Static Regeneration) để tối ưu Core Web Vitals.

### Cơ sở dữ liệu & Hạ tầng (Infrastructure)
* **Database:** PostgreSQL 16 (sử dụng EF Core 10 Code-First) tích hợp Full-Text Search.
* **Caching:** Redis 7 (Distributed Cache).
* **Object Storage:** MinIO (Tương thích S3) dùng để lưu trữ file ảnh.
* **Deployment:** Docker, Docker Compose và Nginx (Reverse Proxy).

---

## 🏗️ Cấu trúc Kiến trúc Hệ thống (Clean Architecture)

Backend được chia thành 4 tầng ranh giới nghiêm ngặt:
1. **Domain Layer:** Chứa các Entities (Recipe, Category, ApplicationUser, v.v.), Value Objects và Interfaces cốt lõi.
2. **Application Layer:** Chứa các logic nghiệp vụ (Commands/Queries), DTOs, FluentValidation và cấu hình MediatR Pipeline.
3. **Infrastructure Layer:** Giao tiếp với DB (EF Core), JWT Service, MinIO Service, Email Service và cấu hình Redis/Hangfire.
4. **Presentation Layer (API):** Chứa các Minimal API Endpoints (`/api/v1`), Middlewares xử lý lỗi toàn cục và OpenAPI (Scalar UI).

---

## 🛠️ Yêu cầu Hệ thống (Prerequisites)

Để chạy dự án ở môi trường phát triển (Local Development), các thành viên cần cài đặt:
* **.NET 10 SDK**
* **Node.js 20+ LTS** và **npm 10+**
* **Docker Desktop** (Hoặc Docker Engine trên Linux)
* **IDE khuyến dùng:** Visual Studio 2022 (v17.12+), Rider 2024+, hoặc VS Code.

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

---
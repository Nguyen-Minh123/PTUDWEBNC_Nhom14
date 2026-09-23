# Culinary Blog - Nền tảng Chia sẻ Ẩm thực và Nấu ăn

**Nhóm 14:**
* Nguyễn Nhất Minh - 2312690
* Nguyễn Thế Khải - 2312640
* Bùi Trung Hiếu - 2312611
* Phan Thành Huy - 2312634

Culinary Blog là một hệ thống ứng dụng web Full-Stack cho phép người dùng chia sẻ, khám phá và lưu trữ các công thức nấu ăn từ nhiều nền ẩm thực khác nhau. Hệ thống được thiết kế theo mô hình API-Driven Architecture, tối ưu hóa hiệu năng và thân thiện với chuẩn SEO.

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
## 🚀 Hướng dẫn khởi chạy (Quick Start)
```bash
### 1. Khởi chạy Infrastructure (PostgreSQL, Redis, MinIO)
docker-compose up -d


### 2. Chạy Backend (.NET API)
cd backend
dotnet restore
dotnet run --project src/Presentation

### 3. Chạy Frontend (Next.js)
cd frontend
npm install
npm run dev
```

### Kiểm tra Infrastructure

Compose tự kiểm tra health của PostgreSQL, Redis và MinIO trước khi khởi chạy
các tác vụ phụ thuộc. MinIO Console có tại http://localhost:9001 với thông tin
đăng nhập mặc định trong `.env.example`; bucket `culinary-images` được tạo tự
động bởi service `minio-init`.

Sao lưu được thực hiện định kỳ bởi service `backup`. Mỗi bản sao lưu gồm dump
PostgreSQL, snapshot Redis và archive dữ liệu MinIO, lưu trong volume
`backup_data`. Có thể điều chỉnh chu kỳ và thời gian giữ bản sao lưu bằng
`BACKUP_INTERVAL_SECONDS` và `BACKUP_RETENTION_DAYS` trong file `.env`.

Để xem trạng thái service:

```bash
docker compose ps
docker compose logs minio-init backup
```

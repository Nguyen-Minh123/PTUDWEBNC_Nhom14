Nhóm 14:
Nguyễn Nhất Minh - 2312690
Nguyễn Thế Khải - 2312640
Bùi Trung Hiếu - 2312611
Phan Thành Huy - 2312634

Phần công việc:
# Culinary Blog - Nền tảng Chia sẻ Ẩm thực và Nấu ăn

Culinary Blog là một hệ thống ứng dụng web Full-Stack cho phép người dùng chia sẻ, khám phá và lưu trữ các công thức nấu ăn từ nhiều nền ẩm thực khác nhau. Hệ thống được thiết kế theo mô hình API-Driven Architecture, tối ưu hóa hiệu năng và thân thiện với chuẩn SEO.

## 🚀 Công nghệ sử dụng (Tech Stack)

Dự án được xây dựng dựa trên các công nghệ hiện đại, phân tách rõ ràng giữa Frontend và Backend:

### Backend
*   **Framework:** .NET 10 Minimal APIs, ngôn ngữ C#.
*   **Kiến trúc:** Clean Architecture kết hợp mô hình CQRS (thư viện MediatR).
*   **Xác thực:** JWT (Access Token & Refresh Token Rotation), Google OAuth 2.0, ASP.NET Core Identity.
*   **Background Jobs:** Hangfire (xử lý gửi email, tạo thumbnail ảnh, sinh sitemap).
*   **Observability:** Serilog (Structured Logging), OpenTelemetry (Distributed Tracing & Metrics)[cite: 2].

### Frontend
*   **Framework:** Next.js 14+ App Router, TypeScript[cite: 2].
*   **Styling & State:** Tailwind CSS, React Hook Form, TanStack Query[cite: 2].
*   **Rendering:** Áp dụng SSR (Server-Side Rendering) và ISR (Incremental Static Regeneration) để tối ưu Core Web Vitals[cite: 2].

### Cơ sở dữ liệu & Hạ tầng (Infrastructure)
*   **Database:** PostgreSQL 16 (sử dụng EF Core 10 Code-First) tích hợp Full-Text Search[cite: 2].
*   **Caching:** Redis 7 (Distributed Cache)[cite: 2].
*   **Object Storage:** MinIO (Tương thích S3) dùng để lưu trữ file ảnh[cite: 2].
*   **Deployment:** Docker, Docker Compose và Nginx (Reverse Proxy)[cite: 2].

## 📂 Cấu trúc Kiến trúc Hệ thống (Clean Architecture)

Backend được chia thành 4 tầng ranh giới nghiêm ngặt[cite: 2]:
1.  **Domain Layer:** Chứa các Entities (Recipe, Category, ApplicationUser, v.v.), Value Objects và Interfaces cốt lõi[cite: 2].
2.  **Application Layer:** Chứa các logic nghiệp vụ (Commands/Queries), DTOs, FluentValidation và cấu hình MediatR Pipeline[cite: 2].
3.  **Infrastructure Layer:** Giao tiếp với DB (EF Core), JWT Service, MinIO Service, Email Service và cấu hình Redis/Hangfire[cite: 2].
4.  **Presentation Layer (API):** Chứa các Minimal API Endpoints (`/api/v1`), Middlewares xử lý lỗi toàn cục và OpenAPI (Scalar UI)[cite: 2].

## 🛠 Yêu cầu Hệ thống (Prerequisites)

Để chạy dự án ở môi trường phát triển (Local Development), các thành viên cần cài đặt[cite: 2]:
*   [.NET 10 SDK](https://dotnet.microsoft.com/)[cite: 2]
*   [Node.js 20+ LTS](https://nodejs.org/) và npm 10+[cite: 2]
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Hoặc Docker Engine trên Linux)[cite: 2]
*   IDE khuyên dùng: Visual Studio 2022 (v17.12+), Rider 2024+, hoặc VS Code[cite: 2].

## ⚙️ Hướng dẫn Cài đặt & Chạy dự án (Getting Started)

**Bước 1: Khởi chạy Hạ tầng (Services)**
Hệ thống yêu cầu PostgreSQL, Redis và MinIO. Khởi chạy tất cả qua Docker Compose[cite: 2]:
```bash
docker-compose up -d


# TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN – ĐHQG-HCM
### KHOA CÔNG NGHỆ THÔNG TIN – BỘ MÔN CÔNG NGHỆ PHẦN MỀM

---

# 📋 BÁO CÁO TỔNG KẾT BÀI TẬP LAB 01 – LAB 08 (NHÓM 14)
### MÔN HỌC: PHÁT TRIỂN ỨNG DỤNG WEB NÂNG CAO
**Đề tài:** Nền tảng Chia sẻ & Khám phá Công thức Ẩm thực Trực tuyến (**Culinary Blog**)  
*(Tổng hợp toàn bộ quá trình thực hiện và tích hợp mã nguồn thành sản phẩm chính)*  
**Học kỳ:** I – Năm học: 2026 – 2027  
**Thời gian thực hiện:** Tháng 09/2026 – Tháng 11/2026  

---

## 👥 THÀNH VIÊN NHÓM 14

| STT | Họ và tên | MSSV | Vai trò đảm nhiệm chính trong đồ án | Tỷ lệ đóng góp |
| :---: | :--- | :---: | :--- | :---: |
| **1** | **Nguyễn Nhất Minh** *(Trưởng nhóm)* | **2312690** | Backend Architecture, Security, Identity, User Admin | **100%** |
| **2** | **Bùi Trung Hiếu** | **2312611** | Frontend Lead, Recipe Wizard, Status Lifecycle, Cooking Mode | **100%** |
| **3** | **Phan Thanh Huy** | **2312634** | DevOps, Audit Logging Interceptor, Automated Testing | **100%** |
| **4** | **Nguyễn Thế Khải** | **2312640** | Database & Infrastructure, MinIO S3 Storage, Category Admin | **100%** |

---

## I. TỔNG QUAN DỰ ÁN VÀ TIẾN TRÌNH TÍCH HỢP HỆ THỐNG

### 1. Giới thiệu đề tài Culinary Blog
Hệ thống **Culinary Blog** là một nền tảng Web hiện đại phục vụ cộng đồng ẩm thực, cho phép các đầu bếp và người dùng đăng tải, tìm kiếm, tương tác và quản lý các công thức nấu ăn chuyên nghiệp. Dự án được phát triển theo mô hình phân tán, tuân thủ chặt chẽ tài liệu đặc tả **SRS v1.0.0** và đáp ứng đầy đủ các chuẩn mực công nghệ trong môn học **Phát triển Ứng dụng Web Nâng cao**.

### 2. Kiến trúc kỹ thuật tổng thể (Clean Architecture & Modern Tech Stack)
* **Backend (.NET 10 Minimal APIs):**
  * Xây dựng theo mô hình **Clean Architecture** 4 tầng chuẩn mực: *Domain*, *Application*, *Infrastructure*, và *API*.
  * Áp dụng mô hình **CQRS (Command Query Responsibility Segregation)** thông qua thư viện `MediatR` và kiểm tra tính hợp lệ của dữ liệu với `FluentValidation`.
  * Xử lý ngoại lệ tập trung với `GlobalExceptionHandler` tuân thủ chuẩn **RFC 7807 ProblemDetails / ValidationProblemDetails**.
  * Quản trị dữ liệu bằng **Entity Framework Core 10**, cấu hình `Global Query Filter` phục vụ cơ chế xóa mềm (*Soft Delete*).
* **Frontend (Next.js 16 App Router & Turbopack):**
  * Xây dựng trên nền tảng **React 19**, **TypeScript** và **Tailwind CSS**.
  * Bố cục giao diện tổ chức theo mô hình **Route Groups** (`(auth)`, `(main)`, `(dashboard)`), áp dụng thư viện linh kiện `shadcn/ui` và `Lucide Icons`.
  * Quản lý trạng thái Client linh hoạt bằng **Zustand Store** (`auth-store`, `ui-store`, `filter-store`).
  * Đồng bộ và lưu bộ nhớ đệm dữ liệu Server bằng **TanStack Query v5**.
  * Lớp mạng **Axios Client** cấu hình Interceptor tự động làm mới token ngầm (*Silent Token Refresh Interceptor*).
* **Cơ sở dữ liệu & Tìm kiếm (PostgreSQL 16):**
  * Cấu hình chỉ mục `GIN Index` trên cột `SearchVector` kết hợp extension `unaccent` của PostgreSQL, cho phép tìm kiếm toàn văn (*Full-Text Search*) không dấu với hiệu năng cực cao.
  * Tối ưu hóa truy vấn chuyên sâu với `AsSplitQuery` và đánh giá kế hoạch thực thi bằng `EXPLAIN ANALYZE`.
* **Bộ nhớ đệm & Bảo mật nâng cao (Redis 7 & JWT Identity Core):**
  * Cấp phát cặp mã thông báo **Access Token** (hạn ngắn 15 phút) và **Refresh Token** (hạn dài 7 ngày).
  * Mã hóa Refresh Token một chiều bằng thuật toán `SHA-256` trong CSDL, cơ chế xoay vòng token (*Token Rotation*) và phát hiện đánh cắp phiên (*Token Theft Detection*).
  * Phân quyền đa cấp độ: **RBAC** (Role-Based Access Control), **Policy-Based Authorization** (`Fallback Policy`), và **Resource-Based Authorization** chống triệt để lỗ hổng BOLA (*Broken Object Level Authorization - OWASP API1*).
* **Lưu trữ đám mây & Nhật ký hệ thống (MinIO S3 & Audit Logging Interceptor):**
  * Lưu trữ hình ảnh trên **MinIO Object Storage** tương thích hoàn toàn chuẩn AWS S3 API, cấu hình Bucket `public-read` cùng cơ chế Fallback sang thư mục cục bộ (`wwwroot/uploads`) khi ngoại tuyến.
  * Tự động theo dõi các biến động dữ liệu (*Added, Modified, SoftDelete*) thông qua `AuditLogInterceptor`, phân tích độ sai khác (*Diff: OldValues vs NewValues*) dưới dạng `JSONB` lưu vào bảng `AuditLogs`.

### 3. Tiến trình tích hợp các bài Lab (Lab 01 $\rightarrow$ Lab 08) thành Chương trình chính
Dự án được xây dựng theo hình thức nhóm phân tán (Git Flow), mỗi bài Lab giải quyết trọn vẹn một chặng đường:
```
[Lab 01 - 02] Khởi tạo Clean Architecture, Entity Cốt lõi, PostgreSQL 16 & Docker Compose
      │
[Lab 03]      Xử lý lỗi RFC 7807, GIN Index SearchVector unaccent & Phân trang
      │
[Lab 04]      Vòng đời CRUD Recipe, Health Checks, Serilog Logging & MinIO S3 Async
      │
[Lab 05]      OpenAPI 3.1 Scalar UI, JWT Rotation, Token Theft Detection, RBAC & Rate Limiting
      │
[Lab 06]      Khung Giao diện Next.js 16 App Router, TanStack Query, Zustand & Layouts
      │
[Lab 07]      Trang Chi tiết Công thức, Dinh dưỡng, Quên/Đổi Mật khẩu & Danh mục Lưới
      │
[Lab 08]      Hoàn thiện MinIO Upload, Quản trị Users/Categories, Audit Logs & Cooking Mode
      ▼
[MAIN BRANCH] GỘP VÀO NHÁNH MAIN DUY NHẤT (Pull Request #207 Merged Thành công)
```

---

## II. LIÊN KẾT ĐẾN REPOSITORY CHỨA MÃ NGUỒN & CÁC NHÁNH TÍCH HỢP

* **Kho chứa mã nguồn chính thức (GitHub):** [https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14)
* **Nhánh chính thức hoàn chỉnh của dự án (`main`):** [https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/main](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/main)
* **Nhánh tích hợp bài Lab 08 (`integration-lab8`):** [https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/integration-lab8](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/integration-lab8)
* **Pull Request tích hợp Lab 08 đã Merge vào `main` (PR #207):** [https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/pull/207](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/pull/207)
* **Pull Request đóng góp Frontend Lab 08 của Bùi Trung Hiếu (PR #206):** [https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/pull/206](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/pull/206)
* **Pull Request tích hợp Lab 07 đã Merge vào `main` (PR #180):** [https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/pull/180](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/pull/180)
* **Nhánh làm việc của các thành viên trong nhóm:**
  * Nhánh của **Nguyễn Nhất Minh**: [`2312690-Minh`](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312690-Minh)
  * Nhánh của **Bùi Trung Hiếu**: [`2312611-Hieu`](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312611-Hieu)
  * Nhánh của **Phan Thanh Huy**: [`2312634-Huy`](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312634-Huy)
  * Nhánh của **Nguyễn Thế Khải**: [`2312640-Khai`](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312640-Khai)

---

## III. TỔNG HỢP NỘI DUNG VÀ BẢNG PHÂN CÔNG CÔNG VIỆC TỪ LAB 01 ĐẾN LAB 08

| STT | Thành viên & Nhóm bài Lab | Mã công việc & Tên nhiệm vụ cụ thể | Chi tiết các bước kỹ thuật đã thực hiện | Kết quả / Tiến độ |
| :---: | :--- | :--- | :--- | :---: |
| **1** | **Nguyễn Nhất Minh**<br>*(2312690)*<br><br>Lab 01 - 03:<br>Kiến trúc Nền tảng &<br>Tìm kiếm Nâng cao | `FR-BKE-001 -> 005`<br>`FR-SEC-001 -> 002`<br>`FR-DOM-001 -> 002` | • Dựng Backend Skeleton .NET 10 Clean Architecture 4 tầng.<br>• Thiết lập CQRS với MediatR cho Recipe & Category.<br>• Mã hóa Refresh Token SHA-256 và cơ chế Token Rotation.<br>• Xây dựng Full-Text Search unaccent và Global Exception RFC 7807. | **100%**<br>*(Hoàn thành)* |
| **2** | **Nguyễn Nhất Minh**<br>*(2312690)*<br><br>Lab 04 - 05:<br>Bảo mật Danh tính &<br>Phân quyền Chống BOLA | `FR-BKE-006 -> 009`<br>`FR-SEC-003 -> 004`<br>`FR-BKE-011 -> 012` | • Tích hợp Google OAuth 2.0 và hoàn thiện Auth API cá nhân.<br>• Chuẩn hóa JWT Bearer, Fallback Policy và RBAC.<br>• Hiện thực Resource-Based Authorization chống BOLA (OWASP API1).<br>• Xử lý Token Theft Detection bảo vệ Refresh Token. | **100%**<br>*(Hoàn thành)* |
| **3** | **Nguyễn Nhất Minh**<br>*(2312690)*<br><br>Lab 06 - 07:<br>Client Interceptor &<br>Quên/Đổi Mật khẩu | `FR-FTE-027 -> 030`<br>`FR-BKE-014`<br>`FR-FTE-031 -> 033` | • Xây dựng Axios Client với Silent Token Refresh Interceptor.<br>• Hiện thực API Quên mật khẩu HMAC-SHA256 & Đổi mật khẩu.<br>• Xây dựng giao diện `/forgot-password` và `/reset-password` có Password Strength Meter và đồng bộ NextAuth. | **100%**<br>*(Hoàn thành)* |
| **4** | **Nguyễn Nhất Minh**<br>*(2312690)*<br><br>Lab 08:<br>Quản trị Người dùng &<br>Tác giả Ẩm thực | `FR-BKE-016 -> 017`<br>`FR-FTE-044 -> 045` | • Xây dựng API Quản lý Người dùng `GET /api/v1/users` và `GET /api/v1/users/authors`.<br>• API Phân quyền `PUT /role` và Khóa tài khoản `PUT /status` kèm tự động thu hồi toàn bộ token.<br>• Xây dựng Trang Quản trị Người dùng Admin (`/dashboard/users`) và Trang Tác giả (`/authors`). | **100%**<br>*(Hoàn thành)* |
| **5** | **Bùi Trung Hiếu**<br>*(2312611)*<br><br>Lab 03 - 04:<br>Form Recipe Cơ bản &<br>Dashboard Cá nhân | `FR-DOM-007`<br>`FR-FTE-005 -> 006`<br>`FR-FTE-007 -> 010` | • Tích hợp giao diện Tìm kiếm & Comment công thức.<br>• Xây dựng Dashboard quản lý Profile và danh sách Recipe cá nhân.<br>• Xây dựng Form tạo Recipe đa bước kết hợp React Hook Form + Zod.<br>• Tích hợp giao diện tải ảnh, nguyên liệu và các bước nấu. | **100%**<br>*(Hoàn thành)* |
| **6** | **Bùi Trung Hiếu**<br>*(2312611)*<br><br>Lab 05 - 06:<br>Khung Giao diện Next.js &<br>shadcn/ui Layout | `FR-FTE-011 -> 018` | • Khởi tạo Next.js 16 App Router theo Route Groups và TypeScript DTOs.<br>• Cài đặt bộ linh kiện `shadcn/ui` và hệ thống Layout System.<br>• Thiết kế giao diện Trang chủ (`/`) và Trang khám phá công thức (`/recipes`).<br>• Xây dựng giao diện tĩnh Trang chi tiết công thức. | **100%**<br>*(Hoàn thành)* |
| **7** | **Bùi Trung Hiếu**<br>*(2312611)*<br><br>Lab 07:<br>Trang chủ, Lưới Thẻ &<br>Hồ sơ Người dùng | `FR-FTE-040 -> 043` | • Hoàn thiện Trang chủ kết nối dữ liệu công thức mới nhất.<br>• Xây dựng Component `RecipeCard` và `RecipeGrid` có phân trang linh hoạt.<br>• Xây dựng Trang Hồ sơ cá nhân (`/profile`) và form cập nhật thông tin tác giả (tên, avatar, tiểu sử). | **100%**<br>*(Hoàn thành)* |
| **8** | **Bùi Trung Hiếu**<br>*(2312611)*<br><br>Lab 08:<br>Wizard Công thức, Concurrency<br>& Cooking Mode | `FR-FTE-049 -> 052` | • Trang Thêm mới công thức đa bước (`/recipes/new`) kiểm tra ràng buộc tối thiểu 1 nguyên liệu + 1 bước.<br>• Trang Chỉnh sửa (`/recipes/[id]/edit`) tích hợp Concurrency Token `RowVersion` chống xung đột dữ liệu.<br>• Vòng đời trạng thái: Draft $\rightarrow$ Published $\rightarrow$ Archived $\rightarrow$ Soft Delete.<br>• Chế độ Nấu ăn tập trung toàn màn hình có hẹn giờ & Bộ chỉnh khẩu phần ăn Servings. | **100%**<br>*(Hoàn thành)* |
| **9** | **Phan Thanh Huy**<br>*(2312634)*<br><br>Lab 02 - 04:<br>Testing Cơ bản, Logging &<br>Giám sát Sức khỏe | `FR-TST-001 -> 006`<br>`FR-BKE-010`<br>`FR-DVO-003 -> 004` | • Viết bộ Unit Tests cho Domain Entities và Service Layer.<br>• Cấu hình Health Checks (`/health`) giám sát kết nối PostgreSQL & Redis.<br>• Tích hợp Serilog Structured Logging ghi log theo Correlation ID.<br>• Viết Bogus Data Seeder khởi tạo dữ liệu mẫu phong phú. | **100%**<br>*(Hoàn thành)* |
| **10** | **Phan Thanh Huy**<br>*(2312634)*<br><br>Lab 05:<br>Tài liệu OpenAPI Scalar &<br>Kiểm thử Phân quyền | `FR-DVO-005 -> 006`<br>`FR-TST-007 -> 008` | • Tích hợp OpenAPI 3.1 & Scalar UI (`/scalar/v1`) có Bearer Security Scheme.<br>• Bật XML Documentation Comments chuẩn hóa metadata endpoints.<br>• Xây dựng bộ kịch bản kiểm thử API tự động `culinary-blog.http`.<br>• Viết Integration Tests kiểm thử ma trận phân quyền `TestAuthHandler`. | **100%**<br>*(Hoàn thành)* |
| **11** | **Phan Thanh Huy**<br>*(2312634)*<br><br>Lab 06 - 07:<br>Component Điều hướng &<br>Chi tiết Công thức | `FR-FTE-019 -> 022`<br>`FR-FTE-037 -> 039`<br>`FR-TST-009` | • Xây dựng Header, Footer, Pagination, Skeleton Loading và Toast Feedback.<br>• Tích hợp dữ liệu Trang chi tiết công thức (`/recipes/[id]`).<br>• Hiển thị danh sách nguyên liệu, các bước thực hiện và 6 chỉ số dinh dưỡng.<br>• Viết kịch bản kiểm thử E2E / Integration cho luồng công thức. | **100%**<br>*(Hoàn thành)* |
| **12** | **Phan Thanh Huy**<br>*(2312634)*<br><br>Lab 08:<br>Audit Logging Interceptor &<br>Integration Test Suite | `FR-DVO-007`<br>`FR-BKE-019`<br>`FR-FTE-048`<br>`FR-TST-010` | • Xây dựng `AuditLogInterceptor` kế thừa SaveChangesInterceptor tự động bắt diff Old/New Values dạng JSONB vào bảng AuditLogs.<br>• Xây dựng API `GET /api/v1/audit-logs` và `GET /api/v1/logs` có phân trang, lọc.<br>• Xây dựng Trang Quản trị Nhật ký (`/dashboard/logs`) hiển thị JSON diff.<br>• Xây dựng bộ 47 bài Integration Tests và 24 bài Unit Tests (71/71 passed). | **100%**<br>*(Hoàn thành)* |
| **13** | **Nguyễn Thế Khải**<br>*(2312640)*<br><br>Lab 01 - 03:<br>Cơ sở Dữ liệu PostgreSQL,<br>Soft Delete & GIN Index | `FR-DB-001 -> 006`<br>`FR-INF-001 -> 002`<br>`FR-DOM-003` | • Cấu hình Docker Compose cho PostgreSQL 16 và Redis 7.<br>• Khởi tạo EF Core Migrations, BaseEntity và ApplicationUser.<br>• Xây dựng Soft Delete Interceptor tự động chuyển đổi lệnh xóa thành `IsDeleted = true`.<br>• Cấu hình SearchVector và GIN Index tối ưu Full-Text Search. | **100%**<br>*(Hoàn thành)* |
| **14** | **Nguyễn Thế Khải**<br>*(2312640)*<br><br>Lab 04:<br>Quản lý Nguyên liệu, Bước nấu &<br>MinIO Lưu trữ | `FR-DB-007 -> 009`<br>`FR-INF-003` | • Hiện thực API Quản lý Nguyên liệu (`RecipeIngredient`) và Bước nấu (`RecipeStep`).<br>• Tích hợp lưu trữ hình ảnh với MinIO Object Storage tương thích S3.<br>• Hiện thực Concurrency Token `RowVersion` trên thực thể Recipe. | **100%**<br>*(Hoàn thành)* |
| **15** | **Nguyễn Thế Khải**<br>*(2312640)*<br><br>Lab 05 - 07:<br>Rate Limiting, API Versioning &<br>Lưới Danh mục | `FR-INF-004 -> 006`<br>`FR-BKE-013, 015`<br>`FR-FTE-023 -> 026, 034 -> 036` | • Thiết lập CORS đa môi trường, Rate Limiting và Security Headers.<br>• Cài đặt thư viện `Asp.Versioning.Http` quản lý API Versioning (`/api/v1/`).<br>• Xây dựng Zustand Stores (`auth-store`, `ui-store`, `filter-store`).<br>• Tối ưu API Danh mục có bộ đếm công thức và xây dựng trang lưới `/categories`. | **100%**<br>*(Hoàn thành)* |
| **16** | **Nguyễn Thế Khải**<br>*(2312640)*<br><br>Lab 08:<br>Hoàn thiện MinIO Storage, Upload<br>& Quản trị Danh mục | `FR-INF-007`<br>`FR-BKE-018`<br>`FR-FTE-046 -> 047` | • Dịch vụ `MinioStorageService` tương thích S3 API, bucket policy public-read kèm cơ chế Fallback sang Local File Storage.<br>• API `POST /api/v1/media/upload` kiểm tra MIME, dung lượng < 5MB và tính SHA-256 Checksum.<br>• Component `ImageUploader` kéo thả tệp, xem trước ảnh tức thì.<br>• Trang Quản trị Danh mục (`/dashboard/categories`) thêm/sửa/xóa và tải ảnh bìa. | **100%**<br>*(Hoàn thành)* |

> [!TIP]
> **Đánh giá kết quả chung:** Toàn bộ **16 nhóm nhiệm vụ lớn** xuyên suốt từ Lab 01 đến Lab 08 đã được hoàn thiện **100% khối lượng**. Không có công việc nào bị bỏ sót hay chưa hoàn thành.

---

## IV. HÌNH ẢNH MINH HỌA DEMO SẢN PHẨM HOÀN CHỈNH

*(Tất cả 11 hình ảnh chụp màn hình độ phân giải cao dưới đây đã được nhúng trực tiếp vào file Word và lưu trữ tại thư mục `docs/screenshots/`)*

1. **Hình 1: Màn hình Đăng nhập tích hợp tiện ích Demo 1-Click đa vai trò** (`/login`)
2. **Hình 2: Trang Quản trị Người dùng dành cho Admin** (`/dashboard/users`) - Phân quyền vai trò và Khóa tài khoản có thu hồi token tức thời
3. **Hình 3: Trang Danh sách Đầu bếp & Tác giả công khai** (`/authors`) hiển thị tiểu sử và số lượng công thức đóng góp
4. **Hình 4: Trang Quản trị Danh mục Công thức cho Admin** (`/dashboard/categories`) tích hợp tải ảnh bìa danh mục
5. **Hình 5: Trang Quản trị Nhật ký Hệ thống** (`/dashboard/logs`) hiển thị chi tiết Audit Log Diff (JSONB)
6. **Hình 6: Trang Thêm mới Công thức đa bước** (`/recipes/new`) tích hợp tải ảnh MinIO và nhập 6 chỉ số dinh dưỡng
7. **Hình 7: Trang Danh mục & Khám phá Công thức** (`/recipes`) có bộ lọc danh mục và sắp xếp đa tiêu chí
8. **Hình 8: Trang chủ Hệ thống Culinary Blog** (`/`) với giao diện responsive hiện đại và bài viết nổi bật
9. **Hình 9: Trang Quên mật khẩu** (`/forgot-password`) có cơ chế chống dò quét tài khoản và đo độ mạnh mật khẩu
10. **Hình 10: Tài liệu API tương tác chuẩn OpenAPI 3.1 & Scalar UI** tại đường dẫn `/scalar/v1`
11. **Hình 11: Kết quả kiểm thử tự động toàn diện** - 100% vượt qua (24 Unit Tests + 47 Integration Tests)

---

## V. HƯỚNG DẪN CÀI ĐẶT VÀ KHỞI CHẠY CHƯƠNG TRÌNH (TỪ A ĐẾN Z)

### 1. Yêu cầu môi trường tiên quyết (Prerequisites)
* **Docker Desktop**: Đang chạy trên máy.
* **.NET SDK**: Phiên bản 10.0 (tương thích tối thiểu .NET 9.0).
* **Node.js**: Phiên bản LTS v20.x trở lên (khuyên dùng Node v22+) & npm.
* **Git Client**.

### 2. Các bước cài đặt và khởi chạy chi tiết

#### Bước 1: Tải mã nguồn từ GitHub nhánh `main` chính thức
```bash
git clone https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14.git
cd PTUDWEBNC_Nhom14
git checkout main
git pull origin main
```

#### Bước 2: Khởi động cơ sở dữ liệu và hạ tầng phụ trợ (Docker Compose)
Mở Docker Desktop, sau đó chạy lệnh khởi động cơ sở dữ liệu và lưu trữ:
```bash
docker compose -f culinary-blog/docker-compose.yml up -d
```
* **CSDL PostgreSQL 16**: Cổng `5432` (`postgres` / `postgres`, CSDL: `CulinaryBlogDb`)
* **Bộ nhớ đệm Redis 7**: Cổng `6379`
* **Lưu trữ đối tượng MinIO S3**: Cổng `9000` (API) và `9001` (Console UI: `admin` / `password123`)

#### Bước 3: Khởi động Backend Web API (.NET 10 Minimal APIs)
Chạy lệnh khởi động máy chủ API (chương trình sẽ tự động thực hiện Migration CSDL và nạp dữ liệu mẫu Bogus Seeder):
```bash
dotnet run --project culinary-blog/src/backend/src/CulinaryBlog.API/CulinaryBlog.API.csproj --launch-profile http
```
* **Địa chỉ API**: [http://localhost:5075](http://localhost:5075)
* **Kiểm tra sức khỏe hệ thống**: [http://localhost:5075/health](http://localhost:5075/health) $\rightarrow$ `Healthy`
* **Tài liệu tương tác API (Scalar UI)**: [http://localhost:5075/scalar/v1](http://localhost:5075/scalar/v1)

#### Bước 4: Khởi động giao diện người dùng Frontend (Next.js 16 App Router)
Mở một cửa sổ Terminal mới và thực hiện lệnh cài đặt gói và chạy dev server:
```bash
cd culinary-blog/src/frontend
npm install
npm run dev
```
* **Địa chỉ Website ứng dụng**: [http://localhost:3000](http://localhost:3000)

#### Bước 5: Đăng nhập trải nghiệm với các tài khoản mẫu Demo 1-Click
Truy cập vào [http://localhost:3000/login](http://localhost:3000/login), sử dụng tính năng **Demo 1-Click** hoặc nhập thông tin mẫu:
* 🛡️ **Quản trị viên (Admin)**: `admin@culinary.com` | Mật khẩu: `Password123!` (Quyền quản trị Users, Categories, Logs)
* 👨‍🍳 **Đầu bếp (Author)**: `chef.hieu@culinary.com` | Mật khẩu: `Password123!` (Quyền tạo/sửa công thức, upload ảnh)
* 👤 **Thành viên (User)**: `member.huy@culinary.com` | Mật khẩu: `Password123!` (Xem công thức, yêu thích, bộ sưu tập)

### 3. Lệnh chạy bộ kiểm thử tự động toàn diện
* **Chạy 24 bài Unit Tests Backend**:
  ```bash
  dotnet test culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/CulinaryBlog.UnitTests.csproj
  ```
  $\rightarrow$ **Kết quả:** `Passed! 24/24 tests passed (100%)`.
* **Chạy 47 bài Integration Tests Backend (kết nối PostgreSQL thật)**:
  ```bash
  $env:ConnectionStrings__DefaultConnection="Host=localhost;Port=5432;Database=culinaryblog_test;Username=postgres;Password=postgres"
  dotnet test culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/CulinaryBlog.IntegrationTests.csproj
  ```
  $\rightarrow$ **Kết quả:** `Passed! 47/47 tests passed (100%)`.
* **Tổng kết:** **71/71 bài kiểm thử tự động đạt 100%**.

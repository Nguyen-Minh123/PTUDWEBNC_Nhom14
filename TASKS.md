```markdown
# Kế hoạch & Phân công Công việc (4 Tuần)

## Tuần 1: Khởi tạo, Setup Môi trường & Kiến trúc Base 
Dựng `docker-compose.yml` (PostgreSQL, Redis, MinIO) và viết tài liệu hướng dẫn chạy DB.
Khởi tạo project .NET 10 Minimal APIs với Clean Architecture, kết nối EF Core tới PostgreSQL.
Khởi tạo project Next.js App Router (TypeScript), cài đặt Tailwind CSS, viết trang test gọi API Base.
Rà soát các ràng buộc thiết kế (CONS-001 đến CONS-010), clone code về test môi trường chéo và hỗ trợ fix lỗi.

## Tuần 2: Module Cơ bản - Quản lý Danh mục & Xác thực 
Full-stack Module Danh mục (Category): Tạo DB table, viết API CRUD, làm giao diện Quản lý Danh mục.
Full-stack Đăng ký (Register): Viết API nhận thông tin, mã hóa mật khẩu + Làm Form Đăng ký trên Next.js.
Full-stack Đăng nhập (Login): Viết API sinh JWT Token + Làm Form Đăng nhập & lưu Cookie trên Next.js.
Full-stack Quản lý Hồ sơ (User Profile): Viết API xem/sửa thông tin + Làm giao diện Profile cá nhân.

## Tuần 3: Module Cốt lõi - Công thức & Tệp tin
Full-stack Storage Service: Viết Backend API upload ảnh lên MinIO + Làm Upload Component dùng chung trên Frontend.
Full-stack Tạo/Sửa Công thức (Create/Update Recipe): Xử lý form đa bước (nguyên liệu, các bước nấu), tích hợp API upload ảnh.
Full-stack Xem Danh sách & Chi tiết Công thức: Viết API truy vấn kết hợp (Join DB), phân trang + Giao diện Card/Detail UI.
Full-stack Tương tác (Rating/Like): Viết API thả tim, chấm sao + Làm Component UI tương tác thời gian thực.

## Tuần 4: Tính năng Nâng cao & Hoàn thiện 
Full-text Search & Redis Cache: Viết API tìm kiếm công thức, cấu hình Redis Caching tối ưu p95 ≤ 500ms.
Background Jobs: Cấu hình Hangfire trên .NET, viết job tự động gửi email thông báo và dọn dẹp file rác.
Observability & Logging: Cấu hình Serilog và OpenTelemetry ghi log lỗi toàn cục hệ thống.
Nginx Proxy & UI Tuning: Cấu hình Nginx Reverse Proxy, rà soát toàn bộ giao diện và hoàn thiện Responsive UI.

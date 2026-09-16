* **Full-Stack Vertical Slicing:** Mỗi thành viên tự đảm nhận trọn vẹn luồng dữ liệu (Database $\rightarrow$ API $\rightarrow$ Frontend UI) cho tính năng được giao, tránh tình trạng chia cứng riêng Backend/Frontend[cite: 4].
* **Chéo Code Review:** Người làm Backend tính năng A phải review Code Frontend của tính năng đó và ngược lại.
* **Mock Defense Nội Bộ:** Cuối mỗi tuần, nhóm dành 30 phút luân phiên đóng vai "Thầy cô phản biện" để kiểm tra kiến thức lẫn nhau về luồng dữ liệu, database và xử lý lỗi.
* 
## 🗓️ Lộ Trình Phân Công Chi Tiết 

### 📌 Tuần 1: Khởi Tạo Nền Tảng & Môi Trường 
> **Mục tiêu:** Cả 4 thành viên cùng hiểu cấu trúc hệ thống, chạy thành công môi trường Docker Compose local và dựng khung ứng dụng[cite: 4].

| Thành viên | Phân công công việc | Sản phẩm đầu ra (Deliverables) |
| :--- | :--- | :--- |
| **Nguyễn Nhất Minh** | Dựng Backend Skeleton (.NET 10 Minimal API), cấu hình Clean Architecture 4 tầng (Domain, Application, Infrastructure, Presentation)[cite: 4]. | Codebase Backend chạy được API Hello World, cấu trúc thư mục chuẩn[cite: 4]. |
| **Nguyễn Thế Khải** | Khởi tạo EF Core Migrations, định nghĩa `BaseEntity`, `ApplicationUser` và cấu hình PostgreSQL 16 trên Docker[cite: 4]. | Database schema khởi tạo thành công trên Postgres local[cite: 4]. |
| **Bùi Trung Hiếu** | Dựng Frontend Skeleton (Next.js 15 App Router + TypeScript + Tailwind CSS), dựng Layout chung (Header, Footer, Nav)[cite: 4]. | Khung UI cơ bản responsive trên trình duyệt[cite: 4]. |
| **Phan Thành Huy** | Cấu hình `docker-compose.yml` tổng hợp (Nginx, Postgres, Redis, MinIO), viết API Client Base (Fetch/Axios) phía Frontend[cite: 4]. | Môi trường Docker local khởi chạy trơn tru với 1 câu lệnh[cite: 4]. |

---

### 📌 Tuần 2: Xác Thực (Auth) & Quản Lý Danh Mục 
> **Mục tiêu:** Nắm vững luồng xác thực JWT Stateless, Refresh Token Rotation và xử lý CRUD cơ bản[cite: 4].

| Thành viên | Tasks Backend & Database | Tasks Frontend (UI & Integration) |
| :--- | :--- | :--- |
| **Nguyễn Nhất Minh** | **FR-AUTH-001/002:** API Register, Login Local (PBKDF2 Hash, JWT Access/Refresh Token)[cite: 4]. | Tích hợp Auth Context / Custom Hook lưu trữ JWT Token phía Client[cite: 4]. |
| **Nguyễn Thế Khải** | **FR-AUTH-004/005:** API Refresh Token (Token Rotation) và API Logout[cite: 4]. | Dựng Form Login (`/auth/login`) và Register (`/auth/register`) bằng React Hook Form[cite: 4]. |
| **Bùi Trung Hiếu** | **FR-CAT-001/002/003:** API CRUD Category (Tạo, Sửa, Lấy danh sách) + Cấu hình MemoryCache[cite: 4]. | Dựng trang hiển thị danh sách Danh mục công thức cho người dùng[cite: 4]. |
| **Phan Thành Huy** | **FR-AUTH-006/007 & FR-CAT-004/005:** API View/Update Profile & API Xóa Category (Admin)[cite: 4]. | Dựng trang cá nhân (`/profile`) và Dashboard quản lý Category cho Admin[cite: 4]. |

---

### 📌 Tuần 3: Quản Lý Công Thức Nấu Ăn & Upload File 
> **Mục tiêu:** Xử lý Aggregate Root phức tạp (Recipe, Steps, Ingredients) và Upload File trên MinIO S3[cite: 4].

| Thành viên | Tasks Backend & Database | Tasks Frontend (UI & Integration) |
| :--- | :--- | :--- |
| **Nguyễn Nhất Minh** | **FR-RCP-001/002/003:** API Tạo Recipe (Draft), Lấy danh sách/Chi tiết. Xử lý Optimistic Concurrency (`RowVersion`)[cite: 4]. | Dựng trang Chi tiết công thức (`/recipes/[slug]`) render thông tin dinh dưỡng, các bước nấu[cite: 4]. |
| **Nguyễn Thế Khải** | **FR-RCP-004/007:** API Cập nhật & Xóa Recipe (Hard Delete + Cascade Delete)[cite: 4]. | Dựng Form Wizard tạo/chỉnh sửa công thức nấu ăn[cite: 4]. |
| **Bùi Trung Hiếu** | **FR-FILE-001/002 & FR-RCP-008:** API Upload ảnh lên MinIO. Validate Magic Bytes & File Size $\le 5\text{MB}$[cite: 4]. | Dựng Component Upload ảnh drag-and-drop, chọn ảnh chính (Primary Image)[cite: 4]. |
| **Phan Thành Huy** | **FR-RCP-009/010:** API CRUD Nguyên liệu (RecipeIngredient) & Các bước thực hiện (RecipeStep)[cite: 4]. | Dựng Component Dynamic Form cho phép Thêm/Sửa/Xóa/Reorder các bước & nguyên liệu[cite: 4]. |

---

### 📌 Tuần 4: Tìm Kiếm, Phân Quyền Strict RBAC & Tối Ưu 
> **Mục tiêu:** Cấu hình PostgreSQL Full-Text Search, Redis Cache, Strict RBAC và đóng gói chuẩn bị báo cáo[cite: 4].

| Thành viên | Tasks Kỹ Thuật Nâng Cao | Chuẩn Bị Phản Biện & Báo Cáo |
| :--- | :--- | :--- |
| **Nguyễn Nhất Minh** | **FR-SRCH-001:** Query PostgreSQL Full-Text Search (`tsvector`, `tsquery`, `unaccent` tiếng Việt không dấu)[cite: 4]. | Tối ưu SQL Query, giải thích cơ chế FTS cho cả nhóm[cite: 4]. |
| **Nguyễn Thế Khải** | **FR-SRCH-002/003/004:** Lọc đa tiêu chí, Sắp xếp, Phân trang + Cấu hình Short-TTL Redis Cache (5 phút)[cite: 4]. | Dựng UI Trang Tìm kiếm (`/search`) kết hợp Bộ lọc live. Giải thích chiến lược Cache cho cả nhóm[cite: 4]. |
| **Bùi Trung Hiếu** | **FR-AUTH-008 (Strict RBAC):** API Admin phê duyệt/gán quyền Author cho Reader. Middleware chặn Reader đăng bài (`403 Forbidden`)[cite: 4]. | Dựng UI Dashboard Admin (`/dashboard/users`) duyệt Tác giả. Viết tài liệu quy trình phân quyền 4 lớp[cite: 4]. |
| **Phan Thành Huy** | **FR-RCP-005/006:** API Publish/Unpublish/Archive Recipe. Cấu hình CORS, Rate Limiting, Error Handling chuẩn RFC 7807[cite: 4]. | Tổng hợp Postman Collection / Scalar API Specs. Kiểm thử toàn bộ 5 Luồng Critical Flows (E2E)[cite: 4]. |

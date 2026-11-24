# TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN – ĐHQG-HCM
### KHOA CÔNG NGHỆ THÔNG TIN – BỘ MÔN CÔNG NGHỆ PHẦN MỀM

---

# 📋 BÁO CÁO BÀI TẬP LAB 08 (NHÓM 14)
### MÔN: PHÁT TRIỂN ỨNG DỤNG WEB NÂNG CAO
**Đề tài:** Nền tảng Chia sẻ & Khám phá Công thức Ẩm thực Trực tuyến (**Culinary Blog**)  
**Học kỳ:** I – Năm học: 2026 – 2027  
**Thời gian thực hiện:** 27/10/2026 – 04/11/2026  

---

## 👥 THÀNH VIÊN NHÓM 14

| STT | Họ và tên | MSSV | Vai trò chính | Tỷ lệ đóng góp |
| :---: | :--- | :---: | :--- | :---: |
| **1** | **Nguyễn Nhất Minh** *(Trưởng nhóm)* | **2312690** | Backend Architecture, Security, User Management | 100% |
| **2** | **Bùi Trung Hiếu** | **2312611** | Frontend Lead, Recipe Wizard & Cooking Mode | 100% |
| **3** | **Phan Thanh Huy** | **2312634** | DevOps, Testing & Audit Logging Interceptor | 100% |
| **4** | **Nguyễn Thế Khải** | **2312640** | Database, MinIO Storage & Categories Admin | 100% |

---

## I. LIÊN KẾT ĐẾN REPOSITORY CHỨA MÃ NGUỒN

* **Kho chứa mã nguồn chính (GitHub):** [https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14)
* **Nhánh chính thức hoàn chỉnh (`main`):** [https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/main](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/main)
* **Nhánh tích hợp bài Lab 08 (`integration-lab8`):** [https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/integration-lab8](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/integration-lab8)
* **Pull Request tích hợp Lab 08 đã Merge vào `main` (PR #207):** [https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/pull/207](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/pull/207)
* **Các nhánh làm việc độc lập của từng thành viên:**
  * Nhánh của **Nguyễn Nhất Minh**: [`2312690-Minh`](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312690-Minh)
  * Nhánh của **Bùi Trung Hiếu**: [`2312611-Hieu`](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312611-Hieu) *(Đóng góp qua PR #206)*
  * Nhánh của **Phan Thanh Huy**: [`2312634-Huy`](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312634-Huy)
  * Nhánh của **Nguyễn Thế Khải**: [`2312640-Khai`](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312640-Khai)

---

## II. BẢNG PHÂN CÔNG CÔNG VIỆC VÀ KẾT QUẢ THỰC HIỆN (LAB 08)

| STT | Thành viên & Nhiệm vụ | Chi tiết công việc đã thực hiện & Tình trạng | Liên kết GitHub | Kết quả / Tiến độ |
| :---: | :--- | :--- | :---: | :---: |
| **1** | **Nguyễn Nhất Minh**<br>*(2312690)*<br><br>`FR-BKE-016`<br>API Quản lý Người dùng & Tác giả | **Đã hoàn thành:**<br>- Xây dựng API `GET /api/v1/users` (hỗ trợ phân trang, tìm kiếm, lọc theo vai trò) và `GET /api/v1/users/{id}`.<br>- Xây dựng API `GET /api/v1/users/authors` trả về danh sách đầu bếp công khai kèm số lượng công thức.<br>- Chuẩn hóa DTO `UserManagementDto`, phân quyền Admin chặt chẽ.<br>**Chưa hoàn thành:** Không có. | [Branch 2312690-Minh](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312690-Minh) | **100%**<br>*(Hoàn thành)* |
| **2** | **Nguyễn Nhất Minh**<br>*(2312690)*<br><br>`FR-BKE-017`<br>API Phân quyền & Khóa tài khoản | **Đã hoàn thành:**<br>- Hiện thực lệnh MediatR `PUT /api/v1/users/{id}/role` cập nhật vai trò Admin/Author/User.<br>- Hiện thực API `PUT /api/v1/users/{id}/status` bật/tắt kích hoạt tài khoản.<br>- Tự động xoay `SecurityStamp` và thu hồi (revoke) toàn bộ Refresh Token khi khóa tài khoản để vô hiệu hóa phiên ngay tức thì.<br>**Chưa hoàn thành:** Không có. | [Branch 2312690-Minh](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312690-Minh) | **100%**<br>*(Hoàn thành)* |
| **3** | **Nguyễn Nhất Minh**<br>*(2312690)*<br><br>`FR-FTE-044`<br>Trang Quản trị Người dùng Admin | **Đã hoàn thành:**<br>- Xây dựng giao diện bảng dữ liệu người dùng tại `/dashboard/users` theo chuẩn Tailwind CSS.<br>- Bộ lọc theo vai trò và thanh tìm kiếm tên, email tức thời.<br>- Modal phân quyền tài khoản và modal xác nhận khóa tài khoản có nhập lý do chi tiết.<br>**Chưa hoàn thành:** Không có. | [Branch 2312690-Minh](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312690-Minh) | **100%**<br>*(Hoàn thành)* |
| **4** | **Nguyễn Nhất Minh**<br>*(2312690)*<br><br>`FR-FTE-045`<br>Trang Danh sách Tác giả ẩm thực | **Đã hoàn thành:**<br>- Thiết kế trang công khai `/authors` hiển thị danh sách thẻ đầu bếp/tác giả trực quan.<br>- Hiển thị avatar, tên, tiểu sử, huy hiệu chuyên môn và số lượng công thức đóng góp.<br>- Hỗ trợ phân trang và liên kết lọc công thức theo từng tác giả.<br>**Chưa hoàn thành:** Không có. | [Branch 2312690-Minh](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312690-Minh) | **100%**<br>*(Hoàn thành)* |
| **5** | **Nguyễn Thế Khải**<br>*(2312640)*<br><br>`FR-INF-007`<br>Dịch vụ MinIO Object Storage | **Đã hoàn thành:**<br>- Xây dựng `MinioStorageService` tương thích hoàn toàn chuẩn AWS S3 API.<br>- Cấu hình tự động khởi tạo bucket `culinary-blog` với chính sách bucket `public-read`.<br>- Thiết kế cơ chế Fallback thông minh: tự động chuyển sang Local File Storage (`wwwroot/uploads`) khi mất kết nối MinIO.<br>**Chưa hoàn thành:** Không có. | [Branch 2312640-Khai](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312640-Khai) | **100%**<br>*(Hoàn thành)* |
| **6** | **Nguyễn Thế Khải**<br>*(2312640)*<br><br>`FR-BKE-018`<br>API Upload hình ảnh đa phương tiện | **Đã hoàn thành:**<br>- Xây dựng endpoint `POST /api/v1/media/upload` kiểm tra định dạng (JPEG, PNG, WebP) và dung lượng (< 5MB).<br>- Sinh mã băm SHA-256 Checksum chống tải tệp trùng lặp.<br>- Lưu thông tin hình ảnh vào bảng `RecipeImages` liên kết với công thức.<br>**Chưa hoàn thành:** Không có. | [Branch 2312640-Khai](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312640-Khai) | **100%**<br>*(Hoàn thành)* |
| **7** | **Nguyễn Thế Khải**<br>*(2312640)*<br><br>`FR-FTE-046`<br>Component ImageUploader | **Đã hoàn thành:**<br>- Xây dựng linh kiện `ImageUploader.tsx` hỗ trợ kéo thả tệp (Drag-and-Drop) trực quan.<br>- Xem trước ảnh tức thì (Preview) và kiểm tra kích thước/định dạng tệp trước khi gửi.<br>- Thanh tiến trình tải lên và tùy chọn gán làm ảnh đại diện chính (Primary Image).<br>**Chưa hoàn thành:** Không có. | [Branch 2312640-Khai](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312640-Khai) | **100%**<br>*(Hoàn thành)* |
| **8** | **Nguyễn Thế Khải**<br>*(2312640)*<br><br>`FR-FTE-047`<br>Trang Quản trị Danh mục cho Admin | **Đã hoàn thành:**<br>- Xây dựng giao diện `/dashboard/categories` hiển thị danh sách danh mục có đếm số công thức.<br>- Form tạo mới và chỉnh sửa danh mục có tích hợp tải ảnh bìa danh mục thực tế.<br>- Thao tác xóa danh mục có hộp thoại xác nhận an toàn.<br>**Chưa hoàn thành:** Không có. | [Branch 2312640-Khai](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312640-Khai) | **100%**<br>*(Hoàn thành)* |
| **9** | **Phan Thanh Huy**<br>*(2312634)*<br><br>`FR-DVO-007`<br>Audit Log EF Core Interceptor | **Đã hoàn thành:**<br>- Hiện thực `AuditLogInterceptor.cs` kế thừa `SaveChangesInterceptor` của EF Core.<br>- Tự động theo dõi các EntityEntry (Added, Modified, SoftDelete) và phân tích diff (OldValues vs NewValues) dạng JSONB.<br>- Tự động ghi `UserId`, `Action`, `EntityName`, `Timestamp` vào bảng `AuditLogs`.<br>**Chưa hoàn thành:** Không có. | [Branch 2312634-Huy](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312634-Huy) | **100%**<br>*(Hoàn thành)* |
| **10** | **Phan Thanh Huy**<br>*(2312634)*<br><br>`FR-BKE-019`<br>API Truy vấn Nhật ký Hệ thống | **Đã hoàn thành:**<br>- Xây dựng API `GET /api/v1/audit-logs` và `GET /api/v1/logs` truy vấn nhật ký kiểm toán.<br>- Hỗ trợ lọc theo thực thể, hành động, khoảng ngày và phân trang giảm dần theo thời gian.<br>- Phân quyền `AdminOnly` bảo vệ an toàn nhật ký hệ thống.<br>**Chưa hoàn thành:** Không có. | [Branch 2312634-Huy](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312634-Huy) | **100%**<br>*(Hoàn thành)* |
| **11** | **Phan Thanh Huy**<br>*(2312634)*<br><br>`FR-FTE-048`<br>Trang Quản trị Nhật ký Hệ thống | **Đã hoàn thành:**<br>- Xây dựng giao diện `/dashboard/logs` hiển thị dòng thời gian thao tác (Audit Timeline).<br>- Nhãn màu trực quan phân loại hành động (Thêm: Xanh, Sửa: Vàng, Xóa: Đỏ).<br>- Modal xem chi tiết thay đổi dữ liệu (JSON Diff View) với định dạng dễ đọc.<br>**Chưa hoàn thành:** Không có. | [Branch 2312634-Huy](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312634-Huy) | **100%**<br>*(Hoàn thành)* |
| **12** | **Phan Thanh Huy**<br>*(2312634)*<br><br>`FR-TST-010`<br>Kiểm thử tích hợp Integration Tests | **Đã hoàn thành:**<br>- Xây dựng bộ kiểm thử tích hợp chuyên sâu trong `AuditLogIntegrationTests.cs` (47 tests) và Unit Tests (24 tests).<br>- Kiểm tra toàn diện việc ghi nhận audit logs, bảo mật phân quyền, tải ảnh MinIO và vòng đời công thức.<br>- 100% kiểm thử chạy vượt qua thành công (71/71 tests passed).<br>**Chưa hoàn thành:** Không có. | [Branch 2312634-Huy](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/tree/2312634-Huy) | **100%**<br>*(Hoàn thành)* |
| **13** | **Bùi Trung Hiếu**<br>*(2312611)*<br><br>`FR-FTE-049`<br>Trang Thêm mới Công thức đa bước | **Đã hoàn thành:**<br>- Xây dựng Form Wizard 4 bước (`/recipes/new`): Thông tin cơ bản $\rightarrow$ Nguyên liệu $\rightarrow$ Các bước thực hiện $\rightarrow$ Dinh dưỡng & Đăng tải.<br>- Tích hợp linh kiện `ImageUploader` tải ảnh đại diện và ảnh các bước thực hiện.<br>- Kiểm tra ràng buộc nghiệp vụ: tối thiểu 1 nguyên liệu và 1 bước thực hiện trước khi cho phép xuất bản.<br>**Chưa hoàn thành:** Không có. | [Branch 2312611-Hieu (PR #206)](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/pull/206) | **100%**<br>*(Hoàn thành)* |
| **14** | **Bùi Trung Hiếu**<br>*(2312611)*<br><br>`FR-FTE-050`<br>Trang Chỉnh sửa & Concurrency Control | **Đã hoàn thành:**<br>- Xây dựng trang `/recipes/[id]/edit` cho phép tác giả cập nhật toàn bộ thông tin công thức.<br>- Gửi kèm Concurrency Token `RowVersion` trong header `If-Match` khi cập nhật.<br>- Bắt lỗi HTTP 409 Concurrency Conflict, hiển thị cảnh báo đỏ và nút Tải lại dữ liệu mới nhất (Reload).<br>**Chưa hoàn thành:** Không có. | [Branch 2312611-Hieu (PR #206)](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/pull/206) | **100%**<br>*(Hoàn thành)* |
| **15** | **Bùi Trung Hiếu**<br>*(2312611)*<br><br>`FR-FTE-051`<br>Luồng Chuyển đổi Trạng thái Công thức | **Đã hoàn thành:**<br>- Quản lý trọn vẹn vòng đời: Draft $\rightarrow$ Published $\rightarrow$ Archived $\rightarrow$ Deleted (xóa mềm).<br>- Đồng bộ nhãn trạng thái và nút thao tác trên RecipeCard, trang chi tiết và trang edit.<br>- Xử lý xác nhận nhanh khi tác giả muốn lưu trữ hoặc xuất bản công thức.<br>**Chưa hoàn thành:** Không có. | [Branch 2312611-Hieu (PR #206)](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/pull/206) | **100%**<br>*(Hoàn thành)* |
| **16** | **Bùi Trung Hiếu**<br>*(2312611)*<br><br>`FR-FTE-052`<br>Chế độ Nấu ăn & Khẩu phần ăn | **Đã hoàn thành:**<br>- Chế độ Nấu ăn tập trung (`CookingModeModal.tsx`) toàn màn hình, chữ lớn, bộ hẹn giờ đếm ngược có chuông báo Web Audio, khay xem nguyên liệu và giữ sáng màn hình với Screen Wake Lock API.<br>- Khẩu phần (`Servings Scaler`): Tự động nhân tỷ lệ định lượng nguyên liệu theo số người ăn, có nút đặt lại về ban đầu.<br>**Chưa hoàn thành:** Không có. | [Branch 2312611-Hieu (PR #206)](https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14/pull/206) | **100%**<br>*(Hoàn thành)* |

---

## III. HÌNH ẢNH MINH HỌA DEMO SẢN PHẨM

*(Toàn bộ các hình ảnh dưới đây đã được nhúng trực tiếp vào file Word `BaoCao_Lab08_Nhom14.docx` và lưu trữ tại thư mục `docs/screenshots/`)*

1. **Hình 1: Màn hình Đăng nhập tích hợp tiện ích Demo 1-Click đa vai trò**  
   Hỗ trợ chuyển đổi nhanh tài khoản Admin, Author, User với mật khẩu `Password123!` phục vụ quá trình chấm điểm.
2. **Hình 2: Trang Quản trị Người dùng cho Admin (`/dashboard/users`)**  
   Hiển thị danh sách người dùng, bộ lọc vai trò, modal phân quyền và modal xác nhận khóa tài khoản có nhập lý do.
3. **Hình 3: Trang Danh sách Đầu bếp & Tác giả công khai (`/authors`)**  
   Hiển thị thẻ đầu bếp với avatar, tên, bio, huy hiệu chuyên môn và số lượng công thức đóng góp.
4. **Hình 4: Trang Quản trị Danh mục Công thức cho Admin (`/dashboard/categories`)**  
   Quản lý CRUD danh mục, số lượng bài viết liên kết và tích hợp tải ảnh bìa danh mục.
5. **Hình 5: Trang Quản trị Nhật ký Hệ thống (`/dashboard/logs`)**  
   Hiển thị dòng thời gian thao tác (Audit Timeline) và modal xem chi tiết payload JSON diff (OldValues vs NewValues).
6. **Hình 6: Trang Thêm mới Công thức đa bước (`/recipes/new`)**  
   Form Wizard 4 bước chuyên nghiệp, tích hợp `ImageUploader` tải ảnh lên MinIO S3 và tính toán 6 chỉ số dinh dưỡng.
7. **Hình 7: Trang Danh mục & Khám phá Công thức (`/recipes`)**  
   Bố cục lưới công thức, phân trang, lọc theo danh mục, độ khó, thời gian nấu và sắp xếp đa tiêu chí.
8. **Hình 8: Trang chủ Hệ thống Culinary Blog (`/`)**  
   Giao diện responsive hiện đại, hiển thị bài viết nổi bật, thanh tìm kiếm nhanh và danh mục ẩm thực phổ biến.
9. **Hình 9: Trang Quên mật khẩu (`/forgot-password`)**  
   Bảo mật chống dò quét tài khoản (Anti-User Enumeration) và thanh đo độ mạnh mật khẩu (Password Strength Meter).
10. **Hình 10: Tài liệu API tương tác chuẩn OpenAPI 3.1 & Scalar UI (`/scalar/v1`)**  
    Tài liệu hóa toàn bộ các endpoint của hệ thống, hỗ trợ kiểm thử trực tiếp trên trình duyệt.

---

## IV. HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY CHƯƠNG TRÌNH

### 1. Yêu cầu môi trường (Prerequisites)
* **Docker Desktop**: Đang chạy trên máy.
* **.NET SDK**: Phiên bản 10.0 (hoặc tối thiểu .NET 9.0).
* **Node.js**: Phiên bản LTS v20.x trở lên (khuyên dùng Node v22+) & npm.
* **Git Client**.

### 2. Các bước khởi chạy chi tiết

#### Bước 1: Clone mã nguồn từ nhánh `main`
```bash
git clone https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14.git
cd PTUDWEBNC_Nhom14
git checkout main
git pull origin main
```

#### Bước 2: Khởi động cơ sở hạ tầng (PostgreSQL, Redis, MinIO)
```bash
docker compose -f culinary-blog/docker-compose.yml up -d
```
* **PostgreSQL 16**: `localhost:5432` (`postgres` / `postgres`, CSDL: `CulinaryBlogDb`)
* **Redis Cache**: `localhost:6379`
* **MinIO Object Storage**: `localhost:9000` (API S3) và `localhost:9001` (Console UI: `admin` / `password123`)

#### Bước 3: Khởi động Backend API (.NET 10)
```bash
dotnet run --project culinary-blog/src/backend/src/CulinaryBlog.API/CulinaryBlog.API.csproj --launch-profile http
```
* **API Base URL**: [http://localhost:5075](http://localhost:5075)
* **Health Check**: [http://localhost:5075/health](http://localhost:5075/health) $\rightarrow$ `Healthy`
* **Scalar UI Documentation**: [http://localhost:5075/scalar/v1](http://localhost:5075/scalar/v1)

#### Bước 4: Khởi động Frontend Next.js (Mở Terminal mới)
```bash
cd culinary-blog/src/frontend
npm install
npm run dev
```
* **Website ứng dụng**: [http://localhost:3000](http://localhost:3000)

#### Bước 5: Đăng nhập trải nghiệm hệ thống
Truy cập [http://localhost:3000/login](http://localhost:3000/login), bấm nút **Demo 1-Click** hoặc nhập thông tin:
* 🛡️ **Quản trị viên (Admin)**: `admin@culinary.com` | Mật khẩu: `Password123!`
* 👨‍🍳 **Đầu bếp (Author)**: `chef.hieu@culinary.com` | Mật khẩu: `Password123!`
* 👤 **Thành viên (User)**: `member.huy@culinary.com` | Mật khẩu: `Password123!`

---

## V. KẾT QUẢ KIỂM THỬ TỰ ĐỘNG (AUTOMATED TESTING)

* **Bộ kiểm thử đơn vị (Unit Tests Backend)**:
  ```bash
  dotnet test culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/CulinaryBlog.UnitTests.csproj
  ```
  $\rightarrow$ **Kết quả:** `Passed! 24/24 tests passed (100%)`.
* **Bộ kiểm thử tích hợp (Integration Tests Backend)**:
  ```bash
  $env:ConnectionStrings__DefaultConnection="Host=localhost;Port=5432;Database=culinaryblog_test;Username=postgres;Password=postgres"
  dotnet test culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/CulinaryBlog.IntegrationTests.csproj
  ```
  $\rightarrow$ **Kết quả:** `Passed! 47/47 tests passed (100%)`.
* **Tổng cộng**: **71/71 bài kiểm thử tự động đạt 100%**.

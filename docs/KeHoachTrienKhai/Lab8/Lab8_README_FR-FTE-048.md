# Lab 8 - Kế hoạch triển khai FR-FTE-048

## 1. Nhiệm vụ

**FR-FTE-048 - Xây dựng giao diện Trang xem Nhật ký Hệ thống (`/dashboard/logs`).**

Trang dành cho quản trị viên, cho phép xem và tra cứu các sự kiện audit do
FR-DVO-007 ghi nhận và FR-BKE-018 cung cấp.

## 2. Hiện trạng liên quan

- Frontend dùng Next.js App Router, TypeScript, Tailwind CSS và Axios.
- Layout dashboard tại route group `(dashboard)` đã có sidebar, responsive mobile
  và danh sách điều hướng.
- Zustand auth store lưu người dùng hiện tại cùng mảng `roles`; `apiClient` tự gắn
  access token cho request.
- Backend endpoint `/api/v1/audit-logs` chỉ cho Admin truy cập, hỗ trợ filter và
  phân trang, trả `items`, `totalCount`, `page`, `pageSize`.
- Thành phần `Card`, `Button`, `Input`, `Badge` và trạng thái loading hiện có có
  thể được tái sử dụng.

## 3. Ý tưởng triển khai

1. Tạo route client tại `src/app/(dashboard)/dashboard/logs/page.tsx`; route group
   `(dashboard)` không xuất hiện trong URL nên địa chỉ công khai là `/dashboard/logs`.
2. Tạo `auditLogService` có kiểu dữ liệu cho audit record và response phân trang,
   gọi endpoint bằng `apiClient` để token/interceptor được dùng nhất quán.
3. Chỉ hiển thị route trong sidebar khi auth store xác nhận role `Admin`; trang
   kiểm tra role độc lập và không gọi API khi chưa có quyền.
4. Hiển thị bản ghi mới nhất trước, thông tin thời gian, actor, hành động,
   entity/ID và xem JSON cũ/mới trong phần mở rộng.
5. Cung cấp bộ lọc hành động, entity, actor, entity ID và khoảng ngày UTC; gọi API
   khi áp dụng bộ lọc và chuyển trang.
6. Có trạng thái đang tải, lỗi có thể thử lại, danh sách rỗng và phân trang; giữ
   giao diện phù hợp cả màn hình nhỏ lẫn desktop.
7. Không lưu hoặc in token hay dữ liệu bí mật; request dùng `apiClient` và JSON
   audit chỉ hiển thị dữ liệu đã được lọc ở backend.

## 4. File dự kiến sửa/thêm

### File dự kiến mới

- `culinary-blog/src/frontend/src/app/(dashboard)/dashboard/logs/page.tsx`
  - Trang lọc, hiển thị, xem chi tiết JSON và phân trang audit log.
- `culinary-blog/src/frontend/src/services/auditLogService.ts`
  - TypeScript contracts và hàm gọi endpoint truy vấn audit log.

### File dự kiến sửa

- `culinary-blog/src/frontend/src/app/(dashboard)/layout.tsx`
  - Thêm liên kết sidebar “Nhật ký hệ thống”, chỉ hiện cho Admin.

### Kiểm thử liên quan

- Kiểm tra TypeScript/lint/build frontend trong task này.
- Kiểm tra role gate, trạng thái tải/lỗi/rỗng, bộ lọc và phân trang trong
  FR-TST-010.
- Truy vấn dữ liệu thật yêu cầu backend đã chạy, PostgreSQL đã áp dụng migration
  `AddAuditLogs` và tài khoản có role Admin.

> Hai file mã nguồn mới chỉ được tạo sau khi được duyệt theo yêu cầu xác nhận trước
> khi bổ sung file mới.

## 5. Hành vi giao diện dự kiến

- Admin mở `/dashboard/logs` để xem nhật ký; link xuất hiện trong sidebar và có
  trạng thái active ở route này.
- Người không có role Admin nhìn thấy trang từ chối truy cập thay vì gọi API.
- Mỗi dòng hiển thị actor, hành động, entity, ID và thời điểm; phần chi tiết có thể
  mở để xem dữ liệu trước/sau dưới dạng JSON dễ đọc.
- Bộ lọc và phân trang lấy dữ liệu từ backend, không tải toàn bộ lịch sử về trình duyệt.

## 6. Ghi chú triển khai và giải thích

- **API service** tách HTTP và contract khỏi JSX, giúp component tập trung vào giao diện.
- **Role gate phía giao diện** cải thiện trải nghiệm; quyền thực sự vẫn được backend
  bảo vệ bằng policy `AdminOnly`.
- **Phân trang phía server** giảm số bản ghi và nội dung JSON được truyền mỗi lần tải.
- **`AbortController`/hủy request** ngăn response cũ ghi đè bộ lọc mới khi người dùng
  thao tác liên tiếp.
- **JSON hiển thị bằng `<pre>`** giữ cấu trúc lồng nhau và tránh render nội dung như HTML.

## 7. Công cụ/môi trường dự kiến

- Node.js và package manager đang dùng trong dự án để chạy lint/build.
- Trình duyệt và backend cục bộ để kiểm tra giao diện có dữ liệu thực.
- PostgreSQL/Docker chỉ cần khi xác minh luồng đầy đủ từ audit log đến frontend;
  không cần WSL nếu các công cụ chạy được trực tiếp trên Windows.

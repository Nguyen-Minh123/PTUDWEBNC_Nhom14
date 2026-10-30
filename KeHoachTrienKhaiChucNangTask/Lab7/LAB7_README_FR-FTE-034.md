# Lab 7 - README - FR-FTE-034

## [FR-FTE-034] Xây dựng trang xem danh sách tất cả Category (`/categories`) hiển thị dạng lưới

### 1) Mục tiêu
- Xây dựng trang `/categories` theo dạng lưới để người dùng dễ quét nhanh danh mục.
- Hiển thị rõ tên danh mục, mô tả ngắn, số lượng công thức và trạng thái nổi bật.
- Tổ chức giao diện theo hướng tái sử dụng, tách rõ layout, sidebar, grid và card.
- Chuẩn bị nền tảng để sau này thay dữ liệu tĩnh bằng dữ liệu API thật mà không đổi cấu trúc UI.

### 2) Ma trận quyền đã được xác nhận
| Vai trò | Mức truy cập | Quyền UI chính | Ghi chú |
|---|---|---|---|
| Guest | Truy cập công khai | Xem danh sách Category và điều hướng sang nội dung công khai | Không cần đăng nhập |
| Author | Truy cập công khai + nội dung cá nhân | Xem Category, dùng Sidebar, tìm công thức theo chủ đề | Phù hợp luồng khám phá nội dung |
| Admin | Truy cập công khai + quản trị | Xem Category và mở rộng sang các chức năng quản trị | Không giới hạn ở trang `/categories` |


### 3) Hiện trạng đã kiểm tra
- Dự án đã có cấu trúc App Router cho module Category:
  + `src/app/(categories)/layout.tsx`
  + `src/app/(categories)/categories/page.tsx`
  + `src/app/(categories)/categories/loading.tsx`
- Đã có các component nền để dựng UI:
  + `src/components/categories/CategorySidebar.tsx`
  + `src/components/categories/CategoryGrid.tsx`
  + `src/components/categories/CategoryCard.tsx`
- Đã có dữ liệu mẫu để dựng giao diện tĩnh và kiểm tra bố cục.
- Trang `/categories` cần hiển thị đúng lưới, không vỡ layout khi dữ liệu rỗng hoặc khi thay đổi kích thước màn hình.

### 4) Kế hoạch triển khai
1. Thiết kế layout chung cho module Category bằng `layout.tsx`.
2. Hiển thị Sidebar danh mục bên trái.
3. Hiển thị nội dung chính bằng `CategoryGrid`.
4. Mỗi danh mục được render thành `CategoryCard`.
5. Bổ sung loading state để đảm bảo giao diện không trống khi chờ tải.
6. Chuẩn hóa dữ liệu đầu vào để dễ thay từ mock sang API thật.
7. Kiểm tra responsive trên desktop, tablet và mobile.

### 5) File dự kiến thay đổi
- `src/frontend/src/app/(categories)/layout.tsx`
- `src/frontend/src/app/(categories)/categories/page.tsx`
- `src/frontend/src/app/(categories)/categories/loading.tsx`
- `src/frontend/src/components/categories/CategorySidebar.tsx`
- `src/frontend/src/components/categories/CategoryGrid.tsx`
- `src/frontend/src/components/categories/CategoryCard.tsx`
- `src/frontend/src/components/search/SearchBar.tsx` nếu đồng bộ bộ lọc/tìm kiếm
- `src/frontend/src/hooks/search/useRecipeSearch.ts` nếu cần query params cho lọc danh mục

### 6) Kiểm tra và ghi nhận
- Mở route `/categories` và xác nhận giao diện hiển thị dạng lưới.
- Kiểm tra Sidebar có hiển thị đúng danh mục và trạng thái active.
- Kiểm tra thẻ Category có ảnh/màu/tiêu đề/mô tả hiển thị rõ ràng.
- Kiểm tra responsive khi thu nhỏ màn hình.
- Kiểm tra loading state khi trang đang tải.
- Ghi nhận lỗi null/undefined ở dữ liệu mô tả hoặc số lượng công thức nếu có.

### 7) Trạng thái
- **Đang hoàn thiện**
- Mức độ hoàn thành ước tính: **90%**
- Phần còn lại tập trung vào đồng bộ dữ liệu thật và tinh chỉnh UI/UX.

### 8) Giải thích code để trình bày
- `layout.tsx`: bố cục chung cho toàn module Category, giữ Sidebar cố định.
- `page.tsx`: trang chính hiển thị danh sách Category dạng lưới.
- `loading.tsx`: skeleton loading để tránh màn hình trống.
- `CategorySidebar`: danh sách danh mục và điều hướng.
- `CategoryGrid`: render các card danh mục theo lưới responsive.
- `CategoryCard`: hiển thị một danh mục đơn lẻ, có title, mô tả, số lượng công thức.
- Thiết kế theo hướng tách component giúp giảm độ phức tạp, dễ bảo trì và dễ thay đổi dữ liệu nguồn sau này.

### 9) Câu hỏi giáo viên có thể hỏi
1. Vì sao `/categories` nên là trang công khai?
2. Vì sao cần tách `layout.tsx` thay vì dồn hết vào `page.tsx`?
3. Khi nào nên dùng dữ liệu tĩnh, khi nào chuyển sang API thật?
4. `CategoryGrid` khác gì `CategoryCard` trong trách nhiệm hiển thị?
5. Làm sao đảm bảo giao diện không vỡ khi dữ liệu null hoặc thiếu?
6. Vì sao nên có loading state riêng cho route?
7. Sidebar có vai trò gì trong trải nghiệm điều hướng?
8. Nếu thêm tìm kiếm và bộ lọc, bạn sẽ đặt logic ở đâu để không làm rối UI?

### Kết luận
FR-FTE-034 tập trung xây dựng trang `/categories` là trang công khai, không phụ thuộc xác thực, nhưng vẫn phải đồng bộ bố cục với hệ thống chung để giữ trải nghiệm nhất quán.
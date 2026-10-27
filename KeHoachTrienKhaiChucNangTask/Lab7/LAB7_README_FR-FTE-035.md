# Lab 7 - README - FR-FTE-035

## [FR-FTE-035] Xây dựng Sidebar danh mục cho Trang chủ và Trang Khám phá (`CategorySidebar`)

### 1) Mục tiêu
- Xây dựng Sidebar danh mục dùng chung cho Trang chủ và Trang Khám phá.
- Giúp người dùng chuyển nhanh theo nhóm món ăn mà không cần tìm kiếm lại từ đầu.
- Chuẩn hóa trải nghiệm điều hướng và tạo nền cho các tính năng lọc mở rộng sau này.
- Tách riêng phần hiển thị Sidebar để dễ tái sử dụng trong nhiều layout khác nhau.

### 2) Ma trận quyền đã được xác nhận
| Vai trò | Mức truy cập | Quyền UI chính | Ghi chú |
|---|---|---|---|
| Guest | Truy cập công khai | Xem Sidebar, chọn danh mục, điều hướng sang nội dung công khai | Không cần đăng nhập |
| Author | Truy cập công khai + nội dung cá nhân | Xem Sidebar, lọc theo danh mục, kết hợp tìm công thức | Hỗ trợ khám phá nội dung |
| Admin | Truy cập công khai + quản trị | Xem Sidebar như Author, có thể mở rộng sang khu vực quản trị | Không giới hạn ở module Category |

**Kết luận:** `CategorySidebar` không cấp quyền mới, mà chỉ hỗ trợ điều hướng và lọc nội dung theo quyền đã có.

### 3) Hiện trạng đã kiểm tra
- Dự án đã có module Category với cấu trúc App Router riêng.
- Đã có các component nền liên quan:
  - `src/components/categories/CategorySidebar.tsx`
  - `src/components/categories/CategoryGrid.tsx`
  - `src/components/categories/CategoryCard.tsx`
- Đã có dữ liệu category mẫu và logic hiển thị dạng lưới.
- Nhu cầu thực tế là hiển thị Sidebar ở hai ngữ cảnh:
  - Trang chủ
  - Trang Khám phá
- Cần đảm bảo Sidebar tương thích với query params, route hiện tại và dữ liệu API sau này.

### 4) Kế hoạch triển khai
1. Thiết kế `CategorySidebar` theo hướng component tái sử dụng.
2. Hiển thị danh sách category theo dạng dọc, dễ quét bằng mắt.
3. Làm nổi bật category đang chọn bằng trạng thái active.
4. Hỗ trợ điều hướng sang `/categories` hoặc sang danh sách recipe theo category.
5. Bổ sung trạng thái loading và empty state nếu dữ liệu chưa sẵn sàng.
6. Kiểm tra khả năng dùng chung cho Trang chủ và Trang Khám phá.
7. Chuẩn hóa giao diện để sau này kết nối API mà không phải đổi layout.

### 5) File dự kiến thay đổi
- `src/frontend/src/components/categories/CategorySidebar.tsx`
- `src/frontend/src/app/(categories)/layout.tsx`
- `src/frontend/src/app/(categories)/categories/page.tsx`
- `src/frontend/src/app/(categories)/categories/loading.tsx`
- `src/frontend/src/app/(main)/layout.tsx` hoặc layout trang chủ nếu Sidebar được dùng ở Home
- `src/frontend/src/app/(main)/page.tsx` hoặc trang Khám phá nếu Sidebar được dùng tại đây
- `src/frontend/src/hooks/search/useRecipeSearch.ts` nếu Sidebar đồng bộ query params

### 6) Kiểm tra và ghi nhận
- Mở Trang chủ và Trang Khám phá để xác nhận Sidebar xuất hiện đúng vị trí.
- Kiểm tra click vào từng category có điều hướng đúng không.
- Kiểm tra trạng thái active có đổi theo route hoặc query params không.
- Kiểm tra responsive trên desktop, tablet và mobile.
- Kiểm tra hành vi khi danh sách category rỗng hoặc backend chưa phản hồi.

### 7) Trạng thái
- **Đang hoàn thiện**
- Mức độ hoàn thành ước tính: **95%**
- Phần còn lại chủ yếu là tinh chỉnh dữ liệu thật và đồng bộ điều hướng giữa các trang.

### 8) Giải thích code để trình bày
- **`CategorySidebar`**: hiển thị danh mục theo chiều dọc và điều hướng nhanh.
- **Active state**: giúp người dùng biết đang chọn category nào.
- **Tái sử dụng**: một component dùng cho nhiều màn hình, giảm trùng lặp code.
- **Query params**: hỗ trợ giữ trạng thái lọc khi refresh hoặc chia sẻ link.
- **Layout tách riêng**: giúp Sidebar không bị trộn với logic của grid hoặc page.

### 9) Câu hỏi giáo viên có thể hỏi
1. Vì sao Sidebar nên tách thành component riêng?
2. Sidebar dùng chung cho Trang chủ và Trang Khám phá có lợi gì?
3. Khi nào nên dùng query params thay vì state nội bộ?
4. Làm sao để xác định category đang active?
5. Nếu dữ liệu category trả về rỗng thì UI xử lý thế nào?
6. Vì sao Sidebar không nên chứa business logic phức tạp?
7. Khi thay đổi route, Sidebar có cần reset trạng thái không?
8. Làm sao để Sidebar dễ mở rộng khi thêm bộ lọc mới?

# Lab 7 - README - FR-FTE-036

## [FR-FTE-036] Cài đặt chức năng Tìm kiếm (Search Bar, Debounce, Filter by Category, Query Params)

### 1) Mục tiêu
- Xây dựng một cơ chế tìm kiếm thống nhất cho các trang danh sách nội dung.
- Hỗ trợ nhập từ khóa, lọc theo Category, và đồng bộ trạng thái lên URL.
- Tối ưu trải nghiệm người dùng bằng debounce để giảm số lần xử lý khi gõ liên tục.
- Đảm bảo sau khi refresh trang, bộ lọc vẫn được giữ nguyên qua query params.

### 2) Ma trận quyền đã được xác nhận
| Vai trò | Quyền liên quan đến tìm kiếm | Ghi chú |
|---|---|---|
| Guest | Tìm kiếm nội dung công khai | Chỉ xem dữ liệu đã xuất bản |
| Author | Tìm kiếm nội dung công khai và nội dung cá nhân được phép xem | Hỗ trợ quản lý nội dung |
| Admin | Tìm kiếm toàn bộ dữ liệu theo phạm vi quản trị | Phục vụ kiểm duyệt và quản trị |

**Kết luận:** chức năng tìm kiếm không cấp thêm quyền mới, mà chỉ thay đổi cách truy vấn và hiển thị dữ liệu theo quyền đã có.

### 3) Hiện trạng đã kiểm tra
- Dự án đã có các thành phần liên quan:
  - `src/components/search/SearchBar.tsx`
  - `src/hooks/search/useRecipeSearch.ts`
  - `src/components/categories/CategorySidebar.tsx`
  - `src/app/(categories)/categories/page.tsx`
- Đã có dữ liệu Category mẫu để kiểm tra luồng tìm kiếm.
- Đã xác định nhu cầu thực tế:
  - tìm theo từ khóa,
  - lọc theo Category,
  - đồng bộ query params,
  - tránh gọi lại xử lý quá nhiều khi người dùng nhập nhanh.

### 4) Kế hoạch triển khai
1. Tạo `SearchBar` để nhập từ khóa và chọn Category.
2. Tạo hook `useRecipeSearch` để quản lý state tìm kiếm.
3. Áp dụng debounce cho từ khóa nhập.
4. Đồng bộ state lên query params (`q`, `category`).
5. Khi refresh trang, khôi phục lại trạng thái từ URL.
6. Tích hợp SearchBar vào các trang danh sách cần tìm kiếm.
7. Kiểm tra khả năng lọc kết hợp giữa keyword và Category.

### 5) File dự kiến thay đổi
- `src/frontend/src/components/search/SearchBar.tsx`
- `src/frontend/src/hooks/search/useRecipeSearch.ts`
- `src/frontend/src/app/(categories)/categories/page.tsx`
- `src/frontend/src/app/(categories)/layout.tsx` nếu cần bố cục chung
- `src/frontend/src/components/categories/CategorySidebar.tsx` nếu cần đồng bộ filter
- `src/frontend/src/components/categories/CategoryGrid.tsx` nếu cần hiển thị kết quả lọc

### 6) Kiểm tra và ghi nhận
- Gõ từ khóa và xác nhận kết quả thay đổi sau debounce.
- Chọn Category và kiểm tra query params cập nhật đúng.
- Refresh trang và xác nhận bộ lọc vẫn được giữ.
- Kiểm tra trường hợp không có kết quả.
- Kiểm tra UI không bị vòng lặp cập nhật hoặc gọi lại quá mức.

### 7) Trạng thái
- **Đang hoàn thiện**
- Mức độ hoàn thành ước tính: **85%**
- Phần còn lại tập trung vào tinh chỉnh tương tác và kiểm thử thực tế.

### 8) Giải thích code để trình bày
- **SearchBar**: giao diện nhập từ khóa và chọn Category.
- **Debounce**: trì hoãn cập nhật ngắn để giảm xử lý liên tục khi gõ.
- **Filter by Category**: thu hẹp phạm vi kết quả theo danh mục.
- **Query Params**: lưu trạng thái tìm kiếm trên URL để chia sẻ và refresh vẫn giữ bộ lọc.
- **useRecipeSearch**: tập trung toàn bộ logic state và đồng bộ URL, giúp UI gọn hơn và dễ tái sử dụng.

### 9) Câu hỏi giáo viên có thể hỏi
1. Vì sao cần debounce khi tìm kiếm?
2. Vì sao nên đồng bộ bộ lọc lên query params?
3. Nếu không dùng query params thì người dùng gặp hạn chế gì?
4. `SearchBar` và `useRecipeSearch` khác nhau ở trách nhiệm nào?
5. Làm sao tránh vòng lặp render khi cập nhật URL?
6. Khi nào nên dùng local state, khi nào nên dùng hook riêng?
7. Search theo keyword và filter theo Category nên xử lý ở đâu?
8. Cơ chế này có thể tái sử dụng cho trang nào khác?
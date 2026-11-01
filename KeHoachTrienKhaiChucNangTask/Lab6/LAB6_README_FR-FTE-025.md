# Lab 6 - README - FR-FTE-025

## [FR-FTE-025] Cài đặt store quản lý bộ lọc và tìm kiếm `filter-store.ts` (Zustand)

### 1) Mục tiêu
- Tập trung hóa trạng thái lọc và tìm kiếm ở phía client.
- Đồng bộ nhanh giữa ô tìm kiếm, bộ lọc danh mục, độ khó, trạng thái và sắp xếp.
- Giảm logic xử lý trùng lặp giữa trang danh sách, dashboard và các component tìm kiếm.
- Tạo một nguồn trạng thái thống nhất để dễ kiểm soát và mở rộng.

### 2) Ma trận quyền đã được xác nhận
| Vai trò | Quyền liên quan đến lọc/tìm kiếm | Ghi chú |
|---|---|---|
| Guest | Tìm kiếm và lọc nội dung công khai | Chỉ xem dữ liệu đã xuất bản |
| Author | Tìm kiếm/lọc nội dung công khai và công thức của chính mình | Phục vụ quản lý nội dung cá nhân |
| Admin | Tìm kiếm/lọc toàn bộ dữ liệu theo phạm vi quản trị | Có thể phục vụ kiểm duyệt và quản lý hệ thống |

**Kết luận:** `filter-store` không cấp quyền truy cập mới, mà chỉ điều khiển cách hiển thị và truy vấn dữ liệu theo quyền đã có.

### 3) Hiện trạng đã kiểm tra
- Dự án đã có các thành phần liên quan đến tìm kiếm và lọc:
  - `components/search/SearchBar.tsx`
  - `components/search/FilterBar.tsx`
  - `hooks/queries/useRecipes.ts`
  - `hooks/queries/useCategories.ts`
  - `app/(main)` và `app/(dashboard)` nơi có nhu cầu lọc dữ liệu
- Hiện trạng cho thấy một số state lọc đang được giữ cục bộ trong component.
- Chưa có store trung tâm để:
  - lưu keyword,
  - lưu bộ lọc theo category/difficulty/status,
  - lưu sort order,
  - reset bộ lọc đồng bộ,
  - tái sử dụng giữa nhiều trang.

### 4) Kế hoạch triển khai
1. Tạo `filter-store.ts` bằng Zustand.
2. Khai báo state tối thiểu:
   - `keyword`
   - `categoryId`
   - `difficulty`
   - `status`
   - `sort`
   - `page`
   - `pageSize`
3. Tạo actions:
   - `setKeyword`
   - `setCategoryId`
   - `setDifficulty`
   - `setStatus`
   - `setSort`
   - `setPage`
   - `setPageSize`
   - `resetFilters`
   - `hydrateFilters`
4. Kết nối store với:
   - `SearchBar`
   - `FilterBar`
   - `useRecipes`
   - các trang danh sách và dashboard nếu cần
5. Chuẩn hóa cách đẩy filter vào query params hoặc request API để dễ debug và chia sẻ URL.

### 5) File dự kiến thay đổi
- `src/stores/filter-store.ts`
- `src/components/search/SearchBar.tsx`
- `src/components/search/FilterBar.tsx`
- `src/hooks/queries/useRecipes.ts`
- `src/app/(main)/page.tsx`
- `src/app/(main)/recipes/page.tsx` hoặc trang danh sách liên quan
- `src/app/(dashboard)/dashboard/DashboardPage.tsx` nếu dashboard dùng filter chung

### 6) Kiểm tra và ghi nhận
- Kiểm tra gõ keyword và cập nhật state ngay.
- Kiểm tra đổi category/difficulty/status/sort có phản ánh đúng trên UI.
- Kiểm tra `resetFilters` đưa toàn bộ bộ lọc về mặc định.
- Kiểm tra đồng bộ giữa filter store và request API.
- Kiểm tra trạng thái khi reload trang hoặc chuyển route.
- Ghi nhận console/network để đảm bảo query đúng và không bị lệch dữ liệu.

### 7) Trạng thái
- **Đang triển khai**
- Mức độ hoàn thành dự kiến: **75%**
- Phần còn lại tập trung vào tích hợp query API và kiểm thử thực tế.

### 8) Giải thích code để trình bày
- **Vì sao dùng Zustand:** nhẹ, dễ dùng, phù hợp cho state dùng chung giữa nhiều component.
- **Vì sao tách `filter-store`:** giảm coupling giữa SearchBar, FilterBar và trang danh sách.
- **Vì sao cần `resetFilters`:** giúp quay về trạng thái mặc định nhanh và an toàn.
- **Vì sao nên chuẩn hóa `page` và `sort`:** hỗ trợ phân trang, chia sẻ URL và debug dễ hơn.
- **Ý nghĩa của `hydrateFilters`:** khôi phục filter khi refresh trang hoặc đọc từ query params.

### 9) Câu hỏi giáo viên có thể hỏi
1. Vì sao bộ lọc nên đưa vào Zustand thay vì chỉ dùng local state?
2. `filter-store` khác gì so với filter nằm trong component?
3. Làm sao đồng bộ filter với URL để chia sẻ link được?
4. `resetFilters` nên reset những trường nào?
5. Khi dữ liệu lớn, filter-store giúp ích gì cho kiến trúc?
6. Có nên lưu pagination trong cùng store với filter không? Vì sao?
7. Làm thế nào tránh store bị phụ thuộc quá nhiều vào một trang?
8. Filter-store có làm tăng số lần render không, và xử lý thế nào?

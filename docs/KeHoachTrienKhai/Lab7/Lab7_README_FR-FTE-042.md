# Lab 7 — FR-FTE-042: Xây dựng Trang hồ sơ cá nhân (/profile) xem thông tin tài khoản và danh sách bài viết

## 1. Mục tiêu

Xây dựng trang Hồ sơ cá nhân (`/profile`) chuyên nghiệp dành cho người dùng trên nền tảng Culinary Blog theo kiến trúc Next.js 15/16 App Router. Trang cho phép hiển thị toàn diện thông tin tài khoản tác giả, thẻ định danh đầu bếp, dải thống kê chỉ số ẩm thực thực tế và danh sách các bài viết/công thức do chính người dùng sáng tạo với bộ lọc trạng thái và phân trang mượt mà.

## 2. Phạm vi triển khai

- **Khởi tạo Route `/profile` độc lập**:
  - `culinary-blog/src/frontend/src/app/(main)/profile/layout.tsx`: Thiết lập Metadata chuẩn SEO (Tiêu đề trang, mô tả).
  - `culinary-blog/src/frontend/src/app/(main)/profile/page.tsx`: Component trang hồ sơ tương tác cao, bọc trong layout chính (`Header` và `Footer`).
- **Profile Hero Banner & Định danh Đầu bếp**:
  - Ảnh đại diện kích thước lớn có viền nổi bật, nút kích hoạt đổi avatar nhanh.
  - Tên tác giả (`displayName`), địa chỉ email, huy hiệu chứng nhận vai trò ("Đầu Bếp Gia Đình").
  - Trích dẫn tiểu sử ẩm thực (`bio`) cá nhân hóa.
  - Các nút thao tác nhanh: *Tạo Công Thức Mới* (dẫn tới `/recipes/new`) và *Dashboard Quản trị*.
- **Dải chỉ số thống kê ẩm thực (Stats Cards)**:
  - Tổng số công thức đã tạo.
  - Số công thức đã xuất bản công khai (`Published`).
  - Số công thức đang ở dạng bản nháp (`Draft`).
  - Tổng lượt đánh giá từ cộng đồng độc giả.
- **Tích hợp Danh sách bài viết với `RecipeGrid` (Tái sử dụng từ FR-FTE-041)**:
  - Thanh công cụ tìm kiếm nhanh công thức theo tiêu đề hoặc danh mục.
  - Bộ lọc trạng thái bài viết: *Tất cả*, *Đã xuất bản*, *Bản nháp*.
  - Phân trang chuẩn theo trang (6 bài/trang) với nút điều hướng số trang và tiến/lùi.
  - Kết nối `RecipeDetailModal` cho phép người dùng click xem nhanh chi tiết công thức ngay trên trang hồ sơ.
  - Xử lý trạng thái trống (`EmptyState`) khi chưa có công thức nào khớp bộ lọc, kèm nút đặt lại và gợi ý tạo công thức mới.
- **Điều hướng đồng bộ**:
  - Cập nhật menu xổ xuống của Header (`Header.tsx`) liên kết trực tiếp tới `/profile`.
  - Cập nhật Sidebar điều hướng trong Dashboard (`layout.tsx`) liên kết tới `/profile`.

## 3. Danh sách file thay đổi và tạo mới

| STT | Đường dẫn file | Thao tác | Mô tả chi tiết |
| :---: | :--- | :---: | :--- |
| 1 | `culinary-blog/src/frontend/src/app/(main)/profile/layout.tsx` | Tạo mới | Cấu hình Metadata SEO cho trang Hồ sơ cá nhân. |
| 2 | `culinary-blog/src/frontend/src/app/(main)/profile/page.tsx` | Tạo mới | Giao diện trang Profile với Hero Banner, Stats Cards, Tab bài viết tích hợp RecipeGrid và Modal xem nhanh. |
| 3 | `culinary-blog/src/frontend/src/components/layout/Header.tsx` | Cập nhật | Điều hướng mục "Hồ sơ cá nhân" từ dropdown menu dẫn về route `/profile`. |
| 4 | `culinary-blog/src/frontend/src/app/(dashboard)/layout.tsx` | Cập nhật | Điều hướng mục "Hồ sơ cá nhân" trên sidebar Dashboard dẫn về route `/profile`. |

## 4. Kiến trúc & Luồng hoạt động

```mermaid
graph TD
    User([Người dùng]) --> Header[Header / Dashboard Link]
    Header --> ProfileRoute[/profile]
    ProfileRoute --> AuthCheck{Kiểm tra Session}
    AuthCheck --> LoadProfile[authService.getProfile]
    AuthCheck --> LoadRecipes[recipeManagementService.getUserRecipes]
    LoadProfile --> HeroBanner[Hero Banner + Chef Badge + Stats Cards]
    LoadRecipes --> RecipeFilter[Bộ lọc Trạng thái & Ô tìm kiếm]
    RecipeFilter --> RecipeGrid[RecipeGrid Component]
    RecipeGrid --> RecipeCard[RecipeCard items + Phân trang]
    RecipeGrid --> QuickView[RecipeDetailModal xem nhanh]
```

## 5. Kết quả kiểm thử

- `npm run build`: 10/10 routes (bao gồm `/profile`) biên dịch thành công 100%.
- Không phát sinh lỗi TypeScript, chuẩn hóa giao diện tương thích mobile và desktop.

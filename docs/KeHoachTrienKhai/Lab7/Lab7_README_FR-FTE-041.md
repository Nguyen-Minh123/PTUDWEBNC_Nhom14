# Lab 7 — FR-FTE-041: Xây dựng Component danh sách thẻ công thức (RecipeCard, RecipeGrid) với Phân trang

## 1. Mục tiêu

Xây dựng component `RecipeGrid` chuẩn hóa và tái sử dụng cho toàn bộ dự án để hiển thị danh sách các thẻ công thức nấu ăn (`RecipeCard`), tích hợp các trạng thái Loading (Skeleton), Trạng thái trống (Empty State) và Thanh điều khiển phân trang (Pagination) thông minh.

## 2. Phạm vi triển khai

- **Tạo mới `RecipeGrid.tsx`**: Lưu trữ tại `culinary-blog/src/frontend/src/components/recipe/RecipeGrid.tsx`.
- **Cấu hình Props linh hoạt**:
  - `recipes: RecipeSummaryDto[]`: Danh sách dữ liệu công thức cần hiển thị.
  - `isLoading?: boolean`: Bật/tắt trạng thái skeleton cards tương thích responsive.
  - `pageNumber`, `pageSize`, `totalCount`, `totalPages`, `hasPreviousPage`, `hasNextPage`: Bộ dữ liệu phân trang chuẩn theo `PagedResult`.
  - `onPageChange?: (page: number) => void`: Callback chuyển đổi trang linh hoạt kèm tự động cuộn lên vị trí danh sách (`scrollTargetId`).
  - `onQuickView?: (recipe: RecipeSummaryDto) => void`: Hỗ trợ mở modal xem nhanh chi tiết món ăn.
  - `columns?: 2 | 3 | 4`: Cấu hình số cột dạng responsive (mặc định 3 cột).
- **Trạng thái Loading**: Kết nối cùng component `RecipeCardSkeleton` để hiển thị hiệu ứng pulse chân thực khi đang tải.
- **Trạng thái Empty**: Kết nối cùng `EmptyState` hiển thị biểu tượng ẩm thực, thông báo thân thiện và nút "Đặt lại bộ lọc tìm kiếm".
- **Nâng cấp `RecipeCard.tsx`**: Thêm nút "Xem nhanh" (Quick View) trực quan khi rê chuột vào ảnh đại diện, tối ưu khả năng tương tác của người dùng.
- **Export module tập trung**: Tạo file `culinary-blog/src/frontend/src/components/recipe/index.ts`.

## 3. Danh sách file thay đổi và tạo mới

| STT | Đường dẫn file | Thao tác | Mô tả chi tiết |
| :---: | :--- | :---: | :--- |
| 1 | `culinary-blog/src/frontend/src/components/recipe/RecipeGrid.tsx` | Tạo mới | Component lưới hiển thị thẻ công thức đa năng tích hợp phân trang, skeleton và empty state. |
| 2 | `culinary-blog/src/frontend/src/components/recipe/RecipeCard.tsx` | Cập nhật | Bổ sung nút Quick View khi hover trên cover image. |
| 3 | `culinary-blog/src/frontend/src/components/recipe/index.ts` | Tạo mới | Xuất khẩu tập trung các component thuộc module recipe. |

## 4. Đặc tả kỹ thuật & Kiến thức áp dụng

- **Smart Ellipsis Pagination**: Tạo dãy trang tự động co dãn dạng `[1, 2, 3, '...', total]` khi số trang lớn, tránh vỡ giao diện trên thiết bị di động.
- **Micro-interactions**: Nút xem nhanh xuất hiện mượt mà bằng hiệu ứng opacity và scale khi người dùng tương tác với thẻ bài viết.
- **A11y (Accessibility)**: Bổ sung các thuộc tính `aria-label`, `aria-current="page"`, `role="status"` cho trình đọc màn hình.
- **Zero-runtime Layout Shifts**: Sử dụng tỷ lệ khung hình `aspect-[16/10]` và kích thước skeleton đồng nhất với card thật.

## 5. Kết quả kiểm thử

- `npx tsc --noEmit`: 0 lỗi type.
- `npm run build`: Biên dịch production thành công 100%.

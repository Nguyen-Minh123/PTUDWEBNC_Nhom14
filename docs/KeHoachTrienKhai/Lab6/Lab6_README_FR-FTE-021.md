# Lab 6 — FR-FTE-021: Loading và Skeleton States

## Mục tiêu

Chuẩn hóa giao diện chờ tải cho thẻ công thức và cửa sổ chi tiết, để người dùng
thấy cấu trúc nội dung đang tải thay vì khoảng trống hoặc một trang chưa hoàn
chỉnh.

## Hiện trạng

- `culinary-blog/src/frontend/src/app/(main)/loading.tsx` đã có khung card
  skeleton nhưng markup được viết trực tiếp và chưa tái sử dụng.
- `RecipeCard` hiển thị dữ liệu khi đã có; chưa có skeleton tương ứng.
- `RecipeDetailModal` nhận summary đã có ngay từ trang chủ và chưa thể hiện
  trạng thái chờ khi lấy dữ liệu chi tiết.
- Hook `useRecipeDetail` đã có truy vấn chi tiết bằng React Query; khi API lỗi,
  hook ghi cảnh báo và trả `null`, nhờ vậy summary ban đầu vẫn có thể dùng làm
  nội dung dự phòng.

## Phạm vi triển khai

- Tạo component `RecipeCardSkeleton` và dùng lại trong loading UI danh sách.
- Tạo component skeleton chi tiết theo bố cục modal: ảnh, tiêu đề, thông số,
  mô tả và vùng bình luận.
- Trong `RecipeDetailModal`, dùng hook `useRecipeDetail` cho recipe đang chọn;
  hiển thị skeleton khi truy vấn chi tiết ban đầu đang tải, rồi dùng dữ liệu
  chi tiết nếu có hoặc summary hiện có khi hook không trả chi tiết.
- Giữ nguyên thao tác đóng modal, nội dung recipe hiện tại và fallback/logging
  theo quy ước của hook.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/frontend/src/components/recipe/RecipeCardSkeleton.tsx` | Tạo skeleton tái sử dụng cho card công thức. |
| `culinary-blog/src/frontend/src/components/recipe/RecipeDetailSkeleton.tsx` | Tạo skeleton nội dung cửa sổ chi tiết. |
| `culinary-blog/src/frontend/src/app/(main)/loading.tsx` | Thay markup card skeleton lặp bằng component dùng chung. |
| `culinary-blog/src/frontend/src/components/recipe/RecipeDetailModal.tsx` | Kết nối trạng thái loading của hook chi tiết và render skeleton phù hợp. |

## Luồng hoạt động

1. Khi route trang chính đang tải, `loading.tsx` hiển thị lưới các
   `RecipeCardSkeleton`, cùng kích thước gần với card thật.
2. Khi người dùng mở modal, `useRecipeDetail` bắt đầu truy vấn theo ID; modal
   hiển thị `RecipeDetailSkeleton` trong lần tải chi tiết đầu.
3. Khi truy vấn có dữ liệu, modal dùng DTO chi tiết; nếu API không có dữ liệu,
   hook ghi cảnh báo và trả `null`, sau đó modal vẫn dùng summary đã chọn.
4. Trạng thái tải danh sách được công bố một lần qua vùng `role="status"`;
   từng card skeleton là phần trình bày được ẩn khỏi cây trợ năng để tránh đọc
   lặp nội dung tải sáu lần. Skeleton modal có nhãn trạng thái riêng.

## Chú thích kiến thức cần trình bày

- Skeleton mô phỏng bố cục thật nhằm giảm cảm giác chờ, khác với spinner không
  thể hiện hình dạng nội dung sắp xuất hiện.
- `useRecipeDetail` là React Query hook: query key gắn ID công thức để cache
  từng chi tiết và `isLoading` biểu thị lần tải chưa có dữ liệu đầu tiên.
- Dữ liệu summary là fallback hữu ích vì trang tìm kiếm đã có sẵn các trường
  chung; modal không cần biến lỗi mạng thành trang trống.
- `aria-busy` và `role="status"` cung cấp ngữ nghĩa trạng thái tải ngoài hiệu
  ứng thị giác.

## Kiểm tra sau triển khai

- Chạy ESLint cho các component, modal và loading route liên quan.
- Chạy production build frontend để xác nhận hook và component client tương
  thích Next.js App Router.
- Kiểm tra modal ở cả trường hợp API trả chi tiết và trường hợp fallback về
  summary; xác nhận nút đóng modal vẫn hoạt động trong lúc tải.

## Công cụ/môi trường

- Chỉ cần frontend Next.js hiện có.
- Không yêu cầu Docker/WSL; truy vấn chi tiết dùng API hiện được gọi bởi hook,
  còn production build không yêu cầu khởi động backend.

## Git

- Nhánh làm việc: `2312634-Huy`; bỏ qua cập nhật `main` lần này theo lựa chọn
  đã xác nhận để không xóa/đảo ngược FR-FTE-019.
- Chỉ commit/push task này sau khi chủ task xem xét và xác nhận.
- Không commit hoặc push lên `main`.

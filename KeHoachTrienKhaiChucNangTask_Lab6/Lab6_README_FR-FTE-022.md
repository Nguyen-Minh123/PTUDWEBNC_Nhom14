# Lab 6 — FR-FTE-022: Toast và EmptyState dùng chung

## Mục tiêu

Tạo các component dùng chung để thông báo kết quả thao tác, lỗi cần người dùng
biết đến và trạng thái danh sách rỗng; thay thế các khối giao diện trùng lặp
hiện có mà không làm mất luồng xử lý nghiệp vụ.

## Hiện trạng

- `stores/useUIStore.ts` đã có Zustand store với `addToast`, `removeToast` và
  các loại `success`, `error`, `info`, `warning`, nhưng chưa có giao diện dùng
  store này.
- Dashboard đang tự giữ một chuỗi toast, đặt timeout riêng và render markup
  thông báo trực tiếp.
- Trang tìm kiếm, dashboard và danh sách bình luận có các khối rỗng khai báo
  riêng, với cấu trúc gần giống nhau.
- Root layout đã bọc các provider phía client, nơi có thể gắn khu vực hiển thị
  toast toàn ứng dụng.

## Phạm vi triển khai

- Tạo `ToastViewport` đọc thông báo từ Zustand store, thể hiện màu/icon theo
  loại, hỗ trợ đóng thủ công và thông báo trợ năng.
- Gắn viewport một lần tại root layout để toast có thể dùng ở mọi route.
- Chuyển dashboard sang `addToast` hiện có, bao gồm thông báo lỗi khi tải hồ
  sơ thất bại và khi lưu hồ sơ không thành công.
- Tạo `EmptyState` nhận biểu tượng, tiêu đề, mô tả và nội dung hành động tùy
  chọn; dùng lại ở trang tìm kiếm, dashboard và danh sách bình luận rỗng.
- Khi reset bộ lọc tìm kiếm, reset cả số trang về 1 để kết quả khớp với bộ lọc
  vừa được xóa.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/frontend/src/components/feedback/ToastViewport.tsx` | Tạo khu vực toast dùng chung, đọc `toasts` và `removeToast` từ Zustand. |
| `culinary-blog/src/frontend/src/components/feedback/EmptyState.tsx` | Tạo trạng thái rỗng có thể tùy biến nội dung và action. |
| `culinary-blog/src/frontend/src/app/layout.tsx` | Gắn một ToastViewport toàn ứng dụng bên trong provider. |
| `culinary-blog/src/frontend/src/app/(dashboard)/dashboard/page.tsx` | Dùng store toast hiện có; hiển thị thành công/lỗi bằng component chung và dùng EmptyState cho danh sách rỗng. |
| `culinary-blog/src/frontend/src/app/(main)/page.tsx` | Dùng EmptyState cho kết quả tìm kiếm rỗng và reset pagination cùng bộ lọc. |
| `culinary-blog/src/frontend/src/components/comments/CommentSection.tsx` | Dùng EmptyState cho trường hợp chưa có bình luận. |

## Thiết kế và luồng hoạt động

1. Màn hình thực hiện `addToast(type, message)`; Zustand giữ toast và tự gỡ
   sau thời gian đã được định nghĩa trong store. Người dùng cũng có thể đóng
   toast sớm bằng nút có nhãn truy cập.
2. `ToastViewport` được mount một lần ở root layout, nên các route không cần
   tự render hay tự quản lý timeout.
3. `EmptyState` là component trình bày nhận nội dung qua props/children; trang
   cha vẫn sở hữu hành động như xóa bộ lọc hoặc tạo công thức mới.
4. Lỗi được đưa ra bằng toast `error` ở thao tác dashboard có thể báo kết quả;
   lỗi render toàn ứng dụng vẫn do Next.js `error.tsx` xử lý và ghi log theo
   cơ chế hiện có.

## Chú thích kiến thức cần trình bày

- Zustand store tách dữ liệu/thao tác toast khỏi component gọi, giúp nhiều
  route phát thông báo mà không truyền props qua nhiều tầng.
- `ToastViewport` chỉ subscribe phần state cần thiết; `role="alert"` dành cho
  lỗi cần thông báo ngay, còn `role="status"` dùng cho thông tin/thành công.
- `EmptyState` dùng `children` cho hành động tùy ngữ cảnh, tránh hard-code link
  hay callback điều hướng bên trong component chung.
- Root layout tồn tại xuyên route nên là vị trí phù hợp để chỉ mount một
  viewport toàn cục.

## Kiểm tra sau triển khai

- Chạy ESLint trên các file feedback và các nơi được tích hợp.
- Chạy production build frontend để xác nhận provider, client component và
  route groups hợp lệ.
- Kiểm tra trạng thái rỗng tìm kiếm/dashboard/comments; kiểm tra toast thành
  công/lỗi có thể được gỡ tự động hoặc đóng thủ công.
- Đảm bảo thao tác reset bộ lọc đưa cả trang kết quả về trang đầu.

## Công cụ/môi trường

- Chỉ dùng Next.js, React và Zustand đã có trong frontend.
- Không cần Docker/WSL cho task này.

## Git

- Nhánh làm việc: `2312634-Huy`; không đồng bộ `main` lần này theo lựa chọn đã
  xác nhận nhằm bảo toàn FR-FTE-019.
- Chỉ commit/push FR-FTE-022 sau khi chủ task xác nhận nộp.
- Không commit hoặc push lên `main`.

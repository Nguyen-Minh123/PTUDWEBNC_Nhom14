# Lab 6 — FR-FTE-020: Pagination dùng chung

## Mục tiêu

Tách điều khiển phân trang hiện có trên trang tìm kiếm công thức thành một
component tái sử dụng, để những màn hình có dữ liệu phân trang dùng chung giao
diện và cách xử lý chuyển trang.

## Phạm vi triển khai

- Tạo component Pagination có props tường minh cho trang hiện tại, tổng số
  trang, trạng thái trang trước/sau và callback khi chọn trang.
- Chuyển phần nút phân trang hiện có trên trang chính sang component mới.
- Giữ nguyên logic truy vấn, lọc, sắp xếp và reset về trang 1 khi thay đổi điều
  kiện tìm kiếm.
- Giữ đúng điều kiện disable hai nút ở đầu/cuối và không hiển thị Pagination
  khi chỉ có một trang.
- Bổ sung ngữ nghĩa truy cập cơ bản cho vùng điều hướng và nút bấm.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/frontend/src/components/search/Pagination.tsx` | Tạo component điều hướng trang độc lập, tái sử dụng được. |
| `culinary-blog/src/frontend/src/app/(main)/page.tsx` | Thay markup phân trang hiện có bằng component Pagination. |

## Thiết kế component

Pagination nhận số trang hiện tại và tổng số trang để hiển thị trạng thái;
`hasPreviousPage`/`hasNextPage` quyết định trạng thái disabled; `onPageChange`
chuyển yêu cầu trang về component cha để state và dữ liệu vẫn do trang gọi quản
lý. Component không tự truy vấn dữ liệu, không giữ state phân trang riêng, và
chỉ nhận trang đích hợp lệ trong giao diện.

Trang chính hiện gọi `searchRecipes` đồng bộ với `page` và `pageSize`, trả
`PagedResult<RecipeSummaryDto>`. Do đó Pagination sẽ dùng metadata có sẵn từ
kết quả này, không thay đổi API/service hoặc hình thức dữ liệu.

## Chú thích kiến thức cần trình bày

- Controlled component nhận giá trị từ component cha và báo sự kiện qua
  callback; một nguồn state duy nhất tránh lệch giữa số trang và dữ liệu.
- `aria-label` trên `nav` giúp công nghệ hỗ trợ nhận biết vùng điều hướng.
- `disabled` ngăn gửi sự kiện ở trang đầu/cuối; kiểm tra trang đích ở callback
  cũng tránh chuyển ra ngoài phạm vi hợp lệ.
- Conditional rendering chỉ hiển thị phân trang khi có nhiều hơn một trang.

## Kiểm tra sau triển khai

- Chạy ESLint trên component mới và trang chính.
- Chạy `npm run build` của frontend để xác nhận TypeScript và route build.
- Rà soát biên: trang đầu không lùi được, trang cuối không tiến được, và các
  nút chọn trang giữ đúng số trang/data hiện tại.

## Git

- Nhánh làm việc: `2312634-Huy`; lần này bỏ qua đồng bộ `main` theo lựa chọn
  của chủ task do cập nhật `main` xóa/đảo ngược file FR-FTE-019 trên nhánh.
- Task được xử lý độc lập; chỉ commit/push FR-FTE-020 sau khi chủ task xác nhận.
- Không commit hoặc push lên `main`.

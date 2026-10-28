# Lab 7 — FR-FTE-037: Tích hợp dữ liệu trang chi tiết công thức

## Mục tiêu

Kết nối trang `/recipes/[id]` với dữ liệu chi tiết từ Backend API. Trang phải dùng đúng công thức theo ID hoặc slug trên URL, hiển thị trạng thái tải và xử lý trường hợp không tìm thấy hoặc API gặp lỗi thay vì âm thầm hiển thị món đầu tiên trong dữ liệu mẫu.

## Hiện trạng

- Route `culinary-blog/src/frontend/src/app/(main)/recipes/[id]/page.tsx` đang tìm công thức trong `INITIAL_RECIPES`, tự gán món đầu tiên nếu ID không khớp và tạo nguyên liệu/bước nấu bằng dữ liệu mẫu.
- `useRecipeDetail` trong `culinary-blog/src/frontend/src/hooks/queries/useRecipes.ts` đã gọi `GET /api/v1/recipes/{idOrSlug}` nhưng bắt mọi lỗi và trả `null`, khiến giao diện không phân biệt được lỗi mạng/server với tài nguyên không tồn tại.
- Backend khai báo endpoint chi tiết theo GUID và endpoint theo slug; cả hai trả `RecipeDetailDto` hoặc HTTP 404.
- `RecipeDetailSkeleton` đã có thể tái sử dụng để hiển thị lúc tải.

## Phạm vi triển khai

- Dùng `useRecipeDetail` làm nguồn dữ liệu cho route chi tiết; bỏ fallback sang `INITIAL_RECIPES[0]` và dữ liệu chi tiết hard-code.
- Hiển thị skeleton trong khi truy vấn; hiển thị trạng thái không tìm thấy khi API trả 404; hiển thị thông báo lỗi có thể thử tải lại khi gặp lỗi mạng/server.
- Dùng dữ liệu trả về cho tiêu đề, breadcrumb, ảnh, thông tin công thức và các component chi tiết hiện có.
- Tạo danh sách công thức liên quan từ danh sách tóm tắt hiện có, loại công thức hiện tại.
- Không triển khai FR-FTE-038, FR-FTE-039 hoặc FR-TST-009 trong task này.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/frontend/src/hooks/queries/useRecipes.ts` | Giữ truy vấn detail và để lỗi ngoài 404 đi lên React Query; 404 được thể hiện như không có dữ liệu. |
| `culinary-blog/src/frontend/src/app/(main)/recipes/[id]/page.tsx` | Đọc `id` từ route, render trạng thái tải/lỗi/không tìm thấy và hiển thị dữ liệu trả về từ API thay cho dữ liệu giả. |
| `KeHoachTrienKhaiChucNangTask_Lab7/Lab7_README_FR-FTE-037.md` | Lưu kế hoạch và ghi chú giải thích task. |

## Luồng dữ liệu dự kiến

1. Next.js cung cấp tham số `[id]` cho trang; giá trị này có thể là GUID hoặc slug.
2. `useRecipeDetail(id)` tạo truy vấn React Query với query key gồm `RECIPE_DETAIL_QUERY_KEY` và giá trị route, gọi API qua `apiClient`.
3. API trả `RecipeDetailDto`: trang chuyển dữ liệu sang hero, thống kê, nguyên liệu, các bước, dinh dưỡng và đánh giá.
4. HTTP 404 được coi là không tìm thấy; lỗi khác được giữ lại để trang hiển thị thông báo lỗi thay vì giả vờ rằng công thức không tồn tại.

## Ghi chú giải thích code

- React Query quản lý trạng thái `isLoading`, `isError`, `data` và cache theo ID/slug; component không cần tự viết `useEffect` để đồng bộ request.
- Query key có cả ID/slug giúp cache tách biệt giữa từng công thức.
- Không dùng phần tử đầu tiên của `INITIAL_RECIPES` làm fallback vì việc đó có thể khiến URL sai hiển thị nhầm nội dung.
- Phân biệt 404 với lỗi kết nối giúp giao diện đưa ra thông tin đúng: không có tài nguyên khác với chưa truy cập được máy chủ.

## Kiểm tra sau triển khai

- Chạy ESLint cho page và hook đã sửa.
- Chạy production build frontend để kiểm tra TypeScript, route và component.
- Khi Backend khả dụng, kiểm tra URL bằng ID hợp lệ, slug hợp lệ và ID/slug không tồn tại; kiểm tra lỗi khi API không truy cập được.
- Đảm bảo không thay đổi luồng hiển thị thành phần của FR-FTE-038 và không triển khai các task Lab 7 còn lại.

## Công cụ/môi trường

- Dùng Next.js, React Query, Axios và component hiện có trong frontend; không cần thêm package.
- Kiểm thử API end-to-end cần Backend chạy và có dữ liệu công thức; không bắt buộc Docker/WSL cho kiểm tra lint/build frontend.

## Git

- Nhánh làm việc: `2312634-Huy`; đã fast-forward nhánh này theo `origin/main`, không thao tác ghi lên `main`.
- Chỉ làm FR-FTE-037 trong lượt này; task Lab 7 khác để sau.
- Chỉ commit/push phần FR-FTE-037 sau khi chủ task xác nhận nộp.

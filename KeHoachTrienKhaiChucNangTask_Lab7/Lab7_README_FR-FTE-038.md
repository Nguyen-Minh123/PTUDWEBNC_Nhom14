# Lab 7 — FR-FTE-038: Hiển thị nguyên liệu, các bước và dinh dưỡng

## Mục tiêu

Hiển thị nguyên liệu, hướng dẫn từng bước và sáu chỉ số dinh dưỡng bằng dữ liệu chi tiết do API trả về. Nội dung cần đúng thứ tự, không tự sinh dữ liệu mẫu khi API không có thông tin.

## Hiện trạng

- Trang `culinary-blog/src/frontend/src/app/(main)/recipes/[id]/page.tsx` đã truyền `ingredients`, `steps` và `nutrition` từ `RecipeDetailDto` sang ba component chi tiết.
- DTO nguyên liệu khớp với response backend ở các trường `id`, `name`, `quantity`, `unit` và `orderIndex`; backend còn trả `notes`, hiện frontend chưa thể hiện.
- Backend trả bước nấu theo `title`, `description`, `timerMinutes` và `imageUrl`, nhưng frontend `RecipeStepDto`/`RecipeSteps` lại đọc `instruction`; vì vậy nội dung hướng dẫn API có thể bị trống.
- `RecipeNutrition` đã hiển thị calories, protein, carbohydrates, fat, fiber và sodium; trường thiếu được báo là “Chưa có dữ liệu”, không thay bằng số liệu giả.

## Phạm vi triển khai

- Đồng bộ kiểu dữ liệu bước nấu với contract backend: `title`, `description`, `timerMinutes` và `imageUrl`.
- Hiển thị tiêu đề, nội dung, thời lượng nếu có và ảnh minh họa của từng bước; sắp xếp theo `stepNumber`.
- Bổ sung `notes` tùy chọn cho nguyên liệu, hiển thị ghi chú nếu backend có trả; sắp xếp theo `orderIndex`.
- Có nội dung trạng thái rỗng cho danh sách nguyên liệu hoặc bước nếu API trả mảng rỗng.
- Giữ nguyên component dinh dưỡng đang đọc dữ liệu thật và hiển thị rõ trường chưa có dữ liệu.
- Không làm FR-FTE-039 (phóng to ảnh/đánh giá-bình luận) hoặc FR-TST-009 trong task này.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/frontend/src/types/step.dto.ts` | Cập nhật `RecipeStepDto` theo response backend. |
| `culinary-blog/src/frontend/src/types/ingredient.dto.ts` | Thêm `notes` tùy chọn cho nguyên liệu response. |
| `culinary-blog/src/frontend/src/components/recipe-detail/RecipeSteps.tsx` | Render đúng title/description/timer, sắp xếp bước và thể hiện danh sách rỗng. |
| `culinary-blog/src/frontend/src/components/recipe-detail/RecipeIngredients.tsx` | Sắp xếp nguyên liệu, hiện notes và thể hiện danh sách rỗng. |
| `KeHoachTrienKhaiChucNangTask_Lab7/Lab7_README_FR-FTE-038.md` | Ghi kế hoạch, contract dữ liệu và cách kiểm tra task. |

## Luồng dữ liệu

1. `useRecipeDetail` lấy `RecipeDetailDto` từ API; route đã truyền ba phần dữ liệu sang component tương ứng.
2. `RecipeIngredients` sắp xếp theo `orderIndex`, hiển thị lượng, đơn vị và ghi chú; trạng thái đã chọn vẫn là state cục bộ của giao diện.
3. `RecipeSteps` sắp xếp theo `stepNumber`, hiển thị `title`, `description`, thời lượng và ảnh từ response.
4. `RecipeNutrition` nhận object nutrition có thể null; từng trường null/undefined hiện “Chưa có dữ liệu”, không dùng giá trị mẫu.

## Ghi chú giải thích code

- DTO phản ánh chính xác tên trường JSON của backend để TypeScript phát hiện contract mismatch thay vì render chuỗi `undefined`.
- Sắp xếp bản sao mảng trước khi render giúp giao diện ổn định mà không mutate dữ liệu/cache React Query.
- `notes`, ảnh bước và thời lượng đều là tùy chọn; chỉ render phần tương ứng khi API cung cấp.
- Dữ liệu dinh dưỡng thiếu không đồng nghĩa giá trị bằng 0, vì vậy component cần phân biệt null/undefined với số 0.

## Kiểm tra sau triển khai

- Chạy ESLint cho DTO và hai component được sửa.
- Chạy production build frontend để kiểm tra kiểu dữ liệu và route.
- Khi backend có dữ liệu, kiểm tra một công thức có đầy đủ thông tin và một công thức thiếu optional fields; xác nhận thứ tự nguyên liệu/bước và giá trị dinh dưỡng.
- Không thay đổi trạng thái hoặc file chưa commit có sẵn trong `CulinaryBlog.Domain/Entities/BaseEntity.cs`.

## Công cụ/môi trường

- Dùng React, TypeScript và component hiện có; không cần cài thêm package.
- Smoke test với dữ liệu thật cần backend/API và database chạy; không bắt buộc Docker/WSL cho lint/build.

## Git

- Nhánh làm việc: `2312634-Huy`; `origin/main` hiện không có commit mới cần tích hợp, nên không merge nhánh nào.
- Tôn trọng thay đổi chưa commit hiện có trong `CulinaryBlog.Domain/Entities/BaseEntity.cs`.
- Chỉ làm FR-FTE-038; chỉ commit/push task này sau khi chủ task xác nhận nộp.

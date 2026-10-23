# Lab 7 — FR-FTE-039: Xem ảnh phóng to và đánh giá/bình luận

## Mục tiêu

Cho phép người xem mở ảnh công thức ở kích thước lớn và sử dụng giao diện đánh giá, bình luận cơ bản ngay trên trang chi tiết công thức.

## Hiện trạng

- `RecipeHero` đang hiển thị ảnh bìa tĩnh, chưa có thao tác mở ảnh lớn; API detail đã trả danh sách `images` gồm ảnh gốc, medium, thumbnail, alt text và cờ ảnh chính.
- `RecipeReviews` hiển thị danh sách review hard-code và chỉ lưu review mới trong state của component.
- `CommentSection` đã có form chọn sao, gửi bình luận, danh sách bình luận, lượt thích và trạng thái rỗng; component dùng `commentService` hiện tại để giữ dữ liệu trong bộ nhớ phiên chạy.
- Trang detail đang gắn `RecipeReviews`; `CommentSection` hiện chỉ được dùng ở modal xem nhanh.
- Next Image đã cho phép các nguồn hiện có gồm Unsplash, MinIO localhost và API production.

## Phạm vi triển khai

- Thêm nút mở ảnh bìa/ảnh công thức trong `RecipeHero`; mở dialog phóng to, hiển thị alt text, hỗ trợ đóng bằng Escape/backdrop và điều hướng ảnh khi có nhiều ảnh.
- Dùng ảnh API theo thứ tự và ưu tiên ảnh chính; dùng ảnh bìa hoặc ảnh mặc định làm fallback khi danh sách ảnh trống.
- Thay `RecipeReviews` bằng `CommentSection` trên trang detail, truyền ID và tên món để gắn bình luận đúng công thức.
- Giữ nguyên `commentService` hiện hữu; phần bình luận này là giao diện cơ bản và dữ liệu đang ở bộ nhớ client, chưa phải lưu trữ bền vững trên backend.
- Không chỉnh sửa/xóa component `RecipeReviews.tsx` hoặc các file ngoài phạm vi; không làm FR-TST-009.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/frontend/src/components/recipe-detail/RecipeHero.tsx` | Dựng danh sách ảnh, mở lightbox và điều hướng ảnh trong dialog. |
| `culinary-blog/src/frontend/src/app/(main)/recipes/[id]/page.tsx` | Dùng `CommentSection` hiện có thay cho danh sách review mẫu. |
| `KeHoachTrienKhaiChucNangTask_Lab7/Lab7_README_FR-FTE-039.md` | Ghi kế hoạch, hành vi và giới hạn lưu trữ bình luận. |

## Luồng hoạt động

1. Trang detail truyền `RecipeDetailDto` đầy đủ sang `RecipeHero`.
2. `RecipeHero` ưu tiên ảnh `isPrimary`, sau đó theo `orderIndex`; người dùng bấm ảnh để mở dialog phóng lớn, dùng nút trước/sau để đổi ảnh và Escape/backdrop/nút đóng để thoát.
3. Trang detail truyền `fullRecipe.id` và `fullRecipe.title` cho `CommentSection`.
4. `CommentSection` tải bình luận theo recipe ID, tính điểm trung bình từ các bình luận hiện có; khi gửi, thêm bình luận và cập nhật giao diện ngay qua `commentService`.

## Ghi chú giải thích code

- Dùng `Dialog` hiện có để giữ cách đóng và lớp phủ thống nhất với component UI trong dự án.
- Chỉ tạo danh sách ảnh mới cho trình bày; không mutate `recipe.images` được React Query cache.
- `isPrimary` và `orderIndex` đảm bảo ảnh đại diện ổn định; fallback tránh trang mất ảnh khi API chưa có gallery.
- Tái sử dụng `CommentSection` giúp tránh nhân đôi form, state đánh giá, logic like và tính trung bình.
- `commentService` hiện lưu trong bộ nhớ ứng dụng; reload trang có thể làm mất bình luận do chưa kết nối API/persistence.

## Kiểm tra sau triển khai

- Chạy ESLint trên `RecipeHero.tsx` và trang detail.
- Chạy production build frontend.
- Kiểm tra một công thức có nhiều ảnh, một công thức chỉ có ảnh bìa và một công thức không có ảnh.
- Thử mở/đóng dialog bằng nút, backdrop, Escape; thử đổi ảnh nếu gallery có nhiều ảnh.
- Thử gửi bình luận, đổi rating, like bình luận và xác nhận chỉ dữ liệu đúng recipe được hiển thị.

## Công cụ/môi trường

- Dùng React, Next Image, Dialog, Lucide và `commentService` hiện có; không cần package mới.
- Kiểm tra giao diện cần chạy frontend; dữ liệu bình luận cơ bản dùng được cục bộ. Kiểm tra ảnh API cần endpoint/backend có dữ liệu ảnh.
- Không bắt buộc Docker/WSL cho lint/build frontend.

## Git

- Nhánh làm việc: `2312634-Huy`; không merge `main` (origin/main hiện không có commit mới) hoặc nhánh nào khác.
- Giữ nguyên thay đổi chưa commit trong `CulinaryBlog.Domain/Entities/BaseEntity.cs`.
- Chỉ làm FR-FTE-039; commit/push task này sau khi chủ task xác nhận nộp.

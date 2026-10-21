# Lab 6 — FR-FTE-019: Header và Footer dùng chung

## Mục tiêu

Tách phần điều hướng đầu trang và chân trang thành các component có thể tái sử
dụng, thống nhất giao diện giữa trang chính và trang đăng nhập, đồng thời giữ
nguyên các chức năng điều hướng và trạng thái đăng nhập hiện có.

## Phạm vi triển khai

- Tách component `Header` từ điều hướng hiện tại và lưu tại
  `culinary-blog/src/frontend/src/components/layout/Header.tsx`.
- Tạo component `Footer` dùng chung; hỗ trợ bố cục gọn cho nhóm trang xác thực
  và bố cục đầy đủ cho trang chính.
- Đưa `Header` và `Footer` vào các layout phù hợp để những trang cùng nhóm
  được dùng chung, thay vì khai báo lặp lại trong từng trang.
- Xóa phần Header/Footer được khai báo trực tiếp trong trang chủ sau khi đã
  chuyển trách nhiệm hiển thị sang layout.
- Giữ menu phiên đăng nhập, liên kết hiện có, nội dung chân trang chính và bố
  cục tối giản của trang đăng nhập.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/frontend/src/components/layout/Header.tsx` | Tái sử dụng điều hướng hiện tại thành `Header`, giữ menu phiên đăng nhập và thêm chế độ hiển thị phù hợp cho trang xác thực. |
| `culinary-blog/src/frontend/src/components/layout/Footer.tsx` | Tạo Footer dùng chung với chế độ đầy đủ/gọn. |
| `culinary-blog/src/frontend/src/app/(main)/layout.tsx` | Hiển thị Header và Footer bao quanh nội dung của nhóm trang chính. |
| `culinary-blog/src/frontend/src/app/(main)/page.tsx` | Bỏ các Header/Footer khai báo trực tiếp, giữ nguyên nội dung nghiệp vụ trang chủ. |
| `culinary-blog/src/frontend/src/app/(main)/loading.tsx` | Bỏ skeleton Header trùng lặp vì Header thật luôn nằm trong layout. |
| `culinary-blog/src/frontend/src/app/(auth)/layout.tsx` | Dùng Header chế độ xác thực và Footer chế độ gọn. |
| `culinary-blog/src/frontend/src/app/(dashboard)/layout.tsx` | Dùng Header và Footer chung cho các trang thuộc nhóm dashboard. |
| `culinary-blog/src/frontend/src/app/(dashboard)/dashboard/page.tsx` | Bỏ Header lặp trong trang, giữ nguyên nội dung dashboard. |
| `culinary-blog/src/frontend/src/app/(dashboard)/recipes/new/page.tsx` | Bỏ Header lặp trong trang, giữ nguyên biểu mẫu tạo công thức. |

## Ý tưởng và luồng hoạt động

1. `Header` tiếp tục đọc phiên đăng nhập bằng `useSession`; người dùng đã đăng
   nhập vẫn có menu dashboard, hồ sơ và đăng xuất, còn khách vẫn thấy liên kết
   đăng nhập.
2. Chế độ xác thực của `Header` chỉ hiển thị thương hiệu và đường quay lại
   trang chủ, phù hợp với màn hình đăng nhập.
3. `Footer` dùng một component duy nhất, với chế độ mặc định đầy đủ cho trang
   chính và chế độ gọn cho màn hình xác thực.
4. Layout của từng nhóm trang chịu trách nhiệm lắp ghép các component chung;
   từng trang chỉ tập trung vào nội dung của nó. Các layout xác thực dùng
   Header/Footer dạng gọn để giữ trải nghiệm riêng của màn hình đăng nhập.

## Chú thích kiến thức cần trình bày

- `use client` cần thiết ở `Header` vì component dùng React state và hook phiên
  đăng nhập phía trình duyệt.
- Layout của Next.js App Router có thể dùng chung cấu trúc cho toàn bộ các
  trang trong cùng route group.
- Prop chế độ cho phép tái sử dụng một component với bố cục phù hợp từng ngữ
  cảnh, thay vì nhân đôi markup.
- Phần tử `header`, `nav`, `main` và `footer` tạo cấu trúc ngữ nghĩa, có lợi
  cho trình đọc màn hình và khả năng bảo trì.

## Kiểm tra sau triển khai

- Chạy ESLint của frontend để phát hiện lỗi TypeScript/JSX và quy tắc lint.
- Chạy build production Next.js để xác nhận route group và server/client
  component được lắp ghép hợp lệ.
- Kiểm tra diff để bảo đảm không ảnh hưởng tới màn hình dashboard hoặc luồng
  đăng nhập/đăng xuất.

## Git

- Nhánh làm việc: `2312634-Huy`.
- Chỉ push các thay đổi sau khi chủ task xem xét và xác nhận nộp phần
  FR-FTE-019.
- Không commit hoặc push lên `main`.

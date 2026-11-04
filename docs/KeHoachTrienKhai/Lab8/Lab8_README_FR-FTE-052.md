# Lab 8 — FR-FTE-052: Hoàn thiện các tính năng tương tác theo SRS: Chế độ nấu ăn (Cooking Mode) & Khẩu phần (Servings)

## 1. Mục tiêu

Hiện thực hóa hai tính năng tương tác người dùng cao cấp theo yêu cầu đặc tả SRS trên trang chi tiết công thức (`/recipes/[id]`):
1. **Bộ tính khẩu phần ăn động (`Servings Calculator`)**: Cho phép người dùng tăng/giảm số lượng người ăn và tự động tính toán lại định lượng từng nguyên liệu theo tỷ lệ chuẩn xác.
2. **Chế độ nấu ăn toàn màn hình (`Cooking Focus Mode`)**: Môi trường nấu ăn chuyên dụng không gây xao nhãng với chữ lớn dễ đọc từ xa, đồng hồ đếm ngược thông minh kèm chuông báo âm thanh, thanh tiến độ từng bước, danh sách nguyên liệu thu gọn và công nghệ giữ màn hình luôn sáng (Screen Wake Lock API).

## 2. Phạm vi triển khai

- **Bộ tính khẩu phần (`Servings Calculator`) tại `RecipeIngredients.tsx`**:
  - Hỗ trợ nút tăng/giảm số lượng người ăn với giới hạn từ 1 đến 100 phần ăn.
  - Tự động nhân tỷ lệ `(khẩu phần hiện tại / khẩu phần gốc) * định lượng` cho toàn bộ danh sách nguyên liệu.
  - Làm tròn số thập phân thông minh giúp nguyên liệu hiển thị tự nhiên.
  - Nút *"Đặt lại"* khôi phục khẩu phần nguyên bản của đầu bếp chỉ với 1 cú click.
- **Linh kiện Chế độ nấu ăn toàn màn hình `CookingModeModal.tsx`**:
  - Giao diện tối màu (`stone-950`) có độ tương phản cao, phông chữ lớn giúp đầu bếp theo dõi rõ ràng khi đang đứng cách xa màn hình trong gian bếp.
  - Điều hướng tiến/lùi bước nấu dạng Stepper với thanh tiến độ thời gian thực.
  - Hỗ trợ phím tắt: Mũi tên trái/phải để chuyển bước, phím cách (Space) để bật/tắt đồng hồ đếm ngược, phím Esc để thoát.
  - **Tích hợp Đồng hồ đếm ngược thông minh (Timer)**: Tự động nạp thời gian ước tính của từng bước (nếu có), hỗ trợ Bắt đầu, Tạm dừng, Đặt lại.
  - **Chuông báo hoàn tất bằng Web Audio API**: Tự động phát âm thanh chuông 3 nốt nhẹ nhàng khi đồng hồ đếm về 00:00 mà không cần phụ thuộc vào tệp mp3 ngoại vi.
  - **Ngăn tắt màn hình (Screen Wake Lock API)**: Tự động yêu cầu `navigator.wakeLock.request('screen')` để màn hình luôn bật sáng trong suốt quá trình nấu ăn, chống tắt màn hình khi tay người dùng đang dính dầu mỡ hoặc bận thao tác.
  - **Khay xem nhanh nguyên liệu (Ingredients Drawer)**: Khay trượt bên cạnh cho phép xem lại định lượng nguyên liệu theo đúng khẩu phần đã chọn mà không cần thoát khỏi chế độ nấu.
- **Kích hoạt Cooking Mode trên Trang Chi tiết**:
  - Nút *"Bắt đầu nấu"* nổi bật trên `RecipeHero`.
  - Nút *"Chế độ nấu ăn (Focus Mode)"* trên tiêu đề thẻ `RecipeSteps`.
  - Thẻ kích hoạt nhanh trên thanh sidebar mẹo vặt của trang chi tiết.

## 3. Danh sách file thay đổi và tạo mới

| STT | Đường dẫn file | Thao tác | Mô tả chi tiết |
| :---: | :--- | :---: | :--- |
| 1 | `culinary-blog/src/frontend/src/components/recipe-detail/CookingModeModal.tsx` | Tạo mới | Toàn bộ giao diện và logic Chế độ nấu ăn toàn màn hình, Timer, Web Audio chuông báo và Screen Wake Lock. |
| 2 | `culinary-blog/src/frontend/src/components/recipe-detail/RecipeIngredients.tsx` | Cập nhật | Nâng cấp bộ tính toán khẩu phần ăn động, tỷ lệ định lượng nguyên liệu và nút hoàn tác. |
| 3 | `culinary-blog/src/frontend/src/components/recipe-detail/RecipeHero.tsx` | Cập nhật | Bổ sung nút Bắt đầu nấu ăn (Cooking Mode). |
| 4 | `culinary-blog/src/frontend/src/components/recipe-detail/RecipeSteps.tsx` | Cập nhật | Bổ sung nút chuyển sang Chế độ nấu ăn (Focus Mode). |
| 5 | `culinary-blog/src/frontend/src/app/(main)/recipes/[id]/page.tsx` | Cập nhật | Kết nối trạng thái Cooking Mode, đồng bộ số lượng khẩu phần ăn giữa các linh kiện. |

## 4. Kiểm chứng kết quả

- Thử nghiệm chức năng tăng/giảm khẩu phần ăn: các giá trị định lượng nguyên liệu được tính toán và làm tròn chính xác.
- Kiểm tra Cooking Mode: Chuyển bước, hẹn giờ đếm ngược, phát âm thanh Web Audio và phím tắt hoạt động mượt mà.


# Lab 3 — FR-DOM-006: Định nghĩa DuplicateStepNumberException

## Mục tiêu

Báo lỗi domain có kiểu cụ thể khi một recipe nhận thêm bước nấu có số thứ tự đã
tồn tại; lưu lại số thứ tự trùng để test và tầng gọi có thể đọc được nguyên nhân.

## Hiện trạng đã đối chiếu

- Exception nằm ở
  `culinary-blog/src/backend/src/CulinaryBlog.Domain/Common/DuplicateStepNumberException.cs`.
- Constructor nhận `stepNumber`, đưa số đó vào message và lưu tại property
  `StepNumber`.
- `Recipe.AddStep` kiểm tra danh sách bước hiện tại trước khi thêm; nếu trùng
  thì ném `DuplicateStepNumberException`.
- `CulinaryBlog.UnitTests/UnitTest1.cs` hiện có kiểm tra exception chứa số bước.
  Tuy nhiên `CulinaryBlog.UnitTests/CulinaryBlog.UnitTests.csproj` loại
  `UnitTest1.cs` khỏi compile nên assertion đó chưa được chạy trong project này.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Common/DuplicateStepNumberException.cs` | Khai báo exception chuyên biệt, message và property lưu số bước bị trùng. |
| `culinary-blog/src/backend/src/CulinaryBlog.Domain/Entities/Recipe.cs` | Kiểm tra trùng `StepNumber` trước khi thêm vào collection nội bộ. |
| `culinary-blog/src/backend/tests/CulinaryBlog.UnitTests/UnitTest1.cs` và `CulinaryBlog.UnitTests.csproj` | Kiểm thử trường hợp số bước lặp và giá trị `StepNumber`; bảo đảm file test được compile/chạy. |

## Ý tưởng triển khai và giải thích code

1. `Recipe` là aggregate root quản lý collection bước nấu; việc xác thực đặt
   tại `AddStep` bảo đảm mọi nơi thêm bước đều đi qua cùng một rule.
2. Kiểm tra `step` null và bước có `RecipeId` khác recipe hiện tại trước khi
   thay đổi collection.
3. Dò collection theo `StepNumber`. Nếu đã có bước cùng số, dừng ngay bằng
   exception có kiểu rõ ràng và mang theo số gây xung đột.
4. Chỉ thêm `step` vào collection khi các điều kiện đều hợp lệ; tránh trạng thái
   aggregate bị cập nhật dở dang.
5. Unit test xác nhận exception đúng kiểu và property `StepNumber` bằng giá trị
   trùng để bảo vệ cả hành vi lẫn dữ liệu chẩn đoán.

## Kiểm tra cần chạy

- Chạy test domain cho `Recipe.AddStep`.
- Kiểm tra riêng trường hợp step null, step thuộc recipe khác, số thứ tự mới và
  số thứ tự trùng.
- Chạy build backend để phát hiện lỗi namespace/tham chiếu.

## Câu hỏi có thể được hỏi

- **Vì sao rule nằm trong `Recipe.AddStep`?** Recipe quản lý vòng đời và tính
  hợp lệ của các bước thuộc aggregate của nó.
- **Vì sao exception giữ `StepNumber` thành property?** Caller/test có thể đọc
  dữ liệu có cấu trúc thay vì phải phân tích chuỗi message.
- **Tại sao kiểm tra trước khi thêm?** Đảm bảo collection không nhận trạng thái
  trùng nếu thao tác bị từ chối.

## Trạng thái

- [x] Đã tìm thấy exception, nơi phát sinh và unit test liên quan.
- [ ] Đưa assertion trong `UnitTest1.cs` vào test project được compile, rồi chạy
  unit test domain để xác nhận các nhánh hợp lệ/không hợp lệ.

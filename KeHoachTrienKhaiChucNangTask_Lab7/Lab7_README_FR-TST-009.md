# Lab 7 — FR-TST-009: Integration tests cho Auth, Search và Recipe Detail

## Mục tiêu

Bổ sung kiểm thử HTTP integration cho các luồng xác thực cơ bản, tìm kiếm và xem chi tiết công thức, đồng thời tận dụng test host và fixture hiện có để không phụ thuộc database khi chạy các test được thêm.

## Hiện trạng

- `RecipeAuthorizationMatrixTests` đã kiểm tra anonymous có thể gọi list/detail/search và người dùng không đăng nhập không thể thực hiện các mutation được bảo vệ.
- `RecipeEndpointValidationTests` đã kiểm tra validation query, 404 theo ID/slug và problem-details response.
- `RecipeNutritionContractTests` đã kiểm tra sáu trường dinh dưỡng của response detail.
- Frontend chưa có script/test framework Playwright; backend integration test dùng `WebApplicationFactory` cùng stub in-memory.
- Các endpoint login/register trả HTTP 400 sớm khi email/password rỗng; nhánh này có thể kiểm tra qua HTTP mà không gọi database hoặc handler xác thực.

## Phạm vi triển khai

- Bổ sung test HTTP cho payload đăng nhập/đăng ký thiếu trường bắt buộc.
- Bổ sung kiểm tra contract của response tìm kiếm hợp lệ: status, danh sách và metadata phân trang.
- Bổ sung kiểm tra response detail theo ID gồm nhận diện đúng công thức và các trường quan trọng; tái sử dụng fixture có sẵn.
- Giữ các test authorization, 404 và nutrition đang có; tránh kiểm tra trùng chức năng.
- Sửa trong test file hiện có, không tạo test source file mới và không thêm package.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/RecipeEndpointValidationTests.cs` | Thêm integration tests cho validation Auth, Search response và Recipe Detail response. |
| `KeHoachTrienKhaiChucNangTask_Lab7/Lab7_README_FR-TST-009.md` | Ghi phạm vi, cách tái sử dụng test fixture và lệnh xác minh. |

## Luồng kiểm thử

1. `WebApplicationFactory` dựng API pipeline trong môi trường `Testing`, thay các collaborator bằng fixture/stub đã có.
2. POST login/register với body thiếu email/password phải trả 400 trước khi gửi command.
3. GET search hợp lệ phải trả 200 và JSON chứa `items` cùng metadata trang.
4. GET detail theo ID fixture phải trả 200, ID đúng và nested collections/nutrition phù hợp với DTO hiện tại.
5. Test hiện hữu tiếp tục xác nhận quyền truy cập công khai, quyền mutation và trường hợp không tìm thấy.

## Ghi chú giải thích test

- Dùng HTTP client của `WebApplicationFactory` để chạy qua routing, binding, middleware và endpoint thật; stub chỉ thay database/handler ngoài phạm vi endpoint.
- Kiểm tra JSON theo tên property camelCase của API để giữ contract tương thích với frontend.
- Các test auth trong task này kiểm tra validation request; hành vi authorization của endpoint recipe đã có trong `RecipeAuthorizationMatrixTests`.
- Không dùng `UnitTest1` cho các test này vì file đó có test cần PostgreSQL đang chạy.

## Kiểm tra sau triển khai

- Chạy đúng project integration tests, lọc `RecipeEndpointValidationTests` trước.
- Chạy toàn bộ `CulinaryBlog.IntegrationTests` nếu môi trường PostgreSQL cần cho các test còn lại đã sẵn sàng.
- Kiểm tra diff/status để không đưa `CulinaryBlog.Domain/Entities/BaseEntity.cs` đang có chỉnh sửa chưa commit vào commit task.

## Công cụ/môi trường

- .NET SDK và các package đã có trong `CulinaryBlog.IntegrationTests.csproj`.
- Các test mới dự kiến không cần Docker/WSL/PostgreSQL; một số integration tests cũ trong project cần PostgreSQL.
- Không cài Playwright vì dự án chưa có test runner frontend và task có thể kiểm tra các HTTP contract ở integration layer.

## Git

- Nhánh làm việc: `2312634-Huy`; không merge nhánh nào khác. `origin/main` không có commit mới để tích hợp.
- Giữ nguyên thay đổi chưa commit trong `CulinaryBlog.Domain/Entities/BaseEntity.cs`.
- Chỉ làm FR-TST-009; commit/push riêng task này sau khi chủ task xác nhận nộp.

# Lab 2 — FR-TST-001: Kiểm thử API nâng cao

## Mục tiêu

Tăng độ tin cậy của API recipe bằng kiểm thử qua HTTP pipeline thật: xác nhận
status code, response contract, validation, phân trang/tìm kiếm và quyền truy
cập theo các endpoint đang được triển khai. Test phải chạy lặp lại được, không
phụ thuộc PostgreSQL thật nếu test đang dùng stub/in-memory.

## Hiện trạng đã đối chiếu

- Endpoint recipe được map ở
  `culinary-blog/src/backend/src/CulinaryBlog.API/Endpoints/RecipeEndpoints.cs`:
  list, detail theo ID/slug, create/update, publish/archive/delete và search.
- Có `RecipeAuthorizationMatrixTests` dùng `WebApplicationFactory<Program>`,
  `TestAuthHandler` và test doubles để kiểm tra anonymous/owner/other user/admin.
- Đã thêm `RecipeEndpointValidationTests` cho query sai, problem details và
  404; ma trận quyền hiện có tiếp tục cover các trường hợp đọc/ghi theo danh
  tính.
- Project integration tests tham chiếu API và `Microsoft.AspNetCore.Mvc.Testing`.
- Test tích hợp khác trong `UnitTest1.cs` kết nối PostgreSQL thật; cần tách rõ
  test HTTP không phụ thuộc DB với test yêu cầu PostgreSQL.
- Build test project hiện chưa xác nhận được vì `RecipeDataSeeder.cs` đang có
  thay đổi cục bộ không khớp constructor/API của Domain.
- Test source compile được với project references đã có sẵn, nhưng runtime
  validation test dùng output Infrastructure cũ bị `TypeLoadException`
  (`RedisCacheService.SetAsync` chưa khớp interface); cần rebuild sạch các
  references sau khi seeder được đồng bộ.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/RecipeAuthorizationMatrixTests.cs` | Duy trì ma trận HTTP authorization anonymous/owner/other/Admin hiện có. |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/RecipeEndpointValidationTests.cs` | Kiểm tra validation problem cho page/pageSize/status/search và 404 cho recipe thiếu. |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/CulinaryBlog.IntegrationTests.csproj` | Không đổi; test dùng WebApplicationFactory và package đã có. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Endpoints/RecipeEndpoints.cs` | Endpoint validation hiện hành được kiểm tra qua HTTP; không sửa khi contract đáp ứng assertion. |

## Kịch bản kiểm thử đề xuất

- Danh sách trả 200 và metadata phân trang; `page < 1`, `pageSize < 1` hoặc
  `pageSize > 100` trả validation problem.
- Lọc status hợp lệ được chấp nhận; status không thuộc Draft/Published/Archived
  trả lỗi validation.
- Search từ khóa hợp lệ trả 200; query rỗng trả validation problem; slug/id
  không tồn tại trả 404.
- Anonymous được đọc endpoint public; endpoint mutation trả 401 khi chưa xác
  thực; owner được phép; user khác bị 403; Admin có quyền theo policy hiện hành.
- Create/update xác nhận response status và JSON contract, trong đó `authorId`
  được lấy từ identity server thay vì tin dữ liệu client.
- Publish/archive/delete xác nhận status đúng với kết quả handler và trạng
  thái resource.

## Ý tưởng triển khai

1. Dùng `WebApplicationFactory<Program>` để gửi request thật qua routing,
   middleware, authorization và endpoint binding; thay repository/MediatR bằng
   test doubles khi mục tiêu không phải kiểm tra database.
2. Dùng test case có dữ liệu định danh ổn định để assertion không phụ thuộc
   thời điểm hoặc thứ tự chạy.
3. Assert cả status và phần JSON quan trọng (problem details, pagination,
   recipe id/author); chỉ assert status có thể bỏ sót sai response shape.
4. Dùng `[Theory]` với `TheoryData` cho các ma trận tương tự, nhưng mỗi case
   cần tên/mục đích rõ để lỗi dễ chẩn đoán.
5. Đánh dấu/tổ chức riêng các test PostgreSQL cần connection string; không làm
   test HTTP thuần thất bại chỉ vì máy không chạy database.

## Kiểm tra sau triển khai

- Đã thêm test HTTP độc lập database cho validation và 404.
- Đã compile integration test sources với project references hiện có.
- Chưa xác nhận runtime integration tests do assembly mismatch; standard build
  bị chặn bởi lỗi compile ở seeder cục bộ.
- Chạy các nhóm test PostgreSQL với connection string/database đã cấu hình;
  ghi rõ nếu môi trường local chưa sẵn sàng.
- Kiểm tra build và test filter để xác nhận các ca được yêu cầu thực sự chạy.
- Xác nhận assertions không dựa vào thứ tự ngẫu nhiên hay response stub không
  phản ánh endpoint contract.

## Giải thích code để trình bày

- `WebApplicationFactory` dựng API trong `TestServer`, nên test gửi HTTP request
  thật mà không mở cổng network.
- `ConfigureTestServices` thay một số dependency bằng stub để cô lập hành vi
  HTTP; đây không thay thế test repository/database.
- `TestAuthHandler` tạo claims dựa trên header test; không dùng cơ chế này ở
  production.
- `[Theory]` chạy cùng một quy tắc với nhiều bộ input; `MemberData` giúp biểu
  diễn ma trận status/operation rõ ràng.
- Test cần tránh kiểm tra implementation detail; tập trung vào observable
  contract: HTTP status, JSON và authorization outcome.

## Trạng thái

- [x] Đã xác định endpoint surface/test host, thêm ca validation và not-found.
- [x] Test sources compile với output references sẵn có.
- [ ] Rebuild/run integration project đồng bộ sau khi lỗi compile ở seeder cục bộ được xử lý.

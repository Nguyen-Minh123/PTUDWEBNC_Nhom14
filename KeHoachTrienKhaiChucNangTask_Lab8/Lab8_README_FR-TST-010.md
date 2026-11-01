# Lab 8 - Kế hoạch triển khai FR-TST-010

## 1. Nhiệm vụ

**FR-TST-010 - Viết kịch bản kiểm thử tự động (E2E / Integration) cho Lab 8.**

Kiểm chứng xuyên suốt việc ghi nhật ký, truy vấn API quản trị và phân quyền; bổ sung
kiểm thử giao diện/luồng thao tác phù hợp với toolchain sẵn có.

## 2. Hiện trạng liên quan

- Backend có project `CulinaryBlog.IntegrationTests` dùng xUnit,
  `WebApplicationFactory<Program>` và PostgreSQL/Npgsql.
- `RecipeAuthorizationWebApplicationFactory` cùng `TestAuthHandler` đã có thể cấp
  identity test theo header, không cần token thật.
- Một số integration test hiện tại gọi `Database.MigrateAsync()` và yêu cầu biến
  môi trường `ConnectionStrings__DefaultConnection` trỏ tới **database PostgreSQL
  riêng chỉ dành cho test**.
- Frontend không có Playwright/Cypress trong package manifest; `npm run build` và
  ESLint đã có sẵn.
- Ba integration test database hiện có thất bại nếu thiếu connection string; các
  test khác vẫn có thể chạy độc lập.

## 3. Ý tưởng triển khai

1. Dùng `WebApplicationFactory` để gửi request thật tới `/api/v1/audit-logs` qua
   pipeline ASP.NET Core.
2. Kiểm tra anonymous nhận 401, user không phải Admin nhận 403, Admin được truy cập
   và tham số sai (action/phân trang/khoảng thời gian) nhận 400.
3. Với PostgreSQL test riêng, thêm dữ liệu có ID duy nhất; xác minh API lọc, sắp xếp
   mới nhất trước, phân trang và trả JSON cũ/mới đúng kiểu object.
4. Qua DbContext thực tế, tạo/cập nhật/xóa mềm một Category rồi xác minh các bản ghi
   audit `Added`, `Modified`, `SoftDeleted`, actor null cho tác vụ không có HTTP user,
   và không tạo audit lồng cho `AuditLog`.
5. Dọn đúng các bản ghi do test tạo; không xóa dữ liệu ngoài phạm vi test.
6. Chạy backend build/unit/integration tests; chạy frontend lint/build. UI role gate
   và trạng thái lỗi đã có thể kiểm tra bằng browser khi API không chạy.

## 4. File dự kiến sửa/thêm

### File dự kiến mới

- `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/AuditLogIntegrationTests.cs`
  - Kiểm thử quyền, validation, truy vấn API và persistence/audit bằng PostgreSQL.
  - Tái sử dụng `RecipeAuthorizationWebApplicationFactory`/`TestAuthHandler` khi
    không cần database; factory cho các test có database sẽ đọc connection string
    test từ biến môi trường.

### File dự kiến sửa

- Không dự kiến sửa dependency manifest hoặc thêm package test mới.
- Chỉ mở rộng file hiện có nếu thực tế cần dùng lại test helper; giữ phạm vi thay đổi
  nhỏ nhất có thể.

## 5. Điều kiện chạy và an toàn dữ liệu

- Kiểm thử có database sẽ gọi migration trên `ConnectionStrings__DefaultConnection`.
  Chỉ cung cấp connection string của database test dùng riêng; **không trỏ vào
  database production hoặc dữ liệu cá nhân**.
- Có thể dùng PostgreSQL cục bộ hoặc Docker Desktop trên Windows; WSL không bắt buộc.
- Môi trường hiện tại chưa đặt biến kết nối nên chưa thể chạy thành công các test cần
  database cho đến khi cấu hình PostgreSQL riêng.
- Không commit connection string, password hoặc token; kiểm thử dùng actor/entity ID
  ngẫu nhiên và dọn dữ liệu do chính test tạo.

## 6. Ghi chú triển khai và giải thích

- **WebApplicationFactory** chạy endpoint qua middleware, authentication, DI và
  Minimal API như ứng dụng thật, thay vì gọi trực tiếp handler.
- **TestAuthHandler** tạo claim test nội bộ để so sánh anonymous, user thường và Admin
  mà không tạo credential thật.
- **PostgreSQL integration test** xác nhận EF Core migration, JSONB và interceptor
  hoạt động với provider mà ứng dụng triển khai.
- **ID test ngẫu nhiên** giúp test có thể chạy lại và tránh va chạm dữ liệu.
- **Build/lint UI** kiểm tra hợp đồng TypeScript và route dashboard; không thêm
  Playwright dependency ngoài yêu cầu.

## 7. Tiêu chí hoàn thành

- Test phân quyền, validation và query API có kết quả rõ ràng.
- Test với PostgreSQL chứng minh audit phát sinh đúng cho thêm/sửa/xóa mềm, lưu dữ
  liệu trước/sau và không audit đệ quy.
- Unit tests/build backend đạt; các test DB ghi rõ yêu cầu môi trường.
- Frontend lint/build đạt trên các file liên quan.

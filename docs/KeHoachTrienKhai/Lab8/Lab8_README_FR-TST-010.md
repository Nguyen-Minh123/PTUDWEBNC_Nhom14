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
- Frontend ban đầu chưa có Playwright; Lab 8 bổ sung Playwright và script
  `npm run test:e2e` cho ba luồng browser: Admin xem/lọc/phân trang, user thường bị
  từ chối, và Admin thử lại sau lỗi API. Các bài UI mock response để cô lập hành vi
  trình duyệt; persistence thật được kiểm chứng bằng integration test PostgreSQL.
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
6. Chạy backend build/unit/integration tests; chạy frontend lint/build và ba bài
   Playwright E2E trên Chromium.

## 4. File dự kiến sửa/thêm

### File dự kiến mới

- `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/AuditLogIntegrationTests.cs`
  - Kiểm thử quyền, validation, truy vấn API và persistence/audit bằng PostgreSQL.
  - Tái sử dụng `RecipeAuthorizationWebApplicationFactory`/`TestAuthHandler` khi
    không cần database; factory cho các test có database sẽ đọc connection string
    test từ biến môi trường.

### File dự kiến sửa

- `culinary-blog/src/frontend/package.json` và `package-lock.json`
  - Thêm `@playwright/test` cùng script `test:e2e`.
- Chỉ mở rộng file hiện có nếu thực tế cần dùng lại test helper; giữ phạm vi thay đổi
  nhỏ nhất có thể.

### File E2E bổ sung

- `culinary-blog/src/frontend/playwright.config.ts`
  - Khởi động Next.js trên cổng test 3100 và cấu hình Chromium.
- `culinary-blog/src/frontend/e2e/audit-log-fixtures.ts`
  - Tạo session Auth.js ký bằng secret chỉ dành cho test, thiết lập role Admin/Author
    trong trạng thái frontend và cung cấp response mẫu không chứa credential thật.
- `culinary-blog/src/frontend/e2e/audit-logs-admin.spec.ts`
  - Kiểm tra tra cứu, xem JSON thay đổi, lọc và chuyển trang.
- `culinary-blog/src/frontend/e2e/audit-logs-authorization.spec.ts`
  - Kiểm tra user thường không thấy route và không gọi endpoint.
- `culinary-blog/src/frontend/e2e/audit-logs-retry.spec.ts`
  - Kiểm tra lỗi API, thao tác thử lại và dữ liệu được render sau thành công.

## 5. Điều kiện chạy và an toàn dữ liệu

- Kiểm thử có database sẽ gọi migration trên `ConnectionStrings__DefaultConnection`.
  Chỉ cung cấp connection string của database test dùng riêng; **không trỏ vào
  database production hoặc dữ liệu cá nhân**.
- Có thể dùng PostgreSQL cục bộ hoặc Docker Desktop trên Windows; WSL không bắt buộc.
- Các test cần database phải chạy với connection string PostgreSQL test riêng.
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
- **Playwright E2E** chạy Chromium headless, xác minh nội dung, tương tác và trạng thái
  UI; API được giả lập trong bài browser test để test giao diện có thể chạy độc lập.
  Session cookie được ký hợp lệ bằng secret test để middleware và Auth.js có thể đọc
  cùng một session, tránh dùng cookie giả không hợp lệ.

## 7. Tiêu chí hoàn thành

- Test phân quyền, validation và query API có kết quả rõ ràng.
- Test với PostgreSQL chứng minh audit phát sinh đúng cho thêm/sửa/xóa mềm, lưu dữ
  liệu trước/sau và không audit đệ quy.
- Unit tests/build backend đạt; các test DB ghi rõ yêu cầu môi trường.
- Ba bài Playwright chạy đạt; frontend lint/build đạt trên các file liên quan.

## 8. Kết quả xác minh

- Backend: build thành công; 20 unit test và 47 integration test đạt (67/67) trên
  PostgreSQL test riêng.
- Browser E2E: `npm run test:e2e` đạt 3/3 bài với Chromium.
- Frontend: lint các file liên quan và `npm run build` đều thành công.
- `AddAuditLogs` chỉ được áp dụng trên database test riêng; database ứng dụng chính
  không có migration này trong lịch sử migration khi kiểm tra.
- Next.js có cảnh báo convention `middleware` đã deprecated; đây là cảnh báo migration
  framework, không làm build hoặc test thất bại và không thuộc phạm vi FR-TST-010.

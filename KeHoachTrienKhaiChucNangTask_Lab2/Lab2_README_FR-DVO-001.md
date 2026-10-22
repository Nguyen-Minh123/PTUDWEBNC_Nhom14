# Lab 2 — FR-DVO-001: Cấu hình Docker Compose tổng hợp

## Mục tiêu

Chuẩn bị môi trường chạy đồng bộ các dịch vụ nền của Culinary Blog bằng
Docker Compose: Nginx, PostgreSQL, Redis và MinIO. Các container cần có tên
dịch vụ, cổng, cấu hình môi trường, volume dữ liệu và thứ tự readiness rõ ràng
để các thành viên có thể khởi động môi trường nhất quán.

## Hiện trạng đã đối chiếu

- File hiện có: `culinary-blog/docker-compose.yml`.
- Compose khai báo PostgreSQL 16, Redis 7, MinIO và service Nginx opt-in qua
  profile `edge`. Nginx bind cổng `127.0.0.1:8080` và chỉ cung cấp `/health`;
  chưa proxy API/frontend vì ứng dụng chưa có Dockerfile/container service.
- `culinary-blog/docker/nginx/nginx.conf` định nghĩa health route tối thiểu.
- Chưa tìm thấy Dockerfile trong `culinary-blog`.
- PostgreSQL và MinIO đang dùng mật khẩu mẫu đặt trực tiếp trong compose. Đây
  chỉ phù hợp cho môi trường local thử nghiệm; không dùng các giá trị này ở
  môi trường chia sẻ/production.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/docker-compose.yml` | Khai báo Nginx dưới profile `edge`, chỉ bind vào loopback host và healthcheck; giữ nguyên các service hạ tầng hiện có. |
| `culinary-blog/docker/nginx/nginx.conf` | Cung cấp `/health` để kiểm tra container Nginx; không proxy tới host hoặc service chưa tồn tại. |
| `culinary-blog/.env.example` | Không cần sửa cho service Nginx health-only; file hiện có được giữ nguyên. |
| API/frontend Dockerfile | Không tạo ở phương án an toàn đã chọn vì task chưa yêu cầu container hóa ứng dụng và chưa chốt topology. |

## Ý tưởng triển khai

1. Giữ service name ổn định (`postgres`, `redis`, `minio`, `nginx`) để các
   container truy cập nhau bằng DNS nội bộ Docker Compose, không dùng
   `localhost` giữa các container.
2. Chỉ publish ra host các cổng cần cho phát triển; giữ thông tin kết nối nội
   bộ dùng service name và port container.
3. Dùng named volume cho PostgreSQL/MinIO để dữ liệu không mất khi container
   được tạo lại.
4. Khai báo healthcheck cho database/cache/object storage nếu image hỗ trợ; dùng
   `depends_on` với điều kiện healthy khi ứng dụng cần đợi dịch vụ sẵn sàng.
5. Nginx nằm trong profile opt-in nên không tự khởi động khi chạy compose mặc
   định. Cấu hình health-only tránh gửi traffic tới API chưa được đóng gói hoặc
   mở cổng backend ra mạng container.
6. Externalize mật khẩu/credential qua `.env` ở local; `.env` thật không được
   đưa vào Git. Credential mặc định chỉ dùng cho demo cục bộ.

## Kiểm tra sau triển khai

- Chạy `docker compose config` và `docker compose --profile edge config` để
  xác nhận YAML và profile đều hợp lệ.
- Hai lệnh `docker compose config` đã chạy thành công; chưa khởi động container
  hoặc pull image để tránh thay đổi runtime của nhóm.
- Khởi động Nginx riêng bằng `docker compose --profile edge up -d nginx`, sau
  đó kiểm tra `http://127.0.0.1:8080/health`; không cần chạy lệnh này để dùng
  stack database/cache/object storage mặc định.
- Khởi động stack với `docker compose up -d`, kiểm tra health/status từng
  service và log khởi động.
- Xác nhận dữ liệu PostgreSQL/MinIO còn sau khi recreate container nhờ named
  volume.
- Nginx hiện chỉ xác nhận trạng thái bằng `/health`; muốn proxy ứng dụng cần có
  quyết định topology và service API/frontend container riêng.
- Kiểm tra diff để không commit `.env` chứa secret hoặc dữ liệu volume.

## Giải thích code/cấu hình để trình bày

- `services` mô tả từng container và cấu hình runtime; service name đồng thời
  là hostname trên network compose.
- `ports` ánh xạ cổng host sang cổng container; chỉ ánh xạ cổng cần truy cập
  từ máy phát triển.
- `volumes` giữ dữ liệu ngoài vòng đời container, hữu ích cho database và
  object storage.
- `restart: unless-stopped` tự khởi động lại service sau sự cố/khởi động máy,
  trừ khi người dùng chủ động dừng nó.
- Profile `edge` giữ Nginx ngoài đường chạy mặc định, giảm tác động tới luồng
  hiện tại khi ứng dụng chưa có upstream container.
- `depends_on` chỉ sắp xếp phụ thuộc; nếu cần chờ dịch vụ nhận kết nối phải
  kiểm tra healthcheck và điều kiện healthy.

## Trạng thái

- [x] Đã kiểm kê Compose hiện tại và thư mục Docker.
- [x] Thêm Nginx health-only dưới profile opt-in để không ảnh hưởng stack mặc định.
- [x] Đã xác nhận Compose config hợp lệ ở profile mặc định và `edge`.
- [ ] Chỉ cấu hình reverse proxy/container ứng dụng khi nhóm thống nhất upstream topology.

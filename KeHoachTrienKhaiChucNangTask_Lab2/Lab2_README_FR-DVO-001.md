# Lab 2 — FR-DVO-001: Cấu hình Docker Compose tổng hợp

## Mục tiêu

Chuẩn bị môi trường chạy đồng bộ các dịch vụ nền của Culinary Blog bằng
Docker Compose: Nginx, PostgreSQL, Redis và MinIO. Các container cần có tên
dịch vụ, cổng, cấu hình môi trường, volume dữ liệu và thứ tự readiness rõ ràng
để các thành viên có thể khởi động môi trường nhất quán.

## Hiện trạng đã đối chiếu

- File hiện có: `culinary-blog/docker-compose.yml`.
- Compose hiện tại khai báo PostgreSQL 16, Redis 7 và MinIO; chưa có service
  Nginx, API/frontend, healthcheck hoặc cấu hình phụ thuộc theo trạng thái sẵn
  sàng.
- `culinary-blog/docker/nginx/` hiện chỉ có `.gitkeep`; chưa có cấu hình
  reverse proxy. Chưa tìm thấy Dockerfile trong `culinary-blog`.
- PostgreSQL và MinIO đang dùng mật khẩu mẫu đặt trực tiếp trong compose. Đây
  chỉ phù hợp cho môi trường local thử nghiệm; không dùng các giá trị này ở
  môi trường chia sẻ/production.

## File dự kiến sửa/thêm

| File | Thay đổi |
| --- | --- |
| `culinary-blog/docker-compose.yml` | Chuẩn hóa service PostgreSQL, Redis, MinIO và bổ sung Nginx; khai báo port, network, volume, healthcheck và phụ thuộc phù hợp với phạm vi Lab. |
| `culinary-blog/docker/nginx/nginx.conf` | Tạo cấu hình upstream/proxy cho các service HTTP được compose cung cấp; chỉ thêm khi yêu cầu Lab cần Nginx reverse proxy. |
| `culinary-blog/.env.example` | Khai báo tên biến và giá trị ví dụ không nhạy cảm để người chạy tự tạo `.env`; không commit secret thật. |
| `culinary-blog/src/backend/src/CulinaryBlog.API/Dockerfile` | Chỉ cần nếu yêu cầu chạy API container trong cùng compose; hiện chưa có Dockerfile. |
| `culinary-blog/src/frontend/Dockerfile` | Chỉ cần nếu yêu cầu chạy frontend container trong cùng compose; hiện chưa có Dockerfile. |

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
5. Cấu hình Nginx theo đúng topology được giao. Không tự giả định upstream API
   hay frontend trước khi có Dockerfile/service/port tương ứng.
6. Externalize mật khẩu/credential qua `.env` ở local; `.env` thật không được
   đưa vào Git. Credential mặc định chỉ dùng cho demo cục bộ.

## Kiểm tra sau triển khai

- Chạy `docker compose config` để xác nhận YAML và nội suy biến hợp lệ.
- Khởi động stack với `docker compose up -d`, kiểm tra health/status từng
  service và log khởi động.
- Xác nhận dữ liệu PostgreSQL/MinIO còn sau khi recreate container nhờ named
  volume.
- Nếu thêm Nginx, thử health endpoint/proxy route của upstream đã triển khai.
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
- `depends_on` chỉ sắp xếp phụ thuộc; nếu cần chờ dịch vụ nhận kết nối phải
  kiểm tra healthcheck và điều kiện healthy.

## Trạng thái

- [x] Đã kiểm kê Compose hiện tại và thư mục Docker.
- [ ] Bổ sung Nginx/topology theo đúng yêu cầu Lab và xác nhận cấu hình bằng
  Docker Compose.

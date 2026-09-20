# 1. Sử dụng Redis cho Distributed Caching

## Bối cảnh
Hệ thống cần tối ưu tốc độ đọc (Response Time < 150ms) cho các danh sách công thức nấu ăn. 

## Quyết định
Sử dụng Redis 7 thay vì In-Memory Cache (IMemoryCache).

## Hậu quả (Kết quả đạt được)
- **Ưu điểm:** Giảm tải cho PostgreSQL. Hỗ trợ tốt khi scale API lên nhiều instance.
- **Nhược điểm:** Tăng độ phức tạp khi deploy (cần thêm 1 container Redis do Huy quản lý).
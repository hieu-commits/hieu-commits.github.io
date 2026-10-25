# Hieu Portfolio — hướng dẫn sử dụng (tiếng Việt)

Website portfolio tĩnh, responsive, xây bằng HTML + CSS + JavaScript thuần. Không cần Node.js, framework, backend hay build step để deploy.

## 1. Cấu trúc thư mục

```text
hieu-portfolio-website/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── hero-visual.svg
│   └── favicon.svg
└── README_VI.md
```

## 2. Chạy thử trên máy tính

**Cách nhanh:** nhấp đúp `index.html` để mở bằng trình duyệt. Phần lớn chức năng vẫn chạy được ở chế độ file local.

**Cách nên dùng:** mở thư mục bằng VS Code, cài extension Live Server (nếu đã có VS Code), nhấp phải `index.html` → **Open with Live Server**.

## 3. Cá nhân hóa nội dung trước khi công khai

Mở `index.html` và tìm các nội dung sau:

- `Hieu`, `hieu-commits`, mô tả bản thân: chỉnh theo tên/giới thiệu bạn muốn công khai.
- Khu vực `CURRENTLY EXPLORING`: cập nhật các chủ đề bạn đang học thực tế.
- `Technical interests`: đây là bản đồ chủ đề, không tự nhận là kỹ năng chuyên gia.
- `PROJECT BLUEPRINT`: 3 thẻ C++ / Python / AI hiện là ý tưởng dự án mẫu, **không phải dự án hoàn thành**. Khi có repo thật, đổi tiêu đề, mô tả, badge, trạng thái và URL GitHub trong từng thẻ.
- GitHub link đã được gắn tới `https://github.com/hieu-commits`. Nếu đổi username, tìm và thay link trong `index.html` và `script.js`.
- Không có email hoặc số liệu thành tích giả được đặt làm thông tin thật.

Màu sắc, spacing, responsive layout và hiệu ứng nằm trong `styles.css`. Hành vi menu mobile, reveal khi cuộn, năm hiện tại và nút copy link nằm trong `script.js`.

## 4. Đưa website lên GitHub Pages

### Cách khuyến nghị: tạo website cá nhân riêng

1. Đăng nhập GitHub.
2. Tạo repository **`hieu-commits.github.io`** (đúng username; chọn Public nếu dùng GitHub Free).
3. Upload các mục `index.html`, `styles.css`, `script.js`, thư mục `assets/` và có thể thêm file hướng dẫn này vào **thư mục gốc** của repository.
4. Nhấn **Commit changes**.
5. Vào repository → **Settings** → **Pages**.
6. Trong **Build and deployment**, chọn **Deploy from a branch**.
7. Chọn branch `main`, folder `/(root)`, nhấn **Save**.
8. Đợi GitHub build và mở `https://hieu-commits.github.io`.

GitHub cho biết thay đổi có thể mất đến khoảng 10 phút để xuất hiện. Tham khảo tài liệu chính thức: https://docs.github.com/en/pages/quickstart

### Nếu không muốn tạo repository mang tên username.github.io

Có thể tạo một repository dự án khác, bật Pages từ `Settings → Pages` và publish từ `main / (root)`. URL thường có dạng `https://hieu-commits.github.io/TEN-REPOSITORY/`. Với website cá nhân, cách `hieu-commits.github.io` gọn hơn.

## 5. Liên kết từ profile README

Sau khi website chạy, thêm vào README của repository profile `hieu-commits`:

```md
[🌐 Visit my portfolio](https://hieu-commits.github.io)
```

## 6. Trước khi gửi nhà tuyển dụng

- Thay các project blueprint bằng 2–3 dự án thật, mỗi dự án có README, hướng dẫn chạy và ảnh/demo nếu có.
- Không thêm số sao, số contribution, kinh nghiệm, chứng chỉ hoặc kết quả AI nếu chưa có cơ sở xác minh.
- Kiểm tra trên màn hình điện thoại và desktop.
- Không commit token, API key, mật khẩu, tệp `.env` hay dữ liệu riêng tư. Website GitHub Pages là công khai.

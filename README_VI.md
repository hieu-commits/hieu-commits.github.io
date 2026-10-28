# Cập nhật Portfolio — Engineering Profile & Hover Cards

## Những thay đổi trong bản này

- Đổi mục `01 — THE PERSON` thành `01 / ENGINEERING PROFILE`.
- Đổi mục `02 — THE TOOLBOX` thành `02 / TECHNICAL CAPABILITIES`.
- Bỏ số `01 /` khỏi câu định vị trong Hero để tránh đánh số mục bị lặp.
- Giữ thanh ticker ngay dưới Hero và trên mục `01 / ENGINEERING PROFILE`.
- Viết lại nội dung theo hướng tự tin, tập trung vào tư duy hệ thống, cách tiếp cận vấn đề và kết quả có thể kiểm chứng.
- Bổ sung hiệu ứng viền điện chạy quanh card Technical Capabilities và Project khi rê chuột trên thiết bị có chuột. Hiệu ứng dừng khi rời card; bàn phím nhận viền tĩnh; chế độ giảm chuyển động không bị ép chạy animation.
- Giữ tên trường HCMUS đầy đủ và giữ nguyên cấu trúc trang chi tiết dự án.

## Cập nhật bằng GitHub Desktop

1. Giải nén ZIP này.
2. Mở GitHub Desktop và chọn repository `hieu-commits.github.io`.
3. Chọn **Repository → Show in Explorer**.
4. Sao lưu các file bạn đã tự chỉnh sửa, rồi chép `index.html`, `styles.css`, `script.js`, `.nojekyll` và các thư mục `assets/`, `docs/` từ gói này vào thư mục repository. Giữ đúng cấu trúc thư mục; không tạo `assets/assets/`.
5. Quay lại GitHub Desktop, kiểm tra **Changes**.
6. Commit với Summary `Refine engineering profile and card hover effects`, sau đó nhấn **Push origin**.
7. Chờ GitHub Pages triển khai xong, mở website và nhấn `Ctrl + F5`.

## Kiểm tra hiệu ứng

- Trên desktop: rê chuột vào từng card trong Technical Capabilities hoặc Projects. Card hơi nâng lên và một vệt sáng chạy quanh viền.
- Khi rời chuột: hiệu ứng ngừng và card trở về trạng thái ban đầu.
- Trên điện thoại/màn hình cảm ứng: không chạy animation hover liên tục.
- Nếu hệ điều hành bật `Reduce motion`: viền vẫn nhận diện được nhưng không chạy chuyển động.

Bản ZIP không tự triển khai lên website công khai. Cần commit và push để áp dụng.

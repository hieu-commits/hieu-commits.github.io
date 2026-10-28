# Hieu Portfolio — hướng dẫn cập nhật (tiếng Việt)

Website tĩnh dùng HTML, CSS và JavaScript thuần. Bộ cập nhật này đồng bộ nhận diện với GitHub Profile `hieu-commits`: nền navy, cyan–blue–violet, card bo góc, ticker chạy ngang ngay dưới Hero, nội dung theo 6 nhóm chuyên môn và nhấn mạnh bằng chứng thực tế thay vì tuyên bố quá mức.

## Cấu trúc

```text
hieu-commits.github.io/
├── index.html                 # Trang portfolio
├── styles.css                 # Design system, responsive, hover
├── script.js                  # Menu mobile, reveal, copy link
├── docs/
│   └── project-detail-template.html.template # Mẫu trang chi tiết cho dự án thật
├── README_VI.md               # Hướng dẫn
├── .nojekyll
└── assets/
    ├── favicon.svg
    └── hero-systems.svg
```

## Chạy thử local

Mở thư mục bằng VS Code; nên dùng Live Server để xem hành vi điều hướng và responsive. Có thể mở trực tiếp `index.html` trong trình duyệt cho lần xem nhanh.

## Cập nhật GitHub Pages

1. Giải nén gói ZIP.
2. Mở GitHub Desktop, chọn repository `hieu-commits.github.io` → `Repository → Show in Explorer`.
3. Sao lưu file cũ nếu bạn có chỉnh sửa riêng.
4. Sao chép các file trong gói vào thư mục gốc local của repository, giữ nguyên thư mục `assets/`. Không đặt toàn bộ dự án vào một thư mục con.
5. Trở lại GitHub Desktop, kiểm tra Changes, commit rồi Push origin.
6. Mở `https://hieu-commits.github.io/`. Sau khi Pages deploy xong, refresh cứng bằng `Ctrl + F5`.

**Không thay repository `hieu-commits`** — đó là nơi chứa README của GitHub Profile. Bộ này dành riêng cho website `hieu-commits.github.io`.

## Các phần đã đồng bộ

- Hero ghi tên trường rõ ràng bằng tiếng Anh: University of Science, Vietnam National University Ho Chi Minh City (HCMUS), kèm tên tiếng Việt Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Thành phố Hồ Chí Minh và liên kết đến website chính thức.
- 6 nhóm: Software Engineering & AI; Networking & Infrastructure; Cyber Security; DevOps & Cloud; Database Engineering; IoT & Connected Systems.
- Project area có 6 blueprint, mỗi thẻ đều ghi rõ `Planned build`. Đây không phải tuyên bố dự án đã hoàn thành; thay bằng URL repository thật khi bạn công bố dự án.
- Có mẫu `docs/project-detail-template.html.template` để sao chép khi một dự án thật đã có README, source code, kết quả kiểm thử và giới hạn được ghi lại. Khi dùng, sao chép mẫu vào thư mục gốc, đổi tên thành `.html`, rồi thay toàn bộ placeholder. Để nguyên file `.template` sẽ không tạo một trang dự án mẫu trong website.
- Hover card có viền ánh sáng nhẹ chỉ khi rê chuột; hiệu ứng bị giảm theo `prefers-reduced-motion`.
- Không thêm email, chứng chỉ, số liệu sao, số contribution hay thành tựu chưa xác minh.

## Cá nhân hóa trước khi gửi nhà tuyển dụng

- Thêm link trực tiếp đến repository thật khi có dự án.
- Thay project blueprint bằng phần mô tả có sơ đồ, lệnh chạy, test, kết quả và giới hạn.
- Chỉ liệt kê công nghệ bạn đã sử dụng hoặc đang học thực sự.
- Kiểm tra ở desktop, tablet và mobile; tránh commit API keys, mật khẩu hoặc tệp `.env`.

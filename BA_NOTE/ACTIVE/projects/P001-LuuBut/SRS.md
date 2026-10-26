# SRS - Đặc tả yêu cầu: App Sổ Lưu Bút Kỷ Yếu Lớp Học (LuuBut Mobile App)

## 1. Giới thiệu & Bối cảnh (Context & Problem Statement)
- **Bối cảnh**: Thầy cô giáo và bạn bè sau khi ra trường rất quan tâm tới hành trình trưởng thành của từng thành viên (học ĐH nào, ngành gì, đã và đang làm việc ở đâu, công ty nào). Tuy nhiên, trí nhớ của thầy cô và các bạn theo năm tháng sẽ giảm dần, mỗi lần họp lớp lại phải hỏi lại từ đầu.
- **Mục tiêu**: Cung cấp ứng dụng mobile nhẹ nhàng, hoài niệm, thân thiện, chạy offline in-app không cần máy chủ backend phức tạp, giúp:
  1. Thành viên tự cập nhật thông tin cá nhân và timeline học vấn / công việc / sở thích / liên hệ.
  2. Xem danh sách thành viên lớp học, lọc theo ngành nghề, nơi làm việc, tìm kiếm nhanh thông tin bạn bè để thầy cô & các bạn dễ tra cứu.
  3. Đăng và xem Bảng tin sự kiện (họp lớp, kỷ niệm ngày ra trường, chúc mừng, thông báo chung).
  4. Cơ chế chia sẻ dữ liệu in-app (Xuất / Nhập JSON file hoặc chia sẻ qua mã QR/tin nhắn) giúp cập nhật sổ lưu bút giữa mọi người mà không cần backend.

## 2. Yêu cầu chức năng (Functional Requirements)
- **REQ-001 (Quản lý Hồ sơ & Hành trình - Career & Study Timeline)**:
  - Cho phép người dùng nhập/sửa hồ sơ cá nhân: Họ tên, biệt danh, ảnh đại diện (avatar emoji / ảnh), ngày sinh, số điện thoại, mạng xã hội, câu châm ngôn/lời chúc gửi lớp & thầy cô.
  - Quản lý Milestone hành trình: Các mốc Trường ĐH/CĐ, Ngành học, Công ty/Vị trí làm việc, Tình trạng (Đang làm / Đã làm), Thời gian.
- **REQ-002 (Danh bạ Thành viên Lớp học & Sổ Lưu Bút)**:
  - Danh sách thành viên lớp dạng thẻ kẹp sổ tay hoài niệm.
  - Tìm kiếm theo tên, công ty, ngành nghề, vị trí công việc.
  - Xem chi tiết trang lưu bút cá nhân từng bạn (hành trình sự nghiệp, lời chúc cho cô/thầy, kỷ niệm).
- **REQ-003 (Bảng tin Sự kiện & Thông báo Lớp)**:
  - Tạo sự kiện mới (Họp lớp, Thăm thầy cô, Kỷ niệm 5 năm / 10 năm ra trường, Chúc mừng đám cưới...).
  - Chi tiết ngày giờ, địa điểm, nội dung sự kiện, trạng thái tham gia.
- **REQ-004 (In-App Sync & Lưu trữ cục bộ)**:
  - Lưu trữ toàn bộ dữ liệu cục bộ bằng `@react-native-async-storage/async-storage` (hoặc local fallback state).
  - Tích hợp sẵn dữ liệu mẫu (mock data phong phú) thể hiện đúng tinh thần lớp học thân thương để thầy cô và các bạn mở lên là có thể xem được ngay.
  - Tính năng Xuất dữ liệu (Export JSON) và Nhập dữ liệu (Import JSON) để gửi cập nhật qua Zalo/Facebook/AirDrop.
- **REQ-005 (Đăng Nhập & Định Danh Thành Viên - Authentication & Role Claim)**:
  - Màn hình Đăng nhập (Sign In): Yêu cầu nhập **Username** (hoặc chọn tài khoản/email thành viên) và **Mật khẩu (Password)**.
  - Cơ chế xác thực cục bộ (In-App Local Auth): Mặc định hỗ trợ mật khẩu chung khởi tạo của lớp (ví dụ: `ct1619` hoặc mã PIN cá nhân) để kích hoạt phiên đăng nhập.
  - Gắn phiên đăng nhập vào tài khoản thành viên tương ứng, cho phép chỉnh sửa đúng hồ sơ của mình và Đăng xuất (Sign Out) khi muốn đổi tài khoản.

## 3. Yêu cầu phi chức năng (NFR) & Thiết kế UI/UX
- **NFR-001 (Nền tảng)**: React Native (Expo SDK), TypeScript 100%, chạy mượt trên Android, iOS và Expo Web.
- **NFR-002 (Không phụ thuộc Backend)**: In-app storage hoàn toàn, hoạt động mượt offline không cần internet.
- **NFR-003 (Phong cách hoài niệm & Thẩm mỹ Fresh - Nostalgic Fresh Design)**:
  - Bảng màu: Màu giấy kraft ấm áp (`#FDFBF7`, `#FAF5EB`), viền thẻ nâu retro (`#8D6E63`, `#5D4037`), màu điểm xuyết tươi mới (`#5B8266` xanh olive dịu, `#E07A5F` cam đất nhẹ, `#DDA15E` vàng nắng).
  - Typography & Icon: Card ghim, sổ tay vintage, hiệu ứng tab mượt mà, font chữ thân thiện dễ đọc cho cả người lớn tuổi (thầy cô).

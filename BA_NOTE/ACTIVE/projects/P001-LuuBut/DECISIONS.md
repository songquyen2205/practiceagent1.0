# Quyết định kiến trúc & Thiết kế — P001 LuuBut App

## Mục lục
- [DEC-001: Kiến trúc In-App Storage & Chia sẻ Offline](#dec-001)
- [DEC-002: Phong cách Thiết kế Giao diện Nostalgic Fresh](#dec-002)

---

### DEC-001: Kiến trúc In-App Storage & Chia sẻ Offline
- **Status**: Confirmed
- **Scope**: Toàn bộ ứng dụng mobile
- **Bối cảnh**: Yêu cầu không dùng backend, nhưng các thành viên và thầy cô cần có thể xem thông tin của nhau và thông báo sự kiện.
- **Giải pháp**:
  - Dùng Local Storage Engine (AsyncStorage + State Management) lưu trữ toàn bộ: `members`, `events`, `currentUserProfile`.
  - Cung cấp sẵn cơ chế Seeding dữ liệu lớp học sinh động và chức năng Backup / Export JSON & Import JSON để các bạn có thể chia sẻ gói cập nhật mới nhất cho nhau qua nhóm chat Zalo/Messenger của lớp hoặc chép qua máy thầy cô.
- **Tác động**: Không tốn chi phí server, bảo mật quyền riêng tư tuyệt đối cho lớp học.

---

### DEC-002: Chuyển Đổi Định Hướng Giao Diện Sang Modern Clean / Notion-like (v4.3)
- **Status**: Confirmed by User (2026-10-26)
- **Scope**: Toàn bộ hệ thống Mobile & Web UI/UX
- **Bối cảnh**: Người dùng phản hồi định hướng giao diện giả lập hoài niệm (nền giấy ngả vàng, washi-tape, emoji trang trí) nhìn bị "slop / AI generic". Chuyển sang phong cách Hiện đại, Tối giản, Clean Mobile / Notion-like.

---

### DEC-003: Luồng Đăng Nhập & Định Danh Thành Viên (In-App Auth)
- **Status**: Confirmed by User (2026-10-27)
- **Scope**: User Authentication & Session Management
- **Bối cảnh**: Người dùng phát hiện app thiếu luồng đăng nhập nhiều user, khiến ai mở lên cũng bị gán cứng vào một profile. Yêu cầu có form nhập Username & Password để vào app.
- **Giải pháp**:
  - Thêm `username` và `password` vào thực thể tài khoản thành viên (mặc định username tạo theo tên viết liền không dấu: `thaychunhiem`, `songquyen`, `minhquan`... và mật khẩu khởi tạo: `ct1619` hoặc `123456`).
  - Dựng màn hình `LoginScreen` chuẩn iOS / Notion: Hỗ trợ nhập trực tiếp hoặc bấm chọn nhanh tài khoản thành viên kèm mật khẩu.
  - Lưu phiên đăng nhập `currentAuthMemberId` vào `AsyncStorage` để giữ đăng nhập khi mở lại app.
  - Thêm nút Đăng Xuất trong tab Hệ Thống.

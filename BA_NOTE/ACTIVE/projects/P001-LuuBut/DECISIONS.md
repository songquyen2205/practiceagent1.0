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

### DEC-002: Phong cách Thiết kế Giao diện Nostalgic Fresh
- **Status**: Confirmed
- **Scope**: Mobile UI/UX Design System
- **Bối cảnh**: Người dùng yêu cầu phong cách "đơn giản, hoài niệm mà nhìn style fresh, đẹp".
- **Giải pháp**:
  - Thiết kế lấy cảm hứng từ "Cuốn Sổ Lưu Bút Kỷ Yếu Tuổi Học Trò":
    - Phông nền màu giấy vintage cao cấp sáng sạch (`#FBF9F5` / `#F3EFE6`).
    - Thẻ thành viên mô phỏng trang kẹp ảnh polaroid / giấy ghi chú với sticker biểu cảm đáng yêu.
    - Timeline hành trình học vấn & công việc dạng cây thước kẻ kỉ niệm.
    - Typography kích cỡ rõ ràng, độ tương phản tốt để thầy cô giáo lớn tuổi đọc không bị mỏi mắt.

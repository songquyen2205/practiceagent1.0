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

### DEC-002: Phong cách Thiết kế Giao diện Nostalgic Fresh & Realism Gate (v4.3)
- **Status**: Confirmed
- **Scope**: Mobile UI/UX Design System & Realism Gate
- **Bối cảnh**: Người dùng yêu cầu phong cách "đơn giản, hoài niệm mà nhìn style fresh, đẹp". Framework v4.3 yêu cầu đối soát 9 tiêu chí Design Realism (REAL-Q01 -> REAL-Q09) để loại bỏ dấu vết AI sáo rỗng.
- **Giải pháp**:
  - Thiết kế lấy cảm hứng từ "Cuốn Sổ Lưu Bút Kỷ Yếu Tuổi Học Trò":
    - Phông nền màu giấy vintage cao cấp sáng sạch (`#FAF6F0` / `#FFFFFF`).
    - Thẻ thành viên mô phỏng trang kẹp sổ tay với màu washi tape trang trí (`#F3D5B5`).
    - Màu sắc chủ đạo: Xanh rêu bảng đen dịu mát (`#4A6B53`), cam gạch nung học trò (`#D87A56`), vàng nắng sân trường (`#EBB44D`).
    - Typography kích cỡ rõ ràng (Georgia serif + Sans body), độ tương phản cao để thầy cô lớn tuổi đọc dễ chịu, không bị mỏi mắt.
  - **Đáp ứng Design Realism (v4.3)**:
    - Loại bỏ hoàn toàn copy sáo rỗng AI ("Welcome to your amazing journey"); dùng ngôn ngữ thân mật thực tế của học sinh/thầy cô Việt Nam ("Thầy Chủ Nhiệm Kính Yêu", "Biệt danh", "Châm ngôn", "Mốc sự nghiệp / Học vấn").
    - Dữ liệu định danh thực tế của lớp CT1619 (24 bạn học thực sự với trường ĐH, công ty, quê quán, không dùng mockup vô hồn hay placeholder generic).
    - Bộ tương tác hỗ trợ đầy đủ empty state, error/validation mốc thời gian, modal xác nhận sao lưu và toast in-app.

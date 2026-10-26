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
- **Bối cảnh**: Người dùng phản hồi định hướng giao diện giả lập hoài niệm (nền giấy ngả vàng, washi-tape, emoji trang trí) nhìn bị "slop / AI generic" và chưa đạt tiêu chuẩn chuyên nghiệp. Yêu cầu chuyển hẳn sang phong cách **Hiện đại, Tối giản, Clean Mobile / Notion-like**.
- **Giải pháp**:
  - **Màu sắc & Nền**: Thay thế nền giấy ngả vàng bằng Neutral Canvas (`#F8F9FA`), thẻ Pure White (`#FFFFFF`) với viền mảnh 1px (`#E5E7EB`).
  - **Typography & Iconography**: Thay toàn bộ emoji nhồi nhét ở Avatar và tiêu đề bằng **Monogram Initials** tối giản, thanh lịch (`SQ`, `GV`...) và typography chuẩn iOS/System Sans với độ tương phản cao (`#111827`).
  - **Layout & Điều hướng**: Áp dụng Segmented Control chuẩn mực và Bottom Tab Bar tối giản.
- **Tiêu chuẩn kiểm soát chất lượng (Quality Gate)**:
  - Phải kiểm thử runtime cục bộ (Localhost) trước khi xuất bản.
  - Phải đồng bộ toàn bộ tài liệu tổng hợp (`INDEX.md`, `HANDOVER.md`, `index.html` showcase).

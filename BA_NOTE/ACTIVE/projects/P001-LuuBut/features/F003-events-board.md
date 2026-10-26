# F003: Bảng Tin Sự Kiện & Họp Lớp (Class Events & Bulletin Board)

- **ID**: `P001-F003`
- **Phase**: G1 / G2 Ready for Dev
- **Status**: Completed (In-App Implemented)
- **Source**: REQ-003 (SRS.md)
- **Platforms**: Mobile (Android / iOS / Expo Web)

## 1. Actor & Điều Kiện Tiền Đề
- **Actor**: Ban liên lạc lớp, thành viên lớp CT1619.
- **Preconditions**: Có sự kiện được lưu trong AsyncStorage.

## 2. Luồng Nghiệp Vụ
- **Hiển Thị Bảng Tin**: Danh sách sự kiện họp lớp, thăm thầy cô, kỷ niệm ra trường dạng Timeline trực quan.
- **Tạo Sự Kiện Mới**: Tiêu đề sự kiện, ngày giờ, địa điểm tổ chức, ghi chú chi tiết.
- **Xác Nhận Tham Gia**: Người dùng bấm trạng thái `Tham gia`, `Chưa chắc chắn`, `Bận`.

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)
- [x] **AC-01**: Xem danh sách các sự kiện sắp diễn ra và đã diễn ra.
- [x] **AC-02**: Thêm sự kiện họp lớp mới và lưu trữ in-app ngay lập tức.

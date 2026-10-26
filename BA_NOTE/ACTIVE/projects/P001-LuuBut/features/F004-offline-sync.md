# F004: Lưu Trữ Cục Bộ In-App & Xuất/Nhập Dữ Liệu (Offline Persistence & JSON Sync)

- **ID**: `P001-F004`
- **Phase**: G1 / G2 Ready for Dev
- **Status**: Completed (In-App Implemented)
- **Source**: REQ-004 (SRS.md), DEC-001 (DECISIONS.md)
- **Platforms**: Mobile (Android / iOS / Expo Web)

## 1. Actor & Ràng Buộc Kiến Trúc
- **Actor**: Thành viên lớp muốn sao lưu hoặc chia sẻ dữ liệu với bạn bè.
- **Ràng Buộc**: Kiến trúc Zero-Backend (Offline First), không phụ thuộc database máy chủ ngoài.

## 2. Luồng Nghiệp Vụ
- **Persistence**: Đọc/ghi key `@luubut_class_data_ct1619_v2` qua AsyncStorage.
- **Reset Data**: Cho phép bấm "Tải lại dữ liệu mẫu" để khôi phục 24 thành viên gốc.
- **Export/Import JSON**: Xuất toàn bộ dữ liệu ra chuỗi JSON để sao chép/gửi file qua Zalo/AirDrop.

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)
- [x] **AC-01**: Tự động lưu mọi thay đổi vào bộ nhớ máy, không mất khi tắt app.
- [x] **AC-02**: Cho phép khôi phục lại dữ liệu mẫu CT1619 khi cần.

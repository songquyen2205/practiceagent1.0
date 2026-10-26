# F001: Quản Lý Hồ Sơ & Timeline Hành Trình (Profile & Career Timeline)

- **ID**: `P001-F001`
- **Phase**: G1 / G2 Ready for Dev
- **Status**: Completed (In-App Implemented)
- **Source**: REQ-001 (SRS.md)
- **Platforms**: Mobile (Android / iOS / Expo Web)

## 1. Actor & Điều Kiện Tiền Đề (Preconditions)
- **Actor**: Thành viên lớp CT1619 (hoặc thầy cô giáo).
- **Preconditions**: Thiết bị cài ứng dụng hoặc mở web preview; ứng dụng đã nạp AsyncStorage hoặc dữ liệu khởi tạo.

## 2. Luồng Nghiệp Vụ & Validation
- **Xem Hồ Sơ**: Chọn thành viên từ danh bạ -> Màn hình chi tiết hiển thị ảnh, thông tin cá nhân, châm ngôn và danh sách mốc thời gian (Timeline).
- **Cập Nhật Hành Trình**:
  - Nhập/chọn loại mốc: `Học vấn` (Trường ĐH/CĐ) hoặc `Sự nghiệp` (Công ty, chức vụ).
  - Trạng thái: `Đang làm việc / Đang học` hoặc `Đã tốt nghiệp / Đã chuyển việc`.
  - Validation: Tiêu đề mốc không được rỗng, thời gian năm hợp lệ.
- **Lưu Trữ**: Ghi trực tiếp vào bộ nhớ cục bộ in-app (`AsyncStorage`), cập nhật ngay lập tức lên state màn hình.

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)
- [x] **AC-01**: Hiển thị đầy đủ thông tin cá nhân và timeline học vấn/nghề nghiệp.
- [x] **AC-02**: Cho phép tạo mốc mới hoặc cập nhật thông tin công ty/vị trí làm việc.
- [x] **AC-03**: Dữ liệu lưu bền vững qua các lần tắt/mở ứng dụng.

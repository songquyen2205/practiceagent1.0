# F005: Đăng Nhập & Định Danh Thành Viên (User Authentication & Role Claim)

- **ID**: `P001-F005`
- **Phase**: G1 / G2 Ready for Dev
- **Status**: In Progress
- **Source**: REQ-005 (SRS.md)
- **Platforms**: Mobile (Android / iOS / Expo Web)

## 1. Actor & Điều Kiện Tiền Đề (Preconditions)
- **Actor**: Thành viên lớp CT1619 (học sinh, ban cán sự, thầy cô).
- **Preconditions**: Thiết bị đã cài ứng dụng hoặc mở web app; dữ liệu 24 thành viên đã được nạp.

## 2. Luồng Nghiệp Vụ & Validation
1. **Kiểm tra phiên đăng nhập (Session Check)**:
   - Khi mở app, kiểm tra xem `currentAuthUser` đã được lưu trong bộ nhớ máy chưa.
   - Nếu chưa có: Điều hướng ngay tới **Màn hình Đăng Nhập (LoginScreen)**.
2. **Thực hiện Đăng Nhập**:
   - Người dùng nhập **Username** (ví dụ: `songquyen`, `minhquan`, `thaychunhiem` hoặc email/số điện thoại) và **Password** (mặc định: `123456` hoặc `ct1619`).
   - Có thể chọn nhanh từ danh sách gợi ý thành viên để thầy cô hoặc các bạn không cần gõ phím phức tạp.
   - Validation: Báo lỗi nếu Username không tồn tại hoặc sai mật khẩu.
3. **Đăng Xuất (Sign Out)**:
   - Trong màn hình Cài đặt, cho phép bấm **Đăng xuất / Chuyển người dùng** để quay lại màn hình Login.

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)
- [ ] **AC-01**: Bắt buộc đăng nhập trước khi vào xem sổ lưu bút.
- [ ] **AC-02**: Đăng nhập đúng username/password sẽ gắn đúng profile của người đó vào tab "Cá nhân".
- [ ] **AC-03**: Hỗ trợ đăng xuất an toàn và chuyển đổi giữa các thành viên lớp.

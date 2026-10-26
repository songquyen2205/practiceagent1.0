# F005: Đăng Nhập & Định Danh Thành Viên (User Authentication & Role Claim)

- **ID**: `P001-F005`
- **Phase**: G1 / G2 Ready for Dev
- **Status**: Completed (In-App Implemented)
- **Source**: REQ-005 (SRS.md)
- **Platforms**: Mobile (Android / iOS / Expo Web)

## 1. Actor & Điều Kiện Tiền Đề
- **Actor**: Thành viên lớp CT1619 (học sinh, ban cán sự, thầy cô).
- **Preconditions**: Thiết bị đã cài ứng dụng hoặc mở web app; dữ liệu 24 thành viên đã được nạp.

## 2. Luồng Nghiệp Vụ & Validation
1. **Kiểm tra phiên đăng nhập (Session Check)**:
   - Khi mở app, nếu chưa có thông tin `currentUser` thì hiển thị ngay `LoginScreen`.
2. **Thực hiện Đăng Nhập**:
   - Nhập **Username** (viết liền không dấu: `thaychunhiem`, `songquyen`, `minhquan`... hoặc SĐT/Email) và **Mật khẩu** (mặc định: `123456` hoặc `ct1619`).
   - Có thể chọn nhanh từ danh mục 24 thành viên để vào app trong 1 chạm.
   - Validation: Báo lỗi nếu Username không tồn tại hoặc sai mật khẩu.
3. **Định danh & Quyền hạn**:
   - Đăng nhập thành công sẽ gắn tài khoản vào tab "Cá nhân", cho phép cập nhật mốc học vấn/nghề nghiệp của chính mình.
   - Trong Danh bạ, thẻ của người đang đăng nhập hiển thị huy hiệu `Tôi`.
4. **Đăng Xuất (Sign Out)**:
   - Trong tab Hệ Thống, bấm "Đăng Xuất / Đổi Người Dùng" để kết thúc phiên và quay lại màn hình Login.

## 3. Bảng Phủ Yêu Cầu (Coverage Matrix)
| Yêu Cầu / AC | Màn Hình / Thao Tác | Kết Quả Mong Đợi | Mã Kiểm Tra | Bằng Chứng |
|---|---|---|---|---|
| `AC-01` | `LoginScreen` | Chặn truy cập nếu chưa đăng nhập; form đầy đủ username/password | `CHK-F005-01` | Pass |
| `AC-02` | Session Binding | Đăng nhập gắn đúng danh tính vào tab Cá nhân và huy hiệu "Tôi" | `CHK-F005-02` | Pass |
| `AC-03` | `SettingsScreen` | Đăng xuất an toàn, đưa người dùng về form Login | `CHK-F005-03` | Pass |

## 4. Kịch Bản Kiểm Thử (Flow & UI Test Cases)
| Case ID | Loại Test | Tiền Đề | Các Bước Thực Hiện | Kết Quả Thực Tế | Trạng Thái |
|---|---|---|---|---|---|
| `TC-F005-01` | Happy Login | Màn hình Login | Nhập username `songquyen`, mật khẩu `123456` -> Bấm Đăng nhập | Vào thẳng Danh bạ, tab Cá nhân là Song Quyên | **PASS** |
| `TC-F005-02` | Quick Select | Màn hình Login | Mở danh sách chọn nhanh -> Chọn Thầy Chủ Nhiệm | Đăng nhập thành công với vai trò Giáo Viên | **PASS** |
| `TC-F005-03` | Wrong Password | Màn hình Login | Nhập username `songquyen`, mật khẩu `sai_pass` -> Bấm Đăng nhập | Báo lỗi mật khẩu không chính xác | **PASS** |
| `TC-F005-04` | Logout Flow | Đang trong app | Vào tab Hệ thống -> Bấm "Đăng Xuất / Đổi Người Dùng" | Thoát về màn hình Login ngay lập tức | **PASS** |

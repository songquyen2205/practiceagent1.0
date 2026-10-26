# F001: Quản Lý Hồ Sơ & Timeline Hành Trình (Profile & Career Timeline)

- **ID**: `P001-F001`
- **Phase**: G1 / G2 Ready for Dev
- **Status**: Completed (In-App Implemented)
- **Source**: REQ-001 (SRS.md)
- **Platforms**: Mobile (Android / iOS / Expo Web)

## 1. Actor & Điều Kiện Tiền Đề (Preconditions)
- **Actor**: Thành viên lớp CT1619 (hoặc thầy cô giáo).
- **Preconditions**: Thiết bị đã đăng nhập tài khoản thành viên; ứng dụng đã nạp AsyncStorage hoặc dữ liệu khởi tạo.

## 2. Luồng Nghiệp Vụ & Validation
- **Xem Hồ Sơ**: Chọn thành viên từ danh bạ -> Màn hình chi tiết hiển thị Monogram Initials, thông tin cá nhân, châm ngôn và danh sách mốc thời gian (Timeline).
- **Cập Nhật Hành Trình**:
  - Nhập/chọn loại mốc: `Học vấn` (Trường ĐH/CĐ) hoặc `Sự nghiệp` (Công ty, chức vụ).
  - Trạng thái: `Đang làm việc / Đang học` hoặc `Đã tốt nghiệp / Đã chuyển việc`.
  - Validation: Tiêu đề mốc không được rỗng, thời gian năm hợp lệ.
- **Lưu Trữ**: Ghi trực tiếp vào bộ nhớ cục bộ in-app (`AsyncStorage`), cập nhật ngay lập tức lên state màn hình.

## 3. Bảng Phủ Yêu Cầu (Coverage Matrix)
| Yêu Cầu / AC | Màn Hình / Thao Tác | Kết Quả Mong Đợi (Expected) | Mã Kiểm Tra (Check ID) | Bằng Chứng (Evidence) |
|---|---|---|---|---|
| `AC-01` | `MemberDetailScreen` | Hiển thị đầy đủ thông tin cá nhân và timeline học vấn/nghề nghiệp | `CHK-F001-01` | Pass (Render đúng 100%) |
| `AC-02` | `EditProfileScreen` | Cho phép tạo mốc mới hoặc cập nhật công ty/vị trí | `CHK-F001-02` | Pass (State cập nhật) |
| `AC-03` | In-app Persistence | Dữ liệu lưu bền vững qua các lần tắt/mở ứng dụng | `CHK-F001-03` | Pass (AsyncStorage test) |

## 4. Kịch Bản Kiểm Thử (Flow & UI Test Cases)
| Case ID | Loại Test | Tiền Đề / Dữ Liệu | Các Bước Thực Hiện | Kết Quả Thực Tế | Trạng Thái |
|---|---|---|---|---|---|
| `TC-F001-01` | Happy Path | Đăng nhập tài khoản `ct_10` | Vào tab Cá nhân -> Bấm "Chỉnh sửa" -> Thêm mốc mới -> Bấm "Lưu" | Mốc mới xuất hiện trên timeline | **PASS** |
| `TC-F001-02` | Validation | Màn hình Edit Profile | Để trống tiêu đề mốc -> Bấm "Lưu" | Báo lỗi yêu cầu nhập tiêu đề | **PASS** |
| `TC-F001-03` | Exception | Không có mốc nào | Xem chi tiết thành viên chưa có timeline | Hiển thị empty state tinh tế | **PASS** |

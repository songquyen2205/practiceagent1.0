# F003: Bảng Tin Sự Kiện & Thông Báo Lớp (Events Board)

- **ID**: `P001-F003`
- **Phase**: G1 / G2 Ready for Dev
- **Status**: Completed (In-App Implemented)
- **Source**: REQ-003 (SRS.md)
- **Platforms**: Mobile (Android / iOS / Expo Web)

## 1. Actor & Điều Kiện Tiền Đề
- **Actor**: Thành viên lớp CT1619.
- **Preconditions**: Đã đăng nhập vào ứng dụng.

## 2. Luồng Nghiệp Vụ & Validation
- **Xem Sự Kiện**: Danh sách sự kiện họp lớp, thăm thầy cô, kỷ niệm ra trường sắp xếp theo thời gian mới nhất.
- **Đăng Ký Tham Gia**: Bấm nút "Tham gia" -> Trạng thái đổi thành "Đã đăng ký", tăng số lượng người tham gia lên 1. Bấm lại để hủy đăng ký.
- **Tạo Sự Kiện Mới**: Mở modal form -> Nhập Tên sự kiện, Ngày diễn ra, Giờ, Địa điểm, Người tổ chức, Mô tả chi tiết -> Validation không được bỏ trống các trường bắt buộc (`*`).

## 3. Bảng Phủ Yêu Cầu (Coverage Matrix)
| Yêu Cầu / AC | Màn Hình / Thao Tác | Kết Quả Mong Đợi | Mã Kiểm Tra | Bằng Chứng |
|---|---|---|---|---|
| `AC-01` | `EventsScreen` | Hiển thị danh sách sự kiện đầy đủ thông tin ngày giờ, địa điểm | `CHK-F003-01` | Pass |
| `AC-02` | Nút Tham gia / Hủy | Cập nhật tức thì trạng thái tham gia và số lượng người | `CHK-F003-02` | Pass |
| `AC-03` | Modal Tạo Sự Kiện | Thêm sự kiện mới vào đầu danh sách sau khi submit hợp lệ | `CHK-F003-03` | Pass |

## 4. Kịch Bản Kiểm Thử (Flow & UI Test Cases)
| Case ID | Loại Test | Tiền Đề | Các Bước Thực Hiện | Kết Quả Thực Tế | Trạng Thái |
|---|---|---|---|---|---|
| `TC-F003-01` | Toggle Join | Sự kiện chưa tham gia | Bấm nút "Tham gia" | Nút chuyển xanh "Đã đăng ký", số lượng tăng 1 | **PASS** |
| `TC-F003-02` | Create Event | Modal tạo sự kiện | Nhập tên "Họp lớp 10 năm", ngày "20/11/2026", địa điểm "TP.HCM" -> Bấm Tạo | Sự kiện mới xuất hiện ở đầu danh sách | **PASS** |
| `TC-F003-03` | Validation | Modal tạo sự kiện | Để trống tên sự kiện và ngày -> Bấm Tạo | Hiển thị thông báo Alert thiếu thông tin | **PASS** |

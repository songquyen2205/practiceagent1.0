# F004: Lưu Trữ In-App & Sao Lưu Offline (Offline Storage & Sync)

- **ID**: `P001-F004`
- **Phase**: G1 / G2 Ready for Dev
- **Status**: Completed (In-App Implemented)
- **Source**: REQ-004 (SRS.md)
- **Platforms**: Mobile (Android / iOS / Expo Web)

## 1. Actor & Điều Kiện Tiền Đề
- **Actor**: Toàn bộ thành viên lớp và Ban Cán Sự.
- **Preconditions**: Ứng dụng đã khởi tạo dữ liệu cục bộ.

## 2. Luồng Nghiệp Vụ & Validation
- **Cơ chế Offline-First**: 100% dữ liệu được đọc/ghi cục bộ in-app qua `AsyncStorage`, không phụ thuộc internet khi sử dụng thường nhật.
- **Xuất Dữ Liệu (Export JSON)**: Serialize toàn bộ danh bạ, hồ sơ, sự kiện ra chuỗi JSON format chuẩn để người dùng sao chép gửi qua Zalo/Messenger.
- **Nhập Dữ Liệu (Import JSON)**: Dán chuỗi JSON nhận được -> Validation cấu trúc dữ liệu (`members` array) -> Cập nhật đè dữ liệu mới vào máy.
- **Khôi Phục Gốc (Reset)**: Xóa các chỉnh sửa tạm và tải lại bộ dữ liệu 24 thành viên CT1619 nguyên bản.

## 3. Bảng Phủ Yêu Cầu (Coverage Matrix)
| Yêu Cầu / AC | Màn Hình / Thao Tác | Kết Quả Mong Đợi | Mã Kiểm Tra | Bằng Chứng |
|---|---|---|---|---|
| `AC-01` | `SettingsScreen` | Nút Xuất JSON hiển thị chuỗi JSON hoàn chỉnh | `CHK-F004-01` | Pass |
| `AC-02` | Hộp Nhập JSON | Nhập JSON hợp lệ cập nhật thành công số lượng thành viên | `CHK-F004-02` | Pass |
| `AC-03` | Nút Khôi Phục | Đưa dữ liệu về 24 bạn CT1619 nguyên bản | `CHK-F004-03` | Pass |

## 4. Kịch Bản Kiểm Thử (Flow & UI Test Cases)
| Case ID | Loại Test | Tiền Đề | Các Bước Thực Hiện | Kết Quả Thực Tế | Trạng Thái |
|---|---|---|---|---|---|
| `TC-F004-01` | Export Test | Có 25 thành viên trong máy | Bấm "Xuất JSON Sao Lưu" | Hộp văn bản hiện chuỗi JSON hợp lệ | **PASS** |
| `TC-F004-02` | Import Valid | Chuỗi JSON xuất từ máy khác | Dán vào ô nhập -> Bấm "Áp Dụng Dữ Liệu" | Thông báo thành công và cập nhật danh bạ | **PASS** |
| `TC-F004-03` | Import Invalid | Chuỗi văn bản tùy ý không phải JSON | Dán vào ô nhập -> Bấm "Áp Dụng Dữ Liệu" | Báo lỗi chuỗi định dạng không hợp lệ | **PASS** |

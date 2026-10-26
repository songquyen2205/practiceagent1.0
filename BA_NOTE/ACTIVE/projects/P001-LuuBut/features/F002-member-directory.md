# F002: Danh Bạ Thành Viên & Sổ Lưu Bút (Member Directory)

- **ID**: `P001-F002`
- **Phase**: G1 / G2 Ready for Dev
- **Status**: Completed (In-App Implemented)
- **Source**: REQ-002 (SRS.md)
- **Platforms**: Mobile (Android / iOS / Expo Web)

## 1. Actor & Điều Kiện Tiền Đề
- **Actor**: Toàn bộ thành viên lớp CT1619 và Thầy Cô.
- **Preconditions**: Đã đăng nhập vào ứng dụng.

## 2. Luồng Nghiệp Vụ & Validation
- **Danh sách thẻ**: Hiển thị 24 bạn học và Thầy Chủ Nhiệm dưới dạng thẻ Modern Clean iOS (Monogram avatar, họ tên, chức vụ hiện tại, trường ĐH).
- **Bộ lọc Segmented Control**: `Tất cả` | `Thầy Cô` | `Học Sinh`.
- **Tìm kiếm thông minh**: Gõ từ khóa tìm kiếm theo Tên, Biệt danh, Chuyên ngành, Nơi làm việc, Thành phố hoặc nội dung mốc sự nghiệp.
- **Xem chi tiết**: Bấm vào thẻ để chuyển sang `MemberDetailScreen`.

## 3. Bảng Phủ Yêu Cầu (Coverage Matrix)
| Yêu Cầu / AC | Màn Hình / Thao Tác | Kết Quả Mong Đợi | Mã Kiểm Tra | Bằng Chứng |
|---|---|---|---|---|
| `AC-01` | `MembersScreen` | Liệt kê đầy đủ 24 bạn + Thầy Chủ Nhiệm | `CHK-F002-01` | Pass (Đủ 25 thẻ) |
| `AC-02` | Segmented Control | Lọc đúng danh mục Thầy Cô / Học Sinh | `CHK-F002-02` | Pass (Filter chính xác) |
| `AC-03` | Ô tìm kiếm Search | Trả về kết quả khớp tức thì khi gõ từ khóa | `CHK-F002-03` | Pass (Tìm kiếm đa trường) |

## 4. Kịch Bản Kiểm Thử (Flow & UI Test Cases)
| Case ID | Loại Test | Tiền Đề | Các Bước Thực Hiện | Kết Quả Thực Tế | Trạng Thái |
|---|---|---|---|---|---|
| `TC-F002-01` | Filter Flow | Danh bạ đang hiển thị Tất cả | Bấm vào tab "Thầy Cô" | Chỉ còn 1 thẻ Thầy Chủ Nhiệm | **PASS** |
| `TC-F002-02` | Search Flow | Danh bạ đầy đủ | Nhập "Egitech" vào ô tìm kiếm | Trả về thẻ Song Quyên | **PASS** |
| `TC-F002-03` | Empty Search | Danh bạ đầy đủ | Nhập từ khóa không tồn tại "xyz123" | Hiển thị thông báo không tìm thấy kết quả | **PASS** |

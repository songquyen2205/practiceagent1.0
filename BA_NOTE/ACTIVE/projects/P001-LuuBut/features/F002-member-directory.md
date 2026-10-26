# F002: Danh Bạ Lưu Bút & Tra Cứu Thành Viên (Member Directory & Search)

- **ID**: `P001-F002`
- **Phase**: G1 / G2 Ready for Dev
- **Status**: Completed (In-App Implemented)
- **Source**: REQ-002 (SRS.md)
- **Platforms**: Mobile (Android / iOS / Expo Web)

## 1. Actor & Điều Kiện Tiền Đề
- **Actor**: Thầy cô, thành viên lớp CT1619.
- **Preconditions**: Dữ liệu 24 thành viên được khởi tạo từ bộ nhớ in-app.

## 2. Luồng Nghiệp Vụ & Validation
- **Hiển Thị Danh Sách**: Thể hiện dạng card Polaroid / kẹp sổ tay phong cách Retro Nostalgic.
- **Tìm Kiếm / Lọc**:
  - Tìm theo tên thành viên.
  - Tìm theo tên công ty hoặc trường đại học.
  - Lọc theo ngành nghề / vai trò.
- **Tương Tác**: Bấm vào card thành viên để chuyển sang màn hình Chi Tiết Lưu Bút (`F001`).

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)
- [x] **AC-01**: Tải đủ 24 hồ sơ thành viên chuẩn của lớp CT1619.
- [x] **AC-02**: Tìm kiếm tức thì theo từ khóa không phân biệt hoa thường.
- [x] **AC-03**: Giao diện chuẩn phong cách Nostalgic Fresh, mượt mà trên cả điện thoại và web.

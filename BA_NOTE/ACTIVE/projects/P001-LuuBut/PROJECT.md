# PROJECT: P001-LuuBut — Sổ Lưu Bút Kỷ Yếu Lớp Học (CT1619)

- **ID**: `P001-LuuBut`
- **Mục tiêu**: Cung cấp ứng dụng mobile & web gọn nhẹ, phong cách Modern Clean iOS / Notion Canvas, hoạt động offline độc lập (Zero-Backend) giúp lưu giữ trọn vẹn hành trình trưởng thành, học vấn, nghề nghiệp và kỷ niệm của tập thể lớp CT1619 cùng Thầy Chủ Nhiệm.
- **Actor chính**:
  1. `Học sinh`: Thành viên lớp CT1619, cập nhật hồ sơ cá nhân, xem danh bạ bạn bè, đăng ký sự kiện họp lớp.
  2. `Ban cán sự / Lớp trưởng`: Tạo thông báo sự kiện, điều phối xuất/nhập gói dữ liệu lớp.
  3. `Thầy Chủ Nhiệm / Giáo viên`: Đọc thông tin, tra cứu vị trí làm việc và châm ngôn học trò mà không bị giới hạn bởi trí nhớ theo năm tháng.
- **Phạm vi (Scope Boundary)**:
  - **In-Scope**: Xác thực danh tính in-app (Username/Password), Quản lý hồ sơ & timeline học vấn/sự nghiệp, Danh bạ thành viên kèm bộ lọc, Bảng tin sự kiện lớp, Cơ chế sao lưu JSON offline, Giao diện Modern Clean iOS.
  - **Out-of-Scope**: Máy chủ backend tập trung, thanh toán trực tuyến, gửi email/SMS thật, phân quyền RBAC phức tạp cấp doanh nghiệp.
- **Quyết định liên quan**: Xem [DECISIONS.md](file:///C:/Users/Song%20Quyen/LuuBut_App/BA_NOTE/ACTIVE/projects/P001-LuuBut/DECISIONS.md) (`DEC-001`, `DEC-002`, `DEC-003`).

---

## Platform Matrix (Ma Trận Nền Tảng)
| Platform | Actors | Feature / Flow | UI Baseline / Design Token | Entry Point / Build Target | Coverage Status | Ngoại Lệ Được Duyệt |
|---|---|---|---|---|---|---|
| **Web Browser (Staging)** | Toàn bộ thành viên & Thầy cô | F001 - F005 (Đăng nhập, Danh bạ, Timeline, Sự kiện, Sao lưu) | Modern Clean iOS / Notion Canvas (`#F8F9FA`, `#FFFFFF`) | `https://songquyen2205.github.io/practiceagent1.0/app/index.html` | 100% (8/8 cases pass) | Không dùng server API; chạy Client-side Bundle |
| **Mobile Web (Responsive)** | Học sinh dùng điện thoại | Đầy đủ 5 module, tối ưu màn hình cảm ứng di động | Viewport 390x844 (iOS System font, Touch target ≥ 44px) | `app/index.html` (Mobile viewport) | 100% | Tự động thích ứng kích thước thiết bị |
| **Native Mobile (Android / iOS)** | Cài đặt trực tiếp qua Expo Go | Chạy độc lập qua Expo SDK 58 | React Native Core Components, AsyncStorage native | `mobile/` (`npx expo start`) | Sẵn sàng mã nguồn | Chưa phát hành lên App Store/CH Play theo scope |

---

## Feature Registry
| Feature ID | Tên Tính Năng | SRS Requirement | File Đặc Tả | Trạng Thái |
|---|---|---|---|---|
| `F001` | Quản lý Hồ sơ & Timeline Hành trình | `REQ-001` | [F001-profile-timeline.md](features/F001-profile-timeline.md) | Ready / Implemented |
| `F002` | Danh bạ Thành viên & Thẻ thông tin | `REQ-002` | [F002-member-directory.md](features/F002-member-directory.md) | Ready / Implemented |
| `F003` | Bảng tin Sự kiện & Thông báo | `REQ-003` | [F003-events-board.md](features/F003-events-board.md) | Ready / Implemented |
| `F004` | Sao lưu Offline & Xuất/Nhập JSON | `REQ-004` | [F004-offline-sync.md](features/F004-offline-sync.md) | Ready / Implemented |
| `F005` | Đăng nhập & Định danh Thành viên | `REQ-005` | [F005-user-auth.md](features/F005-user-auth.md) | Ready / Implemented |

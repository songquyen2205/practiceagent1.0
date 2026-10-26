# Hướng Dẫn Chạy & Trải Nghiệm App Sổ Lưu Bút Kỷ Yếu (LuuBut Mobile)

Dự án đã được thiết kế và xây dựng theo chuẩn **BA Harness v3.0** tại `C:\Users\Song Quyen\BA_AGENT_FRAMEWORK`.

## 1. Vị trí mã nguồn
- Thư mục ứng dụng: `C:\Users\Song Quyen\.gemini\antigravity\scratch\LuuBut_App\mobile`
- Tài liệu đặc tả BA Harness: `C:\Users\Song Quyen\.gemini\antigravity\scratch\LuuBut_App\BA_NOTE`

## 2. Cách khởi chạy ứng dụng
Mở terminal PowerShell và thực hiện:

```powershell
cd "C:\Users\Song Quyen\.gemini\antigravity\scratch\LuuBut_App\mobile"
npx expo start
```

### Các tuỳ chọn trải nghiệm:
1. **Chạy trực tiếp trên điện thoại thật (iOS / Android)**:
   - Cài app **Expo Go** trên App Store hoặc Google Play Store.
   - Quét mã QR hiển thị trong terminal bằng camera (iOS) hoặc app Expo Go (Android). Cả điện thoại và máy tính cùng chung một mạng Wifi.
2. **Chạy trên Trình Duyệt Web**:
   - Khi terminal hiện menu, ấn phím `w` để mở phiên bản Web ngay trên trình duyệt (Chrome/Edge).
3. **Chạy trên Máy ảo Android / iOS Simulator**:
   - Ấn phím `a` (cho Android emulator) hoặc `i` (cho iOS simulator).

## 3. Các tính năng chính đã hoàn thiện
1. **Trang Sổ Lưu Bút Kỷ Yếu (📖 Lưu Bút)**:
   - Danh sách thành viên lớp học phong cách retro notebook (washi tape, polaroid badge).
   - Bộ lọc Thầy Cô giáo / Cựu Học Sinh.
   - Tìm kiếm tức thời theo tên bạn bè, trường ĐH, công ty, ngành nghề.
2. **Hành Trình Của Tôi & Cập Nhật (🌱 Hành Trình Của Tôi)**:
   - Xem timeline chi tiết các chặng đường: Trường ĐH nào, ngành gì, đã và đang làm việc ở công ty nào.
   - Nút **"✏️ Chỉnh sửa"** cho phép cập nhật ngay thông tin khi chuyển công ty, đổi ngành hoặc chuyển nơi ở. Thêm mốc mới vào cây timeline.
3. **Bảng Tin Sự Kiện Lớp (📌 Sự Kiện Lớp)**:
   - Xem các buổi họp lớp, lịch hẹn thăm thầy cô 20/11 hoặc cà phê họp mặt.
   - Đăng thông báo sự kiện mới cho lớp và thầy cô cùng biết.
   - Nút bấm tham gia/huỷ tham gia (+ Tham gia / ✓ Tôi sẽ tham gia).
4. **Cơ Chế Không Backend (⚙️ Đồng Bộ In-App)**:
   - Toàn bộ dữ liệu lưu trữ offline trên máy bằng AsyncStorage.
   - Hỗ trợ nút **"Xuất Dữ Liệu"** sinh mã JSON để gửi cho các bạn hoặc sao chép sang máy thầy cô.
   - Hỗ trợ **"Nhập Cập Nhật"** để nạp dữ liệu mới nhất mà lớp đã chia sẻ.

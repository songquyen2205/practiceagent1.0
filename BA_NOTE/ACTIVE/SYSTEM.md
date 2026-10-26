# SYSTEM: Kiến Trúc Kỹ Thuật Ứng Dụng Sổ Lưu Bút (CT1619)

- **Workspace**: `C:\Users\Song Quyen\LuuBut_App`
- **Mã nguồn**: `mobile/` (React Native Expo SDK 58, TypeScript 100%)
- **Môi trường triển khai (Staging/Live)**: GitHub Pages (`https://songquyen2205.github.io/practiceagent1.0/`)
- **Kiến trúc dữ liệu**: Zero-Backend Offline First, Client-side persistence qua `@react-native-async-storage/async-storage` (hoặc LocalStorage fallback trên Web).

---

## 1. Cấu Trúc Module & Mã Nguồn
```text
mobile/
├── App.tsx                     # Entry point & Bộ điều hướng Session / Bottom Tabs
├── src/
│   ├── types/                  # Data contracts (Member, ClassEvent, Timeline, LuuButData)
│   ├── theme/                  # Design tokens Modern Clean iOS (Bảng màu canvas, Spacing, Typography)
│   ├── services/
│   │   └── storage.ts          # Storage engine & bộ dữ liệu hạt nhân 24 bạn CT1619 + Thầy Cô
│   ├── components/
│   │   ├── MemberCard.tsx      # Thẻ thành viên Monogram Initials tối giản
│   │   └── TimelineView.tsx    # Cột mốc hành trình học vấn & sự nghiệp
│   └── screens/
│       ├── LoginScreen.tsx     # Xác thực Username & Password in-app
│       ├── MembersScreen.tsx   # Danh bạ tìm kiếm & lọc Segmented Control
│       ├── MemberDetailScreen.tsx # Trang cá nhân chi tiết & lời chúc
│       ├── EditProfileScreen.tsx  # Chỉnh sửa thông tin & mốc hành trình
│       ├── EventsScreen.tsx    # Bảng tin sự kiện & tạo cuộc họp mặt
│       └── SettingsScreen.tsx  # Cài đặt, Đăng xuất & Sao lưu/Khôi phục JSON
```

---

## 2. Quy Định Môi Trường & Giới Hạn Kỹ Thuật
- **Không có Secrets / API Keys**: Ứng dụng không sử dụng bất kỳ secret key hay token máy chủ nào, an toàn 100% cho mã nguồn công khai.
- **Quy tắc phân vùng (Execution Zones)**:
  - `DEV`: Tuyệt đối read-only, không can thiệp production.
  - `BA_NOTE`: Khu vực lưu trữ hồ sơ nghiệp vụ canonical và biên bản thẩm định.
  - `LOCAL_WORKTREE`: Thư mục biên dịch test `mobile/dist/`.
  - `STAGING`: Thư mục `app/` và `docs_showcase/app/` được host trên GitHub Pages.

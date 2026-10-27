export type RoleType = 'student' | 'teacher';

export interface TimelineMilestone {
  id: string;
  type: 'education' | 'career' | 'life';
  title: string;          // Ví dụ: ĐH Bách Khoa TP.HCM hoặc Công ty VNG
  subtitle: string;       // Ví dụ: Ngành Công nghệ Phần mềm hoặc Senior Product Manager
  period: string;         // Ví dụ: 2018 - 2022 hoặc 2022 - Hiện tại
  location?: string;      // TP.HCM, Hà Nội, Singapore...
  description?: string;   // Mô tả ngắn hoặc kỷ niệm
  isCurrent?: boolean;    // Đang học / Đang làm
}

export interface PhotoItem {
  id: string;
  url: string;
  caption?: string;
  year?: string;
}

export interface Member {
  id: string;
  name: string;
  nickname?: string;
  username?: string;
  password?: string;
  avatarUrl?: string;     // Ảnh chân dung chất lượng cao
  avatarText: string;     // Chữ viết tắt fallback
  avatarBgColor: string;  // Màu nền fallback
  role: RoleType;         // Thầy cô hoặc Học sinh
  subjectOrMajor?: string;// Giáo viên bộ môn gì hoặc Ngành nghề chính
  phone?: string;
  email?: string;
  zaloOrSocial?: string;
  currentCompany?: string;// Nơi làm việc hiện tại
  currentCity?: string;   // Nơi ở hiện tại
  memorableQuote: string; // Câu nói kỷ niệm / Lời gửi thầy cô và lớp
  timelines: TimelineMilestone[];
  photos?: PhotoItem[];   // Bộ sưu tập ảnh cá nhân / kỷ niệm
  updatedAt: string;
}

export interface ClassEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  organizerName: string;
  attendeesCount: number;
  isRegistered?: boolean;
  isJoined?: boolean;
  category: 'reunion' | 'visit_teacher' | 'anniversary' | 'informal';
  imageUrl?: string;      // Ảnh bìa sự kiện
  createdAt: string;
}

export interface LuuButData {
  className: string;
  schoolYear: string;
  homeroomTeacher: string;
  members: Member[];
  events: ClassEvent[];
  myProfileId: string;
  classPhotos?: PhotoItem[]; // Ảnh chung của tập thể lớp
}

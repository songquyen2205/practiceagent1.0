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

export interface Member {
  id: string;
  name: string;
  nickname?: string;
  avatarText: string;     // Chữ viết tắt hoặc Emoji
  avatarBgColor: string;  // Màu nền ấm áp
  role: RoleType;         // Thầy cô hoặc Học sinh
  subjectOrMajor?: string;// Giáo viên bộ môn gì hoặc Ngành nghề chính
  phone?: string;
  email?: string;
  zaloOrSocial?: string;
  currentCompany?: string;// Nơi làm việc hiện tại
  currentCity?: string;   // Nơi ở hiện tại
  memorableQuote: string; // Câu nói kỷ niệm / Lời gửi thầy cô và lớp
  timelines: TimelineMilestone[];
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
  category: 'reunion' | 'visit_teacher' | 'anniversary' | 'informal';
  createdAt: string;
}

export interface LuuButData {
  className: string;
  schoolYear: string;
  homeroomTeacher: string;
  members: Member[];
  events: ClassEvent[];
  myProfileId: string;
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LuuButData, Member, ClassEvent } from '../types';

const STORAGE_KEY = '@luubut_class_data_ct1619_v2';

export const INITIAL_DATA: LuuButData = {
  className: 'Tập thể Lớp CT1619',
  schoolYear: 'Kỷ Niệm Niên Khoá 2016 - 2019',
  homeroomTeacher: 'Thầy Chủ Nhiệm Kính Yêu',
  myProfileId: 'ct_10', // Song Quyên
  members: [
    // 1. Thầy Chủ Nhiệm
    {
      id: 'ct_teacher',
      name: 'Thầy Chủ Nhiệm (Teacher)',
      nickname: 'Người Thầy Kính Yêu 🌸',
      avatarText: '👨‍🏫',
      avatarBgColor: '#FDE2D1',
      role: 'teacher',
      subjectOrMajor: 'Giáo viên Chủ nhiệm CT1619',
      phone: '0903 888 777',
      email: 'thaychunhiem.ct1619@gmail.com',
      zaloOrSocial: 'Zalo: Thầy Chủ Nhiệm',
      currentCompany: 'Trường THPT Chuyên (Đã về hưu)',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Thầy cô ngày càng lớn tuổi, trí nhớ sẽ dần suy giảm nên các con thông cảm nhé ❤️ Các con đi đâu, làm gì, nhớ đoàn kết và giúp đỡ nhau.',
      timelines: [
        {
          id: 'tl_tc1',
          type: 'education',
          title: 'ĐH Sư Phạm TP.HCM',
          subtitle: 'Cử nhân Sư Phạm Toán / Tin',
          period: '1985 - 1989',
          location: 'TP.HCM'
        },
        {
          id: 'tl_tc2',
          type: 'career',
          title: 'Trường THPT',
          subtitle: 'Giáo viên Chủ nhiệm CT1619',
          period: '2016 - 2019',
          location: 'TP.HCM',
          description: 'Khoá học sinh năng động, nhiều kỷ niệm khó quên nhất.'
        },
        {
          id: 'tl_tc3',
          type: 'life',
          title: 'An dưỡng tại gia',
          subtitle: 'Làm vườn & Theo dõi hành trình học trò',
          period: '2023 - Hiện tại',
          location: 'TP.HCM',
          isCurrent: true,
          description: 'Mỗi lần nghe tin các con thành công là thầy mừng lắm!'
        }
      ],
      updatedAt: '2026-10-25'
    },
    // 2. Song Quyên (Lớp trưởng CT1619)
    {
      id: 'ct_10',
      name: 'Song Quyên',
      nickname: 'Quyên Lớp Trưởng 🌸',
      avatarText: '👩‍💼',
      avatarBgColor: '#E0E7FF',
      role: 'student',
      subjectOrMajor: 'Business Analyst (BA)',
      phone: '0912 200 500',
      email: 'songquyen.ct1619@gmail.com',
      zaloOrSocial: 'FB / Zalo: Song Quyên',
      currentCompany: 'Egitech',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Lớp trưởng điểm danh: CT1619 mãi gắn kết! Thầy cô và các bạn cần kết nối hay họp lớp cứ ới Quyên nhé ❤️',
      timelines: [
        {
          id: 'tl_sq1',
          type: 'education',
          title: 'Đại Học Quốc Gia TP.HCM',
          subtitle: 'Cử nhân Hệ thống Thông tin (MIS)',
          period: '2019 - 2023',
          location: 'TP.HCM'
        },
        {
          id: 'tl_sq2',
          type: 'career',
          title: 'Egitech',
          subtitle: 'Business Analyst (BA)',
          period: '2023 - Hiện tại',
          location: 'TP.HCM',
          isCurrent: true,
          description: 'Phân tích yêu cầu nghiệp vụ và giải pháp phần mềm.'
        }
      ],
      updatedAt: '2026-10-26'
    },
    // 3. Minh Quân
    {
      id: 'ct_01',
      name: 'Minh Quân',
      nickname: 'Quân Cận 🤓',
      avatarText: '🧑‍💻',
      avatarBgColor: '#D8E8F5',
      role: 'student',
      subjectOrMajor: 'Kỹ sư Phần mềm',
      phone: '0901 111 222',
      email: 'minhquan.ct@tech.com',
      currentCompany: 'Shopee Vietnam',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Lớp trưởng Quyên hú họp lớp là Quân có mặt liền!',
      timelines: [
        { id: 'tl_mq1', type: 'education', title: 'ĐH Bách Khoa TP.HCM', subtitle: 'Khoa học Máy tính', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_mq2', type: 'career', title: 'Shopee Vietnam', subtitle: 'Backend Engineer', period: '2023 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-24'
    },
    // 4. Khánh Hưng
    {
      id: 'ct_02',
      name: 'Khánh Hưng',
      nickname: 'Hưng Đô La 💵',
      avatarText: '👨‍💼',
      avatarBgColor: '#FEF3C7',
      role: 'student',
      subjectOrMajor: 'Tài chính - Ngân hàng & Đầu tư',
      currentCompany: 'MB Bank - Khối Nguồn vốn',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Cần tư vấn tài chính hay mở tài khoản số đẹp cứ ới Hưng nhé cả lớp!',
      timelines: [
        { id: 'tl_kh1', type: 'education', title: 'ĐH Kinh Tế TP.HCM (UEH)', subtitle: 'Tài chính Doanh nghiệp', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_kh2', type: 'career', title: 'Ngân hàng Quân Đội (MB)', subtitle: 'Chuyên viên Quản trị Danh mục Đầu tư', period: '2023 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-22'
    },
    // 5. Trung Quân
    {
      id: 'ct_03',
      name: 'Trung Quân',
      nickname: 'Quân Kính Cận 👓',
      avatarText: '👨‍🔬',
      avatarBgColor: '#E2E8F0',
      role: 'student',
      subjectOrMajor: 'Trí tuệ Nhân tạo & Xử lý Ảnh số',
      currentCompany: 'VinAI Research',
      currentCity: 'Hà Nội & TP.HCM',
      memorableQuote: 'Chúc thầy cô và các bạn luôn dồi dào sức khoẻ và giữ vững đam mê.',
      timelines: [
        { id: 'tl_tq1', type: 'education', title: 'ĐH Khoa Học Tự Nhiên TP.HCM', subtitle: 'Toán - Tin học', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_tq2', type: 'career', title: 'VinAI Research Lab', subtitle: 'Computer Vision Research Fellow', period: '2023 - Hiện tại', location: 'Hà Nội', isCurrent: true }
      ],
      updatedAt: '2026-10-20'
    },
    // 6. Thu Ngân
    {
      id: 'ct_04',
      name: 'Thu Ngân',
      nickname: 'Ngân Thủ Quỹ 👛',
      avatarText: '👩‍💼',
      avatarBgColor: '#FCE7F3',
      role: 'student',
      subjectOrMajor: 'Kiểm toán & Kế toán Quản trị',
      currentCompany: 'KPMG Vietnam',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Quỹ lớp năm xưa vẫn còn nhớ từng đồng trà sữa tan trường.',
      timelines: [
        { id: 'tl_tn1', type: 'education', title: 'ĐH Ngoại Thương CS2 (FTU)', subtitle: 'Kế toán - Kiểm toán', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_tn2', type: 'career', title: 'KPMG Vietnam', subtitle: 'Senior Audit Associate', period: '2023 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-21'
    },
    // 7. Bảo Thiên
    {
      id: 'ct_05',
      name: 'Bảo Thiên',
      nickname: 'Thiên Guitar 🎸',
      avatarText: '🧑‍🎤',
      avatarBgColor: '#FEE2E2',
      role: 'student',
      subjectOrMajor: 'Sản xuất Âm nhạc & Truyền thông Âm thanh',
      currentCompany: 'SoundSpace Studio',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Âm nhạc sẽ luôn kết nối những trái tim CT1619.',
      timelines: [
        { id: 'tl_bt1', type: 'education', title: 'Nhạc Viện TP.HCM', subtitle: 'Sáng tác Âm nhạc & Phối khí', period: '2019 - 2024', location: 'TP.HCM' },
        { id: 'tl_bt2', type: 'career', title: 'SoundSpace Studio', subtitle: 'Music Producer', period: '2024 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-18'
    },
    // 8. Anh Huynh
    {
      id: 'ct_06',
      name: 'Anh Huynh',
      nickname: 'Huynh Tỉ Mỉ 📐',
      avatarText: '👨‍🎨',
      avatarBgColor: '#ECFCCB',
      role: 'student',
      subjectOrMajor: 'Kiến trúc Công trình & Thiết kế Nội thất',
      currentCompany: 'Archetype Group',
      currentCity: 'Đà Nẵng & TP.HCM',
      memorableQuote: 'Mỗi ngôi nhà tớ xây đều mang bóng dáng hành lang lớp học xưa.',
      timelines: [
        { id: 'tl_ah1', type: 'education', title: 'ĐH Kiến Trúc TP.HCM', subtitle: 'Kiến trúc sư Công trình', period: '2019 - 2024', location: 'TP.HCM' },
        { id: 'tl_ah2', type: 'career', title: 'Archetype Vietnam', subtitle: 'Project Architect', period: '2024 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-19'
    },
    // 9. Bích Ngọc
    {
      id: 'ct_07',
      name: 'Bích Ngọc',
      nickname: 'Ngọc Dược Sĩ 💊',
      avatarText: '👩‍⚕️',
      avatarBgColor: '#CCFBF1',
      role: 'student',
      subjectOrMajor: 'Dược Học Lâm Sàng',
      currentCompany: 'Bệnh viện Chợ Rẫy',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Thầy và các bạn nhớ giữ gìn sức khoẻ, ăn uống điều độ nhé!',
      timelines: [
        { id: 'tl_bn1', type: 'education', title: 'ĐH Y Dược TP.HCM', subtitle: 'Dược sĩ Đại học (5 năm)', period: '2019 - 2024', location: 'TP.HCM' },
        { id: 'tl_bn2', type: 'career', title: 'Khoa Dược - BV Chợ Rẫy', subtitle: 'Dược sĩ Lâm sàng', period: '2024 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-23'
    },
    // 10. Bảo Trâm
    {
      id: 'ct_08',
      name: 'Bảo Trâm',
      nickname: 'Trâm Hát Hay 🎤',
      avatarText: '👩‍🎤',
      avatarBgColor: '#FFE4E6',
      role: 'student',
      subjectOrMajor: 'Quan hệ Công chúng & Truyền thông Tiếp thị',
      currentCompany: 'Dentsu Redder Agency',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Những bài hát ngày bế giảng 2019 vẫn còn vang mãi trong lòng.',
      timelines: [
        { id: 'tl_btr1', type: 'education', title: 'ĐH Khoa Học Xã Hội & Nhân Văn', subtitle: 'Báo chí & Truyền thông', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_btr2', type: 'career', title: 'Dentsu Redder', subtitle: 'Senior PR Specialist', period: '2023 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-21'
    },
    // 11. Duy Khang
    {
      id: 'ct_09',
      name: 'Duy Khang',
      nickname: 'Khang Lực Sĩ 🏋️',
      avatarText: '🏃‍♂️',
      avatarBgColor: '#E0F2FE',
      role: 'student',
      subjectOrMajor: 'Quản trị Logistics & Chuỗi Cung Ứng',
      currentCompany: 'Maersk Logistics Vietnam',
      currentCity: 'Bình Dương & TP.HCM',
      memorableQuote: 'Hàng hoá có thể đi vòng quanh thế giới, nhưng trái tim luôn ở CT1619.',
      timelines: [
        { id: 'tl_dk1', type: 'education', title: 'ĐH Giao Thông Vận Tải TP.HCM', subtitle: 'Logistics Quốc Tế', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_dk2', type: 'career', title: 'A.P. Moller - Maersk', subtitle: 'Supply Chain Operations Lead', period: '2023 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-22'
    },
    // 12. Xuân Thuỳ
    {
      id: 'ct_11',
      name: 'Xuân Thuỳ',
      nickname: 'Thuỳ Dịu Dàng 🌸',
      avatarText: '👩‍🏫',
      avatarBgColor: '#FDF2F8',
      role: 'student',
      subjectOrMajor: 'Giảng viên Tiếng Anh & Ngôn ngữ Ứng dụng',
      currentCompany: 'Trung tâm Ngoại ngữ VUS',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Mong được dạy tiếng Anh miễn phí cho con em của lớp mình sau này!',
      timelines: [
        { id: 'tl_xt1', type: 'education', title: 'ĐH Sư Phạm TP.HCM', subtitle: 'Sư phạm Tiếng Anh (IELTS 8.5)', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_xt2', type: 'career', title: 'VUS Vietnam', subtitle: 'IELTS Lead Instructor', period: '2023 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-24'
    },
    // 13. Thu Hằng
    {
      id: 'ct_12',
      name: 'Thu Hằng',
      nickname: 'Hằng Bánh Mì 🥐',
      avatarText: '👩‍🍳',
      avatarBgColor: '#FEF9C3',
      role: 'student',
      subjectOrMajor: 'Nghệ thuật Ẩm thực & Quản lý Nhà hàng Khách sạn',
      currentCompany: 'Tiệm Bánh Petite Bakery',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Hôm nào họp lớp bánh ngọt và trà hoa cứ để Hằng chuẩn bị nhé!',
      timelines: [
        { id: 'tl_th1', type: 'education', title: 'ĐH Hoa Sen', subtitle: 'Quản trị Khách sạn Quốc tế', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_th2', type: 'career', title: 'Petite Artisan Bakery', subtitle: 'Founder & Head Pastry Chef', period: '2023 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-17'
    },
    // 14. Địch Long
    {
      id: 'ct_13',
      name: 'Địch Long',
      nickname: 'Long Tướng Quân ⚡',
      avatarText: '👨‍✈️',
      avatarBgColor: '#DBEAFE',
      role: 'student',
      subjectOrMajor: 'Hàng không Dân dụng & Phi công Thương mại',
      currentCompany: 'Vietnam Airlines',
      currentCity: 'Hà Nội & TP.HCM',
      memorableQuote: 'Bay trên bầu trời vẫn luôn ngắm nhìn thành phố nơi có mái trường CT1619.',
      timelines: [
        { id: 'tl_dl1', type: 'education', title: 'Học Viện Hàng Không Việt Nam', subtitle: 'Kỹ thuật Hàng không', period: '2019 - 2022', location: 'TP.HCM' },
        { id: 'tl_dl2', type: 'career', title: 'Vietnam Airlines', subtitle: 'First Officer (Phi công Phụ A321)', period: '2024 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-25'
    },
    // 15. Cao Cường
    {
      id: 'ct_14',
      name: 'Cao Cường',
      nickname: 'Cường IT 💻',
      avatarText: '👨‍💻',
      avatarBgColor: '#E0E7FF',
      role: 'student',
      subjectOrMajor: 'An ninh Mạng & An toàn Thông tin (Cybersecurity)',
      currentCompany: 'Tập đoàn Viettel',
      currentCity: 'Hà Nội',
      memorableQuote: 'Bảo mật hệ thống thông tin cho quốc gia và giữ bí mật lưu bút cho lớp.',
      timelines: [
        { id: 'tl_cc1', type: 'education', title: 'Học Viện Công Nghệ Bưu Chính Viễn Thông', subtitle: 'An toàn Thông tin', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_cc2', type: 'career', title: 'Viettel Cyber Security', subtitle: 'Security Specialist', period: '2023 - Hiện tại', location: 'Hà Nội', isCurrent: true }
      ],
      updatedAt: '2026-10-20'
    },
    // 16. Đức Tâm
    {
      id: 'ct_15',
      name: 'Đức Tâm',
      nickname: 'Tâm Bác Sĩ 🩺',
      avatarText: '👨‍⚕️',
      avatarBgColor: '#CFFAFE',
      role: 'student',
      subjectOrMajor: 'Bác sĩ Đa khoa / Ngoại Chấn thương',
      currentCompany: 'Bệnh viện Nhân Dân 115',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Thầy cô và các bạn có đau nhức xương khớp gì alo Tâm kiểm tra liền nhé!',
      timelines: [
        { id: 'tl_dt1', type: 'education', title: 'ĐH Y Khoa Phạm Ngọc Thạch', subtitle: 'Bác sĩ Đa khoa (6 năm)', period: '2019 - 2025', location: 'TP.HCM' },
        { id: 'tl_dt2', type: 'career', title: 'BV Nhân Dân 115', subtitle: 'Bác sĩ Nội trú Ngoại khoa', period: '2025 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-26'
    },
    // 17. Sơn Bách
    {
      id: 'ct_16',
      name: 'Sơn Bách',
      nickname: 'Bách Bách Khoa ⚙️',
      avatarText: '🧑‍🔧',
      avatarBgColor: '#FED7AA',
      role: 'student',
      subjectOrMajor: 'Kỹ thuật Cơ điện tử & Robotics',
      currentCompany: 'Bosch Vietnam',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Chế tạo robot nhưng trái tim vẫn hướng về lớp học CT1619.',
      timelines: [
        { id: 'tl_sb1', type: 'education', title: 'ĐH Sư Phạm Kỹ Thuật TP.HCM', subtitle: 'Cơ điện tử Robot', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_sb2', type: 'career', title: 'Bosch Global Software', subtitle: 'Automation System Engineer', period: '2023 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-22'
    },
    // 18. Minh Bách
    {
      id: 'ct_17',
      name: 'Minh Bách',
      nickname: 'Bách Luật Sư ⚖️',
      avatarText: '👨‍⚖️',
      avatarBgColor: '#E2E8F0',
      role: 'student',
      subjectOrMajor: 'Luật Thương mại Quốc tế',
      currentCompany: 'VILAF Law Firm',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Luôn bảo vệ lẽ phải và đồng hành cùng anh em CT1619!',
      timelines: [
        { id: 'tl_mb1', type: 'education', title: 'ĐH Luật TP.HCM', subtitle: 'Cử nhân Luật Thương Mại', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_mb2', type: 'career', title: 'Công ty Luật Quốc Tế VILAF', subtitle: 'Associate Lawyer', period: '2023 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-24'
    },
    // 19. Thiên Sơn
    {
      id: 'ct_18',
      name: 'Thiên Sơn',
      nickname: 'Sơn Đồi Núi 🏕️',
      avatarText: '🧗‍♂️',
      avatarBgColor: '#D1FAE5',
      role: 'student',
      subjectOrMajor: 'Quản trị Lữ hành & Du lịch Sinh thái',
      currentCompany: 'Vietravel Airlines & Tour',
      currentCity: 'Đà Lạt & TP.HCM',
      memorableQuote: 'Chuyến đi đẹp nhất thanh xuân là chuyến đi cùng tập thể CT1619.',
      timelines: [
        { id: 'tl_ts1', type: 'education', title: 'ĐH Tôn Đức Thắng', subtitle: 'Quản trị Du lịch & Khách sạn', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_ts2', type: 'career', title: 'Vietravel', subtitle: 'Senior Tour Operations Manager', period: '2023 - Hiện tại', location: 'Đà Lạt', isCurrent: true }
      ],
      updatedAt: '2026-10-19'
    },
    // 20. Kim Phát
    {
      id: 'ct_19',
      name: 'Kim Phát',
      nickname: 'Phát Tài Phát Lộc 💰',
      avatarText: '🧑‍💼',
      avatarBgColor: '#FEF08A',
      role: 'student',
      subjectOrMajor: 'Bất động sản & Phát triển Dự án',
      currentCompany: 'Tập đoàn Khang Điền',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Chúc cả lớp mình ai nấy đều an cư lạc nghiệp, nhà cao cửa rộng!',
      timelines: [
        { id: 'tl_kp1', type: 'education', title: 'ĐH Tài Chính - Marketing (UFM)', subtitle: 'Bất động sản & Thẩm định giá', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_kp2', type: 'career', title: 'Khang Dien House', subtitle: 'Investment & Project Analyst', period: '2023 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-23'
    },
    // 21. Minh Thư
    {
      id: 'ct_20',
      name: 'Minh Thư',
      nickname: 'Thư Điệu Đà 💄',
      avatarText: '👩‍💼',
      avatarBgColor: '#FBCFE8',
      role: 'student',
      subjectOrMajor: 'Marketing Mỹ Phẩm & Thương Mại Điện Tử',
      currentCompany: 'L\'Oréal Vietnam',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Mỗi bạn gái CT1619 đều là một đoá hoa rực rỡ nhất trường.',
      timelines: [
        { id: 'tl_mt1', type: 'education', title: 'ĐH RMIT Vietnam', subtitle: 'Digital Marketing Management', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_mt2', type: 'career', title: 'L\'Oréal Luxe Division', subtitle: 'Brand Marketing Executive', period: '2023 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-21'
    },
    // 22. Hải Yến
    {
      id: 'ct_21',
      name: 'Hải Yến',
      nickname: 'Yến Bay Xa ✈️',
      avatarText: '👩‍💼',
      avatarBgColor: '#BAE6FD',
      role: 'student',
      subjectOrMajor: 'Xuất Nhập Khẩu & Thương Mại Biên Giới',
      currentCompany: 'DHL Global Forwarding',
      currentCity: 'Singapore & TP.HCM',
      memorableQuote: 'Dù ở phương trời nào thì CT1619 vẫn là bến đỗ bình yên nhất.',
      timelines: [
        { id: 'tl_hy1', type: 'education', title: 'ĐH Ngân Hàng TP.HCM (HUB)', subtitle: 'Kinh doanh Quốc tế', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_hy2', type: 'career', title: 'DHL Singapore / Vietnam', subtitle: 'Regional Trade Specialist', period: '2023 - Hiện tại', location: 'Singapore', isCurrent: true }
      ],
      updatedAt: '2026-10-20'
    },
    // 23. Song Nguyên
    {
      id: 'ct_22',
      name: 'Song Nguyên',
      nickname: 'Nguyên Vui Vẻ 😄',
      avatarText: '🧑‍💻',
      avatarBgColor: '#DDD6FE',
      role: 'student',
      subjectOrMajor: 'Thiết Kế Trải Nghiệm Người Dùng (UI/UX Design)',
      currentCompany: 'MoMo E-Wallet',
      currentCity: 'TP. Hồ Chí Minh',
      memorableQuote: 'Thiết kế giao diện đẹp cho đời và thiết kế tình bạn bền lâu cho lớp.',
      timelines: [
        { id: 'tl_sn1', type: 'education', title: 'ĐH FPT TP.HCM', subtitle: 'Thiết kế Mỹ thuật Số', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_sn2', type: 'career', title: 'Ví điện tử MoMo', subtitle: 'Senior Product Designer', period: '2023 - Hiện tại', location: 'TP.HCM', isCurrent: true }
      ],
      updatedAt: '2026-10-24'
    },
    // 24. Minh Tú
    {
      id: 'ct_23',
      name: 'Minh Tú',
      nickname: 'Tú Đạt Chuẩn 🎯',
      avatarText: '👨‍💼',
      avatarBgColor: '#A7F3D0',
      role: 'student',
      subjectOrMajor: 'Năng Lượng Tái Tạo & Kỹ Thuật Môi Trường',
      currentCompany: 'Trungnam Solar Power',
      currentCity: 'Ninh Thuận & TP.HCM',
      memorableQuote: 'Năng lượng xanh cho tương lai và năng lượng tích cực cho CT1619!',
      timelines: [
        { id: 'tl_mtu1', type: 'education', title: 'ĐH Bách Khoa TP.HCM', subtitle: 'Kỹ thuật Môi trường & Năng lượng', period: '2019 - 2023', location: 'TP.HCM' },
        { id: 'tl_mtu2', type: 'career', title: 'Trungnam Group', subtitle: 'Renewable Energy Project Engineer', period: '2023 - Hiện tại', location: 'Ninh Thuận', isCurrent: true }
      ],
      updatedAt: '2026-10-25'
    }
  ],
  events: [
    {
      id: 'ev_ct_01',
      title: 'Họp Lớp Kỷ Niệm 10 Năm Ra Trường CT1619 & Thăm Thầy Chủ Nhiệm 🌿',
      date: '2026-11-20',
      time: '09:00 Sáng',
      location: 'Nhà Thầy Chủ Nhiệm (Quận 3) -> Nhà hàng Kỷ Niệm',
      description: 'Gặp mặt toàn thể 24 thành viên CT1619 nhân dịp 10 năm kỷ niệm ngày bước vào mái trường thân yêu. Cùng ôn lại kỷ niệm và cập nhật hành trình công việc, gia đình của từng bạn nhé!',
      organizerName: 'Minh Quân & Song Quyên',
      attendeesCount: 22,
      isRegistered: true,
      category: 'anniversary',
      createdAt: '2026-10-26'
    },
    {
      id: 'ev_ct_02',
      title: 'Cà Phê Họp Mặt Nhóm Sài Gòn Cuối Tuần ☕',
      date: '2026-11-08',
      time: '15:30 Chiều',
      location: 'The Coffee House - Hồ Con Rùa, Quận 3',
      description: 'Hải Yến từ Singapore về và Địch Long đổi ca bay rảnh cuối tuần, các bạn CT1619 ở Sài Gòn tụ tập chém gió nhé!',
      organizerName: 'Song Quyên & Thu Ngân',
      attendeesCount: 12,
      isRegistered: true,
      category: 'informal',
      createdAt: '2026-10-25'
    }
  ]
};

export const LuuButService = {
  async getData(): Promise<LuuButData> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        return JSON.parse(json);
      }
    } catch (e) {
      console.warn('Lỗi đọc local storage, sử dụng dữ liệu CT1619:', e);
    }
    // Nếu chưa có, lưu dữ liệu mẫu CT1619
    await this.saveData(INITIAL_DATA);
    return INITIAL_DATA;
  },

  async saveData(data: LuuButData): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Lỗi lưu local storage:', e);
    }
  },

  async updateMember(member: Member): Promise<LuuButData> {
    const data = await this.getData();
    const index = data.members.findIndex(m => m.id === member.id);
    if (index >= 0) {
      data.members[index] = { ...member, updatedAt: new Date().toISOString().split('T')[0] };
    } else {
      data.members.push({ ...member, updatedAt: new Date().toISOString().split('T')[0] });
    }
    await this.saveData(data);
    return data;
  },

  async addEvent(event: Omit<ClassEvent, 'id' | 'createdAt'>): Promise<LuuButData> {
    const data = await this.getData();
    const newEvent: ClassEvent = {
      ...event,
      id: `ev_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      isRegistered: true,
      attendeesCount: (event.attendeesCount || 0) + 1,
    };
    data.events.unshift(newEvent);
    await this.saveData(data);
    return data;
  },

  async toggleEventJoin(eventId: string): Promise<LuuButData> {
    const data = await this.getData();
    const ev = data.events.find(e => e.id === eventId);
    if (ev) {
      if (ev.isRegistered) {
        ev.isRegistered = false;
        ev.attendeesCount = Math.max(0, ev.attendeesCount - 1);
      } else {
        ev.isRegistered = true;
        ev.attendeesCount += 1;
      }
      await this.saveData(data);
    }
    return data;
  },

  async resetToDefault(): Promise<LuuButData> {
    await this.saveData(INITIAL_DATA);
    return INITIAL_DATA;
  }
};

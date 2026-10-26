export const theme = {
  colors: {
    // Modern iOS / Clean Notion Canvas
    background: '#F8F9FA',        // Neutral 50 - Nền canvas sạch sẽ chuẩn iOS/macOS
    cardBackground: '#FFFFFF',    // Pure White - Thẻ nổi bật, sáng rõ
    cardBorder: '#E5E7EB',        // Gray 200 - Viền mảnh tinh tế 1px
    cardBorderHover: '#D1D5DB',   // Gray 300
    
    // Text Hierarchy (Độ tương phản cao, chuẩn Apple typography)
    textPrimary: '#111827',       // Gray 900 - Đen sâu, sắc nét
    textSecondary: '#4B5563',     // Gray 600 - Xám ghi trung tính
    textMuted: '#9CA3AF',         // Gray 400 - Xám mờ phụ trợ
    
    // Accent Colors (Apple System / Notion Indigo & Sage)
    primary: '#1D4ED8',           // iOS Blue 700 - Nhã nhặn, chuẩn mực
    primaryLight: '#EFF6FF',      // Blue 50 - Tint nền mềm mại
    primaryBorder: '#BFDBFE',     // Blue 200
    
    accentEmerald: '#059669',     // Emerald 600 - Trạng thái Đang học / Đang làm
    accentEmeraldBg: '#ECFDF5',   // Emerald 50
    accentAmber: '#D97706',       // Amber 600 - Điểm nhấn sự kiện
    accentAmberBg: '#FFFBEB',     // Amber 50
    accentRose: '#E11D48',        // Rose 600
    
    // Status & Utility
    badgeCurrent: '#ECFDF5',
    badgeCurrentText: '#065F46',
    divider: '#F3F4F6',           // Gray 100 - Đường phân cách cực nhẹ
    surfaceSubtle: '#F3F4F6',     // Gray 100
    inputBg: '#FFFFFF',
    inputBorder: '#D1D5DB',
  },
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      mono: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    sizes: {
      hero: 26,
      title: 20,
      heading: 16,
      body: 14,
      caption: 12,
      small: 11,
    },
    weights: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  borderRadius: {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    pill: 9999,
  },
  shadows: {
    subtle: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
      elevation: 1,
    },
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    elevated: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    }
  }
};

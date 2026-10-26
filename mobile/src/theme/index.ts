export const theme = {
  colors: {
    // Nền giấy vintage & hoài niệm tươi sáng
    background: '#FAF6F0',        // Màu giấy ngà ấm
    cardBackground: '#FFFFFF',    // Màu thẻ trắng sữa
    cardBorder: '#E8DFD3',        // Viền thẻ màu giấy thủ công
    pinTape: '#F3D5B5',           // Màu băng keo washi trang trí
    
    // Tông chữ
    textPrimary: '#2D2824',       // Nâu đen ấm, êm mắt cho thầy cô
    textSecondary: '#6B6055',     // Nâu xám mềm
    textMuted: '#9E9489',         // Ghi xám nhẹ
    
    // Màu nhấn (Accents) hoài niệm mà fresh
    primary: '#4A6B53',           // Xanh rêu phấn / Bảng đen xưa dịu mát
    primaryLight: '#E8F0EA',      // Nền xanh pastel
    accentWarm: '#D87A56',        // Cam đất / Màu gạch nung học trò
    accentYellow: '#EBB44D',      // Vàng hoa điệp / nắng sân trường
    accentBlue: '#4F7C96',        // Xanh mực máy
    
    // Trạng thái
    badgeCurrent: '#E1EFE6',      // Đang công tác / đang học
    badgeCurrentText: '#2B6140',
    divider: '#EFE9DE',
    surfaceSubtle: '#F4EFEA',
  },
  typography: {
    fontFamily: {
      serif: 'Georgia',
      sans: 'System',
    },
    sizes: {
      hero: 24,
      title: 20,
      heading: 17,
      body: 15,
      caption: 13,
      small: 11,
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 16,
    pill: 999,
  },
  shadows: {
    card: {
      shadowColor: '#4A3E31',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 5,
      elevation: 2,
    },
    hover: {
      shadowColor: '#4A3E31',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    }
  }
};

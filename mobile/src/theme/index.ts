export const theme = {
  colors: {
    // Apple / Notion Slate Palette
    background: '#F2F2F7',        // iOS System Gray 6 Background
    surface: '#FFFFFF',           // Crisp White Card
    surfaceHover: '#F8FAFC',
    surfaceSubtle: '#F1F5F9',     // Slate 100
    
    // Borders
    cardBorder: '#E2E8F0',        // Slate 200
    cardBorderHover: '#CBD5E1',   // Slate 300
    divider: '#EDF2F7',
    
    // Typography Hierarchy
    textPrimary: '#0F172A',       // Slate 900
    textSecondary: '#475569',     // Slate 600
    textMuted: '#94A3B8',         // Slate 400
    textInverse: '#FFFFFF',
    
    // Brand / Primary Action
    primary: '#0F172A',           // Modern Dark Slate / Apple Style Primary
    primaryHover: '#1E293B',
    primaryLight: '#F1F5F9',
    accentBlue: '#2563EB',        // Blue 600
    accentBlueBg: '#EFF6FF',
    accentWarm: '#D97706',
    
    // Role Badges
    badgeTeacherBg: '#FEF3C7',    // Amber 100
    badgeTeacherText: '#92400E',  // Amber 800
    badgeStudentBg: '#F1F5F9',    // Slate 100
    badgeStudentText: '#334155',  // Slate 700
    badgeSelfBg: '#EFF6FF',       // Blue 50
    badgeSelfText: '#1D4ED8',     // Blue 700
    
    // Status
    badgeCurrent: '#ECFDF5',
    badgeCurrentText: '#065F46',
    
    // Form Inputs
    inputBg: '#FFFFFF',
    inputBorder: '#CBD5E1',
    inputFocusBorder: '#0F172A',
  },
  typography: {
    fontFamily: {
      sans: 'System',
    },
    sizes: {
      hero: 24,
      title: 18,
      heading: 15,
      body: 13.5,
      caption: 12,
      small: 11,
    },
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
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
    pill: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
      elevation: 1,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    card: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
  },
};

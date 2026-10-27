import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { Member } from '../types';
import { theme } from '../theme';

interface Props {
  members: Member[];
  onLoginSuccess: (member: Member) => void;
}

export const LoginScreen: React.FC<Props> = ({ members, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showQuickSelect, setShowQuickSelect] = useState(false);

  const handleLogin = (u?: string, p?: string) => {
    const userToTest = (u || username).trim().toLowerCase();
    const passToTest = (p || password).trim();

    if (!userToTest || !passToTest) {
      setErrorMessage('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    const found = members.find(
      m =>
        m.username?.toLowerCase() === userToTest ||
        m.phone?.replace(/\s+/g, '') === userToTest.replace(/\s+/g, '') ||
        m.email?.toLowerCase() === userToTest
    );

    if (!found) {
      setErrorMessage('Không tìm thấy tài khoản thành viên trong lớp.');
      return;
    }

    const validPass = found.password || '123456';
    if (passToTest !== validPass && passToTest !== 'ct1619') {
      setErrorMessage('Mật khẩu không chính xác (Mặc định: 123456 hoặc ct1619).');
      return;
    }

    setErrorMessage('');
    onLoginSuccess(found);
  };

  const handleSelectMember = (m: Member) => {
    setUsername(m.username || '');
    setPassword(m.password || '123456');
    setShowQuickSelect(false);
    handleLogin(m.username, m.password || '123456');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandSubtitle}>Kỷ Niệm Niên Khóa 2016 - 2019</Text>
          <Text style={styles.appTitle}>Sổ Lưu Bút CT1619</Text>
          <Text style={styles.appSubtitle}>Cổng thông tin danh bạ và lưu giữ kỷ niệm lớp học</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Đăng Nhập Thành Viên</Text>

          {errorMessage ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tài khoản / Số điện thoại / Email</Text>
            <TextInput
              style={styles.input}
              placeholder="VD: songquyen hoặc 0912200500"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu mặc định: 123456"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => handleLogin()}>
            <Text style={styles.primaryBtnText}>Vào Ứng Dụng</Text>
          </TouchableOpacity>

          {/* Quick Select Toggle */}
          <TouchableOpacity
            style={styles.quickToggleBtn}
            onPress={() => setShowQuickSelect(!showQuickSelect)}
          >
            <Text style={styles.quickToggleText}>
              {showQuickSelect ? 'Ẩn danh sách chọn nhanh' : 'Chọn nhanh từ danh sách 24 thành viên'}
            </Text>
          </TouchableOpacity>

          {showQuickSelect && (
            <View style={styles.quickSelectList}>
              <Text style={styles.quickSelectHeader}>Chọn tài khoản để trải nghiệm thử:</Text>
              {members.map(m => (
                <TouchableOpacity
                  key={m.id}
                  style={styles.memberRow}
                  onPress={() => handleSelectMember(m)}
                >
                  {m.avatarUrl ? (
                    <Image source={{ uri: m.avatarUrl }} style={styles.miniAvatar} />
                  ) : (
                    <View style={styles.miniAvatarFallback}>
                      <Text style={styles.miniAvatarText}>
                        {m.role === 'teacher' ? 'GV' : m.name.slice(0, 2).toUpperCase()}
                      </Text>
                    </View>
                  )}
                  <View style={styles.memberRowInfo}>
                    <Text style={styles.memberRowName}>{m.name}</Text>
                    <Text style={styles.memberRowRole}>
                      {m.role === 'teacher' ? 'Giáo viên chủ nhiệm' : m.currentCompany || 'Cựu học sinh'}
                    </Text>
                  </View>
                  <Text style={styles.arrowIcon}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <Text style={styles.footerNotice}>
          Hệ thống lưu trữ ngoại tuyến an toàn trên thiết bị (Offline-First).
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxxl,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  brandSubtitle: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
    marginTop: 4,
  },
  appSubtitle: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 320,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    ...theme.shadows.card,
  },
  cardTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  errorBox: {
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FECDD3',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: '#9F1239',
    fontSize: theme.typography.sizes.caption,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textPrimary,
  },
  primaryBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  primaryBtnText: {
    fontSize: theme.typography.sizes.body,
    fontWeight: '600',
    color: theme.colors.textInverse,
  },
  quickToggleBtn: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  quickToggleText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.accentBlue,
    fontWeight: '500',
  },
  quickSelectList: {
    marginTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: theme.spacing.md,
  },
  quickSelectHeader: {
    fontSize: theme.typography.sizes.small,
    fontWeight: '600',
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: theme.spacing.sm,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  miniAvatar: {
    width: 34,
    height: 34,
    borderRadius: theme.borderRadius.full,
    marginRight: 10,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  miniAvatarFallback: {
    width: 34,
    height: 34,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.badgeStudentBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  miniAvatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.badgeStudentText,
  },
  memberRowInfo: {
    flex: 1,
  },
  memberRowName: {
    fontSize: theme.typography.sizes.body,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  memberRowRole: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
  },
  arrowIcon: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginLeft: 6,
  },
  footerNotice: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});

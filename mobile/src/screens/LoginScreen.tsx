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
  Alert,
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

    // Match by username, phone, or email
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
          <Text style={styles.appTitle}>Sổ Lưu Bút CT1619</Text>
          <Text style={styles.appSubtitle}>Đăng nhập để vào trang kỷ yếu lớp học</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Xác Nhận Danh Tính</Text>

          {errorMessage ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên đăng nhập / Số ĐT / Email</Text>
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
              placeholder="Nhập mật khẩu (Mặc định: 123456)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleLogin()}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Đăng Nhập Vào Sổ Lưu Bút</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>HOẶC CHỌN TÊN BẠN</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => setShowQuickSelect(!showQuickSelect)}
            activeOpacity={0.7}
          >
            <Text style={styles.quickButtonText}>
              {showQuickSelect ? 'Ẩn danh sách' : 'Chọn nhanh thành viên từ danh sách'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Selection List */}
        {showQuickSelect && (
          <View style={styles.quickListCard}>
            <Text style={styles.quickListTitle}>Chọn Bạn Là Ai Trong Lớp:</Text>
            {members.map(m => (
              <TouchableOpacity
                key={m.id}
                style={styles.memberItem}
                onPress={() => handleSelectMember(m)}
              >
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberAvatarText}>
                    {m.role === 'teacher' ? 'GV' : m.name.slice(0, 2).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>
                    {m.name} {m.role === 'teacher' && '(Giáo Viên)'}
                  </Text>
                  <Text style={styles.memberUser}>
                    Username: {m.username} (Pass: 123456)
                  </Text>
                </View>
                <Text style={styles.selectText}>Vào →</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            Lớp CT1619 Niên khóa 2016 - 2019 • Offline-First Storage
          </Text>
        </View>
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
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xxxl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  appTitle: {
    fontSize: theme.typography.sizes.hero,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  appSubtitle: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textMuted,
    marginTop: 6,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: '#DC2626',
    fontSize: theme.typography.sizes.caption,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textPrimary,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.body,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.divider,
  },
  dividerText: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textMuted,
    marginHorizontal: theme.spacing.sm,
    fontWeight: '600',
  },
  quickButton: {
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  quickButtonText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  quickListCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  quickListTitle: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
    textTransform: 'uppercase',
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  memberAvatar: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  memberAvatarText: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: theme.typography.sizes.body,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  memberUser: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textMuted,
  },
  selectText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  footerNote: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  footerText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
  },
});

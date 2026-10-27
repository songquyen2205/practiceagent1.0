import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { LuuButData, Member } from '../types';
import { theme } from '../theme';

interface Props {
  data: LuuButData;
  currentUser: Member;
  onImportData: (data: LuuButData) => void;
  onResetData: () => void;
  onLogout: () => void;
}

export const SettingsScreen: React.FC<Props> = ({
  data,
  currentUser,
  onImportData,
  onResetData,
  onLogout,
}) => {
  const [jsonText, setJsonText] = useState('');
  const [showJsonBox, setShowJsonBox] = useState(false);

  const handleExportJson = () => {
    const raw = JSON.stringify(data, null, 2);
    setJsonText(raw);
    setShowJsonBox(true);
    Alert.alert(
      'Xuất Dữ Liệu Thành Công',
      'Chuỗi JSON lưu trữ đã sẵn sàng bên dưới để bạn sao chép và lưu trữ offline.'
    );
  };

  const handleImportJson = () => {
    try {
      if (!jsonText.trim()) {
        Alert.alert('Chưa có nội dung', 'Vui lòng dán chuỗi JSON dữ liệu lưu bút vào ô bên dưới.');
        return;
      }
      const parsed = JSON.parse(jsonText.trim());
      if (!parsed.members || !Array.isArray(parsed.members)) {
        throw new Error('Dữ liệu không đúng cấu trúc Sổ Lưu Bút');
      }
      onImportData(parsed);
      Alert.alert('Đồng bộ thành công', `Đã cập nhật ${parsed.members.length} thành viên vào ứng dụng.`);
    } catch (e: any) {
      Alert.alert('Lỗi nhập dữ liệu', 'Chuỗi định dạng không hợp lệ: ' + e.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>Quản trị hệ thống</Text>
          <Text style={styles.headerTitle}>Cài Đặt & Dữ Liệu</Text>
        </View>

        {/* Current User Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tài Khoản Hiện Tại</Text>
          <View style={styles.userRow}>
            {currentUser.avatarUrl ? (
              <Image
                source={{ uri: currentUser.avatarUrl }}
                style={styles.userAvatarImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>
                  {currentUser.role === 'teacher' ? 'GV' : currentUser.name.slice(0, 2).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{currentUser.name}</Text>
              <Text style={styles.userSub}>Tài khoản: {currentUser.username || 'ct1619'}</Text>
              <Text style={styles.userRole}>
                {currentUser.role === 'teacher' ? 'Giáo Viên' : 'Thành viên lớp CT1619'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
            <Text style={styles.logoutBtnText}>Đăng xuất phiên làm việc</Text>
          </TouchableOpacity>
        </View>

        {/* Group Stats Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Thông Tin Niên Khóa</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Lớp</Text>
            <Text style={styles.value}>{data.className}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Niên khóa</Text>
            <Text style={styles.value}>{data.schoolYear}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Giáo viên chủ nhiệm</Text>
            <Text style={styles.value}>{data.homeroomTeacher}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tổng thành viên</Text>
            <Text style={styles.value}>{data.members.length} người</Text>
          </View>
        </View>

        {/* Sync & Backup Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sao Lưu & Đồng Bộ Dữ Liệu (Offline-First)</Text>
          <Text style={styles.helpText}>
            Dữ liệu được lưu trữ trực tiếp trên thiết bị (Local Storage). Bạn có thể sao chép chuỗi JSON bên dưới để chia sẻ hoặc backup khi chuyển đổi máy.
          </Text>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleExportJson}>
              <Text style={styles.actionBtnText}>Xuất JSON Sao Lưu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.actionBtnOutline]}
              onPress={() => setShowJsonBox(!showJsonBox)}
            >
              <Text style={[styles.actionBtnText, styles.actionBtnOutlineText]}>
                {showJsonBox ? 'Đóng Hộp Dữ Liệu' : 'Mở Hộp Nhập JSON'}
              </Text>
            </TouchableOpacity>
          </View>

          {showJsonBox && (
            <View style={styles.jsonBoxWrapper}>
              <TextInput
                style={styles.jsonInput}
                multiline
                numberOfLines={8}
                value={jsonText}
                onChangeText={setJsonText}
                placeholder="Dán nội dung JSON đã sao lưu vào đây..."
              />
              <TouchableOpacity style={styles.importBtn} onPress={handleImportJson}>
                <Text style={styles.importBtnText}>Nhập Dữ Liệu (Import)</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Reset App */}
        <View style={[styles.card, styles.dangerCard]}>
          <Text style={styles.dangerTitle}>Khôi Phục Trạng Thái Ban Đầu</Text>
          <Text style={styles.dangerDesc}>
            Xóa bỏ mọi cập nhật cá nhân và quay về bộ dữ liệu mẫu 24 thành viên CT1619 gốc.
          </Text>
          <TouchableOpacity style={styles.dangerBtn} onPress={onResetData}>
            <Text style={styles.dangerBtnText}>Đặt Lại Dữ Liệu Ban Đầu</Text>
          </TouchableOpacity>
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
    paddingBottom: theme.spacing.xxxl,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  headerSubtitle: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    fontWeight: '500',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: theme.typography.sizes.hero,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
    marginTop: 2,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    ...theme.shadows.card,
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  userAvatarImage: {
    width: 52,
    height: 52,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1.5,
    borderColor: theme.colors.cardBorder,
    marginRight: theme.spacing.md,
  },
  userAvatar: {
    width: 52,
    height: 52,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.badgeStudentBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  userAvatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.badgeStudentText,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  userSub: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    marginTop: 1,
  },
  userRole: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  logoutBtn: {
    backgroundColor: theme.colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  logoutBtnText: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  label: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
  },
  value: {
    fontSize: theme.typography.sizes.body,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  helpText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: theme.spacing.md,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
    color: theme.colors.textInverse,
  },
  actionBtnOutline: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  actionBtnOutlineText: {
    color: theme.colors.textPrimary,
  },
  jsonBoxWrapper: {
    marginTop: theme.spacing.md,
  },
  jsonInput: {
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.small,
    fontFamily: 'monospace',
    height: 120,
    textAlignVertical: 'top',
  },
  importBtn: {
    backgroundColor: theme.colors.accentBlue,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginTop: 8,
  },
  importBtnText: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
    color: theme.colors.textInverse,
  },
  dangerCard: {
    borderColor: '#FECDD3',
    backgroundColor: '#FFF1F2',
  },
  dangerTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '600',
    color: '#9F1239',
    marginBottom: 4,
  },
  dangerDesc: {
    fontSize: theme.typography.sizes.caption,
    color: '#881337',
    marginBottom: theme.spacing.md,
    lineHeight: 18,
  },
  dangerBtn: {
    backgroundColor: '#E11D48',
    paddingVertical: 10,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  dangerBtnText: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

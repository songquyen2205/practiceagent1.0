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
      'Chuỗi JSON lưu trữ đã sẵn sàng bên dưới để bạn sao chép và lưu trữ hoặc gửi qua tin nhắn.'
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
          <Text style={styles.headerSubtitle}>Hệ Thống</Text>
          <Text style={styles.headerTitle}>Cài Đặt & Tài Khoản</Text>
        </View>

        {/* Tài khoản hiện tại */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tài Khoản Đang Đăng Nhập</Text>
          <View style={styles.userRow}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>
                {currentUser.role === 'teacher' ? 'GV' : currentUser.name.slice(0, 2).toUpperCase()}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{currentUser.name}</Text>
              <Text style={styles.userSub}>Username: {currentUser.username || 'Chưa đặt'}</Text>
              <Text style={styles.userRole}>
                {currentUser.role === 'teacher' ? 'Giáo Viên' : 'Học Sinh Lớp CT1619'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
            <Text style={styles.logoutBtnText}>Đăng Xuất / Đổi Người Dùng</Text>
          </TouchableOpacity>
        </View>

        {/* Thông tin lớp học */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Thông Tin Tập Thể</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Lớp</Text>
            <Text style={styles.value}>{data.className}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Niên khóa</Text>
            <Text style={styles.value}>{data.schoolYear}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Chủ nhiệm</Text>
            <Text style={styles.value}>{data.homeroomTeacher}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tổng thành viên</Text>
            <Text style={styles.value}>{data.members.length} người</Text>
          </View>
        </View>

        {/* Chức năng sao lưu & đồng bộ offline */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sao Lưu & Chia Sẻ</Text>
          <Text style={styles.cardDesc}>
            Ứng dụng hoạt động độc lập không cần máy chủ. Dữ liệu được lưu trữ an toàn trong máy và có thể xuất thành tệp văn bản JSON để chia sẻ.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleExportJson}>
              <Text style={styles.actionBtnText}>Xuất JSON Sao Lưu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline]} onPress={() => setShowJsonBox(!showJsonBox)}>
              <Text style={[styles.actionBtnText, styles.actionBtnOutlineText]}>
                {showJsonBox ? 'Ẩn Hộp Dữ Liệu' : 'Nhập Dữ Liệu'}
              </Text>
            </TouchableOpacity>
          </View>

          {showJsonBox && (
            <View style={styles.jsonBoxContainer}>
              <Text style={styles.jsonBoxLabel}>Dán hoặc sao chép mã dữ liệu:</Text>
              <TextInput
                style={styles.jsonInput}
                multiline
                numberOfLines={6}
                value={jsonText}
                onChangeText={setJsonText}
                placeholder="Dán chuỗi JSON lưu bút vào đây..."
              />
              <TouchableOpacity style={styles.importBtn} onPress={handleImportJson}>
                <Text style={styles.importBtnText}>Áp Dụng Dữ Liệu</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Khôi phục mặc định */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Khôi Phục Dữ Liệu</Text>
          <Text style={styles.cardDesc}>
            Đặt lại toàn bộ danh sách 24 thành viên CT1619 về dữ liệu nguyên bản của lớp.
          </Text>
          <TouchableOpacity style={styles.resetBtn} onPress={onResetData}>
            <Text style={styles.resetBtnText}>Khôi phục dữ liệu ban đầu</Text>
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
    paddingVertical: theme.spacing.md,
  },
  headerSubtitle: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: theme.typography.sizes.hero,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginTop: 2,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  cardDesc: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  userAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
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
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  userRole: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.accentEmerald,
    fontWeight: '500',
    marginTop: 2,
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 6,
  },
  logoutBtnText: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
    color: theme.colors.accentRose,
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
    color: theme.colors.textMuted,
  },
  value: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  actionBtn: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
  },
  actionBtnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    marginRight: 0,
    marginLeft: theme.spacing.sm,
  },
  actionBtnOutlineText: {
    color: theme.colors.textPrimary,
  },
  jsonBoxContainer: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  jsonBoxLabel: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    marginBottom: 6,
  },
  jsonInput: {
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.caption,
    height: 120,
    textAlignVertical: 'top',
  },
  importBtn: {
    backgroundColor: theme.colors.accentEmerald,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  importBtnText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
  },
  resetBtn: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  resetBtnText: {
    color: theme.colors.accentRose,
    fontSize: theme.typography.sizes.caption,
    fontWeight: '500',
  },
});

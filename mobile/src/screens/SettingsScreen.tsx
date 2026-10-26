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
import { LuuButData } from '../types';
import { theme } from '../theme';

interface Props {
  data: LuuButData;
  onImportData: (data: LuuButData) => void;
  onResetData: () => void;
}

export const SettingsScreen: React.FC<Props> = ({ data, onImportData, onResetData }) => {
  const [jsonText, setJsonText] = useState('');
  const [showJsonBox, setShowJsonBox] = useState(false);

  const handleExportJson = () => {
    const raw = JSON.stringify(data, null, 2);
    setJsonText(raw);
    setShowJsonBox(true);
    Alert.alert(
      'Xuất Dữ Liệu Thành Công!',
      'Dữ liệu sổ lưu bút đã hiển thị bên dưới. Bạn có thể sao chép chuỗi này và gửi qua tin nhắn Zalo/Messenger của lớp để các bạn khác dán vào máy của họ hoặc thầy cô.'
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
      Alert.alert('Đồng bộ thành công!', `Đã nạp ${parsed.members.length} thành viên vào sổ lưu bút.`);
    } catch (e: any) {
      Alert.alert('Lỗi nhập dữ liệu', 'Chuỗi sao chép không hợp lệ: ' + e.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>Lưu trữ & Chia sẻ</Text>
          <Text style={styles.headerTitle}>⚙️ Đồng Bộ In-App & Sổ Tay</Text>
        </View>

        {/* Card Giới thiệu cơ chế Không BE */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🔒 Chế độ In-App Bảo Mật & Độc Lập</Text>
          <Text style={styles.infoDesc}>
            Ứng dụng hoạt động 100% offline trên máy của bạn, không gửi thông tin lên bất kỳ máy chủ bên ngoài nào.
          </Text>
          <Text style={[styles.infoDesc, { marginTop: 6 }]}>
            💡 Để chia sẻ danh bạ mới nhất cho thầy cô hoặc nhóm lớp, bạn chỉ cần bấm <Text style={styles.boldText}>"Xuất Dữ Liệu"</Text> và gửi file/văn bản qua Zalo hoặc AirDrop.
          </Text>
        </View>

        {/* Thông tin lớp học */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>🏫 Thông Tin Lớp Học</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Tên tập thể:</Text>
            <Text style={styles.rowValue}>{data.className}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Niên khoá:</Text>
            <Text style={styles.rowValue}>{data.schoolYear}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>GVCN Kính yêu:</Text>
            <Text style={styles.rowValue}>{data.homeroomTeacher}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Tổng số thành viên:</Text>
            <Text style={styles.rowValue}>{data.members.length} người</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Số sự kiện đã lên lịch:</Text>
            <Text style={styles.rowValue}>{data.events.length} sự kiện</Text>
          </View>
        </View>

        {/* Chia sẻ & Sao lưu */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>📤 Chia Sẻ Cập Nhật Cho Lớp</Text>

          <TouchableOpacity style={styles.actionBtn} onPress={handleExportJson}>
            <Text style={styles.actionBtnIcon}>📋</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionBtnTitle}>Xuất Gói Dữ Liệu Sổ Lưu Bút</Text>
              <Text style={styles.actionBtnSub}>Tạo chuỗi sao chép gửi cho thầy cô hoặc bạn bè</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { marginTop: 10 }]}
            onPress={() => setShowJsonBox(!showJsonBox)}
          >
            <Text style={styles.actionBtnIcon}>📥</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionBtnTitle}>Nhập Cập Nhật Từ Bạn Bè</Text>
              <Text style={styles.actionBtnSub}>Dán gói cập nhật mới từ nhóm lớp</Text>
            </View>
          </TouchableOpacity>

          {showJsonBox && (
            <View style={styles.jsonBoxContainer}>
              <Text style={styles.jsonBoxLabel}>Khung dữ liệu JSON:</Text>
              <TextInput
                style={styles.jsonInput}
                value={jsonText}
                onChangeText={setJsonText}
                multiline
                numberOfLines={8}
                placeholder="Dán nội dung JSON vào đây rồi bấm Nạp Dữ Liệu..."
              />
              <TouchableOpacity style={styles.importSubmitBtn} onPress={handleImportJson}>
                <Text style={styles.importSubmitText}>🚀 Nạp Cập Nhật Này Vào Máy</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Khôi phục gốc */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>🔄 Đặt Lại Dữ Liệu</Text>
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              Alert.alert(
                'Khôi phục dữ liệu ban đầu?',
                'Hành động này sẽ tải lại danh sách kỷ niệm mẫu 12A1 cùng cô Phương.',
                [
                  { text: 'Huỷ', style: 'cancel' },
                  { text: 'Đồng ý', style: 'destructive', onPress: onResetData },
                ]
              );
            }}
          >
            <Text style={styles.resetBtnText}>Tải Lại Dữ Liệu Mẫu Lớp Học</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Sổ Lưu Bút Kỷ Yếu Mobile v1.0.0
          </Text>
          <Text style={styles.footerSubText}>
            Thiết kế dành tặng thầy cô và những người bạn cùng lớp 🌿
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
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 14,
  },
  headerSubtitle: {
    fontSize: 12,
    color: theme.colors.accentWarm,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  infoCard: {
    backgroundColor: '#F3EFE6',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 17,
  },
  boldText: {
    fontWeight: '700',
    color: theme.colors.primary,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F3EC',
  },
  rowLabel: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F2',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECE3D5',
  },
  actionBtnIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  actionBtnTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  actionBtnSub: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  jsonBoxContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  jsonBoxLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  jsonInput: {
    backgroundColor: '#F9F7F2',
    borderWidth: 1,
    borderColor: '#DFD8CC',
    borderRadius: 8,
    padding: 10,
    fontSize: 11,
    color: '#333',
    height: 120,
    textAlignVertical: 'top',
    fontFamily: 'monospace',
  },
  importSubmitBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  importSubmitText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  resetBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FDF1F0',
    borderWidth: 1,
    borderColor: '#F8D7DA',
  },
  resetBtnText: {
    color: '#C0392B',
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginTop: 12,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  footerSubText: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: 3,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { ClassEvent } from '../types';
import { theme } from '../theme';

interface Props {
  events: ClassEvent[];
  onToggleJoin: (eventId: string) => void;
  onAddEvent: (newEvent: Omit<ClassEvent, 'id' | 'createdAt'>) => void;
}

export const EventsScreen: React.FC<Props> = ({ events, onToggleJoin, onAddEvent }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [organizerName, setOrganizerName] = useState('');

  const handleCreate = () => {
    if (!title.trim() || !date.trim() || !location.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập tên sự kiện, ngày diễn ra và địa điểm.');
      return;
    }

    onAddEvent({
      title: title.trim(),
      date: date.trim(),
      time: time.trim() || 'Cả ngày',
      location: location.trim(),
      description: description.trim() || 'Thông báo họp mặt lớp thân mời thầy cô và các bạn!',
      organizerName: organizerName.trim() || 'Ban Cán Sự Lớp',
      attendeesCount: 1,
      category: 'reunion',
    });

    setTitle('');
    setDate('');
    setTime('');
    setLocation('');
    setDescription('');
    setOrganizerName('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>Gặp gỡ & Kết nối</Text>
            <Text style={styles.headerTitle}>📌 Bảng Tin Sự Kiện Lớp</Text>
          </View>
          <TouchableOpacity
            style={styles.addEventBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addEventBtnText}>+ Tạo Sự Kiện</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bannerNotice}>
          <Text style={styles.bannerText}>
            🔔 Thầy cô và các bạn có thể đăng tin họp lớp, thăm thầy cô, báo hỷ để mọi người tiện sắp xếp thời gian cùng chung vui nhé!
          </Text>
        </View>

        {/* Danh sách sự kiện */}
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <View style={styles.cardHeader}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateDay}>{item.date.split('-')[2] || '📅'}</Text>
                  <Text style={styles.dateMonth}>Th.{item.date.split('-')[1] || ''}</Text>
                </View>
                <View style={styles.headerTextGroup}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.organizerText}>Đăng bởi: {item.organizerName}</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaText}>⏰ {item.time || 'Cả ngày'} | 📍 {item.location}</Text>
              </View>

              <Text style={styles.descText}>{item.description}</Text>

              <View style={styles.footerRow}>
                <Text style={styles.attendeesText}>
                  👥 Đã có <Text style={styles.boldText}>{item.attendeesCount} bạn</Text> tham gia
                </Text>

                <TouchableOpacity
                  style={[
                    styles.joinBtn,
                    item.isRegistered && styles.joinBtnActive,
                  ]}
                  onPress={() => onToggleJoin(item.id)}
                >
                  <Text
                    style={[
                      styles.joinBtnText,
                      item.isRegistered && styles.joinBtnTextActive,
                    ]}
                  >
                    {item.isRegistered ? '✓ Tôi sẽ tham gia' : '+ Tham gia'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* Modal tạo sự kiện */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🎉 Thông Báo Sự Kiện Mới</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Tên sự kiện / Buổi gặp gỡ *</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Ví dụ: Họp lớp cuối năm, Thăm nhà cô..."
              />

              <View style={styles.rowInputs}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.label}>Ngày (YYYY-MM-DD) *</Text>
                  <TextInput
                    style={styles.input}
                    value={date}
                    onChangeText={setDate}
                    placeholder="2026-11-20"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Giờ</Text>
                  <TextInput
                    style={styles.input}
                    value={time}
                    onChangeText={setTime}
                    placeholder="09:00 Sáng"
                  />
                </View>
              </View>

              <Text style={styles.label}>Địa điểm tập trung *</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Nhà cô Phương / Quán Cà phê X..."
              />

              <Text style={styles.label}>Người đại diện đứng ra tổ chức</Text>
              <TextInput
                style={styles.input}
                value={organizerName}
                onChangeText={setOrganizerName}
                placeholder="Ví dụ: Minh Cận, Trang Bí thư..."
              />

              <Text style={styles.label}>Nội dung / Lời mời chi tiết</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Nhắn gửi chi tiết về buổi gặp mặt..."
                multiline
                numberOfLines={3}
              />

              <TouchableOpacity style={styles.submitBtn} onPress={handleCreate}>
                <Text style={styles.submitBtnText}>Đăng Thông Báo Sự Kiện</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  addEventBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  addEventBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  bannerNotice: {
    backgroundColor: '#F3EFE6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  bannerText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 16,
  },
  listContent: {
    paddingBottom: 30,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    shadowColor: '#4A3E31',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateBadge: {
    backgroundColor: '#FAF2E6',
    borderRadius: 8,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6D7C3',
    marginRight: 10,
  },
  dateDay: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.accentWarm,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  headerTextGroup: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  organizerText: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  metaRow: {
    backgroundColor: '#FAF7F2',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  descText: {
    fontSize: 13,
    color: '#4F4439',
    lineHeight: 18,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: 10,
  },
  attendeesText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  boldText: {
    fontWeight: '700',
    color: theme.colors.primary,
  },
  joinBtn: {
    backgroundColor: '#EBE2D5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  joinBtnActive: {
    backgroundColor: theme.colors.badgeCurrent,
  },
  joinBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  joinBtnTextActive: {
    color: theme.colors.badgeCurrentText,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  closeBtn: {
    fontSize: 18,
    color: theme.colors.textMuted,
    padding: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 4,
    marginTop: 6,
  },
  input: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#DFD8CC',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
    fontSize: 13,
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
    paddingVertical: 8,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

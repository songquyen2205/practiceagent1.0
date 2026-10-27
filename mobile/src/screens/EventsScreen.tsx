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
      description: description.trim() || 'Kế hoạch họp mặt và giao lưu cùng tập thể lớp.',
      organizerName: organizerName.trim() || 'Ban Liên Lạc Lớp',
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
        {/* Header Clean */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>Hoạt động tập thể</Text>
            <Text style={styles.headerTitle}>Sự Kiện & Họp Lớp</Text>
          </View>
          <TouchableOpacity
            style={styles.addEventBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addEventBtnText}>+ Thêm sự kiện</Text>
          </TouchableOpacity>
        </View>

        {/* Events List */}
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <View style={styles.cardHeader}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateDay}>{item.date.split('-')[2] || '15'}</Text>
                  <Text style={styles.dateMonth}>Th.{item.date.split('-')[1] || '11'}</Text>
                </View>
                <View style={styles.headerTextGroup}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.organizerText}>Khởi xướng: {item.organizerName}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Thời gian</Text>
                  <Text style={styles.infoValue}>{item.time || 'Cả ngày'} — {item.date}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Địa điểm</Text>
                  <Text style={styles.infoValue}>{item.location}</Text>
                </View>

                <Text style={styles.descriptionText}>{item.description}</Text>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.attendeeBadge}>
                  <Text style={styles.attendeeText}>
                    {item.attendeesCount} người xác nhận
                  </Text>
                </View>

                <TouchableOpacity
                  style={[styles.joinBtn, item.isRegistered && styles.joinedBtn]}
                  onPress={() => onToggleJoin(item.id)}
                >
                  <Text style={[styles.joinBtnText, item.isRegistered && styles.joinedBtnText]}>
                    {item.isRegistered ? 'Đã tham gia' : 'Xác nhận tham gia'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* Modal Thêm sự kiện */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tạo Sự Kiện Mới</Text>

            <TextInput
              style={styles.input}
              placeholder="Tên sự kiện (VD: Họp lớp cuối năm)"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Ngày diễn ra (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
            />

            <TextInput
              style={styles.input}
              placeholder="Giờ (VD: 09:00 sáng)"
              value={time}
              onChangeText={setTime}
            />

            <TextInput
              style={styles.input}
              placeholder="Địa điểm"
              value={location}
              onChangeText={setLocation}
            />

            <TextInput
              style={styles.input}
              placeholder="Người đại diện liên hệ"
              value={organizerName}
              onChangeText={setOrganizerName}
            />

            <TextInput
              style={[styles.input, { height: 70 }]}
              placeholder="Nội dung chi tiết chương trình"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleCreate}
              >
                <Text style={styles.submitBtnText}>Tạo sự kiện</Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  addEventBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.sm,
  },
  addEventBtnText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textInverse,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: theme.spacing.xxxl,
  },
  eventCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    ...theme.shadows.card,
    marginBottom: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  dateBadge: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  dateDay: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    lineHeight: 18,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
  },
  headerTextGroup: {
    flex: 1,
  },
  eventTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  organizerText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: theme.spacing.sm,
    gap: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  infoLabel: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
  },
  infoValue: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    lineHeight: 19,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  attendeeBadge: {
    backgroundColor: theme.colors.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.pill,
  },
  attendeeText: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  joinBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
  },
  joinedBtn: {
    backgroundColor: theme.colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  joinBtnText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textInverse,
    fontWeight: '600',
  },
  joinedBtnText: {
    color: theme.colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    width: '100%',
    maxWidth: 420,
    ...theme.shadows.md,
  },
  modalTitle: {
    fontSize: theme.typography.sizes.title,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  input: {
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
    fontSize: theme.typography.sizes.body,
    marginBottom: theme.spacing.sm,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: theme.spacing.md,
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelBtnText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.sm,
  },
  submitBtnText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textInverse,
    fontWeight: '600',
  },
});

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
      description: description.trim() || 'Thông báo họp mặt lớp thân mời thầy cô và các bạn.',
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
            <Text style={styles.headerSubtitle}>Kế hoạch & Họp mặt</Text>
            <Text style={styles.headerTitle}>Sự Kiện Lớp</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>+ Tạo sự kiện</Text>
          </TouchableOpacity>
        </View>

        {/* Events List */}
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  {item.time ? <Text style={styles.timeText}>{item.time}</Text> : null}
                </View>
                <TouchableOpacity
                  style={[styles.joinButton, item.isJoined && styles.joinedButton]}
                  onPress={() => onToggleJoin(item.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.joinButtonText, item.isJoined && styles.joinedButtonText]}>
                    {item.isJoined ? 'Đã đăng ký' : 'Tham gia'}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.locationText}>{item.location}</Text>

              {item.description ? (
                <Text style={styles.descriptionText}>{item.description}</Text>
              ) : null}

              <View style={styles.cardFooter}>
                <Text style={styles.organizerText}>Tổ chức: {item.organizerName}</Text>
                <Text style={styles.countText}>{item.attendeesCount} người tham dự</Text>
              </View>
            </View>
          )}
        />

        {/* Modal Tạo Sự Kiện */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Tạo Sự Kiện Mới</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeText}>Đóng</Text>
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Tên sự kiện *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="VD: Họp lớp kỷ niệm 5 năm"
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>

                <View style={styles.row}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.label}>Ngày diễn ra *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="VD: 20/11/2026"
                      value={date}
                      onChangeText={setDate}
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Thời gian</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="VD: 09:00 Sáng"
                      value={time}
                      onChangeText={setTime}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Địa điểm *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="VD: Nhà Thầy Chủ Nhiệm / Quán Cafe"
                    value={location}
                    onChangeText={setLocation}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Người khởi xướng / Ban tổ chức</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="VD: Ban Cán Sự Lớp"
                    value={organizerName}
                    onChangeText={setOrganizerName}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Chi tiết thông báo</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Nội dung, kế hoạch chuẩn bị..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                  />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
                  <Text style={styles.submitButtonText}>Tạo sự kiện</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  headerSubtitle: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    fontWeight: theme.typography.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: theme.typography.sizes.hero,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
  listContent: {
    paddingBottom: theme.spacing.xxxl,
    paddingTop: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.subtle,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  dateBadge: {
    backgroundColor: theme.colors.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.xs,
  },
  dateText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.weights.semibold,
  },
  timeText: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textMuted,
  },
  joinButton: {
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  joinedButton: {
    backgroundColor: theme.colors.accentEmeraldBg,
    borderColor: theme.colors.accentEmerald,
  },
  joinButtonText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
  },
  joinedButtonText: {
    color: theme.colors.accentEmerald,
    fontWeight: theme.typography.weights.semibold,
  },
  eventTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
  },
  locationText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
  descriptionText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    lineHeight: 20,
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
  organizerText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
  },
  countText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.cardBackground,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  modalTitle: {
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
  },
  closeText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textMuted,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
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
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xxl,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.heading,
    fontWeight: theme.typography.weights.semibold,
  },
});

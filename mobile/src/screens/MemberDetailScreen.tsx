import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Member } from '../types';
import { TimelineView } from '../components/TimelineView';
import { theme } from '../theme';

interface Props {
  member: Member;
  onBack: () => void;
  onEdit?: () => void;
  isMyProfile?: boolean;
}

export const MemberDetailScreen: React.FC<Props> = ({
  member,
  onBack,
  onEdit,
  isMyProfile,
}) => {
  const isTeacher = member.role === 'teacher';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Bar navigation */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Trang Kỷ Yếu Cá Nhân</Text>
        {isMyProfile && onEdit ? (
          <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <Text style={styles.editButtonText}>✏️ Chỉnh sửa</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 60 }} />
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Thẻ chân dung sổ lưu bút */}
        <View style={styles.profileCard}>
          <View style={[styles.washiTape, isTeacher && styles.washiTapeTeacher]} />

          <View style={styles.avatarRow}>
            <View style={[styles.avatarBox, { backgroundColor: member.avatarBgColor }]}>
              <Text style={styles.avatarEmoji}>{member.avatarText}</Text>
            </View>
            <View style={styles.profileHeaderInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
              {member.nickname ? (
                <Text style={styles.memberNickname}>Biệt danh: "{member.nickname}"</Text>
              ) : null}
              <View style={styles.roleBadge}>
                <Text style={styles.roleBadgeText}>
                  {isTeacher ? '👩‍🏫 Thầy Cô Kính Yêu' : '🎓 Cựu Học Sinh'}
                </Text>
              </View>
            </View>
          </View>

          {/* Lời tự sự / Lời nhắn gửi */}
          {member.memorableQuote ? (
            <View style={styles.quoteCard}>
              <Text style={styles.quoteCardLabel}>💌 Lời gửi thầy cô & bạn bè:</Text>
              <Text style={styles.quoteCardBody}>"{member.memorableQuote}"</Text>
            </View>
          ) : null}

          {/* Thông tin liên lạc */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>📬 Thông tin liên hệ</Text>
            {member.phone ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📞</Text>
                <Text style={styles.contactText}>{member.phone}</Text>
              </View>
            ) : null}
            {member.email ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>✉️</Text>
                <Text style={styles.contactText}>{member.email}</Text>
              </View>
            ) : null}
            {member.zaloOrSocial ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>🌐</Text>
                <Text style={styles.contactText}>{member.zaloOrSocial}</Text>
              </View>
            ) : null}
            {member.currentCity ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📍</Text>
                <Text style={styles.contactText}>Hiện đang ở: {member.currentCity}</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Hành trình học tập và làm việc */}
        <View style={styles.timelineSection}>
          <View style={styles.timelineHeader}>
            <Text style={styles.timelineSectionTitle}>
              🌱 Hành trình Học vấn & Sự nghiệp
            </Text>
            <Text style={styles.timelineSubtitle}>
              Giúp thầy cô và các bạn tiện theo dõi từng bước đi của bạn
            </Text>
          </View>

          <TimelineView milestones={member.timelines} />
        </View>

        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            Trang lưu bút được cập nhật lần cuối: {member.updatedAt}
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    backgroundColor: '#FAF6F0',
  },
  backButton: {
    paddingVertical: 4,
  },
  backButtonText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  topBarTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  editButton: {
    backgroundColor: '#EAE1D3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    shadowColor: '#4A3E31',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
    position: 'relative',
  },
  washiTape: {
    position: 'absolute',
    top: -7,
    alignSelf: 'center',
    width: 80,
    height: 14,
    backgroundColor: '#F3D5B5',
    opacity: 0.85,
    borderRadius: 2,
    transform: [{ rotate: '1deg' }],
    zIndex: 2,
  },
  washiTapeTeacher: {
    backgroundColor: '#F9C6C9',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 14,
  },
  avatarBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ECE4D8',
  },
  avatarEmoji: {
    fontSize: 38,
  },
  profileHeaderInfo: {
    flex: 1,
    marginLeft: 14,
  },
  memberName: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  memberNickname: {
    fontSize: 13,
    fontStyle: 'italic',
    color: theme.colors.accentWarm,
    marginTop: 2,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0ECE4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  quoteCard: {
    backgroundColor: '#FDF9F2',
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.accentWarm,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  quoteCardLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8A533E',
    marginBottom: 4,
  },
  quoteCardBody: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#4F4439',
    lineHeight: 19,
  },
  contactSection: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  contactIcon: {
    fontSize: 13,
    marginRight: 8,
  },
  contactText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  timelineSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    shadowColor: '#4A3E31',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  timelineHeader: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    paddingBottom: 8,
  },
  timelineSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  timelineSubtitle: {
    fontSize: 11.5,
    color: theme.colors.textMuted,
    marginTop: 3,
  },
  footerNote: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: theme.colors.textMuted,
    fontStyle: 'italic',
  },
});

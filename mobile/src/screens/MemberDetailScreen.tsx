import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
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

  const getInitials = (name: string) => {
    if (!name) return 'MB';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Bar Navigation Clean */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Danh bạ</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Hồ Sơ Kỷ Yếu</Text>
        {isMyProfile && onEdit ? (
          <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <Text style={styles.editButtonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 64 }} />
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card Header */}
        <View style={styles.profileCard}>
          <View style={styles.avatarRow}>
            {member.avatarUrl ? (
              <Image
                source={{ uri: member.avatarUrl }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.avatarBox, isTeacher ? styles.avatarTeacher : styles.avatarStudent]}>
                <Text style={[styles.avatarText, isTeacher ? styles.avatarTextTeacher : styles.avatarTextStudent]}>
                  {isTeacher ? 'GV' : getInitials(member.name)}
                </Text>
              </View>
            )}

            <View style={styles.profileHeaderInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.memberName}>{member.name}</Text>
                {isMyProfile && (
                  <View style={styles.myBadge}>
                    <Text style={styles.myBadgeText}>Tôi</Text>
                  </View>
                )}
              </View>

              {member.nickname ? (
                <Text style={styles.memberNickname}>Biệt danh: {member.nickname.trim()}</Text>
              ) : null}

              <View style={styles.roleBadgeContainer}>
                <View style={isTeacher ? styles.roleBadgeTeacher : styles.roleBadgeStudent}>
                  <Text style={isTeacher ? styles.roleBadgeTextTeacher : styles.roleBadgeTextStudent}>
                    {isTeacher ? 'Giáo Viên' : 'Cựu Học Sinh CT1619'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Lời gửi gắm kỷ niệm */}
          {member.memorableQuote ? (
            <View style={styles.quoteCard}>
              <Text style={styles.quoteCardLabel}>Thông điệp kỷ niệm</Text>
              <Text style={styles.quoteCardBody}>"{member.memorableQuote.trim()}"</Text>
            </View>
          ) : null}

          {/* Contact Details */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
            
            <View style={styles.contactGrid}>
              {member.phone ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Điện thoại</Text>
                  <Text style={styles.contactValue}>{member.phone}</Text>
                </View>
              ) : null}

              {member.email ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>{member.email}</Text>
                </View>
              ) : null}

              {member.zaloOrSocial ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Mạng xã hội</Text>
                  <Text style={styles.contactValue}>{member.zaloOrSocial}</Text>
                </View>
              ) : null}

              {member.currentCity ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Địa phương</Text>
                  <Text style={styles.contactValue}>{member.currentCity}</Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Current Job Snapshot */}
          <View style={styles.currentWorkSection}>
            <Text style={styles.sectionTitle}>Hiện tại</Text>
            <View style={styles.workCard}>
              <Text style={styles.workCompany}>{member.currentCompany || 'Đang cập nhật'}</Text>
              <Text style={styles.workMajor}>{member.subjectOrMajor || 'Chưa ghi rõ'}</Text>
            </View>
          </View>
        </View>

        {/* Timeline Component */}
        <View style={styles.timelineSection}>
          <Text style={styles.timelineHeaderTitle}>Hành trình học tập & sự nghiệp</Text>
          <TimelineView timelines={member.timelines} />
        </View>

        {/* Bottom Timestamp */}
        <Text style={styles.updateTimeText}>Cập nhật lần cuối: {member.updatedAt || 'Hôm nay'}</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cardBorder,
  },
  backButton: {
    paddingVertical: 4,
    paddingRight: 8,
  },
  backButtonText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.accentBlue,
    fontWeight: '500',
  },
  topBarTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.sm,
  },
  editButtonText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textInverse,
    fontWeight: '600',
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  profileCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    ...theme.shadows.card,
    marginBottom: theme.spacing.lg,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  avatarImage: {
    width: 68,
    height: 68,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: theme.colors.cardBorder,
    marginRight: theme.spacing.lg,
  },
  avatarBox: {
    width: 68,
    height: 68,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  avatarTeacher: {
    backgroundColor: theme.colors.badgeTeacherBg,
  },
  avatarStudent: {
    backgroundColor: theme.colors.badgeStudentBg,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '700',
  },
  avatarTextTeacher: {
    color: theme.colors.badgeTeacherText,
  },
  avatarTextStudent: {
    color: theme.colors.badgeStudentText,
  },
  profileHeaderInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberName: {
    fontSize: theme.typography.sizes.title,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  myBadge: {
    backgroundColor: theme.colors.badgeSelfBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.pill,
    marginLeft: 8,
  },
  myBadgeText: {
    color: theme.colors.badgeSelfText,
    fontSize: theme.typography.sizes.small,
    fontWeight: '600',
  },
  memberNickname: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  roleBadgeContainer: {
    marginTop: 6,
    flexDirection: 'row',
  },
  roleBadgeTeacher: {
    backgroundColor: theme.colors.badgeTeacherBg,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.pill,
  },
  roleBadgeStudent: {
    backgroundColor: theme.colors.badgeStudentBg,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.pill,
  },
  roleBadgeTextTeacher: {
    fontSize: theme.typography.sizes.small,
    fontWeight: '600',
    color: theme.colors.badgeTeacherText,
  },
  roleBadgeTextStudent: {
    fontSize: theme.typography.sizes.small,
    fontWeight: '600',
    color: theme.colors.badgeStudentText,
  },
  quoteCard: {
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  quoteCardLabel: {
    fontSize: theme.typography.sizes.small,
    fontWeight: '600',
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  quoteCardBody: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textPrimary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  contactSection: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.sm,
  },
  contactGrid: {
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  contactLabel: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
  },
  contactValue: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  currentWorkSection: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: theme.spacing.md,
  },
  workCard: {
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
  },
  workCompany: {
    fontSize: theme.typography.sizes.body,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  workMajor: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  timelineSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    ...theme.shadows.card,
    marginBottom: theme.spacing.lg,
  },
  timelineHeaderTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  updateTimeText: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});

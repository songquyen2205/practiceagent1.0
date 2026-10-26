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

  const getInitials = (name: string) => {
    if (!name) return 'MB';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Modern Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Danh sách</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1}>
          {member.name}
        </Text>
        {isMyProfile && onEdit ? (
          <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <Text style={styles.editButtonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 70 }} />
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarRow}>
            <View style={[styles.avatarBox, isTeacher ? styles.avatarTeacher : styles.avatarStudent]}>
              <Text style={[styles.avatarText, isTeacher ? styles.avatarTextTeacher : styles.avatarTextStudent]}>
                {isTeacher ? 'GV' : getInitials(member.name)}
              </Text>
            </View>

            <View style={styles.headerInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.memberName}>{member.name}</Text>
                {isTeacher && (
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Giáo Viên</Text>
                  </View>
                )}
              </View>

              {member.nickname ? (
                <Text style={styles.nickname}>
                  "{member.nickname.replace(/[🌸❤️🌻⚡🎨🏖️💻🌟🎻🎸🎬📷✈️🩺🏀📖🍲🌾🐾🏔️]/g, '').trim()}"
                </Text>
              ) : null}

              <Text style={styles.headline} numberOfLines={2}>
                {member.currentCompany || member.subjectOrMajor || 'Đang cập nhật vị trí'}
              </Text>
            </View>
          </View>

          {/* Quick Stats Grid */}
          <View style={styles.metaGrid}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Địa điểm</Text>
              <Text style={styles.metaValue}>{member.currentCity || 'Việt Nam'}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Liên hệ</Text>
              <Text style={styles.metaValue}>{member.phone || member.email || 'Không công khai'}</Text>
            </View>
            {member.zaloOrSocial ? (
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Mạng xã hội</Text>
                <Text style={styles.metaValue}>{member.zaloOrSocial}</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Lời chúc / Kỷ niệm */}
        {member.memorableQuote ? (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Lời nhắn gửi</Text>
            <Text style={styles.quoteBody}>
              "{member.memorableQuote.replace(/[🌸❤️🌻⚡🎨🏖️💻🌟🎻🎸🎬📷✈️🩺🏀📖🍲🌾🐾🏔️💭]/g, '').trim()}"
            </Text>
          </View>
        ) : null}

        {/* Hành trình Học vấn & Nghề nghiệp */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hành trình & Mốc sự nghiệp</Text>
            <Text style={styles.sectionBadge}>{member.timelines?.length || 0} mốc</Text>
          </View>
          <TimelineView milestones={member.timelines} />
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
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cardBorder,
  },
  backButton: {
    width: 80,
  },
  backButtonText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
  topBarTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    flex: 1,
  },
  editButton: {
    width: 80,
    alignItems: 'flex-end',
  },
  editButtonText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  profileCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.subtle,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  avatarStudent: {
    backgroundColor: theme.colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  avatarTeacher: {
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: theme.typography.weights.bold,
  },
  avatarTextStudent: {
    color: theme.colors.textPrimary,
  },
  avatarTextTeacher: {
    color: theme.colors.primary,
  },
  headerInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberName: {
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    marginRight: theme.spacing.sm,
  },
  tag: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
  },
  tagText: {
    fontSize: theme.typography.sizes.small,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.primary,
  },
  nickname: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  headline: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  metaItem: {
    width: '50%',
    marginBottom: theme.spacing.sm,
  },
  metaLabel: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    fontWeight: theme.typography.weights.medium,
  },
  metaValue: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textPrimary,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.subtle,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
  },
  sectionBadge: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
  },
  quoteBody: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginTop: theme.spacing.sm,
    fontStyle: 'italic',
  },
});

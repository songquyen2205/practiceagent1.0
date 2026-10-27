import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Member } from '../types';
import { theme } from '../theme';

interface Props {
  member: Member;
  onPress: () => void;
  isMyProfile?: boolean;
}

export const MemberCard: React.FC<Props> = ({ member, onPress, isMyProfile }) => {
  const isTeacher = member.role === 'teacher';
  const currentJob = member.timelines.find(t => t.isCurrent) || member.timelines[member.timelines.length - 1];

  const getInitials = (name: string) => {
    if (!name) return 'MB';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, isTeacher && styles.cardTeacher]}
    >
      <View style={styles.cardHeader}>
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

        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {member.name}
            </Text>
            {isTeacher && (
              <View style={styles.teacherBadge}>
                <Text style={styles.teacherBadgeText}>Giáo Viên</Text>
              </View>
            )}
            {isMyProfile && (
              <View style={styles.myBadge}>
                <Text style={styles.myBadgeText}>Tôi</Text>
              </View>
            )}
          </View>

          {member.nickname ? (
            <Text style={styles.nickname} numberOfLines={1}>
              {member.nickname.trim()}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Hiện tại</Text>
          <Text style={styles.detailValue} numberOfLines={1}>
            {member.currentCompany || currentJob?.title || 'Đang cập nhật'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Chuyên ngành</Text>
          <Text style={styles.detailValue} numberOfLines={1}>
            {member.subjectOrMajor || currentJob?.subtitle || 'Chưa ghi rõ'}
          </Text>
        </View>

        {member.memorableQuote ? (
          <View style={styles.quoteWrapper}>
            <Text style={styles.quoteText} numberOfLines={2}>
              "{member.memorableQuote.trim()}"
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.locationText}>{member.currentCity || 'Việt Nam'}</Text>
        <Text style={styles.arrowIcon}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.card,
  },
  cardTeacher: {
    borderColor: '#FCD34D',
    backgroundColor: '#FFFDF9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1.5,
    borderColor: theme.colors.cardBorder,
    backgroundColor: theme.colors.surfaceSubtle,
    marginRight: theme.spacing.md,
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  avatarTeacher: {
    backgroundColor: theme.colors.badgeTeacherBg,
  },
  avatarStudent: {
    backgroundColor: theme.colors.badgeStudentBg,
  },
  avatarText: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '700',
  },
  avatarTextTeacher: {
    color: theme.colors.badgeTeacherText,
  },
  avatarTextStudent: {
    color: theme.colors.badgeStudentText,
  },
  headerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginRight: theme.spacing.sm,
    letterSpacing: -0.2,
  },
  teacherBadge: {
    backgroundColor: theme.colors.badgeTeacherBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.pill,
    marginRight: theme.spacing.xs,
  },
  teacherBadgeText: {
    color: theme.colors.badgeTeacherText,
    fontSize: theme.typography.sizes.small,
    fontWeight: '600',
  },
  myBadge: {
    backgroundColor: theme.colors.badgeSelfBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.pill,
  },
  myBadgeText: {
    color: theme.colors.badgeSelfText,
    fontSize: theme.typography.sizes.small,
    fontWeight: '600',
  },
  nickname: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textPrimary,
    fontWeight: '500',
    maxWidth: '70%',
    textAlign: 'right',
  },
  quoteWrapper: {
    marginTop: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.borderRadius.sm,
  },
  quoteText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.xs,
  },
  locationText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  arrowIcon: {
    fontSize: theme.typography.sizes.heading,
    color: theme.colors.textMuted,
    fontWeight: '600',
  },
});

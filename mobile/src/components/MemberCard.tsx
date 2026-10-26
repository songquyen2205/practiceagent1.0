import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.card, isTeacher && styles.cardTeacher]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.avatarBox, isTeacher ? styles.avatarTeacher : styles.avatarStudent]}>
          <Text style={[styles.avatarText, isTeacher ? styles.avatarTextTeacher : styles.avatarTextStudent]}>
            {isTeacher ? 'GV' : getInitials(member.name)}
          </Text>
        </View>

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
              {member.nickname.replace(/[^\w\s\u00C0-\u1EF9]/gi, '').trim()}
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
              "{member.memorableQuote.replace(/[^\w\s\u00C0-\u1EF9.,!?-]/gi, '').trim()}"
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
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  cardTeacher: {
    borderColor: theme.colors.primaryBorder,
    backgroundColor: '#FAFDFE',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarBox: {
    width: 44,
    height: 44,
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
    fontSize: theme.typography.sizes.body,
    fontWeight: '600',
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginRight: theme.spacing.sm,
  },
  teacherBadge: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
  },
  teacherBadgeText: {
    fontSize: theme.typography.sizes.small,
    fontWeight: '500',
    color: theme.colors.primary,
  },
  myBadge: {
    backgroundColor: theme.colors.accentEmeraldBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
  },
  myBadgeText: {
    fontSize: theme.typography.sizes.small,
    fontWeight: '500',
    color: theme.colors.accentEmerald,
  },
  nickname: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailLabel: {
    width: 95,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
  detailValue: {
    flex: 1,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
  },
  quoteWrapper: {
    marginTop: theme.spacing.sm,
    paddingLeft: theme.spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: theme.colors.cardBorderHover,
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
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  locationText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
  },
  arrowIcon: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textMuted,
  },
});

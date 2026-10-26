import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimelineMilestone } from '../types';
import { theme } from '../theme';

interface Props {
  milestones: TimelineMilestone[];
}

export const TimelineView: React.FC<Props> = ({ milestones }) => {
  if (!milestones || milestones.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Chưa có mốc hành trình nào.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {milestones.map((item, index) => {
        const isLast = index === milestones.length - 1;
        const isEdu = item.type === 'education';

        return (
          <View key={item.id || index} style={styles.row}>
            {/* Axis Node & Line */}
            <View style={styles.axis}>
              <View
                style={[
                  styles.dot,
                  item.isCurrent && styles.dotCurrent,
                  isEdu && styles.dotEdu,
                ]}
              />
              {!isLast && <View style={styles.line} />}
            </View>

            {/* Content Card */}
            <View style={styles.card}>
              <View style={styles.header}>
                <View style={styles.badgeRow}>
                  <View style={[styles.periodBadge, item.isCurrent && styles.periodBadgeCurrent]}>
                    <Text style={[styles.periodText, item.isCurrent && styles.periodTextCurrent]}>
                      {item.period}
                    </Text>
                  </View>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeText}>{isEdu ? 'Học vấn' : 'Sự nghiệp'}</Text>
                  </View>
                </View>

                {item.isCurrent && (
                  <View style={styles.activeTag}>
                    <Text style={styles.activeTagText}>Hiện tại</Text>
                  </View>
                )}
              </View>

              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>

              {item.location ? (
                <Text style={styles.location}>{item.location}</Text>
              ) : null}

              {item.description ? (
                <Text style={styles.description}>{item.description}</Text>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.sm,
  },
  emptyContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textMuted,
  },
  row: {
    flexDirection: 'row',
  },
  axis: {
    width: 24,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.cardBorderHover,
    marginTop: 6,
  },
  dotCurrent: {
    backgroundColor: theme.colors.accentEmerald,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotEdu: {
    backgroundColor: theme.colors.primary,
  },
  line: {
    flex: 1,
    width: 1.5,
    backgroundColor: theme.colors.cardBorder,
    marginVertical: 4,
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginLeft: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  periodBadge: {
    backgroundColor: theme.colors.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
    marginRight: 6,
  },
  periodBadgeCurrent: {
    backgroundColor: theme.colors.accentEmeraldBg,
  },
  periodText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
  },
  periodTextCurrent: {
    color: theme.colors.accentEmerald,
  },
  typeBadge: {
    backgroundColor: theme.colors.surfaceSubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
  },
  typeText: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.textMuted,
  },
  activeTag: {
    backgroundColor: theme.colors.accentEmeraldBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
  },
  activeTagText: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.accentEmerald,
    fontWeight: theme.typography.weights.semibold,
  },
  title: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  location: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
  description: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    marginTop: 6,
    lineHeight: 18,
  },
});

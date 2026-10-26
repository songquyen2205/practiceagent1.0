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
        <Text style={styles.emptyText}>Chưa có mốc hành trình nào được ghi lại.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {milestones.map((item, index) => {
        const isLast = index === milestones.length - 1;
        const isEdu = item.type === 'education';

        return (
          <View key={item.id || index} style={styles.stepRow}>
            {/* Cột trục Timeline */}
            <View style={styles.axisCol}>
              <View
                style={[
                  styles.nodeCircle,
                  item.isCurrent && styles.nodeCircleCurrent,
                  isEdu && styles.nodeCircleEdu,
                ]}
              >
                <Text style={styles.nodeIcon}>
                  {item.isCurrent ? '⭐' : isEdu ? '🎓' : '💼'}
                </Text>
              </View>
              {!isLast && <View style={styles.axisLine} />}
            </View>

            {/* Thẻ nội dung mốc thời gian */}
            <View style={styles.contentCard}>
              <View style={styles.badgeRow}>
                <View
                  style={[
                    styles.periodBadge,
                    item.isCurrent && styles.periodBadgeCurrent,
                  ]}
                >
                  <Text
                    style={[
                      styles.periodText,
                      item.isCurrent && styles.periodTextCurrent,
                    ]}
                  >
                    {item.period}
                  </Text>
                </View>

                {item.isCurrent && (
                  <View style={styles.activeTag}>
                    <Text style={styles.activeTagText}>Đang làm / Đang học</Text>
                  </View>
                )}
              </View>

              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.subtitleText}>{item.subtitle}</Text>

              {item.location ? (
                <Text style={styles.locationText}>📍 {item.location}</Text>
              ) : null}

              {item.description ? (
                <Text style={styles.descText}>{item.description}</Text>
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
    paddingVertical: 8,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  axisCol: {
    alignItems: 'center',
    width: 36,
  },
  nodeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FAF5EE',
    borderWidth: 2,
    borderColor: '#C8BEAF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  nodeCircleEdu: {
    borderColor: theme.colors.accentBlue,
    backgroundColor: '#EEF6FA',
  },
  nodeCircleCurrent: {
    borderColor: theme.colors.primary,
    backgroundColor: '#E8F5EC',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  nodeIcon: {
    fontSize: 14,
  },
  axisLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#DFD7CA',
    marginTop: 4,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#EBE3D5',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
    gap: 6,
  },
  periodBadge: {
    backgroundColor: '#F3EFE6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  periodBadgeCurrent: {
    backgroundColor: theme.colors.badgeCurrent,
  },
  periodText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  periodTextCurrent: {
    color: theme.colors.badgeCurrentText,
  },
  activeTag: {
    backgroundColor: '#FFF2E8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeTagText: {
    fontSize: 10,
    color: '#D87A56',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  subtitleText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
  descText: {
    fontSize: 12,
    color: '#655B51',
    lineHeight: 17,
    marginTop: 6,
    fontStyle: 'italic',
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.textMuted,
    fontStyle: 'italic',
    fontSize: 13,
  },
});

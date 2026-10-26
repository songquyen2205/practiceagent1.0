import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Member } from '../types';
import { MemberCard } from '../components/MemberCard';
import { theme } from '../theme';

interface Props {
  members: Member[];
  className: string;
  schoolYear: string;
  onSelectMember: (member: Member) => void;
  myProfileId: string;
}

export const MembersScreen: React.FC<Props> = ({
  members,
  className,
  schoolYear,
  onSelectMember,
  myProfileId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'teacher' | 'student'>('all');

  const filteredMembers = members.filter(m => {
    if (selectedFilter === 'teacher' && m.role !== 'teacher') return false;
    if (selectedFilter === 'student' && m.role !== 'student') return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchName = m.name.toLowerCase().includes(q);
    const matchNick = m.nickname?.toLowerCase().includes(q);
    const matchCompany = m.currentCompany?.toLowerCase().includes(q);
    const matchMajor = m.subjectOrMajor?.toLowerCase().includes(q);
    const matchCity = m.currentCity?.toLowerCase().includes(q);
    const matchTimeline = m.timelines.some(
      t => t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q)
    );

    return matchName || matchNick || matchCompany || matchMajor || matchCity || matchTimeline;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Modern Clean Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>{schoolYear}</Text>
            <Text style={styles.headerTitle}>{className}</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{members.length} thành viên</Text>
          </View>
        </View>

        {/* Minimal Search & Filter Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm theo tên, trường học, công ty, ngành nghề..."
            placeholderTextColor={theme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>

        {/* Segmented Filter Control */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.segmentButton, selectedFilter === 'all' && styles.segmentButtonActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.segmentText, selectedFilter === 'all' && styles.segmentTextActive]}>
              Tất cả ({members.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentButton, selectedFilter === 'teacher' && styles.segmentButtonActive]}
            onPress={() => setSelectedFilter('teacher')}
          >
            <Text style={[styles.segmentText, selectedFilter === 'teacher' && styles.segmentTextActive]}>
              Thầy Cô
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentButton, selectedFilter === 'student' && styles.segmentButtonActive]}
            onPress={() => setSelectedFilter('student')}
          >
            <Text style={[styles.segmentText, selectedFilter === 'student' && styles.segmentTextActive]}>
              Học Sinh
            </Text>
          </TouchableOpacity>
        </View>

        {/* Members List */}
        <FlatList
          data={filteredMembers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MemberCard
              member={item}
              isMyProfile={item.id === myProfileId}
              onPress={() => onSelectMember(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyView}>
              <Text style={styles.emptyTitle}>Không tìm thấy kết quả</Text>
              <Text style={styles.emptyDesc}>
                Không có thành viên nào khớp với từ khóa "{searchQuery}".
              </Text>
            </View>
          }
        />
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
    alignItems: 'flex-start',
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
  countBadge: {
    backgroundColor: theme.colors.surfaceSubtle,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.pill,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  countText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
  },
  searchContainer: {
    marginVertical: theme.spacing.sm,
  },
  searchInput: {
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textPrimary,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceSubtle,
    padding: 3,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  segmentButtonActive: {
    backgroundColor: theme.colors.cardBackground,
    ...theme.shadows.subtle,
  },
  segmentText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    fontWeight: theme.typography.weights.medium,
  },
  segmentTextActive: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.weights.semibold,
  },
  listContent: {
    paddingBottom: theme.spacing.xxxl,
  },
  emptyView: {
    padding: theme.spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
  },
  emptyDesc: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
});

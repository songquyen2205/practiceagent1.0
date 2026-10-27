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
        {/* Top Header Clean iOS Style */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>{schoolYear}</Text>
            <Text style={styles.headerTitle}>{className}</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{members.length} thành viên</Text>
          </View>
        </View>

        {/* Search Input Clean */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm theo tên, nơi công tác, chuyên ngành, vị trí..."
            placeholderTextColor={theme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <Text style={styles.clearBtnText}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Pills Segmented Control */}
        <View style={styles.filterBar}>
          <TouchableOpacity
            style={[styles.filterPill, selectedFilter === 'all' && styles.filterPillActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterPillText, selectedFilter === 'all' && styles.filterPillTextActive]}>
              Tất cả ({members.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, selectedFilter === 'teacher' && styles.filterPillActive]}
            onPress={() => setSelectedFilter('teacher')}
          >
            <Text style={[styles.filterPillText, selectedFilter === 'teacher' && styles.filterPillTextActive]}>
              Thầy Cô ({members.filter(m => m.role === 'teacher').length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, selectedFilter === 'student' && styles.filterPillActive]}
            onPress={() => setSelectedFilter('student')}
          >
            <Text style={[styles.filterPillText, selectedFilter === 'student' && styles.filterPillTextActive]}>
              Thành viên ({members.filter(m => m.role === 'student').length})
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
              onPress={() => onSelectMember(item)}
              isMyProfile={item.id === myProfileId}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Không tìm thấy kết quả</Text>
              <Text style={styles.emptySubtitle}>
                Thử tìm với từ khóa khác như tên thành viên, công ty hoặc chuyên ngành.
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
    paddingTop: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
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
  countBadge: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.pill,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  countText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textPrimary,
    ...theme.shadows.sm,
  },
  clearBtn: {
    position: 'absolute',
    right: 12,
    top: 9,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.surfaceSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearBtnText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    lineHeight: 18,
  },
  filterBar: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.pill,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  filterPillActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterPillText: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  filterPillTextActive: {
    color: theme.colors.textInverse,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: theme.spacing.xxxl,
  },
  emptyContainer: {
    paddingVertical: theme.spacing.xxxl,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: theme.typography.sizes.heading,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textMuted,
    textAlign: 'center',
    maxWidth: 280,
  },
});

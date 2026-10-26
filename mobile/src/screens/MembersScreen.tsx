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
    // Lọc theo role
    if (selectedFilter === 'teacher' && m.role !== 'teacher') return false;
    if (selectedFilter === 'student' && m.role !== 'student') return false;

    // Tìm kiếm
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
        {/* Header Sổ Lưu Bút Kỷ Niệm */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>{schoolYear}</Text>
            <Text style={styles.headerTitle}>📖 {className}</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{members.length} thành viên</Text>
          </View>
        </View>

        {/* Lời nhắn nhủ ấm áp */}
        <View style={styles.introCard}>
          <Text style={styles.introQuote}>
            "Thầy cô ngày càng lớn tuổi, trí nhớ sẽ dần suy giảm nên các con thông cảm nhé ❤️"
          </Text>
          <Text style={styles.introSub}>
            Lưu giữ hành trình học tập, sự nghiệp và nơi công tác của từng bạn lớp mình.
          </Text>
        </View>

        {/* Ô tìm kiếm thông minh */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm theo tên, ĐH, công ty, ngành nghề..."
            placeholderTextColor={theme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter tags */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterChip, selectedFilter === 'all' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === 'all' && styles.filterChipTextActive,
              ]}
            >
              Tất cả ({members.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, selectedFilter === 'teacher' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('teacher')}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === 'teacher' && styles.filterChipTextActive,
              ]}
            >
              👩‍🏫 Thầy Cô ({members.filter(m => m.role === 'teacher').length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, selectedFilter === 'student' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('student')}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === 'student' && styles.filterChipTextActive,
              ]}
            >
              🎓 Bạn bè ({members.filter(m => m.role === 'student').length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Danh sách thành viên */}
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
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>Không tìm thấy thành viên phù hợp</Text>
              <Text style={styles.emptySub}>Thử gõ từ khoá khác hoặc xoá bộ lọc xem sao nhé!</Text>
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
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 12,
    color: theme.colors.accentWarm,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  countBadge: {
    backgroundColor: '#EBE2D5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  countText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '700',
  },
  introCard: {
    backgroundColor: '#FFFBF2',
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accentWarm,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFE7D8',
  },
  introQuote: {
    fontSize: 12.5,
    fontStyle: 'italic',
    color: '#824831',
    lineHeight: 17,
  },
  introSub: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: 3,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    marginBottom: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  clearBtn: {
    fontSize: 14,
    color: theme.colors.textMuted,
    padding: 4,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#EFECE6',
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  emptySub: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
});

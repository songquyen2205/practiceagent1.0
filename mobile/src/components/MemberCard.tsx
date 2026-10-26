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

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.cardContainer}>
      {/* Giả lập miếng băng dính washi hoài niệm dán ở góc */}
      <View style={[styles.washiTape, isTeacher && styles.washiTapeTeacher]} />

      <View style={styles.contentRow}>
        {/* Avatar polaroid / sticker */}
        <View style={[styles.avatarBox, { backgroundColor: member.avatarBgColor }]}>
          <Text style={styles.avatarEmoji}>{member.avatarText}</Text>
          {isTeacher && <View style={styles.teacherBadge}><Text style={styles.teacherBadgeText}>Thầy Cô</Text></View>}
        </View>

        {/* Thông tin chính */}
        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText} numberOfLines={1}>
              {member.name}
            </Text>
            {isMyProfile && (
              <View style={styles.meBadge}>
                <Text style={styles.meBadgeText}>Tôi</Text>
              </View>
            )}
          </View>

          {member.nickname ? (
            <Text style={styles.nicknameText}>"{member.nickname}"</Text>
          ) : null}

          {/* Vị trí hiện tại - rất quan trọng để thầy cô biết bạn đang làm gì */}
          <View style={styles.statusBox}>
            <Text style={styles.statusLabel}>Hiện tại:</Text>
            <Text style={styles.statusValue} numberOfLines={1}>
              {member.currentCompany || currentJob?.title || 'Đang cập nhật'}
            </Text>
          </View>

          <Text style={styles.majorText} numberOfLines={1}>
            🎓 {member.subjectOrMajor || currentJob?.subtitle || 'Chưa ghi rõ ngành'}
          </Text>
        </View>
      </View>

      {/* Lời trích dẫn/lưu bút nhỏ bên dưới thẻ */}
      {member.memorableQuote ? (
        <View style={styles.quoteBox}>
          <Text style={styles.quoteText} numberOfLines={2}>
            💭 "{member.memorableQuote}"
          </Text>
        </View>
      ) : null}

      <View style={styles.footerRow}>
        <Text style={styles.cityText}>📍 {member.currentCity || 'Việt Nam'}</Text>
        <Text style={styles.updatedText}>Cập nhật: {member.updatedAt}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    shadowColor: '#4A3E31',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  washiTape: {
    position: 'absolute',
    top: -7,
    right: 28,
    width: 60,
    height: 14,
    backgroundColor: '#F3D5B5',
    opacity: 0.85,
    borderRadius: 2,
    transform: [{ rotate: '-3deg' }],
    zIndex: 2,
  },
  washiTapeTeacher: {
    backgroundColor: '#F9C6C9',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {
    width: 64,
    height: 64,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#EFE8DC',
    position: 'relative',
  },
  avatarEmoji: {
    fontSize: 32,
  },
  teacherBadge: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: '#D87A56',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  teacherBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  infoCol: {
    flex: 1,
    marginLeft: 14,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    flexShrink: 1,
  },
  meBadge: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 6,
  },
  meBadgeText: {
    fontSize: 10,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  nicknameText: {
    fontSize: 13,
    color: theme.colors.accentWarm,
    fontStyle: 'italic',
    marginTop: 1,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#F7F4EE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginRight: 4,
  },
  statusValue: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
    flexShrink: 1,
  },
  majorText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  quoteBox: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  quoteText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#554B41',
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  cityText: {
    fontSize: 11,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
  updatedText: {
    fontSize: 10,
    color: theme.colors.textMuted,
  },
});

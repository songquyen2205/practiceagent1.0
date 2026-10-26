import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Member, TimelineMilestone } from '../types';
import { theme } from '../theme';

interface Props {
  member: Member;
  onSave: (updatedMember: Member) => void;
  onCancel: () => void;
}

export const EditProfileScreen: React.FC<Props> = ({ member, onSave, onCancel }) => {
  const [name, setName] = useState(member.name);
  const [nickname, setNickname] = useState(member.nickname || '');
  const [avatarText, setAvatarText] = useState(member.avatarText || '👨‍🎓');
  const [subjectOrMajor, setSubjectOrMajor] = useState(member.subjectOrMajor || '');
  const [currentCompany, setCurrentCompany] = useState(member.currentCompany || '');
  const [currentCity, setCurrentCity] = useState(member.currentCity || '');
  const [phone, setPhone] = useState(member.phone || '');
  const [email, setEmail] = useState(member.email || '');
  const [zaloOrSocial, setZaloOrSocial] = useState(member.zaloOrSocial || '');
  const [memorableQuote, setMemorableQuote] = useState(member.memorableQuote || '');
  const [timelines, setTimelines] = useState<TimelineMilestone[]>(member.timelines || []);

  // Form thêm milestone mới
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newPeriod, setNewPeriod] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState<'education' | 'career'>('career');
  const [isCurrentJob, setIsCurrentJob] = useState(true);

  const handleAddMilestone = () => {
    if (!newTitle.trim() || !newSubtitle.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập tên Trường/Công ty và Ngành học/Chức danh.');
      return;
    }

    const newMilestone: TimelineMilestone = {
      id: `tl_${Date.now()}`,
      type: newType,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim(),
      period: newPeriod.trim() || (isCurrentJob ? 'Hiện tại' : '2024'),
      location: newLocation.trim(),
      isCurrent: isCurrentJob,
    };

    // Nếu mốc mới là công việc hiện tại, cập nhật luôn currentCompany
    if (isCurrentJob && newType === 'career') {
      setCurrentCompany(newTitle.trim());
      // Bỏ isCurrent ở các mốc cũ
      setTimelines(prev => [...prev.map(t => ({ ...t, isCurrent: false })), newMilestone]);
    } else {
      setTimelines(prev => [...prev, newMilestone]);
    }

    // Reset form
    setNewTitle('');
    setNewSubtitle('');
    setNewPeriod('');
    setNewLocation('');
  };

  const handleRemoveMilestone = (id: string) => {
    setTimelines(prev => prev.filter(t => t.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Chưa nhập tên', 'Vui lòng nhập họ và tên của bạn.');
      return;
    }

    const updated: Member = {
      ...member,
      name: name.trim(),
      nickname: nickname.trim(),
      avatarText: avatarText.trim() || '👨‍🎓',
      subjectOrMajor: subjectOrMajor.trim(),
      currentCompany: currentCompany.trim(),
      currentCity: currentCity.trim(),
      phone: phone.trim(),
      email: email.trim(),
      zaloOrSocial: zaloOrSocial.trim(),
      memorableQuote: memorableQuote.trim(),
      timelines,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onSave(updated);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>Huỷ</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cập Nhật Hành Trình Của Tôi</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Lưu Lại</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Lời nhắn nhủ */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Giúp thầy cô & lớp mình nắm tin tức</Text>
          <Text style={styles.tipBody}>
            Mỗi lần đổi việc, học thêm bằng mới hay chuyển nơi ở, bạn chỉ cần cập nhật ở đây để thầy cô và bạn bè luôn biết bạn đang ở đâu nhé!
          </Text>
        </View>

        {/* Thông tin cá nhân cơ bản */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>👤 Thông tin cơ bản</Text>

          <Text style={styles.label}>Họ và tên *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ví dụ: Trần Quang Minh"
          />

          <View style={styles.rowInputs}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>Biệt danh thân mật</Text>
              <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                placeholder="Minh Cận, Kiệt Đô..."
              />
            </View>
            <View style={{ width: 80 }}>
              <Text style={styles.label}>Biểu tượng</Text>
              <TextInput
                style={[styles.input, { textAlign: 'center' }]}
                value={avatarText}
                onChangeText={setAvatarText}
                placeholder="👨‍💻"
              />
            </View>
          </View>

          <Text style={styles.label}>Nơi làm việc / Công ty hiện tại</Text>
          <TextInput
            style={styles.input}
            value={currentCompany}
            onChangeText={setCurrentCompany}
            placeholder="Ví dụ: VNG Corp, Bệnh viện Nhi Đồng 1, FPT..."
          />

          <Text style={styles.label}>Ngành nghề chuyên môn / Vị trí</Text>
          <TextInput
            style={styles.input}
            value={subjectOrMajor}
            onChangeText={setSubjectOrMajor}
            placeholder="Ví dụ: Kỹ sư Phần mềm, Bác sĩ Nhi, Giáo viên..."
          />

          <Text style={styles.label}>Nơi ở hiện tại (Thành phố)</Text>
          <TextInput
            style={styles.input}
            value={currentCity}
            onChangeText={setCurrentCity}
            placeholder="Ví dụ: TP. Hồ Chí Minh, Hà Nội, Đà Lạt..."
          />
        </View>

        {/* Liên hệ & Lời gửi gắm */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>💌 Lời gửi thầy cô & Bạn bè</Text>

          <Text style={styles.label}>Lời nhắn nhủ / Kỷ niệm lưu bút</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={memorableQuote}
            onChangeText={setMemorableQuote}
            placeholder="Gửi lời chúc sức khoẻ đến thầy cô và lớp mình..."
            multiline
            numberOfLines={3}
          />

          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="0912..."
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Facebook / Zalo</Text>
          <TextInput
            style={styles.input}
            value={zaloOrSocial}
            onChangeText={setZaloOrSocial}
            placeholder="Zalo: 0912... hoặc FB link"
          />
        </View>

        {/* Danh sách các mốc hành trình */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>🌱 Danh sách mốc hành trình ({timelines.length})</Text>

          {timelines.map(item => (
            <View key={item.id} style={styles.milestoneItem}>
              <View style={{ flex: 1 }}>
                <View style={styles.milestoneHeader}>
                  <Text style={styles.milestonePeriod}>[{item.period}]</Text>
                  {item.isCurrent && (
                    <Text style={styles.currentTag}>• Đang làm</Text>
                  )}
                </View>
                <Text style={styles.milestoneTitle}>{item.title}</Text>
                <Text style={styles.milestoneSubtitle}>{item.subtitle}</Text>
                {item.location ? <Text style={styles.milestoneLoc}>📍 {item.location}</Text> : null}
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveMilestone(item.id)}
                style={styles.deleteMilestoneBtn}
              >
                <Text style={styles.deleteMilestoneText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Form thêm mốc mới */}
          <View style={styles.addMilestoneBox}>
            <Text style={styles.addMilestoneTitle}>➕ Thêm mốc học vấn hoặc công việc mới</Text>

            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[styles.typeBtn, newType === 'career' && styles.typeBtnActive]}
                onPress={() => setNewType('career')}
              >
                <Text style={[styles.typeBtnText, newType === 'career' && styles.typeBtnTextActive]}>
                  💼 Công việc
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeBtn, newType === 'education' && styles.typeBtnActive]}
                onPress={() => setNewType('education')}
              >
                <Text style={[styles.typeBtnText, newType === 'education' && styles.typeBtnTextActive]}>
                  🎓 Trường / Học vấn
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder={newType === 'career' ? 'Tên Công ty / Cơ quan' : 'Tên Trường Đại học / Cao đẳng'}
            />

            <TextInput
              style={styles.input}
              value={newSubtitle}
              onChangeText={setNewSubtitle}
              placeholder={newType === 'career' ? 'Vị trí / Chức danh làm việc' : 'Ngành học / Chuyên ngành'}
            />

            <View style={styles.rowInputs}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                value={newPeriod}
                onChangeText={setNewPeriod}
                placeholder="Năm (ví dụ: 2024 - Hiện tại)"
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={newLocation}
                onChangeText={setNewLocation}
                placeholder="Địa điểm (TP.HCM)"
              />
            </View>

            {/* Checkbox đang làm */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setIsCurrentJob(!isCurrentJob)}
            >
              <Text style={styles.checkboxIcon}>{isCurrentJob ? '☑️' : '⬜'}</Text>
              <Text style={styles.checkboxLabel}>Đây là công việc / học tập hiện tại</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addMilestoneSubmitBtn} onPress={handleAddMilestone}>
              <Text style={styles.addMilestoneSubmitText}>Thêm vào hành trình</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.bottomSaveBtn} onPress={handleSave}>
          <Text style={styles.bottomSaveText}>💾 Lưu Thay Đổi Lưu Bút</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    backgroundColor: '#FAF6F0',
  },
  cancelBtn: {
    paddingVertical: 4,
  },
  cancelBtnText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  saveBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  tipCard: {
    backgroundColor: '#FFF8EB',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EED9B7',
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8C5624',
    marginBottom: 3,
  },
  tipBody: {
    fontSize: 12,
    color: '#654B33',
    lineHeight: 17,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 4,
    marginTop: 6,
  },
  input: {
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#DFD8CC',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
    fontSize: 13,
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },
  textArea: {
    height: 72,
    textAlignVertical: 'top',
    paddingVertical: 8,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F6F1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E7DFD4',
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestonePeriod: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.accentWarm,
  },
  currentTag: {
    fontSize: 10,
    color: theme.colors.primary,
    fontWeight: '700',
    marginLeft: 6,
  },
  milestoneTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginTop: 2,
  },
  milestoneSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  milestoneLoc: {
    fontSize: 11,
    color: theme.colors.textMuted,
  },
  deleteMilestoneBtn: {
    padding: 8,
  },
  deleteMilestoneText: {
    fontSize: 14,
    color: '#C0392B',
    fontWeight: 'bold',
  },
  addMilestoneBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  addMilestoneTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#EFECE6',
  },
  typeBtnActive: {
    backgroundColor: theme.colors.primary,
  },
  typeBtnText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  typeBtnTextActive: {
    color: '#FFFFFF',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkboxIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  checkboxLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  addMilestoneSubmitBtn: {
    backgroundColor: '#ECE3D5',
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  addMilestoneSubmitText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  bottomSaveBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  bottomSaveText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});

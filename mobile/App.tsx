import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LuuButData } from './src/types';
import { INITIAL_DATA } from './src/services/storage';
import { MembersScreen } from './src/screens/MembersScreen';
import { MemberDetailScreen } from './src/screens/MemberDetailScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { EventsScreen } from './src/screens/EventsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { theme } from './src/theme';

export default function App() {
  const [data, setData] = useState<LuuButData>(INITIAL_DATA);
  const [currentTab, setCurrentTab] = useState<'directory' | 'my_profile' | 'events' | 'settings'>('directory');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const myProfile = data.members.find(m => m.id === data.myProfileId) || data.members[1];

  const renderContent = () => {
    if (isEditing) {
      return (
        <EditProfileScreen
          member={selectedMember || myProfile}
          onSave={updated => {
            setSelectedMember(updated);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      );
    }
    if (selectedMember) {
      return (
        <MemberDetailScreen
          member={selectedMember}
          isMyProfile={selectedMember.id === data.myProfileId}
          onBack={() => setSelectedMember(null)}
          onEdit={() => setIsEditing(true)}
        />
      );
    }
    switch (currentTab) {
      case 'directory':
        return (
          <MembersScreen
            members={data.members}
            className={data.className}
            schoolYear={data.schoolYear}
            myProfileId={data.myProfileId}
            onSelectMember={m => setSelectedMember(m)}
          />
        );
      case 'my_profile':
        return (
          <MemberDetailScreen
            member={myProfile}
            isMyProfile={true}
            onBack={() => setCurrentTab('directory')}
            onEdit={() => {
              setSelectedMember(myProfile);
              setIsEditing(true);
            }}
          />
        );
      case 'events':
        return (
          <EventsScreen
            events={data.events}
            onToggleJoin={id => {
              setData(prev => ({
                ...prev,
                events: prev.events.map(e => e.id === id ? { ...e, isRegistered: !e.isRegistered, attendeesCount: e.isRegistered ? e.attendeesCount - 1 : e.attendeesCount + 1 } : e)
              }));
            }}
            onAddEvent={newEvent => {
              setData(prev => ({
                ...prev,
                events: [{ ...newEvent, id: `ev_${Date.now()}`, createdAt: '2026-10-26', isRegistered: true }, ...prev.events]
              }));
            }}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            data={data}
            onImportData={d => setData(d)}
            onResetData={() => setData(INITIAL_DATA)}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.mainView}>{renderContent()}</View>
      {!selectedMember && !isEditing && (
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => { setSelectedMember(null); setCurrentTab('directory'); }}
          >
            <Text style={[styles.navIcon, currentTab === 'directory' && styles.navIconActive]}>📖</Text>
            <Text style={[styles.navLabel, currentTab === 'directory' && styles.navLabelActive]}>Lưu Bút</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => { setSelectedMember(null); setCurrentTab('my_profile'); }}
          >
            <Text style={[styles.navIcon, currentTab === 'my_profile' && styles.navIconActive]}>🌱</Text>
            <Text style={[styles.navLabel, currentTab === 'my_profile' && styles.navLabelActive]}>Hành Trình Của Tôi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => { setSelectedMember(null); setCurrentTab('events'); }}
          >
            <Text style={[styles.navIcon, currentTab === 'events' && styles.navIconActive]}>📌</Text>
            <Text style={[styles.navLabel, currentTab === 'events' && styles.navLabelActive]}>Sự Kiện Lớp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => { setSelectedMember(null); setCurrentTab('settings'); }}
          >
            <Text style={[styles.navIcon, currentTab === 'settings' && styles.navIconActive]}>⚙️</Text>
            <Text style={[styles.navLabel, currentTab === 'settings' && styles.navLabelActive]}>Đồng Bộ</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  mainView: { flex: 1 },
  bottomNav: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ECE3D5',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navIcon: { fontSize: 20, opacity: 0.6 },
  navIconActive: { opacity: 1, transform: [{ scale: 1.15 }] },
  navLabel: { fontSize: 11, fontWeight: '600', color: theme.colors.textMuted, marginTop: 2 },
  navLabelActive: { color: theme.colors.primary, fontWeight: '800' },
});

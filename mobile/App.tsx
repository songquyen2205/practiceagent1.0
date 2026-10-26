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
            onEdit={() => setIsEditing(true)}
          />
        );
      case 'events':
        return (
          <EventsScreen
            events={data.events}
            onToggleJoin={eventId => {
              setData(prev => ({
                ...prev,
                events: prev.events.map(ev => {
                  if (ev.id === eventId) {
                    const joined = !ev.isJoined;
                    return {
                      ...ev,
                      isJoined: joined,
                      attendeesCount: joined ? ev.attendeesCount + 1 : Math.max(1, ev.attendeesCount - 1),
                    };
                  }
                  return ev;
                }),
              }));
            }}
            onAddEvent={newEvent => {
              const created = {
                ...newEvent,
                id: 'ev_' + Date.now(),
                createdAt: new Date().toISOString(),
              };
              setData(prev => ({
                ...prev,
                events: [created, ...prev.events],
              }));
            }}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            data={data}
            onImportData={newData => setData(newData)}
            onResetData={() => setData(INITIAL_DATA)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.contentArea}>{renderContent()}</View>

      {/* Modern iOS Bottom Tab Bar */}
      {!selectedMember && !isEditing && (
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('directory')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, currentTab === 'directory' && styles.tabLabelActive]}>
              Danh bạ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('my_profile')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, currentTab === 'my_profile' && styles.tabLabelActive]}>
              Cá nhân
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('events')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, currentTab === 'events' && styles.tabLabelActive]}>
              Sự kiện
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('settings')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, currentTab === 'settings' && styles.tabLabelActive]}>
              Hệ thống
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentArea: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 54,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: theme.colors.cardBorder,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabLabel: {
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textMuted,
  },
  tabLabelActive: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  },
});

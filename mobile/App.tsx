import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LuuButData, Member } from './src/types';
import { INITIAL_DATA } from './src/services/storage';
import { MembersScreen } from './src/screens/MembersScreen';
import { MemberDetailScreen } from './src/screens/MemberDetailScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { EventsScreen } from './src/screens/EventsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { theme } from './src/theme';

export default function App() {
  const [data, setData] = useState<LuuButData>(INITIAL_DATA);
  const [currentUser, setCurrentUser] = useState<Member | null>(null);
  const [currentTab, setCurrentTab] = useState<'directory' | 'my_profile' | 'events' | 'settings'>('directory');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // If not logged in, render LoginScreen
  if (!currentUser) {
    return (
      <LoginScreen
        members={data.members}
        onLoginSuccess={member => {
          setCurrentUser(member);
          setData(prev => ({ ...prev, myProfileId: member.id }));
        }}
      />
    );
  }

  const renderContent = () => {
    if (isEditing) {
      return (
        <EditProfileScreen
          member={selectedMember || currentUser}
          onSave={updated => {
            // Update in members list
            setData(prev => ({
              ...prev,
              members: prev.members.map(m => (m.id === updated.id ? updated : m)),
            }));
            if (currentUser.id === updated.id) {
              setCurrentUser(updated);
            }
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
          isMyProfile={selectedMember.id === currentUser.id}
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
            myProfileId={currentUser.id}
            onSelectMember={m => setSelectedMember(m)}
          />
        );
      case 'my_profile':
        return (
          <MemberDetailScreen
            member={currentUser}
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
            currentUser={currentUser}
            onImportData={newData => setData(newData)}
            onResetData={() => setData(INITIAL_DATA)}
            onLogout={() => {
              setCurrentUser(null);
              setSelectedMember(null);
              setIsEditing(false);
              setCurrentTab('directory');
            }}
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
    fontWeight: '500',
    color: theme.colors.textMuted,
  },
  tabLabelActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import {
  BottomContainer,
  BottomContainerData,
  IconContainer,
  IconHome,
  IconHomeText,
  IconProfile,
  IconProfileText,
  IconNotificationContainer,
  IconNotification,
  NotificationAlertContainer,
  NotificationAlertText,
  IconNotificationText,
  IconSingOut,
  IconSingOutText,
} from './styles';

const BottomNavigation: React.FC = () => {
  const { user, signOut } = useAuth();

  const navigation = useNavigation();

  const route = useRoute();

  const [dashboard, setDashboard] = useState(false);
  const [profile, setProfile] = useState(false);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    switch (route.name) {
      case 'Dashboard':
        setDashboard(true);
        break;
      case 'Profile':
        setProfile(true);
        break;
      case 'Notifications':
        setNotification(true);
        break;
      default:
        break;
    }
  }, [route.name]);

  const handleSingOut = useCallback(() => {
    return Alert.alert('Logout', 'Deseja realmente sair?', [
      {
        text: 'Sim',
        onPress: () => signOut(),
        style: 'default',
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  }, [signOut]);

  return (
    <BottomContainer>
      <BottomContainerData>
        <IconContainer
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        >
          <IconHome
            name="home"
            size={36}
            color={dashboard ? '#58769e' : '#746b62'}
          />
          <IconHomeText selected={dashboard}>Dashboard</IconHomeText>
        </IconContainer>
        <IconContainer onPress={() => {}}>
          <IconProfile
            name="user"
            size={36}
            color={profile ? '#58769e' : '#746b62'}
          />
          <IconProfileText selected={profile}>Perfil</IconProfileText>
        </IconContainer>
        <IconContainer onPress={() => {}}>
          <IconNotification
            name="exclamation-circle"
            size={36}
            color={notification ? '#58769e' : '#746b62'}
          />
          <IconNotificationText selected={notification}>
            Notificações
          </IconNotificationText>
          <IconNotificationContainer>
            <NotificationAlertContainer>
              <NotificationAlertText>3</NotificationAlertText>
            </NotificationAlertContainer>
          </IconNotificationContainer>
        </IconContainer>
        <IconContainer
          onPress={() => {
            handleSingOut();
          }}
        >
          <IconSingOut name="power-off" size={36} color="#746b62" />
          <IconSingOutText>Sair</IconSingOutText>
        </IconContainer>
      </BottomContainerData>
    </BottomContainer>
  );
};

export default BottomNavigation;

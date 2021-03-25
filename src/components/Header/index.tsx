import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import {
  HeaderContainer,
  IconSingoutContainer,
  IconSingout,
  HeaderDescription,
  HeaderContainerData,
  HeaderContainerCanGoBack,
  HeaderTitleContainer,
  HeaderTitleGreeting,
  HeaderTitleUser,
  AvatarContainer,
  AvatarImage,
} from './styles';

interface RouteParams {
  titleName: string;
}

const Header: React.FC = () => {
  const { user } = useAuth();
  const { canGoBack, goBack } = useNavigation();
  const route = useRoute();

  const routeParams = route.params as RouteParams;

  useEffect(() => {
    messaging()
      .getToken()
      .then(token =>
        api.post('/devices', {
          user_id: user.id,
          device_token: token,
        }),
      );
  }, [user.id]);

  return (
    <HeaderContainer>
      <HeaderContainerData>
        {canGoBack() && (
          <>
            <HeaderContainerCanGoBack>
              <IconSingoutContainer
                onPress={() => {
                  goBack();
                }}
              >
                <IconSingout name="arrow-left" size={42} color="#58769e95" />
              </IconSingoutContainer>
              <HeaderDescription>{routeParams.titleName}</HeaderDescription>
              <AvatarContainer>
                <AvatarImage source={{ uri: 'efe' }} />
              </AvatarContainer>
            </HeaderContainerCanGoBack>
          </>
        )}
        {route.name === 'Dashboard' && (
          <>
            <HeaderTitleContainer>
              <HeaderTitleGreeting>Olá,</HeaderTitleGreeting>
              <HeaderTitleUser>{user.name}</HeaderTitleUser>
            </HeaderTitleContainer>
            <AvatarContainer>
              <AvatarImage source={{ uri: 'efe' }} />
            </AvatarContainer>
          </>
        )}
      </HeaderContainerData>
    </HeaderContainer>
  );
};

export default Header;

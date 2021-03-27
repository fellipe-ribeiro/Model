import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { View, StatusBar, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import AppProvider from './hooks';

import RoutesAll from './routes';

const App: React.FC = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const splitedBody = JSON.stringify(remoteMessage.notification?.body)
        .replace(/\\n/g, ' ')
        .replace(/"/g, '')
        .split(' ');
      Alert.alert(
        'Uma nova notifição foi recebida:',
        `${JSON.stringify(remoteMessage.notification?.title)
          .replace(/\\n/g, '')
          .replace(/"/g, '')}\n${splitedBody[0]} ${splitedBody[1]}\n${
          splitedBody[2]
        } ${splitedBody[3]}\n${splitedBody[4]} ${splitedBody[5]} ${
          splitedBody[6]
        } ${splitedBody[7]} `,
      );
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#DED7CD" />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#DED7CD' }}>
          <RoutesAll />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;

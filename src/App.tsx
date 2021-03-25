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
      Alert.alert(
        'Uma nova notifição foi recebida:',
        `${JSON.stringify(
          remoteMessage.notification?.title,
        )} \n ${JSON.stringify(remoteMessage.notification?.body)}`,
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

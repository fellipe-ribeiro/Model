import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import List from '../pages/List';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#DED7CD' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="List" component={List} />
  </App.Navigator>
);

export default AppRoutes;

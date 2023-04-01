import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import CreateAnnounce from '../pages/CreateAnnounce';
import AnnouncePage from '../pages/AnnouncePage';
import UserProfile from '../pages/UserProfile';

import { colors } from '../style/colors';
import FavoritesPage from '../pages/FavoritesPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createNativeStackNavigator()

const UserStackRouter = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: colors.grey.main,
        }
      }}
    >
      <Screen 
        name="EditAnnounce" 
        component={CreateAnnounce} 
        options={{ contentStyle: { backgroundColor: colors.grey.lighter } }} 
      />
      <Screen 
        name="AnnouncePage" 
        component={AnnouncePage} 
      />
    </Navigator>
  );
}

export default UserStackRouter;
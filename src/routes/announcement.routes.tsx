import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import CreateAnnounce from '../pages/CreateAnnounce';
import AnnouncePage from '../pages/AnnouncePage';
import UserProfile from '../pages/UserProfile';

import { colors } from '../style/colors';
import FavoritesPage from '../pages/FavoritesPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigatorNames, routeNames } from './routeNames';

const { Navigator, Screen } = createNativeStackNavigator()

const AnnouncementStackRouter = () => {
  return (
    <Navigator
      initialRouteName={routeNames.AnnouncementNavigator.HOME}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: colors.grey.main,
        }
      }}
      >
      <Screen 
        name={routeNames[navigatorNames.ANNOUNCEMENT].HOME}
        component={AnnouncePage} 
      />
      <Screen 
        name={routeNames[navigatorNames.ANNOUNCEMENT].CREATE}
        component={CreateAnnounce} 
        options={{ contentStyle: { backgroundColor: colors.grey.lighter } }} 
      />
    </Navigator>
  );
}

export default AnnouncementStackRouter;
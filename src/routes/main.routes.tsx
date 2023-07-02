import React from 'react';

import Home from '../pages/Home';
import CreateAnnounce from '../pages/CreateAnnounce';
import AnnouncePage from '../pages/AnnouncePage';
import UserProfile from '../pages/UserProfile';

import FavoritesPage from '../pages/FavoritesPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useUser from '../hooks/useUser';
import { UserTypesEnum } from '../constants/userRoles';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { colors } from '../style/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabStackNavigator from './tab.routes';
import AnnouncementStackRouter from './announcement.routes';
import { navigatorNames } from './routeNames';

const { Navigator, Screen } = createNativeStackNavigator();

const MainStackRouter = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={navigatorNames.TAB}
    >
      <Screen 
        name={navigatorNames.TAB}
        component={TabStackNavigator} 
      />
      <Screen
        name={navigatorNames.ANNOUNCEMENT}
        component={AnnouncementStackRouter}
      />
    </Navigator>
  );
}

export default MainStackRouter;
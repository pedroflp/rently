import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import CreateAnnounce from '../pages/CreateAnnounce';
import AnnouncePage from '../pages/AnnouncePage';
import UserProfile from '../pages/UserProfile';

import { colors } from '../style/colors';
import FavoritesPage from '../pages/FavoritesPage';

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
      <Screen name="Home" component={Home} />
      <Screen name="CreateAnnounce" component={CreateAnnounce} options={{ contentStyle: { backgroundColor: colors.grey.lighter } }} />
      <Screen name="EditAnnounce" component={CreateAnnounce} options={{ contentStyle: { backgroundColor: colors.grey.lighter } }} />
      <Screen name="AnnouncePage" component={AnnouncePage} />
      <Screen
        options={{
          animation: 'slide_from_right'
        }}
        name="FavoritesPage"
        component={FavoritesPage}
      />
      <Screen
        options={{
          animation: 'slide_from_left'
        }}
        name="UserProfile"
        component={UserProfile}
      />
    </Navigator>
  );
}

export default UserStackRouter;
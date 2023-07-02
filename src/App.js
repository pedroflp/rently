import React from 'react'
import Geocoder from 'react-native-geocoding';

import Toast from 'react-native-toast-message';

import UserContextProvider from './contexts/UserContext';
import AnnouncementContextProvider from './contexts/AnnoucementContext';
import Router from './routes';

import { toastConfig } from './style/toastStyles';

import Config from 'react-native-config';
import { Platform, StatusBar } from 'react-native';
import { setCustomText } from 'react-native-global-props';
import { typography } from './style/typography';
import { colors } from './style/colors';
import { firebase } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  Geocoder.init(Config.MAPS_API_KEY);

  return (
    <UserContextProvider>
      <AnnouncementContextProvider>
        <StatusBar translucent backgroundColor="transparent" barStyle='dark-content' />
        <NavigationContainer>
          <Router />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </AnnouncementContextProvider>
    </UserContextProvider>
  );
};
export default App;

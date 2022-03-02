import React from 'react'
import Geocoder from 'react-native-geocoding';

import Toast from 'react-native-toast-message';

import UserContextProvider from './src/contexts/UserContext';
import AnnouncementContextProvider from './src/contexts/AnnoucementContext';
import Router from './src/routes/Routes';

import { toastConfig } from './src/style/toastStyles';

import { API_KEY_GOOGLE_SERVICES } from '@env';
import { StatusBar } from 'react-native';
import { setCustomText } from 'react-native-global-props';
import { typography } from './src/style/typography';
import { colors } from './src/style/colors';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/components/TabNavigation';

const App = () => {
  const apiKey = API_KEY_GOOGLE_SERVICES
  Geocoder.init(apiKey);

  const customTextProps = {
    style: {
      fontFamily: typography.raleway.regular,
      color: colors.black.main,
    }
  }
  setCustomText(customTextProps);

  return (
    <UserContextProvider>
      <AnnouncementContextProvider>
        <StatusBar translucent backgroundColor="transparent" barStyle='dark-content' />
        <Router />
        <Toast config={toastConfig} />
      </AnnouncementContextProvider>
    </UserContextProvider>
  );
};
export default App;

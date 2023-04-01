import React from 'react'
import Geocoder from 'react-native-geocoding';

import Toast from 'react-native-toast-message';

import UserContextProvider from './contexts/UserContext';
import AnnouncementContextProvider from './contexts/AnnoucementContext';
import Router from './routes';

import { toastConfig } from './style/toastStyles';

import { API_KEY_GOOGLE_SERVICES } from '@env';
import { StatusBar } from 'react-native';
import { setCustomText } from 'react-native-global-props';
import { typography } from './style/typography';
import { colors } from './style/colors';
import { firebase } from '@react-native-firebase/auth';

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

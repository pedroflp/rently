import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from '../pages/Splash';
import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount'
// import ResetPassword from '../views/ResetPassword';

import { colors } from '../style/colors';

const { Navigator, Screen } = createNativeStackNavigator()

const AuthRouter = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.grey.main,
        }
      }}
      initialRouteName='Login'
    >
      <Screen name="Login" component={Login} />
      <Screen name="CreateAccount" component={CreateAccount} />
      {/* <Screen options={{ animation: 'slide_from_bottom' }} name="ResetPassword" component={ResetPassword} /> */}
    </Navigator>
  )
}

export default AuthRouter
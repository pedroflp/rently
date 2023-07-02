import React, { useEffect, useMemo } from 'react'

import AuthRouter from './auth.routes';
import useUser from '../hooks/useUser';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import MainStackRouter from './main.routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/Splash';
import { navigatorNames } from './routeNames';

const Router: React.FC = () => {
  const { navigate } = useNavigation<any>();
  const { Navigator, Screen } = createNativeStackNavigator();
  const { userId } = useUser();
  const hasUser = useMemo(() => !!userId, [userId]);

  useEffect(() => {
    if (hasUser) navigate(navigatorNames.MAIN)
  }, [hasUser])

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
    >
      <Screen name='Splash' component={Splash} />
      <Screen name={navigatorNames.AUTH} component={AuthRouter} />
      <Screen name={navigatorNames.MAIN} component={MainStackRouter} />
    </Navigator>
  )
}

export default Router
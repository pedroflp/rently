import React, { useEffect } from 'react'

import AuthRouter from './auth.routes';
import UserStackRouter from './announce.routes';
import useUser from '../hooks/useUser';
import { NavigationContainer } from '@react-navigation/native';
import MainStackRouter from './main.routes';

const Router: React.FC = () => {
  const { user } = useUser()

  return (
    <NavigationContainer>
      {!!user ? <MainStackRouter /> : <AuthRouter />}
    </NavigationContainer>
  )
}

export default Router
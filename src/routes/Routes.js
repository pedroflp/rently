import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import AuthRouter from './auth.routes';
import UserStackRouter from './user.stack.routes';
import useUser from '../hooks/useUser';
import TabNavigation from '../components/TabNavigation';

const Router = () => {
  const { user, changeAndStoreUser } = useUser()

  useEffect(() => {
    if (user?.authId && !user?.userId) {
      const userSubscriber =
        firestore()
          .collection("Users")
          .where("email", "==", user.email)
          .onSnapshot(
            querySuccess => {
              const user = {
                userId: querySuccess.docs[0].id,
                ...querySuccess.docs[0].data()
              }
              changeAndStoreUser(user)
            },
            queryFailure => Toast.show({
              type: "error",
              text1: "Erro ao buscar usuário",
            })
          )
      return userSubscriber
    }
  }, [user])

  return (
    <NavigationContainer>
      {
        !!user ? (
          <UserStackRouter />
        )
          :
          <AuthRouter />
      }
    </NavigationContainer>
  )
}

export default Router
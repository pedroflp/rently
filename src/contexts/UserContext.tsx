import React, { useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import firestore from '@react-native-firebase/firestore'
import { UserTypes } from '../constants/userRoles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export type IUser = {
  userId?: string,
  authId?: string,
  email: string,
  name: string,
  phone: string,
  type: UserTypes
}

export const UserContext = createContext({
  user: undefined as IUser | undefined,
  changeAndStoreUser: (user: any) => {},
  logoff: () => {},
});

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser>()

  // console.log(user)

  const getStoragedUser = async () => {
    const user = await AsyncStorage.getItem("@RentOuse:user");
    setUser(JSON.parse(user as string))
  }

  const changeAndStoreUser = (userInfo: { userId: string }) => {
    setUser({ ...user, ...userInfo } as any)
    AsyncStorage.setItem("@RentOuse:user", JSON.stringify({ ...user, ...userInfo }));
  }

  const logoff = () => {
    setUser(undefined)
    AsyncStorage.removeItem("@RentOuse:user")
  }

  useEffect(() => {
    if (!user) getStoragedUser()
  }, []);

  useEffect(() => {
    if (user?.authId && !user?.userId) {
      const userSubscriber =
        firestore()
          .collection("Users")
          .where("email", "==", user.email)
          .onSnapshot(
            querySuccess => {
              console.log(querySuccess.docs[0])
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
  }, [user]);


  return (
    <UserContext.Provider value={{ user, changeAndStoreUser, logoff }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;
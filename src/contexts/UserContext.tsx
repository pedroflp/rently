import React, { useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import firestore from '@react-native-firebase/firestore'
import { UserTypes } from '../constants/userRoles';
import auth from '@react-native-firebase/auth'
import { collectionsName } from '../constants/collectionsName';
import { useNavigation } from '@react-navigation/native';
import { navigatorNames } from '../routes/routeNames';

export type IUserID = string | undefined;

export type IUser = {
  email?: string,
  name?: string,
  phone?: string,
  type?: UserTypes,
  isAnonymous?: boolean,
  favorites?: any[],
}

export const UserContext = createContext({
  user: {} as IUser | undefined,
  userId: undefined as IUserID,
  changeAndStoreUser: ({ userId }: { userId: IUserID }) => {},
  logoff: () => {},
});

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<IUserID>();
  const [user, setUser] = useState<IUser | undefined>();

  const changeAndStoreUser = async ({ userId }: { userId: IUserID }) => {
    setUserId(userId);

    const isUserAnonymous = auth().currentUser?.isAnonymous;
    if (isUserAnonymous) setUser({ isAnonymous: true });
    else {
      const userData = (await firestore().collection(collectionsName.USERS).doc(userId).get()).data();
      const userFavorites = await firestore().collection(collectionsName.USERS).doc(userId).collection(collectionsName.FAVORITES).onSnapshot(snap => setUser({...userData, favorites: snap.docs.map(favorite => favorite.data())}))
    };
  }

  const logoff = () => {
    auth().signOut();
    changeAndStoreUser({ userId: undefined });
  };

  useEffect(() => { 
    const currentAuthenticatedUser = auth().currentUser;
    if (!!currentAuthenticatedUser) changeAndStoreUser({ userId: currentAuthenticatedUser.uid })
  }, []);

  return (
    <UserContext.Provider value={{ user, userId, changeAndStoreUser, logoff }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;
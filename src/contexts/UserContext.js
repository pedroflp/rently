import React, { useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  changeAndStoreUser: () => { }
});

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)

  const getStoragedUser = async () => {
    const user = await AsyncStorage.getItem("@RentOuse:user");

    setUser(JSON.parse(user))
  }

  const changeAndStoreUser = (userInfo) => {
    setUser({ ...user, ...userInfo })
    AsyncStorage.setItem("@RentOuse:user", JSON.stringify({ ...user, ...userInfo }));
  }

  const logoff = () => {
    setUser(null)
    AsyncStorage.removeItem("@RentOuse:user")
  }


  useEffect(() => {
    if (!user) getStoragedUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, changeAndStoreUser, logoff }}>
      {children}
    </UserContext.Provider>
  )
}
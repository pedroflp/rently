import React from 'react';

import Home from '../pages/Home';
import CreateAnnounce from '../pages/CreateAnnounce';
import AnnouncePage from '../pages/AnnouncePage';
import UserProfile from '../pages/UserProfile';

import FavoritesPage from '../pages/FavoritesPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useUser from '../hooks/useUser';
import { UserTypesEnum } from '../constants/userRoles';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { colors } from '../style/colors';

const { Navigator, Screen } = createBottomTabNavigator();

const MainStackRouter = () => {
  const { user } = useUser();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.black.darker,
          alignItems: 'center',
          justifyContent: 'center',
        }
        // animation: 'slide_from_right',
        // contentStyle: {
        //   backgroundColor: colors.grey.main,
        // }
      }}
    >
    <Screen 
      name="Home"
      component={Home} 
      options={{
        tabBarIcon: ({ focused, size, color }) => <MaterialCommunityIconsIcon 
          name={focused ? 'home' : 'home-outline'}
          size={size}
          color={color} 
        />
      }}
    />
     {user?.type === UserTypesEnum.ANNOUNCER && 
      <Screen
        name="CreateAnnounce" 
        component={CreateAnnounce} 
        options={{
          tabBarIcon: ({}) => <AntDesignIcon 
            name='pluscircle'
            size={32}
            color={colors.white}
          />
        }}
       />
       }
     {user?.type === UserTypesEnum.USER && <Screen
        // options={{
        //   animation: 'slide_from_right'
        // }}
        name="FavoritesPage"
        component={FavoritesPage}
        options={{
          tabBarIcon: ({ focused, size, color }) => <EntypoIcon 
            name={focused ? 'heart' : 'heart-outlined'}
            size={size}
            color={color} 
        />
        }}
      />}
      <Screen
        // options={{
        //   animation: 'slide_from_left'
        // }}
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ focused, size, color }) => <IoniconsIcon 
            name={focused ? 'person-circle' : 'person-circle-outline'}
            size={size}
            color={color}
          />
        }}
      />
    </Navigator>
  );
}

export default MainStackRouter;
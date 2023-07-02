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
import { navigatorNames, routeNames } from './routeNames';
import { View } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

const TabStackNavigator = () => {
  const { user } = useUser();

  return (
    <Navigator
      initialRouteName={routeNames[navigatorNames.TAB].HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
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
        name={routeNames[navigatorNames.TAB].HOME}
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
          name={routeNames[navigatorNames.TAB].CREATE_ANNOUNCEMENT} 
          component={CreateAnnounce} 
          options={{
            tabBarIcon: ({ focused }) => <View style={{
              width: 56,
              height: 56,
              marginTop: -12,
              backgroundColor: colors.white,
              borderRadius: 2000,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 3,
              borderColor: colors.black.darker,
            }}>
                <AntDesignIcon 
                name='plus'
                size={28}
                color={focused ? colors.main : colors.black.darker}
              />
            </View>
          }}
        />
        }
      {user?.type === UserTypesEnum.USER && <Screen
          // options={{
          //   animation: 'slide_from_right'
          // }}
          name={routeNames[navigatorNames.TAB].FAVORITES_PAGE}
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
        name={routeNames[navigatorNames.TAB].USER_PROFILE}
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

export default TabStackNavigator;
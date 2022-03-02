import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';

import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { colors } from '../../style/colors';
import useUser from '../../hooks/useUser';

const TabNavigation = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { user } = useUser()

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={!user} onPress={() => navigation.navigate("UserProfile")}>
        <Ionicons
          size={24}
          name={route.name === "UserProfile" ? "person" : "person-outline"}
          color={route.name === "UserProfile" ? colors.grey.lighter : colors.grey.darker}
        />
      </TouchableOpacity>

      {route.name === "Home" ? (
        <TouchableOpacity onPress={() => {
          if (user.type === "user" && user?.announcements?.length === 1) Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Você alcançou o limite gratuito',
            text2: 'Para adicionar mais anúncios, adquira o plano premium!',
            visibilityTime: 10 * 1000, // 10 seconds
          })
          else navigation.navigate("CreateAnnounce")
        }}>
          <Ionicons name="ios-add-circle" size={50} color={colors.grey.lighter} />
        </TouchableOpacity>
      )
        : (
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <MaterialCommunityIcons name="home-outline" size={30} color={colors.grey.darker} />
          </TouchableOpacity>
        )
      }

      <TouchableOpacity disabled={!user} onPress={() => navigation.navigate("FavoritesPage")}>
        <Entypo
          size={26}
          name={route.name === "FavoritesPage" ? "heart" : "heart-outlined"}
          color={route.name === "FavoritesPage" ? colors.grey.lighter : colors.grey.darker}
        />
      </TouchableOpacity>
    </View>
  );
}

export default TabNavigation;
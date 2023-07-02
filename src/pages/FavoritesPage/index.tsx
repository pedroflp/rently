import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import HouseCard from '../../components/HouseCard';

import styles from '../Home/styles';

import useUser from '../../hooks/useUser';
import Entypo from 'react-native-vector-icons/Entypo'
import { navigatorNames, routeNames } from '../../routes/routeNames';
import { colors } from '../../style/colors';

const FavoritesPage = () => {
  const navigation = useNavigation<any>()
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.houseListTitle}>Imóveis favoritados</Text>
      </View>

      <FlatList
        data={user?.favorites}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Entypo name='heart-outlined' size={100} color={colors.grey.main} />
            <Text style={styles.emptyStateText}>Ih, Ainda não temos nenhum favorito</Text>
          </View>
        }
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item: house}) => (
          <HouseCard
            {...house}
            onPress={() => {
              navigation.navigate(navigatorNames.ANNOUNCEMENT, {
                screen: routeNames.AnnouncementNavigator.HOME,
                params: { ...house }
              })
            }}
            key={house.id}
            user={user}
          />
        )}
      />
    </View >
  )
}

export default FavoritesPage;
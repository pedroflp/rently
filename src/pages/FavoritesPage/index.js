import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import HouseCard from '../../components/HouseCard';
import TabNavigation from '../../components/TabNavigation';

import styles from '../Home/styles';

import useUser from '../../hooks/useUser';
import useAnnouncement from '../../hooks/useAnnouncement';

const FavoritesPage = () => {
  const navigation = useNavigation()
  const { user } = useUser()
  const { setAnnouncement } = useAnnouncement()

  return (
    <View style={styles.container}>
      <TabNavigation />

      <View style={{ paddingHorizontal: 30, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.houseListTitle}>Imóveis favoritados</Text>
      </View>

      {
        user.favoritedAnnouncements?.length > 0
          ? (
            <ScrollView
              contentContainerStyle={styles.houseList}
              showsVerticalScrollIndicator={false}
            >
              {user.favoritedAnnouncements.map((house) => (
                <HouseCard
                  {...house.data}
                  onPress={() => {
                    setAnnouncement({ id: house.id, ...house.data })
                    navigation.navigate("AnnouncePage")
                  }}
                  key={house.id}
                  user={user}
                />
              ))}
            </ScrollView>
          )
          : <Text style={styles.houseListEmpty}>Você ainda não favoritou nenhum anúncio</Text>
      }
    </View >
  )
}

export default FavoritesPage;
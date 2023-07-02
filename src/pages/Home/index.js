import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import ReactNativeModal from 'react-native-modal';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import HouseCard from '../../components/HouseCard';
import FilterSearch from '../../components/FilterSearch';

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


import styles from './styles';
import { colors } from '../../style/colors';

import useUser from '../../hooks/useUser';
import useAnnouncement from '../../hooks/useAnnouncement';
import { navigatorNames, routeNames } from '../../routes/routeNames';
import { collectionsName } from '../../constants/collectionsName';

const Home = () => {
  const navigation = useNavigation()
  const { user } = useUser()
  // const { setAnnouncement } = useAnnouncement()

  const [houses, setHouses] = useState([])
  // const [prices, setPrices] = useState({
  //   min: 0,
  //   max: 0,
  // })

  const [typeFilter, setTypeFilter] = useState()
  const [categoryFilter, setCategoryFilter] = useState()
  // const [priceFilter, setPriceFilter] = useState()

  const [filterModalIsOpened, setFilterModalIsOpened] = useState(false)
  const [filteredSearch, setFilteredSearch] = useState(false)

  const handleFilterSearch = () => {
    let query = firestore().collection(collectionsName.ANNOUNCEMENTS)

    if (!!typeFilter) query = query.where("type", '==', typeFilter)
    if (!!categoryFilter) query = query.where("category", '==', categoryFilter)

    query.onSnapshot(query => {
      const data = query.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setHouses(data)
    })

    setFilteredSearch(true)
    setFilterModalIsOpened(false)
  }

  const getAnnouncementsData = () => {
    firestore()
    .collection(collectionsName.ANNOUNCEMENTS)
      .onSnapshot(
        query => {
          const announcements = query.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          setHouses(announcements);
        },
      );
  }

  useEffect(() => {
    getAnnouncementsData();
  }, [])

  const categories = [
    {
      label: 'Casa',
      value: 'house',
    },
    {
      label: 'Apartamento',
      value: 'apartment',
    },
    {
      label: 'Estabelecimento',
      value: 'store',
    },
  ]

  const types = [
    {
      label: 'Aluguel',
      value: 'rent',
    },
    {
      label: 'Venda',
      value: 'sale',
    },
  ]

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.houseListTitle}>Imóveis próximos à você!</Text>

        <TouchableOpacity onPress={() => setFilterModalIsOpened(true)}>
          <Ionicons name="ios-filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      
      <FlatList
        data={houses}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name='apartment' size={100} color={colors.grey.main} />
            <Text style={styles.emptyStateText}>Ops, parece que não achamos nenhum imóvel :(</Text>
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

      <ReactNativeModal
        isVisible={filterModalIsOpened}
        backdropOpacity={0.3}
        style={{ margin: 0, justifyContent: "flex-end" }}
        onBackdropPress={() => setFilterModalIsOpened(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <FilterSearch
          categories={categories}
          types={types}
          // prices={prices}
          categoryFilter={categoryFilter}
          typeFilter={typeFilter}

          setCategoryFilter={setCategoryFilter}
          setTypeFilter={setTypeFilter}

          setFilteredSearch={setFilteredSearch}
          handleFilterSearch={handleFilterSearch}
          filteredSearch={filteredSearch}
          setFilterModalIsOpened={setFilterModalIsOpened}
        />
      </ReactNativeModal>
    </View >
  )
}

export default Home;
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import ReactNativeModal from 'react-native-modal';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import HouseCard from '../../components/HouseCard';
import FilterSearch from '../../components/FilterSearch';

import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from './styles';
import { colors } from '../../style/colors';

import useUser from '../../hooks/useUser';
import useAnnouncement from '../../hooks/useAnnouncement';
import TabNavigation from '../../components/TabNavigation';

const Home = () => {
  const navigation = useNavigation()
  const { user, logoff } = useUser()
  const { setAnnouncement } = useAnnouncement()

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

  const [loadingAnnounces, setLoadingAnnounces] = useState(false)

  const handleFilterSearch = () => {
    setLoadingAnnounces(true)
    let query = firestore().collection("Houses")

    if (!!typeFilter) query = query.where("type", '==', typeFilter)
    if (!!categoryFilter) query = query.where("category", '==', categoryFilter)

    query.onSnapshot(query => {
      const data = query.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      setHouses(data)
    })

    setLoadingAnnounces(false)
    setFilteredSearch(true)
    setFilterModalIsOpened(false)
  }

  useEffect(() => {
    if (!filteredSearch) {
      setLoadingAnnounces(true)
      firestore()
        .collection("Houses")
        .onSnapshot(query => {
          if (query.docs.length > 0) {
            const data = query.docs.map(doc => ({ id: doc.id, ...doc.data() }))

            if (data.length > 0) setHouses(data)
          }
          setLoadingAnnounces(false)
        })
    }
  }, [filteredSearch])

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
      <TabNavigation />

      <View style={{ paddingHorizontal: 30, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.houseListTitle}>Imóveis disponíveis</Text>
        <TouchableOpacity onPress={() => setFilterModalIsOpened(true)}>
          <Ionicons name="ios-filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {loadingAnnounces
        ? <ActivityIndicator color={colors.grey.dark} size={40} style={{ flex: 0.3 }} />
        : (
          houses?.length > 0
            ? (
              <ScrollView
                contentContainerStyle={styles.houseList}
                showsVerticalScrollIndicator={false}
              >
                {houses.map(house => (
                  <HouseCard
                    {...house}
                    onPress={() => {
                      setAnnouncement({ id: house.id, ...house })
                      navigation.navigate("AnnouncePage")
                    }}
                    key={house.id}
                    user={user}
                  />
                ))}
              </ScrollView>
            )
            : <Text style={styles.houseListEmpty}>Nenhum imóvel encontrado</Text>
        )
      }

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
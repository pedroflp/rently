import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { formatPrice } from '../../utils/formatPrice'

import Feather from 'react-native-vector-icons/Feather'
import { colors } from '../../style/colors';

const HouseCard = ({ title, photos, description, type, category, price, location, rooms, isAvailable, onPress, creator, user }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
      {user?.userId === creator.userId && <Text style={styles.announceFlag}>Você é o anunciante</Text>}
      <Image style={styles.backgroundImage} source={{ uri: photos[0] }} resizeMode="cover" />
      <View style={styles.content}>
        <View style={styles.location}>
          <Feather name="map-pin" color={colors.grey.darker} size={14} />
          <Text style={styles.locationLabel}>{location?.address?.street}, {location?.address?.neighborhood}</Text>
        </View>

        <View>
          <View style={styles.roomsInformation}>
            <Text style={styles.roomsText}>
              {rooms.bedrooms} quarto{rooms.bedrooms > 1 && "s"} | {" "}
              {rooms.bathrooms} banheiro{rooms.bathrooms > 1 && "s"} | {" "}
              {rooms.garages} garage{rooms.garages > 1 ? "ns" : "m"} | {" "}
              {rooms.area}m²
            </Text>
          </View>

          <Text style={styles.price}>R$ <Text style={styles.value}>{formatPrice(price)}</Text>{type === "rent" && "/mês"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default HouseCard;
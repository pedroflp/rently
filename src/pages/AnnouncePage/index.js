import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Linking, Text, TouchableOpacity, View, ScrollView, StatusBar, ActivityIndicator, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import ReactNativeModal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SliderBox } from 'react-native-image-slider-box'
import { DateTime } from 'luxon';
import Toast from 'react-native-toast-message'

import firestore from '@react-native-firebase/firestore'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo'

import styles from './styles';
import { colors } from '../../style/colors';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';

import useUser from '../../hooks/useUser';
import useAnnouncement from '../../hooks/useAnnouncement';
import { transparentize } from 'polished';

const AnnouncePage = () => {
  const navigation = useNavigation()
  const { user, changeAndStoreUser } = useUser()
  const { announcement, setAnnouncementToEdit } = useAnnouncement()

  const [imagePreview, setImagePreview] = useState(null)
  const [favoriteAnnouncementLoading, setFavoriteAnnouncementLoading] = useState(false)

  const handleOpenLocationInGoogleMaps = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${announcement.location.coordinate.latitude},${announcement.location.coordinate.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  }

  const handleFavotireAnnouncement = () => {
    setFavoriteAnnouncementLoading(true)
    const announceAlreadyFavorited = user.favoritedAnnouncements.find(({ id }) => id === announcement.id)

    firestore().collection("Users").doc(user.userId).update({
      favoritedAnnouncements: announceAlreadyFavorited
        ? firestore.FieldValue.arrayRemove({ data: announcement, id: announcement.id })
        : firestore.FieldValue.arrayUnion({ data: announcement, id: announcement.id })
    })
      .then(() => {
        firestore().collection("Users").doc(user.userId).onSnapshot(query => changeAndStoreUser({ ...user, ...query.data() }))
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Erro ao favoritar anúncio, tente depois!",
        })
      }).finally(() => {
        Toast.show({
          type: announceAlreadyFavorited ? "error" : "success",
          text1: `Anúncio ${announceAlreadyFavorited ? "removido" : "adicionado"} dos favoritos`,
          position: "bottom"
        })
        setFavoriteAnnouncementLoading(false)
      })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.goBackButton}>
        <MaterialIcons name="keyboard-arrow-left" size={40} color={colors.black.main} />
      </TouchableOpacity>

      {announcement.creator.userId === user.userId ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setAnnouncementToEdit(announcement)
            navigation.navigate("EditAnnounce")
          }}
          style={styles.editButton}
        >
          <Feather name="edit-2" size={20} color={colors.black.main} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleFavotireAnnouncement}
          style={styles.editButton}
        >
          {favoriteAnnouncementLoading ? <ActivityIndicator color={colors.black.main} />
            : (
              user?.favoritedAnnouncements?.find(({ id }) => id === announcement.id)
                ? <Entypo name="heart" size={30} color={colors.error} />
                : <Entypo name="heart-outlined" size={30} color={colors.black.main} />
            )
          }
        </TouchableOpacity>
      )}

      <SliderBox
        images={announcement.photos}
        onCurrentImagePressed={index => setImagePreview(announcement.photos[index])}
        dotColor={colors.grey.lighter}
        inactiveDotColor={transparentize(0.3, colors.grey.dark)}
        resizeMode={'cover'}
        dotStyle={{
          width: 24,
          height: 6,
        }}
        paginationBoxVerticalPadding={Dimensions.get("window").height * 0.12}
        sliderBoxHeight={Dimensions.get("window").height * 0.5}
        imageLoadingColor={colors.grey.dark}
      />

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {announcement.description && <Text style={styles.description}>{announcement.description}</Text>}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
          >
            <CircleTag
              icon={<Ionicons name="ios-bed-outline" size={24} color={colors.black.lighter} />}
              title={`${announcement.rooms.bedrooms} quarto${announcement.rooms.bedrooms > 1 ? 's' : ''}`}
            />
            <CircleTag
              icon={<MaterialCommunityIcons name="shower" size={24} color={colors.black.lighter} />}
              title={`${announcement.rooms.bathrooms} banheiro${announcement.rooms.bathrooms > 1 ? 's' : ''}`}
            />
            <CircleTag
              icon={<Ionicons name="car-outline" size={24} color={colors.black.lighter} />}
              title={`${announcement.rooms.garages} garage${announcement.rooms.garages > 1 ? 'ns' : 'm'}`}
            />
            <CircleTag
              icon={<MaterialCommunityIcons name="axis-arrow" size={24} color={colors.black.lighter} />}
              title={`${announcement.rooms.area}m²`}
            />
            <CircleTag
              icon={<Foundation name={announcement.petFriendly ? "guide-dog" : "no-dogs"} size={24} color={colors.black.lighter} />}
              title={announcement.petFriendly ? "Aceita pets" : "Não aceita pets"}
            />
          </ScrollView>

          <View style={styles.location}>
            <TouchableOpacity onPress={handleOpenLocationInGoogleMaps} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <Feather name="map-pin" size={24} color={colors.black.lighter} />
              <Text style={styles.locationText}>{announcement.location.address.complete} (ver no Google Maps)</Text>
            </TouchableOpacity>

            <View style={{ borderRadius: 20, overflow: "hidden" }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ height: 200 }}
                region={{
                  latitude: announcement.location.coordinate.latitude,
                  longitude: announcement.location.coordinate.longitude,
                  latitudeDelta: 0.003,
                  longitudeDelta: 0.003,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: announcement.location.coordinate.latitude,
                    longitude: announcement.location.coordinate.longitude,
                  }}
                />

              </MapView>
            </View>
          </View>

          <View style={styles.creatorCard}>
            <View style={styles.creatorInfo}>
              {announcement.creator.photo
                ? <Image source={{ uri: announcement.creator.photo }} style={styles.creatorPhoto} />
                : <Ionicons name="ios-person-circle" size={40} color={colors.grey.darker} />
              }
              <View style={{ marginLeft: 4 }}>
                <Text style={styles.creatorlabel}>Anunciante:</Text>
                <Text style={styles.creatorName}>{announcement.creator.name}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.lastUpdateText}>Última atualização: {formatDate(announcement.lastUpdateDate, DateTime.DATETIME_SHORT)}</Text>
        </ScrollView>

        <View style={[styles.footer, { flexDirection: announcement.price.length >= 6 ? "column" : 'row' }]}>
          <Text style={styles.footerText}>R$ <Text style={styles.value}>{formatPrice(announcement.price)}</Text>{announcement.type === "rent" && "/mês"}</Text>
          {announcement.creator.userId !== user.userId
            ? <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL(`https://wa.me/55${announcement.contact}`)} style={styles.footerButton}>
              <Text style={styles.footerButtonText}>Contatar anunciante</Text>
            </TouchableOpacity>
            : <Text style={styles.announceFlag}>Você é o anunciante</Text>
          }
        </View>
      </View>

      <ReactNativeModal
        isVisible={!!imagePreview}
        animationIn="fadeInDown"
        animationOut="fadeOutDown"
        onBackdropPress={() => setImagePreview(false)}
        style={{ margin: 0 }}
      >
        <StatusBar backgroundColor={transparentize(0.12, colors.black.darker)} />
        <ImageViewer
          enableSwipeDown
          onCancel={() => setImagePreview(false)}
          imageUrls={announcement.photos.map(photo => ({ url: photo }))}
          index={announcement.photos.indexOf(imagePreview)}
          backgroundColor={transparentize(0.4, colors.black.darker)}
        />
      </ReactNativeModal>
    </View>
  )
}

const CircleTag = ({ icon, title, children }) => (
  <View style={styles.tagCard}>
    {icon || children}
    <Text style={styles.tagCardText}>{title} </Text>
  </View>
)

export default AnnouncePage;
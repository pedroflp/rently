import React, { useEffect, useState, useRef } from 'react';
import { Text, ScrollView, TouchableOpacity, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, StatusBar, Platform } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import ReactNativeModal from 'react-native-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Toast from 'react-native-toast-message';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import TwoOptionSelection from '../../components/TwoOptionSelection';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'


import styles from './styles';
import { colors } from '../../style/colors';
import { Apartaments, House, RentHands, SaleHands, Store } from '../../assets/icons/svgIcons';

import useUser from '../../hooks/useUser';
import useAnnouncement from '../../hooks/useAnnouncement';

const CreateAnnounce = () => {
  const navigation = useNavigation()
  const scrollViewRef = useRef(null)

  const { user } = useUser()
  const { announcementToEdit: announcement, setAnnouncement, setAnnouncementToEdit } = useAnnouncement()

  const [rent, setRent] = useState({
    description: '',
    category: '',
    type: '',
    rooms: {
      bathrooms: '',
      bedrooms: '',
      garages: '',
      area: '',
    },
    price: '',
    contact: '',
    location: '',
    petFriendly: true,
    additionalInfo: null,
  });

  const [images, setImages] = useState([]);

  const [imageToView, setImageToView] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateAnnounce = async (isEditing) => {
    setLoading(true)
    const photos = []

    if (announcement?.photos !== images) {
      for (const image of images) {
        if (image && !announcement?.photos?.includes(image)) {
          const fileName = `[${user.userId}]${rent.title}__photo-${images.indexOf(image)}_${Date.now()}`;
          const reference = storage().ref(`/houses/${fileName}.jpg`);

          await reference.putFile(image)
          const photoUrl = await reference.getDownloadURL()

          photos.push(photoUrl)
        } else photos.push(image)
      }
    } else photos.push(...images)

    const getGeocodeLocation = async () => {
      try {
        const location = await Geocoder.from(rent.location)
        const address = {
          complete: location.results[0].formatted_address,
          street: location.results[0].address_components[1].long_name,
          neighborhood: location.results[0].address_components[2].long_name,
          city: location.results[0].address_components[3].long_name,
          cep: location.results[0].address_components[6].long_name,
          state: {
            name: location.results[0].address_components[4].long_name,
            uf: location.results[0].address_components[4].short_name,
          },
        }

        return address
      } catch (error) {
        setLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Erro interno ao obter o endereço!',
          text2: "Tente novamente mais tarde ou reporte o problema",
          position: 'bottom',
        })
      }
    }

    let addressResult = null;
    if (announcement?.location?.coordinate !== rent.location) addressResult = await getGeocodeLocation()
    else addressResult = announcement?.location?.address

    const data = {
      photos: photos,
      description: rent.description,
      category: rent.category,
      type: rent.type,
      contact: rent.contact.replace(/[^0-9]/g, ''),
      location: {
        coordinate: rent.location,
        address: addressResult,
      },
      price: rent.price.replace(/[^0-9]/g, '') / 100,
      rooms: rent.rooms,
      creator: {
        userId: user.userId,
        name: user.name,
        photo: user.photo || null,
      },
      isAvailable: true,
      petFriendly: rent.petFriendly,
      lastUpdateDate: new Date().toISOString(),
      additionalInfo: {
        ...rent.additionalInfo,
        floor: rent.category === "apartment" ? rent.additionalInfo.floor : null,
      },
    }

    if (isEditing) {
      firestore()
        .collection("Houses")
        .doc(announcement.id)
        .update(data)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Imóvel atualizado com sucesso!',
            position: "bottom",
          })

          setAnnouncement({ id: announcement.id, ...data }) // atualiza o announce pelos dados aqui para nao precisar auto update com firebase (economia)
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'Erro ao atualizar imóvel',
            text2: error.message,
            position: "bottom",
          })
        })
        .finally(() => {
          navigation.goBack()
          setLoading(false)
          setAnnouncementToEdit(null)
        })
    } else {
      firestore()
        .collection("Houses")
        .add(data)
        .then(res => {
          res.onSnapshot(doc => {
            firestore().collection("Users").doc(user.userId).update({
              announcements: firestore.FieldValue.arrayUnion({
                id: doc.ref.id,
                data: doc.data(),
              }),
            })
          });
          Toast.show({
            type: 'success',
            text1: 'Novo imóvel criado!',
            position: "bottom",
          })
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'Erro ao criar imóvel',
            text2: error.message,
            position: "bottom",
          })
        })
        .finally(() => {
          navigation.goBack()
          setLoading(false)
        })

      //
    }

  }

  const handlePickerImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    })

    if (result?.assets?.length > 0) {
      if (result.assets[0]?.fileSize > 5 * 100000) // 5mb
      {
        Toast.show({
          type: 'error',
          text1: 'Imagem muito grande!',
          text2: 'Envie uma imagem com tamanho menor que 5MB',
          position: 'bottom'
        })

        return;
      }

      setImages(images => ([...images, result.assets[0].uri]))
    }

  }

  const handleRemoveImage = () => {
    const newImages = [...images];

    setImages(newImages.filter(image => image !== imageToView))
    setImageToView(null);
  }

  const categories = [
    {
      label: 'Casa',
      value: 'house',
      icon: <House />
    },
    {
      label: 'Apartamento',
      value: 'apartment',
      icon: <Apartaments />
    },
    {
      label: 'Estabelecimento',
      value: 'store',
      icon: <Store />
    },
  ]

  const types = [
    {
      label: 'Aluguel',
      value: 'rent',
      icon: <RentHands />
    },
    {
      label: 'Venda',
      value: 'sale',
      icon: <SaleHands />
    },
  ]

  useEffect(() => {
    if (announcement) {
      const { photos, ...rest } = announcement
      if (rent !== rest) {
        setRent({ ...rest, price: String(rest?.price * 100), contact: String(rest?.contact), location: announcement.location.coordinate })
        setImages(photos)
      }
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => {
          navigation.goBack()

          if (announcement) setAnnouncementToEdit(null)
        }}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.black.main} />
        </TouchableOpacity>
        <Text style={styles.containerTitle}>{announcement ? "Editar imóvel" : "Anunciar novo imóvel"}</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: announcement ? 80 : 20,
          flexGrow: 1
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
      >
        <Input
          label='Descrição'
          onChangeText={value => setRent(state => ({ ...state, description: value }))}
          multiline
          numberOfLines={3}
          value={rent.description}
          customContainerStyles={{
            marginHorizontal: 20,
          }}
        />

        <Input
          label='Categoria'
          disableBorder
          backgroundColor="transparent"
          customLabelStyles={{
            marginLeft: 20
          }}
          customChildren={
            <ScrollView
              style={styles.categoryContainer}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {categories.map(category => (
                <TouchableOpacity
                  style={styles.categoryCard}
                  key={category.value}
                  onPress={() => setRent(state => ({ ...state, category: category.value }))}
                >
                  <View style={styles.categoryCardRadio}>
                    {rent.category === category.value && <View style={styles.categoryCardRadioChecked} />}
                  </View>
                  <View>{category.icon}</View>
                  <Text style={styles.categoryCardLabel}>{category.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          }
        />

        {rent.category === 'apartment' && (
          <Input
            label="Nº do Andar"
            left={<TextInput.Icon name="office-building-outline" size={24} color={colors.grey.darker} />}
            right={<TextInput.Affix text='º andar' />}
            keyboardType="numeric"
            customContainerStyles={{
              maxWidth: '35%',
              marginHorizontal: 20,
            }}
            value={rent.additionalInfo?.floor}
            onChangeText={value => setRent(state => ({ ...state, additionalInfo: { ...state.additionalInfo, floor: value } }))}
          />
        )}

        <Input
          label='Cômodos'
          disableBorder
          backgroundColor="transparent"
          customLabelStyles={{
            marginLeft: 20
          }}
          customChildren={
            <ScrollView
              style={{ marginTop: -25, marginBottom: -10, }}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              <Input
                customInputStyles={{ marginRight: 7 }}
                left={<TextInput.Icon name="toilet" color={colors.grey.darker} />}
                onChangeText={value => setRent(state => ({ ...state, rooms: { ...state.rooms, bathrooms: value } }))}
                value={rent.rooms.bathrooms}
                keyboardType="numeric"
              />
              <Input
                customInputStyles={{ marginRight: 7 }}
                left={<TextInput.Icon name="bed-outline" color={colors.grey.darker} />}
                onChangeText={value => setRent(state => ({ ...state, rooms: { ...state.rooms, bedrooms: value } }))}
                value={rent.rooms.bedrooms}
                keyboardType="numeric"
              />
              <Input
                customInputStyles={{ marginRight: 7 }}
                left={<TextInput.Icon name="car-side" color={colors.grey.darker} />}
                onChangeText={value => setRent(state => ({ ...state, rooms: { ...state.rooms, garages: value } }))}
                value={rent.rooms.garages}
                keyboardType="numeric"
              />
              <Input
                left={<TextInput.Icon name="axis-arrow" color={colors.grey.darker} />}
                right={<TextInput.Affix text='m²' />}
                onChangeText={value => setRent(state => ({ ...state, rooms: { ...state.rooms, area: value } }))}
                value={rent.rooms.area}
                keyboardType="numeric"
              />
            </ScrollView>
          }
        />

        <Input
          label='Tipo'
          disableBorder
          backgroundColor="transparent"
          customLabelStyles={{
            marginLeft: 20
          }}
          customChildren={
            <ScrollView
              style={styles.categoryContainer}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {types.map(type => (
                <TouchableOpacity
                  style={styles.categoryCard}
                  key={type.value}
                  onPress={() => setRent(state => ({ ...state, type: type.value }))}
                >
                  <View style={styles.categoryCardRadio}>
                    {rent.type === type.value && <View style={styles.categoryCardRadioChecked} />}
                  </View>
                  <View>{type.icon}</View>
                  <Text style={styles.categoryCardLabel}>{type.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          }
        />

        <Input
          right={rent?.type === "rent" && <TextInput.Affix textStyle={{ marginRight: 5 }} text="/mes" />}
          label='Preço'
          keyboardType="numeric"
          render={props => <MaskInput
            {...props}
            value={String(rent.price)}
            mask={Masks.BRL_CURRENCY}
            onChangeText={value => setRent(state => ({ ...state, price: value }))}
          />}
          customContainerStyles={{
            marginHorizontal: 20,
          }}
        />


        <Input
          label='Contato (whatsapp/telefone)'
          keyboardType="numeric"
          render={props =>
            <MaskInput {...props}
              value={rent.contact}
              mask={Masks.BRL_PHONE}
              onChangeText={value => setRent(state => ({ ...state, contact: value }))}
            />
          }
          customContainerStyles={{
            marginHorizontal: 20,
          }}
        />

        <Input
          label='Localização'
          customContainerStyles={{
            marginHorizontal: 20,
          }}
          customChildren={
            <View>
              <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: rent.location.latitude || -5.1811531,
                  longitude: rent.location.longitude || -37.3476554,
                  latitudeDelta: announcement ? 0.015 : 0.04,
                  longitudeDelta: announcement ? 0.015 : 0.04,
                }}
                onLongPress={e => {
                  const coordinate = e.nativeEvent.coordinate
                  if (coordinate) setRent(state => ({ ...state, location: coordinate }))
                }}
                style={styles.map}
              >
                {!!rent.location && <Marker
                  coordinate={rent.location}
                />}
              </MapView>
            </View>
          }
        />

        <View>
          <Input
            label='Fotos'
            disableBorder
            customContainerStyles={{
              marginHorizontal: 20,
            }}
            customChildren={
              <TouchableOpacity disabled={!!images[9]} style={styles.imagePicker} onPress={handlePickerImage}>
                {!!images[9]
                  ? <MaterialIcons name="lock" size={50} color={colors.grey.darker} />
                  : <MaterialIcons name="add-photo-alternate" size={50} color={colors.grey.darker} />
                }
              </TouchableOpacity>
            }
          />
          {images.length > 0 &&
            <ScrollView
              contentContainerStyle={styles.imagesContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {images.map((image, index) => (
                <ImageBackground
                  style={styles.image}
                  key={index}
                  source={{ uri: image }}
                  resizeMode="cover"
                >
                  <TouchableOpacity
                    onPress={() => setImageToView(image)}
                    style={styles.imageOptions}
                  >
                    <MaterialCommunityIcons name="eye" size={30} color={colors.black.main} />
                  </TouchableOpacity>
                </ImageBackground>
              ))}
            </ScrollView>
          }

          <Input
            label='Pet Friendly'
            disableBorder
            customChildren={
              <TwoOptionSelection
                leftOptionText={'Aceita pet'}
                rightOptionText={'Não aceita pet'}
                petFriendly={rent.additionalInfo?.petFriendly}
                setPetFriendly={value => setRent(rent => ({ ...rent, additionalInfo: { ...rent.additionalInfo, petFriendly: value } }))}
              />
            }
            customContainerStyles={{
              marginHorizontal: 20,
            }}
          />

          <ReactNativeModal
            isVisible={!!imageToView}
            onBackdropPress={() => setImageToView(null)}
            animationIn='fadeInUp'
            animationOut="fadeOutDown"
            animationInTiming={1000}
            animationOutTiming={500}
          >
            <Image style={styles.imageViewer} source={{ uri: imageToView }} />
            <View>
              <TouchableOpacity onPress={handleRemoveImage} style={styles.imageViewerDeleteButton}>
                <Feather name="trash-2" size={26} color={colors.grey.lighter} />
                <Text style={styles.imageViewerDeleteButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </ReactNativeModal>
        </View>

        {!announcement && <Button
          buttonText="Cadastrar"
          backgroundColor={colors.main}
          textColor={colors.grey.lighter}
          customStyles={{
            marginHorizontal: 20,
          }}
          loading={loading}
          loadingColor={colors.grey.lighter}
          disabled={
            loading ||
            (
              !rent.rooms.bathrooms ||
              !rent.rooms.bedrooms ||
              !rent.rooms.garages ||
              !rent.rooms.area ||
              !rent.type ||
              !rent.price ||
              !rent.contact ||
              !rent.location ||
              images.length < 1
            )
          }
          onPress={() => handleCreateAnnounce()}
        />}

      </ScrollView>
      {announcement && <Button
        buttonText="Finalizar edição"
        backgroundColor={colors.main}
        textColor={colors.grey.lighter}
        customStyles={{
          marginBottom: 14,
          marginHorizontal: 20,
          position: 'absolute',
          bottom: 0,
          width: '90%',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 10,

          elevation: 20,
        }}
        loading={loading}
        loadingColor={colors.grey.lighter}
        disabled={
          loading ||
          (
            !rent.rooms.bathrooms ||
            !rent.rooms.bedrooms ||
            !rent.rooms.garages ||
            !rent.rooms.area ||
            !rent.type ||
            !rent.price ||
            !rent.contact ||
            !rent.location ||
            images.length < 1
          )
        }
        onPress={() => handleCreateAnnounce(true)} // true para editar
      />}
    </KeyboardAvoidingView >
  );
}

export default CreateAnnounce;
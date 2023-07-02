import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { Button } from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

import useUser from '../../hooks/useUser';
import { colors } from '../../style/colors';
import { collectionsName } from '../../constants/collectionsName';
import { useNavigation } from '@react-navigation/native';
import { navigatorNames } from '../../routes/routeNames';

const UserProfile = () => {
  const { user, logoff } = useUser();
  const { navigate } = useNavigation();

  if (user?.isAnonymous) return (
    <View style={styles.container}>
      <View style={styles.signDisclaimerContainer}>
        <Text style={styles.title}>Que tal se conectar?</Text>
        <Text style={styles.description}>Estar conectado à uma conta melhora a usabilidade dos serviços, além de liberar novas funcionalidades!</Text>
        <Button
          buttonText="Entrar"
          onPress={() => navigate(navigatorNames.AUTH)}
          backgroundColor={colors.black.darker}
          textColor={colors.white}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        {!!user?.photo
          ? <Image source={{ uri: user.photo }} />
          : <Ionicons name="md-person-circle" size={120} color={colors.grey.dark} />
        }
        <Text style={styles.primary}>{user?.name}</Text>
        <Text style={styles.secondary}>{user?.email}</Text>
      </View>
      <Button
        buttonText="Sair"
        icon={<Ionicons name='ios-log-out-outline' size={24} color={colors.error} />}
        onPress={() => {
          logoff();
          navigate("Splash")
        }}
        textColor={colors.error}
      />

    </View >
  )
}

export default UserProfile;
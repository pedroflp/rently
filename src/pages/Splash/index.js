import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';

import backgroundImage from '../../../assets/house_white_splash.jpg'

import styles from './styles';
import { colors } from '../../style/colors';
import { typography } from '../../style/typography';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import { navigatorNames, routeNames } from '../../routes/routeNames';
import useUser from '../../hooks/useUser';

const Splash = () => {
  const navigation = useNavigation();
  const { changeAndStoreUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handleAnonymSign = () => {
    setLoading(true);
    auth().signInAnonymously()
      .then(res => changeAndStoreUser({ userId: res.user.uid }))
      .finally(() => setLoading(false));
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image style={styles.backgroundImage} source={backgroundImage} resizeMode="cover" />

      <Text style={styles.headerTextLogo}>rently</Text>

      <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,1)']} style={styles.formContainer}>
        <Text style={styles.headerDisclaimer}>Encontre apartamentos, casas ou estabelecimentos no conforto da sua casa e com facilidade e rapidez!</Text>
        <Button
          onPress={handleAnonymSign}
          buttonText="Continuar"
          backgroundColor={colors.grey.lighter}
          textColor={colors.black.main}
          loadingColor={colors.black.darker}
          activeOpacity={0.7}
          loading={loading}
          disabled={loading}
        />

        <View style={styles.createAccountHelperContainer}>
          <Text style={styles.createAccountHelperContainerLabel}>Não possui conta?</Text>
          <TouchableOpacity style={styles.createAccountHelperButton} onPress={() => navigation.navigate(navigatorNames.AUTH, {
            screen: routeNames.AuthNavigator.CREATE_ACCOUNT
          })}>
            <Text style={styles.createAccountHelperButtonText}>Cadastrar nova conta</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

export default Splash;
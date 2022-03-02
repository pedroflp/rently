import React from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';

import backgroundImage from '../../assets/house_white_splash.jpg'

import styles from './styles';
import { colors } from '../../style/colors';
import { typography } from '../../style/typography';

const Splash = () => {
  const navigation = useNavigation()
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image style={styles.backgroundImage} source={backgroundImage} resizeMode="cover" />

      <View style={styles.header}>
        <Text style={styles.headerTextLogo}>rent<Text style={{ color: colors.black.main, fontFamily: typography.geo, fontSize: 100 }}>ouse</Text></Text>
      </View>

      <View style={styles.formContainer}>

        {/* <Text style={styles.headerDisclaimer}>Encontre apartamentos, casas ou estabelecimentos no conforto da sua casa e com toda facilidade!</Text> */}
        <Button
          onPress={() => navigation.navigate("Login")}
          buttonText="Entrar"
          backgroundColor={colors.grey.lighter}
          textColor={colors.black.main}
          activeOpacity={0.7}
        />

        <View style={styles.createAccountHelperContainer}>
          <Text style={styles.createAccountHelperContainerLabel}>Não possui conta?</Text>
          <TouchableOpacity style={styles.createAccountHelperButton} onPress={() => navigation.navigate("CreateAccount")}>
            <Text style={styles.createAccountHelperButtonText}>Cadastrar nova conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Splash;
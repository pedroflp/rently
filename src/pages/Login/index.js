import React, { useState } from 'react';
import { Keyboard, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'

import auth from '@react-native-firebase/auth'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { colors } from '../../style/colors';
import styles from '../CreateAccount/styles';

import useUser from '../../hooks/useUser';
import { TextInput } from 'react-native-paper';
import { transparentize } from 'polished';
import { navigatorNames, routeNames } from '../../routes/routeNames';
import Feather from 'react-native-vector-icons/Feather'

const Login = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [passwordView, setPasswordView] = useState(false)
  const [loading, setLoading] = useState(false)

  const { changeAndStoreUser, user } = useUser()

  const handleLogin = () => {
    setLoading(true);
    Keyboard.dismiss();

    if (user?.isAnonymous) auth().signOut();

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        changeAndStoreUser({ userId: res.user.uid });
        navigation.navigate(navigatorNames.MAIN, {
          screen: navigatorNames.TAB,
        })
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Erro ao fazer login',
          text2: error.message,
          position: "bottom",
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }} style={styles.container}>
      <View>
        <Feather name="arrow-left" size={24} onPress={navigation.goBack} />
        <Text style={styles.title}>Entrar na sua conta</Text>
        <View style={[styles.formCard, { marginBottom: 'auto' }]}>
          <Input
            label='Email'
            keyboardType="email-address"
            onChangeText={value => setEmail(value)}
            autoCapitalize='none'
            backgroundColor={transparentize(0.2, colors.grey.light)}
          />
          <Input
            label='Senha'
            type={!passwordView ? 'password' : 'text'}
            onChangeText={value => setPassword(value)}
            autoCapitalize='none'
            backgroundColor={transparentize(0.2, colors.grey.light)}
            right={<TextInput.Icon onPress={() => setPasswordView(state => !state)} name={!passwordView ? "eye" : "eye-off"} color={colors.grey.darker} />}
          />
        </View>
      </View>
      <View>
        <Button
          buttonText="Entrar"
          onPress={handleLogin}
          backgroundColor={colors.black.darker}
          textColor={colors.white}
          loading={loading}
          loadingColor={colors.white}
          disabled={
            loading ||
            !email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ||
            password.length < 6
          }
        />

        {/* <Button
          buttonText="Esqueci minha senha"
          onPress={() => navigation.navigate("ResetPassword")}
          customStyles={{ padding: 0 }}
          textColor={colors.black.lighter}
        /> */}

        <Button
          buttonText="Criar conta"
          onPress={() => navigation.navigate(routeNames.AuthNavigator.CREATE_ACCOUNT)}
          textColor={colors.black.darker}
        />
      </View>

    </ScrollView>
  );
}

export default Login;
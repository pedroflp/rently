import React, { useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
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

const Login = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [passwordView, setPasswordView] = useState(false)
  const [loading, setLoading] = useState(false)

  const { changeAndStoreUser } = useUser()

  const handleLogin = () => {
    setLoading(true)
    Keyboard.dismiss()
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => changeAndStoreUser({ email: res.user.email, authId: res.user.uid }))
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
    <View style={styles.container}>
      <Text style={styles.title}>Entrar na sua conta</Text>
      <View style={styles.formCard}>
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

      <Button
        buttonText="Entrar"
        onPress={handleLogin}
        backgroundColor={colors.black.main}
        textColor={colors.grey.lighter}
        loading={loading}
        loadingColor={colors.grey.main}

        disabled={
          loading ||
          !email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ||
          password.length < 6
        }
      />

      <Button
        buttonText="Esqueci minha senha"
        onPress={() => navigation.navigate("ResetPassword")}
        customStyles={{ padding: 0 }}
        textColor={colors.black.lighter}
      />

    </View>
  );
}

export default Login;
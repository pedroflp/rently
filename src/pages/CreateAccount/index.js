import React, { useState } from 'react';
import { Text, View } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import Toast from 'react-native-toast-message'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { colors } from '../../style/colors';
import styles from './styles';
import useUser from '../../hooks/useUser';

const CreateAccount = () => {
  const { changeAndStoreUser } = useUser()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [name, setName] = useState()
  const [phone, setPhone] = useState()

  const [loading, setLoading] = useState()

  const handleCreateAccount = () => {
    setLoading(true)
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        changeAndStoreUser({ userId: res.user.uid, email, name, phone, favoritedAnnouncements: [] })
        firestore().collection('Users').add({
          email,
          name,
          phone: phone.replace(/[^0-9]/g, ''),
          type: "user",
          favoritedAnnouncements: []
        })
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Erro ao criar conta',
          text2: error.message,
          position: "bottom",
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar nova conta</Text>
      <View style={styles.formCard}>
        <Text style={styles.formCardLabel}>Credenciais de login</Text>
        <Input backgroundColor='transparent' borderColor={colors.grey.dark} label='Email' keyboardType="email-address" onChangeText={value => setEmail(value)} />
        <Input backgroundColor='transparent' borderColor={colors.grey.dark} label='Senha' type="password" onChangeText={value => setPassword(value)} />
      </View>

      <View>
        <Text style={styles.formCardLabel}>Dados pessoais</Text>
        <Input backgroundColor='transparent' borderColor={colors.grey.dark} label='Nome' onChangeText={value => setName(value)} />
        <Input
          backgroundColor='transparent'
          borderColor={colors.grey.dark}
          label='Telefone'
          render={props =>
            <MaskInput {...props}
              mask={Masks.BRL_PHONE}
              keyboardType="numeric"
              value={phone}
              onChangeText={value => setPhone(value)}
            />}
        />
      </View>

      <Button
        buttonText="Criar conta"
        onPress={handleCreateAccount}
        backgroundColor={colors.black.main}
        textColor={colors.grey.lighter}
        loading={loading}
        loadingColor={colors.grey.lighter}
        disabled={
          loading ||
          !email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ||
          !password || password?.length < 6 ||
          !name || name?.length < 3 ||
          !phone || phone?.length < 10
        }
      />
    </View>
  );
}

export default CreateAccount;
import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import Toast from 'react-native-toast-message'
import Feather from 'react-native-vector-icons/Feather'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { colors } from '../../style/colors';
import styles from './styles';
import useUser from '../../hooks/useUser';
import { collectionsName } from '../../constants/collectionsName';
import { useNavigation } from '@react-navigation/native';
import { navigatorNames, routeNames } from '../../routes/routeNames';

const CreateAccount = () => {
  const { goBack, navigate } = useNavigation();
  const { changeAndStoreUser, user } = useUser()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [loading, setLoading] = useState()

  const userCanCreateAccount = useMemo(() =>
    email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
    password?.length >= 6 &&
    name?.length >= 3 &&
    phone?.length === 11, [email, password, name, phone]);

  const handleCreateAccount = () => {
    setLoading(true);

    const createUserDocumentAndStoreInApp = (userId) => {
      changeAndStoreUser({ userId })
      firestore().collection(collectionsName.USERS).doc(userId).set({
        email,
        name,
        phone,
        type: "user",
      }).then(() => navigate(navigatorNames.TAB, {
        screen: routeNames.TabNavigator.HOME
      })).catch(err => Toast.show({
        type: 'error',
        text1: 'Erro ao criar conta',
        text2: err.message,
        position: "bottom",
      })).finally(() => setLoading(false));
    }

    if (user?.isAnonymous) {
      auth().currentUser.linkWithCredential(
        auth.EmailAuthProvider.credential(email, password)
      ).then(res => createUserDocumentAndStoreInApp(res.user.uid));
    } else {
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => createUserDocumentAndStoreInApp(res.user.uid))
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1, justifyContent: 'space-between', 
      }}
      style={styles.container}
    >
      <View>
        <Feather name="arrow-left" size={24} onPress={goBack} />
        <Text style={styles.title}>Cadastrar nova conta</Text>
        
        <View>
          <View style={styles.formCard}>
            <Text style={styles.formCardLabel}>Credenciais de login</Text>
            <Input
              backgroundColor={colors.grey.light}
              borderColor={colors.grey.dark}
              label='Email'
              autoCapitalize='none'
              keyboardType="email-address"
              onChangeText={value => setEmail(value)}
            />
            <Input
              backgroundColor={colors.grey.light}
              borderColor={colors.grey.dark}
              label='Senha'
              type="password"
              autoCapitalize='none'
              onChangeText={value => setPassword(value)}
            />
          </View>

          <View style={styles.formCard}>
            <Text style={styles.formCardLabel}>Dados pessoais</Text>
            <Input backgroundColor={colors.grey.light} borderColor={colors.grey.dark} label='Nome' onChangeText={value => setName(value)} />
            <Input
              backgroundColor={colors.grey.light}
              borderColor={colors.grey.dark}
              label='Telefone'
              render={props =>
                <MaskInput {...props}
                  mask={Masks.BRL_PHONE}
                  keyboardType="numeric"
                  value={phone}
                  onChangeText={value => setPhone(value.replace(/[^0-9]/g, ''))}
                />}
            />
          </View>
        </View>
      </View>

      <View>
        {userCanCreateAccount && <Button
          buttonText="Cadastrar conta"
          onPress={handleCreateAccount}
          backgroundColor={colors.black.main}
          textColor={colors.grey.lighter}
          loading={loading}
          loadingColor={colors.grey.lighter}
          customStyles={{ marginTop: 'auto' }}
          disabled={loading}
        />
        }

        <Button
          buttonText="Já possui conta?"
          onPress={() => navigate(navigatorNames.AUTH, {
            screen: routeNames.AuthNavigator.LOGIN
          })}
          textColor={colors.black.main}
        />
      </View>
    </ScrollView>
  );
}

export default CreateAccount;
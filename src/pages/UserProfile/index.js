import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import TabNavigation from '../../components/TabNavigation';
import { Button } from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

import useUser from '../../hooks/useUser';
import { colors } from '../../style/colors';

const UserProfile = () => {
  const navigation = useNavigation()
  const { user, logoff } = useUser()

  return (
    <View style={styles.container}>
      <TabNavigation />

      <View>
        <View style={styles.profileCard}>
          {user.photo
            ? <Image source={{ uri: user.photo }} />
            : <Ionicons name="md-person-circle" size={100} color={colors.grey.darker} />
          }
          <Text style={styles.userName}>{user.name}</Text>
          <Text>{user.email}</Text>
        </View>
        <Button
          buttonText="Sair"
          onPress={logoff}
          backgroundColor={colors.error}
          textColor={colors.grey.lighter}
          customStyles={{
            marginHorizontal: 20
          }}
        />
      </View>

    </View >
  )
}

export default UserProfile;
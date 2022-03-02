import { darken, transparentize } from 'polished';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../style/colors';
import { styles } from './styles';


const OptionButton = ({ title, onPress, customStyles, active, activeCustomContainerStyles, activeCustomTextStyles }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { ...customStyles },
        active && {
          ...activeCustomContainerStyles
        }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, active && { ...activeCustomTextStyles }]}>{title}</Text>
    </TouchableOpacity >
  )
}

const TwoOptionSelection = ({ leftOptionText, rightOptionText, petFriendly, setPetFriendly }) => {
  return (
    <View style={styles.container}>

      <OptionButton
        title={leftOptionText}
        active={petFriendly}
        onPress={() => setPetFriendly(true)}

        customStyles={{
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
        }}
        activeCustomContainerStyles={{
          borderColor: colors.success,
          backgroundColor: transparentize(0.9, colors.success),
        }}
        activeCustomTextStyles={{
          color: darken(0.1, colors.success),
        }}
      />

      <OptionButton
        title={rightOptionText}
        active={!petFriendly}
        onPress={() => setPetFriendly(false)}
        customStyles={{
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        }}
        activeCustomContainerStyles={{
          borderColor: colors.error,
          backgroundColor: transparentize(0.9, colors.error),
        }}
        activeCustomTextStyles={{
          color: darken(0.1, colors.error),
        }}
      />

    </View>
  );
}

export default TwoOptionSelection;
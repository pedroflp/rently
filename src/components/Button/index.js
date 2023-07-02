import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { transparentize } from 'polished'
import styles from "./styles"
import { ActivityIndicator } from 'react-native-paper';

export const Button = ({ icon, onPress, buttonText, backgroundColor, textColor, disabled, customStyles, loading, loadingColor, ...rest }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { ...customStyles, backgroundColor: disabled ? transparentize(0.5, backgroundColor) : backgroundColor }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...rest}
    >
     {!!icon && <View style={{ marginRight: 8 }}>{icon}</View>}
      {loading ? <ActivityIndicator color={loadingColor} /> : <Text style={[styles.text, { color: disabled ? transparentize(0.5, textColor) : textColor }]}>{buttonText}</Text>}
    </TouchableOpacity>
  )
}

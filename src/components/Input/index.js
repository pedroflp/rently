import React from 'react';
import { View, Text } from 'react-native';

import { colors } from '../../style/colors';
import { styles } from './styles';

import { TextInput } from 'react-native-paper'
import { typography } from '../../style/typography';

import { lighten } from 'polished'


export const Input = ({
  customChildren,
  label,
  type,
  borderColor = colors.grey.dark,
  backgroundColor = lighten(0.03, colors.grey.light),
  textColor = colors.black.darker,
  disableBorder,
  customInputStyles,
  customContainerStyles,
  customLabelStyles,
  ...rest
}) => {
  return (
    <View style={{ ...customContainerStyles }}>
      <Text style={[styles.label, { ...customLabelStyles }]}>{label}</Text>
      {customChildren
        ? <View style={[styles.input, { borderColor: disableBorder ? "transparent" : borderColor, backgroundColor: backgroundColor, color: textColor }]}>
          {customChildren}
        </View>
        : <TextInput
          mode='flat'
          dense
          style={[styles.input, { ...customInputStyles, borderColor: borderColor, backgroundColor: backgroundColor, color: textColor }]}
          underlineColor="transparent"
          activeUnderlineColor={colors.main}
          maxLength={115}
          secureTextEntry={type === "password"}
          theme={{ roundness: 10, fonts: { regular: { fontFamily: typography.inter.regular } } }}
          {...rest}
        />
      }
    </View>
  );
}

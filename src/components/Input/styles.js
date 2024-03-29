import { StyleSheet } from 'react-native'
import { colors } from '../../style/colors'

import { typography } from '../../style/typography'

export const styles = StyleSheet.create({
  label: {
    fontFamily: typography.raleway.bold,
    marginBottom: 8,
    fontSize: 16,
    color: colors.black.main,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    overflow: 'hidden',
  }
})
import React from "react"
import { BaseToast, ErrorToast } from "react-native-toast-message"
import { colors } from "./colors"
import { typography } from "./typography"

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: colors.success, borderLeftColor: colors.success }}
      text1Style={{
        fontSize: 18,
        color: colors.grey.lighter,
        fontFamily: typography.inter.bold,
      }}
      text2Style={{
        fontSize: 16,
        color: colors.grey.lighter,
        fontFamily: typography.inter.bold,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: colors.error,
        borderLeftColor: colors.error,
        paddingTop: 16,
        paddingBottom: 16,
        height: 'auto'
      }}
      text2NumberOfLines={4}
      text1Style={{
        fontSize: 17,
        color: colors.grey.lighter,
        fontFamily: typography.inter.bold,
      }}
      text2Style={{
        fontSize: 14,
        color: colors.grey.lighter,
        fontFamily: typography.inter.bold,
      }}
    />
  ),
}
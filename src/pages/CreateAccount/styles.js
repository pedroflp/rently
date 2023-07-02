import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors } from "../../style/colors";
import { typography } from "../../style/typography";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 30,
    paddingTop: Platform.select({
      ios: '20%',
      android: '10%'
    }),
  },

  title: {
    fontSize: 50,
    width: '80%',
    marginTop: 16,
    fontFamily: typography.geo,
    letterSpacing: -2,
    marginBottom: 30,
    color: colors.black.darker,
  },

  formCard: {
  },
  formCardLabel: {
    fontSize: 18,
    fontFamily: typography.raleway.bold,
    marginBottom: 20,
    color: colors.grey.darker,
  }
})

export default styles
import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../style/colors";
import { typography } from "../../style/typography";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",

  },

  backgroundImage: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  header: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  headerTextLogo: {
    fontSize: 70,
    fontFamily: typography.geo,
    color: colors.grey.lighter,
  },
  headerDisclaimer: {
    fontFamily: typography.raleway.bold,
    color: colors.grey.lighter,
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowRadius: 20
  },

  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 30,
  },

  createAccountHelperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  createAccountHelperContainerLabel: {
    color: colors.grey.darker,
    fontFamily: typography.inter.regular,
  },
  createAccountHelperButton: {
    marginTop: 4,
  },
  createAccountHelperButtonText: {
    fontSize: 16,
    color: colors.grey.lighter,
    fontFamily: typography.inter.bold,
  }
})

export default styles
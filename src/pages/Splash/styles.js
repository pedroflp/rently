import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../style/colors";
import { typography } from "../../style/typography";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: '16%',
  },

  backgroundImage: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  headerTextLogo: {
    fontSize: 80,
    fontFamily: typography.geo,
    marginHorizontal: 20,
  },
  headerDisclaimer: {
    fontFamily: typography.raleway.bold,
    color: colors.grey.lighter,
    fontSize: 18,
    textShadowRadius: 20,
    marginBottom: 8,
  },

  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 30,
  },

  createAccountHelperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
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
    color: colors.grey.main,
    fontFamily: typography.inter.bold,
  }
})

export default styles
import { StyleSheet } from "react-native";
import { typography } from "../../style/typography";
import { colors } from "../../style/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    padding: 16,
  },
  title: {
    fontFamily: typography.geo,
    fontSize: 34,
    color: colors.black,
    marginBottom: 16,
    letterSpacing: -1,
  },
  description: {
    fontFamily: typography.raleway.regular,
    fontSize: 16,
    color: colors.black.main,
    marginBottom: 24,
  },


  profileCard: {
    flex: 1,
    alignItems: "center",
  },

  primary: {
    fontSize: 26,
    fontFamily: typography.raleway.bold,
    textTransform: "capitalize",
    color: colors.black.main,
  },
  secondary: {
    fontSize: 16,
    fontFamily: typography.inter.regular,
    color: colors.grey.darker,
  },
})

export default styles
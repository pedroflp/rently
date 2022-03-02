import { StyleSheet } from "react-native";
import { colors } from "../../style/colors";
import { typography } from "../../style/typography";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center'
  },

  title: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: typography.inter.bold,
    marginBottom: 30,
    color: colors.black.main,
  },

  formCard: {
    marginBottom: 10,
  },
  formCardLabel: {
    fontSize: 18,
    fontFamily: typography.inter.semiBold,
    marginBottom: 5,
    color: colors.black.main,
  }
})

export default styles
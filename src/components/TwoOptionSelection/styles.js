import { StyleSheet } from "react-native";
import { colors } from "../../style/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-around",
    width: '100%',
  },

  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.grey.dark,
    backgroundColor: colors.grey.light,
    height: 45,
  },

  text: {
    fontWeight: "bold",
    color: colors.grey.darker
  }
})
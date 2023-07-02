import { StyleSheet } from "react-native";
import { typography } from "../../style/typography";

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: typography.inter.bold,
  }
})

export default styles
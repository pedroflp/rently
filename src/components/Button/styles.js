import { StyleSheet } from "react-native";
import { typography } from "../../style/typography";

const styles = StyleSheet.create({
  button: {
    padding: 14,
    marginTop: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: typography.inter.bold,
  }
})

export default styles
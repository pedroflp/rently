import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../style/colors";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.03, // 3%
    left: 0,
    right: 0,
    backgroundColor: colors.black.dark,
    borderRadius: 20,
    width: '90%',
    height: Dimensions.get("window").height * 0.07, // 7%
    marginHorizontal: Dimensions.get("window").width * 0.05, // 5%
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 99999,
  },

  main: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: colors.grey.light,
    borderRadius: 100,
  }
})
import { lighten } from "polished";
import { Platform, StyleSheet } from "react-native";
import { colors } from "../../style/colors";
import { typography } from "../../style/typography";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: lighten(0.06, colors.grey.main),
    paddingTop: Platform.select({
      android: 50, ios: 60
    }),
    position: 'relative',
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  topBarTitle: {
    fontSize: 20,
    fontFamily: typography.raleway.bold,
    color: colors.grey.darker,
    marginLeft: 5,
    textTransform: 'capitalize',
  },

  addCarButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: colors.black.main,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addCarButtonText: {
    fontFamily: typography.raleway.bold,
    fontSize: 16,
    color: colors.grey.lighter,
    marginTop: -2,
  },

  houseListTitle: {
    marginRight: 10,
    fontFamily: typography.geo,
    fontSize: 32,
    marginBottom: 10,
    letterSpacing: -1,
    width: '65%',
    color: colors.black.main,
  },
  houseList: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },

  houseListEmpty: {
    marginTop: 50,
    textAlign: 'center',
    color: colors.grey.dark,
    fontSize: 24,
    fontFamily: typography.raleway.bold,
  },
  emptyState: {
    marginTop: '30%',
    marginBottom: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.grey.dark,
    textAlign: 'center',
    width: '70%',
    marginTop: 8
  }
})

export default styles
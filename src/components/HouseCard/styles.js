import { lighten, transparentize } from "polished";
import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../style/colors";
import { typography } from "../../style/typography";

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    padding: 10,
    paddingBottom: 5,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    elevation: 20,
    position: "relative",
  },


  announceFlag: {
    position: "absolute",
    zIndex: 99,
    top: 20,
    right: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: transparentize(0.5, colors.black.dark),
    borderRadius: 100,
    fontSize: 12,
    color: colors.grey.lighter,
    fontFamily: typography.raleway.bold,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    elevation: 10,
  },

  backgroundImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },

  content: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    padding: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  carInfoContent: {
    overflow: 'hidden',
  },

  carInfoIdentification: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  title: {
    fontSize: 24,
    fontFamily: typography.raleway.bold,
    color: colors.black.main,
  },

  category: {
    position: "absolute",
    top: 10,
    right: 10,
    textTransform: 'capitalize',
    fontFamily: typography.inter.bold,
    color: colors.black.lighter,
  },

  location: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  locationLabel: {
    color: colors.black.light,
    fontFamily: typography.raleway.bold,
    fontSize: 14,
    marginLeft: 4,
  },

  description: {
    color: colors.black.main,
    fontFamily: typography.raleway.regular,
    marginBottom: 10,
    fontSize: 14,
  },

  rentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  price: {
    marginTop: 10,
    fontSize: 16,
    color: colors.black.lighter,
  },
  value: {
    fontFamily: typography.raleway.bold,
    fontSize: 26,
    color: colors.black.darker,
  },

  roomsInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  roomsText: {
    fontFamily: typography.inter.regular,
    color: colors.black.lighter,
    fontSize: 13,
    marginTop: 6,
  },
})

export default styles
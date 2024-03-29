import { lighten } from "polished";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors } from "../../style/colors";
import { typography } from "../../style/typography";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  iteractiveActionButtons: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 99,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  favoriteButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 500,
    backgroundColor: colors.grey.lighter,
    zIndex: 99,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 30,
  },
  goBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 500,
    backgroundColor: colors.grey.lighter,
    zIndex: 99,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 30,
  },

  editButton: {
    borderRadius: 500,
    width: 50,
    height: 50,
    marginBottom: 16,
    backgroundColor: colors.grey.lighter,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 30,
  },

  content: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.grey.lighter,
    height: Dimensions.get("window").height * 0.6,
    width: Dimensions.get("window").width,
    overflow: "hidden",
    zIndex: 99,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 20,

    elevation: 50,
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontFamily: typography.raleway.bold,
    fontSize: 26,
    color: colors.black.main,
    marginBottom: 10,
  },

  tagCard: {
    borderRadius: 500,
    overflow: "hidden",
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: colors.grey.light,
  },
  tagCardText: {
    fontFamily: typography.raleway.bold,
    color: colors.black.lighter,
    marginLeft: 4,
  },

  description: {
    fontFamily: typography.raleway.regular,
    fontSize: 16,
    color: colors.black.lighter,
    paddingHorizontal: 20,
    marginVertical: 20,
  },


  location: {
    paddingHorizontal: 20,
  },

  locationText: {
    fontFamily: typography.raleway.bold,
    fontSize: 14,
    color: colors.black.lighter,
    marginLeft: 6,
    width: '90%',
  },

  creatorCard: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: lighten(0.02, colors.grey.light),
    position: 'relative',
  },

  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  creatorlabel: {
    fontSize: 12,
  },

  creatorName: {
    fontSize: 18,
    textTransform: 'capitalize',
  },

  lastUpdateText: {
    marginVertical: 10,
    textAlign: 'center'
  },

  footer: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: Platform.select({
      android: 12,
      ios: 24
    })
  },

  footerText: {
    fontFamily: typography.inter.regular,
    fontSize: 16,
    color: colors.black.lighter,
  },
  value: {
    fontFamily: typography.raleway.bold,
    fontSize: 26,
    color: colors.black.main,
    marginLeft: 4,
  },

  footerButton: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.black.main,
    alignItems: "center",
    justifyContent: "center",
  },

  footerButtonText: {
    fontFamily: typography.raleway.bold,
    fontSize: 16,
    marginTop: -2,
    color: colors.grey.lighter,
  },

  announceFlag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.main,
    borderRadius: 8,
    overflow: 'hidden',
    color: colors.grey.lighter,
  },

  imagePreview: {
    flex: 1,
    borderRadius: 5,
    position: "relative",
  },
  imagePreviewButton: {
    position: "absolute",
    zIndex: 99,
    top: 0,
    right: 0,
    padding: 10,
    borderRadius: 500,
    backgroundColor: colors.grey.lighter,
  },
})

export default styles
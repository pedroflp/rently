import { lighten } from "polished";
import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../style/colors";
import { typography } from "../../style/typography";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    position: 'relative',
  },

  containerTitle: {
    fontFamily: typography.raleway.bold,
    fontSize: 24,
    marginLeft: 10,
  },

  categoryCard: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey.dark,
    backgroundColor: lighten(0.03, colors.grey.light),
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 150,
    maxWidth: 150,
    position: 'relative',
  },
  categoryCardRadio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 500,
    borderColor: colors.grey.darker,
    position: "absolute",
    top: 0,
    left: 0,
    margin: 12,
  },
  categoryCardRadioChecked: {
    width: 10,
    height: 10,
    margin: 3,
    backgroundColor: colors.main,
    borderRadius: 500,
  },
  categoryCardLabel: {
    fontFamily: typography.raleway.bold,
  },

  map: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.3,
    position: 'relative',
  },

  mapLocationViewButton: {
    position: "absolute",
    right: 2,
    bottom: 2,
    zIndex: 99,
    borderRadius: 5,
    padding: 5,
  },
  mapLocationViewButtonText: {
    fontFamily: typography.inter.bold,
    color: colors.black.main,
    fontSize: 14,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 5,
  },

  completeLocationViewContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.grey.lighter,
    margin: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * .4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  imagePicker: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.grey.dark,
    borderStyle: "dashed",
    borderRadius: 10,
  },

  imagesContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
    overflow: "hidden",
  },
  imageOptions: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  imageViewer: {
    width: Dimensions.get("window").width * 0.9,
    height: 300,
    borderRadius: 10,
  },
  imageViewerDeleteButton: {
    justifyContent: "center",
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    backgroundColor: colors.error,
    borderRadius: 10,
  },
  imageViewerDeleteButtonText: {
    fontFamily: typography.raleway.bold,
    color: colors.grey.lighter,
    marginLeft: 5,
    fontSize: 18,
  }
})

export default styles
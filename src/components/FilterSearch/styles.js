import { StyleSheet } from "react-native";
import { colors } from "../../style/colors";
import { typography } from "../../style/typography";

export const styles = StyleSheet.create({
  filterModal: {
    backgroundColor: colors.grey.light,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  filterModalTitle: {
    fontFamily: typography.raleway.bold,
    fontSize: 20,
    color: colors.black.main,
    marginBottom: 20,

  },

  filterModalOptionContainer: {
    marginBottom: 10,
  },
  filterModalOptionContainerLabel: {
    fontFamily: typography.raleway.bold,
    color: colors.black.main,
    fontSize: 16,
    marginBottom: 10,
  },

  filterRadioOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 300,
    backgroundColor: colors.grey.main,
    marginRight: 10,
    borderWidth: 2,
  },
  optionRadio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 500,
    borderColor: colors.grey.darker,
    marginRight: 10,
  },
  optionRadioChecked: {
    width: 10,
    height: 10,
    margin: 3,
    backgroundColor: colors.main,
    borderRadius: 500,
  },
  filterRadioOptionText: {
    fontFamily: typography.inter.bold,
    color: colors.black.main,
  }
})
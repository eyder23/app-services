import { StyleSheet, Platform } from "react-native";
import theme from "../../constants/styles/theme.constant";

export const CELL_SIZE = 50;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = theme.WHITE;
export const NOT_EMPTY_CELL_BG_COLOR = theme.SECONDARY;
export const ACTIVE_CELL_BG_COLOR = theme.LIGHT;

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  cell: {
    borderWidth: 0.5,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    fontSize: 25,
    textAlign: "center",
    borderRadius: CELL_BORDER_RADIUS,
    color: theme.PRIMARY,
    backgroundColor: theme.WHITE,

    // color: theme.DARK,
    // backgroundColor: theme.GRAY,

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  focusCell: {
    borderColor: theme.PRIMARY,
  },
});

export default styles;

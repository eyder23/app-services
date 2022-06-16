import {
  StyleSheet,
  StatusBar,
} from "react-native";
import theme from "../../constants/styles/theme.constant";

export default StyleSheet.create({
  // Init Container styles
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  containerEsp: {
    backgroundColor: theme.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
  },
  safeAreaWrapper: {
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
  // End Container styles
  // Init Typography Styles
  titleApp: {
    fontFamily: theme.FONT_BOLD,
    fontSize: 30,
    color: theme.PRIMARY_TEXT_COLOR,
  },
  pageTitle: {
    fontFamily: theme.FONT_SEMIBOLD,
    color: theme.PRIMARY_TEXT_COLOR,
    fontSize: 20,
  },
  paragraph: {
    fontFamily: theme.FONT_REGULAR,
    color: theme.PRIMARY_TEXT_COLOR,
    fontSize: 15,
  },
  captions: {
    fontFamily: theme.FONT_REGULAR,
    color: theme.GRAY,
    fontSize: 14,
  },
  span: {
    fontFamily: theme.FONT_REGULAR,
    color: theme.ACCENT,
    fontSize: 14,
  },

  // End Typography Styles

  subTitleApp: {
    fontFamily: theme.FONT_SEMIBOLD,
    fontSize: 20,
    color: theme.PRIMARY_TEXT_COLOR,
  },
  title: {
    fontFamily: theme.FONT_SEMIBOLD,
    fontSize: 28,
    color: theme.PRIMARY_TEXT_COLOR,
  },
  titleDetail: {
    fontFamily: theme.FONT_REGULAR,
    fontSize: 18,
    color: theme.GRAY,
  },
  phoneNumber: {
    fontFamily: theme.FONT_REGULAR,
    fontSize: 20,
    marginLeft: 4,
    color: theme.PRIMARY_TEXT_COLOR,
  },
  generalText: {
    fontFamily: theme.FONT_REGULAR,
    fontSize: 18,
    color: theme.PRIMARY_TEXT_COLOR,
  },
  subTitle: {
    fontFamily: theme.FONT_MEDIUM,
    fontSize: 16,
    color: theme.TEXT_DARK,
  },
  sectionTitle: {
    fontFamily: theme.FONT_BOLD,
    fontSize: 16,
    color: theme.TEXT_DARK,
  },
  cardTitle: {
    fontFamily: theme.FONT_SEMIBOLD,
    fontSize: 14,
  },
  cardText: {
    fontFamily: theme.FONT_REGULAR,
    fontSize: 15,
    color: theme.GRAY,
  },
  cardImageText: {
    fontFamily: theme.FONT_BOLD,
    fontSize: 18,
    color: theme.WHITE,
  },
  categoryText: {
    fontFamily: theme.FONT_REGULAR,
    fontSize: 16,
    color: theme.DARK_GRAY,
  },
  locationText: {
    fontFamily: theme.FONT_BOLD,
    fontSize: 14,
    color: theme.WHITE,
  },
  mainButton: {
    backgroundColor: theme.PRIMARY,
    color: theme.WHITE,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 25,
    height: 53,
  },
});

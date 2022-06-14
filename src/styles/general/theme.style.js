import theme from "../../constants/styles/theme.constant";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.WHITE,
  },
  safeAreaWrapper: {
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
  titleApp: {
    fontFamily: theme.FONT_BOLD,
    fontSize: 32,
    color: theme.PRIMARY_TEXT_COLOR,
  },
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
    fontSize: 14,
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

import { StyleSheet, Text } from "react-native";
import React from "react";
import theme from "../../../constants/styles/theme.constant";

export default function ErrorText({ text, style }) {
  return <Text style={[styles.text, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    marginTop: 5,
    fontFamily: theme.FONT_MEDIUM,
    color: theme.ERROR,
  },
});

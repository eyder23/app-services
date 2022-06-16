import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import theme from "../../../constants/styles/theme.constant";

export default function TextButton({ onPress, text, style, disabled }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: theme.GRAY,
    fontFamily: theme.FONT_REGULAR,
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

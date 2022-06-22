import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import theme from "../../../constants/styles/theme.constant";
export default function SolidButton({ onPress, text, style, disabled }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.button,
          {
            borderColor: disabled ? theme.GRAY : theme.PRIMARY,
            backgroundColor: disabled ? theme.GRAY_LIGHT : theme.PRIMARY,
          },
          style,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            { color: disabled ? theme.GRAY : theme.WHITE },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    height: 53,
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: theme.FONT_SEMIBOLD,
    fontSize: 16,
    textAlign: "center",
  },
});

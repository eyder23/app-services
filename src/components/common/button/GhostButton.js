import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import theme from "../../../constants/styles/theme.constant";

export default function GhostButton({ onPress, text, style, disabled }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.button,
          {
            borderColor: disabled ? theme.GRAY : theme.PRIMARY,
          },
          style,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            { color: disabled ? theme.GRAY : theme.PRIMARY },
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
    borderColor: theme.PRIMARY,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    marginHorizontal: 25,
    height: 53,
  },
  buttonText: {
    color: theme.PRIMARY,
    fontFamily: theme.FONT_SEMIBOLD,
    fontSize: 20,
    textAlign: "center",
  },
});

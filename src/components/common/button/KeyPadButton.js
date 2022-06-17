import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import theme from "../../../constants/styles/theme.constant";
import * as Haptics from "expo-haptics";

export default function KeyPadButton({
  onPress,
  text,
  style,
  disabled,
  value,
}) {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.button,
          {
            borderColor: disabled ? theme.PRIMARY : theme.PRIMARY,
            backgroundColor: disabled ? theme.GRAY_LIGHT : theme.WHITE,
          },
          style,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            { color: disabled ? theme.WHITE : theme.PRIMARY },
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
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    height: 62,
    width: 62,
  },
  buttonText: {
    color: theme.PRIMARY,
    fontFamily: theme.FONT_MEDIUM,
    fontSize: 15,
    textAlign: "center",
  },
});

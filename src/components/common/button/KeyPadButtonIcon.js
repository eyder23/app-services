import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import theme from "../../../constants/styles/theme.constant";
import { Feather } from "@expo/vector-icons";

export default function KeyPadButtonIcon({
  onPress,
  text,
  iconName,
  style,
  disabled,
}) {
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
        <Feather
          name={iconName}
          size={26}
          color={disabled ? theme.GRAY : theme.PRIMARY}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 62,
    width: 62,
  },
  buttonText: {
    color: theme.GRAY,
    fontFamily: theme.FONT_SEMIBOLD,
    fontSize: 20,
    textAlign: "center",
  },
  icon: {
    textAlign: "center",
    color: theme.ACCENT,
  },
});

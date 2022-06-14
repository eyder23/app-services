import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import theme from "../../../constants/styles/theme.constant";
import { FontAwesome } from "@expo/vector-icons";

export default function SolidButtonIcon({
  onPress,
  text,
  iconName,
  style,
  disabled,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: disabled ? theme.GRAY : theme.PRIMARY,
            borderColor: disabled ? theme.GRAY : theme.PRIMARY,
          },
          style,
        ]}
      >
        <FontAwesome
          name={iconName}
          size={24}
          color={theme.WHITE}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
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
  buttonText: {
    color: theme.WHITE,
    fontFamily: theme.FONT_SEMIBOLD,
    fontSize: 20,
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
});

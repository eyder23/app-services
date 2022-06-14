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
        <FontAwesome
          name={iconName}
          size={24}
          color={disabled ? theme.GRAY : theme.PRIMARY}
          style={styles.icon}
        />
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
    borderColor: theme.GRAY,
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
    color: theme.GRAY,
    fontFamily: theme.FONT_SEMIBOLD,
    fontSize: 20,
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
});

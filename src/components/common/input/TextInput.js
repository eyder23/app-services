import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import tw from "../../../libs/tailwind/tailwind";
import theme from "../../../constants/styles/theme.constant";

export default function TextInputForm({
  text,
  style,
  name,
  label,
  placeholder,
  onChangeText,
  onBlur,
  value,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  editable,
  defaultValue,
  returnKeyType,
}) {
  return (
    <TextInput
      autoCapitalize={autoCapitalize}
      name={name}
      placeholder={placeholder}
      placeholderTextColor="#8d8d8d"
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      style={[tw`flex-1`, styles.inputStyle, style]}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      editable={editable}
      defaultValue={defaultValue}
      returnKeyType={returnKeyType}
      selectionColor={theme.PRIMARY_COLOR}
    />
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    fontSize: 16,
    fontFamily: theme.FONT_REGULAR,
    color: theme.PRIMARY_TEXT_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.GRAY,
  },
});

import React from "react";
import { TouchableOpacity } from "react-native";
import theme from "../../../constants/styles/theme.constant";
import { Ionicons } from "@expo/vector-icons";
// =================================

export default function BackButton({ onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{ marginTop: -29 }}
    >
      <Ionicons name="caret-back" size={26} color={theme.PRIMARY} />
    </TouchableOpacity>
  );
}

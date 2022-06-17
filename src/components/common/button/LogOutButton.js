import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import theme from "../../../constants/styles/theme.constant";
import { useDispatch } from "react-redux";

// ======== Custom Imports =========
// ======== Services ===============
import { setCurrentUser } from "../../../store/slices/userSlice";
// =================================

export default function LogOutButton({ text }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setCurrentUser(null));
      }}
    >
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

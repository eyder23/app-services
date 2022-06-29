import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { VI } from "react-native-round-flags/flags/64";
import theme from "../../../constants/styles/theme.constant";

export const Loading = ({ color, size }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <ActivityIndicator size={"large"} color={theme.ACCENT} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: theme.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
});

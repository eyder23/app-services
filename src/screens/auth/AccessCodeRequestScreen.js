import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { SafeAreaView } from "react-native";
// ======== Custom Imports =========
import tw from "../../libs/tailwind/tailwind";
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";

// =================================

const WelcomeScreen = () => {
  return (
    <SafeAreaView
      style={[themeStyle.container, { backgroundColor: theme.PRIMARY }]}
    >
      <View style={[themeStyle.safeAreaWrapper, styles.containerEsp]}>
        <Text style={[themeStyle.title, { marginTop: 50 }]}>
          Ingrese a Homely
        </Text>
        <Text style={[themeStyle.titleDetail, { marginTop: 10 }]}>
          Nosotros le enviaremos un código de confirmación a través de WhatsApp
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  containerEsp: {
    flex: 1,
    backgroundColor: theme.WHITE,
    marginTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

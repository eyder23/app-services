import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native";
// ======== Custom Imports =========
// ======== Styles =========
import tw from "../../libs/tailwind/tailwind";
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
// ======== Components =========
import SolidButton from "../../components/common/button/SolidButton";

// =================================

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      <View style={tw`items-center justify-end flex-1`}>
        <Image
          source={require("../../../assets/images/welcome/main-image.png")}
        />
      </View>
      <View style={tw`justify-start flex-1 bg-white`}>
        <View style={tw`items-center`}>
          <Text style={[themeStyle.titleApp]}>Homely</Text>
          <Text style={[themeStyle.subTitleApp]}>Expertos en Limpieza</Text>
          <Text style={[themeStyle.generalText, tw`mt-4 text-center`]}>
            Contamos con personal especializado y eficiente en servicios de
            limpieza de alta calidad y confianza
          </Text>
        </View>
        <View style={tw`h-full `}>
          <View style={tw`justify-start mt-10 flex-3 `}>
            <SolidButton
              text="!Empecemos!"
              disabled={false}
              onPress={() => navigation.navigate("AccessCodeRequestScreen")}
            />
          </View>
          <View style={tw`items-center justify-start flex-5 `}>
            <View style={tw`flex flex-row`}>
              <Text style={[themeStyle.generalText, { color: theme.GRAY }]}>
                Powered by{" "}
              </Text>
              <Text style={[themeStyle.generalText, { color: theme.ACCENT }]}>
                @runcodeIng
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});

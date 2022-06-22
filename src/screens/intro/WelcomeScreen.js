import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
// ======== Custom Imports =========
// ======== Styles =========
import tw from "../../libs/tailwind/tailwind";
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
// ======== Components =========
import SolidButton from "../../components/common/button/SolidButton";

// =================================

const WelcomeScreen = () => {
  // ======== Init Definitions =========
  const navigation = useNavigation();
  // ======== End Definitions =========
  return (
    <SafeAreaView style={[tw`h-full bg-white`, themeStyle.safeAreaWrapper]}>
      <View style={tw`items-center justify-end flex-1 `}>
        <Image
          source={require("../../../assets/images/welcome/main-image.png")}
        />
      </View>
      <View style={tw`justify-start flex-1 `}>
        <View style={tw`items-center flex-1 mt-8`}>
          <Text style={[themeStyle.titleApp]}>Homely</Text>
          <Text style={[themeStyle.pageTitle, tw`mt-3`]}>
            Expertos en Limpieza
          </Text>
          <Text style={[themeStyle.paragraph, tw`mt-8 text-center`]}>
            Contamos con personal especializado y eficiente en servicios de
            limpieza de alta calidad y confianza
          </Text>
        </View>
        <View style={tw`flex-1 mt-6`}>
          <View style={tw`justify-start flex-1 `}>
            <SolidButton
              text="!Empecemos!"
              disabled={false}
              onPress={() => {
                navigation.navigate("AccessCodeRequestScreen");
              }}
            />
          </View>
          <View style={tw`items-center justify-end flex-1 `}>
            <View style={tw`flex flex-row`}>
              <Text style={[themeStyle.captions]}>Powered by </Text>
              <Text style={[themeStyle.paragraph, { color: theme.ACCENT }]}>
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

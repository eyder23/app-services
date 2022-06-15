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

const PersonalAddressScreen = () => {
  // ======== Init Definitions =========
  const navigation = useNavigation();
  // ======== End Definitions =========
  return (
    <SafeAreaView style={[tw`h-full bg-white`, themeStyle.safeAreaWrapper]}>
      <Text>Llegamos PersonalAddressScreen</Text>
    </SafeAreaView>
  );
};

export default PersonalAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});

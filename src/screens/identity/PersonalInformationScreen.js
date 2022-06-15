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

const PersonalInformationScreen = () => {
  // ======== Init Definitions =========
  const navigation = useNavigation();
  // ======== End Definitions =========
  return (
    <SafeAreaView
      style={[themeStyle.container, { backgroundColor: theme.PRIMARY }]}
    >
      <View style={[themeStyle.safeAreaWrapper, themeStyle.containerEsp]}>
        <View>
          <Text style={[themeStyle.pageTitle, { marginTop: 50 }]}>
            Cuentenos
          </Text>
          <Text style={[themeStyle.pageTitle]}>acerca de usted</Text>
          <Text style={[themeStyle.paragraph, { marginTop: 10 }]}>
            Información personal:
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// ======== Custom Imports =========
// ======== Styles =========
import tw from "../../libs/tailwind/tailwind";
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
// ======== Components =========
import SolidButton from "../../components/common/button/SolidButton";
import LogOutButton from "../../components/common/button/LogOutButton";

// =================================

const HomeScreen = () => {
  // ======== Init Definitions =========
  const navigation = useNavigation();
  // ======== End Definitions =========
  return (
    <SafeAreaView
      style={[themeStyle.container, { backgroundColor: theme.WHITE }]}
    >
      <ScrollView style={[themeStyle.safeAreaWrapper]}>
        <Text style={[themeStyle.titleApp]}>Homely</Text>
        <Text style={[themeStyle.pageTitle, tw`mt-3`]}>
          Expertos en Limpieza
        </Text>
        <LogOutButton text="Cerrar Sesión" style={[tw`mt-5`]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});

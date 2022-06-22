import React from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native";
// ======== Custom Imports =========
// ======== Styles =========
import tw from "../../libs/tailwind/tailwind";
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
// ======== Components =========
import AccessCodeRequestComponent from "../../components/auth/AccessCodeRequestComponent";
import BackButton from "../../components/common/button/BackButton";
// =================================

const AccessCodeRequestScreen = ({ navigation: { goBack } }) => {
  // ======== Init Definitions =========
  // ======== End Functions =========

  return (
    <SafeAreaView
      style={[themeStyle.container, { backgroundColor: theme.PRIMARY }]}
    >
      <ScrollView style={[themeStyle.safeAreaWrapper, themeStyle.containerEsp]}>
        <View>
          <View style={{ marginTop: 42 }}>
            <Text style={[themeStyle.titleApp, tw`text-center bg-transparent`]}>
              Ingrese a Homely
            </Text>
            <BackButton onPress={goBack} disabled={false} />
          </View>

          <Text style={[themeStyle.paragraph, { marginTop: 30 }]}>
            Nosotros le enviaremos un código de acceso a su número de teléfono a
            través de{"  "}
            <Text style={themeStyle.span}>
              <FontAwesome name="whatsapp" size={15} color={theme.LIGHT} />
              {""}
              WhatsApp
            </Text>
          </Text>
        </View>
        <AccessCodeRequestComponent />
        <View>
          <Text style={[themeStyle.captions]}>
            Al crear una cuenta recuerde que acepta nuestros{" "}
            <Text style={[themeStyle.span, { color: theme.ACCENT }]}>
              Terminos & Condiciones
            </Text>{" "}
            y la{" "}
            <Text style={[themeStyle.span, { color: theme.ACCENT }]}>
              Política de Privacidad de Datos
            </Text>
          </Text>
        </View>
        <View style={{ height: 40, backgroundColor: theme.WHITE }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccessCodeRequestScreen;

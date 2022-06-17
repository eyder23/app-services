import React from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native";
// ======== Custom Imports =========
// ======== Styles =========
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
// ======== Components =========
import AccessCodeRequestComponent from "../../components/auth/AccessCodeRequestComponent";
// =================================

const AccessCodeRequestScreen = () => {
  // ======== Init Definitions =========
  // ======== End Functions =========

  return (
    <SafeAreaView
      style={[themeStyle.container, { backgroundColor: theme.PRIMARY }]}
    >
      <ScrollView style={[themeStyle.safeAreaWrapper, themeStyle.containerEsp]}>
        <View>
          <Text style={[themeStyle.pageTitle, { marginTop: 50 }]}>
            Ingrese a Homely
          </Text>
          <Text style={[themeStyle.paragraph, { marginTop: 10 }]}>
            Nosotros le enviaremos un código de acceso a su número de teléfono a
            través de{"  "}
            <Text style={themeStyle.span}>
              <FontAwesome name="whatsapp" size={15} color={theme.LIGHT} />{" "}
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

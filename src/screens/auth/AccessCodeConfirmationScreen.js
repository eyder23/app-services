import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
// ======== Styles =========
import tw from "../../libs/tailwind/tailwind";
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
// ======== Components =========
import AccessCodeConfirmationComponent from "../../components/auth/AccessCodeConfirmationComponent";
import BackButton from "../../components/common/button/BackButton";
// =================================

const AccessCodeConfirmationScreen = ({ route, navigation: { goBack } }) => {
  // ======== Init Definitions =========
  let userIn = null;
  if (route && route.params) {
    userIn = route.params.user;
  }
  // ======== End Definitions =========

  return (
    <SafeAreaView
      style={[themeStyle.container, { backgroundColor: theme.PRIMARY }]}
    >
      <ScrollView style={[themeStyle.safeAreaWrapper, themeStyle.containerEsp]}>
        <View>
          <View style={{ marginTop: 42 }}>
            <Text style={[themeStyle.titleApp, tw`text-center bg-transparent`]}>
              Ingrese el Código
            </Text>
            <BackButton onPress={goBack} disabled={false} />
          </View>
          <Text style={[themeStyle.paragraph, { marginTop: 30 }]}>
            Hemos enviado un código de confirmación al número de teléfono{" "}
            <Text style={[themeStyle.span, { color: theme.ACCENT }]}>
              {"+"}
              {userIn.countryCodePhoneNumber}
              {userIn.phoneNumber}
            </Text>{" "}
            a través de{" "}
            <Text style={themeStyle.span}>
              <FontAwesome name="whatsapp" size={15} color={theme.LIGHT} />
              {""}
              WhatsApp
            </Text>
          </Text>
        </View>
        <AccessCodeConfirmationComponent userIn={userIn} />
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

export default AccessCodeConfirmationScreen;

const styles = StyleSheet.create({
  accesCodeNumbersContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 70,
    marginRight: 70,
  },
  keyPadButtonContainer: {
    marginLeft: 40,
    marginRight: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flag: {
    width: 32,
    height: 32,
  },
  span: {
    fontFamily: "Montserrat_600SemiBold",
    color: theme.ACCENT,
  },
});

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaskedTextInput } from "react-native-mask-text";
// ======== Custom Imports =========
// ======== Styles =========
import tw from "../../libs/tailwind/tailwind";
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
// ======== Components =========
import SolidButton from "../../components/common/button/SolidButton";
import GroupDropDownInputForm from "../../components/common/dropdown/GroupDropDownInputForm";
import TextInput from "../../components/common/input/TextInput";
import TextButton from "../../components/common/button/TextButton";
// =================================

const PersonalInformationScreen = () => {
  // ======== Init Definitions =========
  const navigation = useNavigation();
  const [documentTypes, setDocumentTypes] = useState([
    { label: "CC", value: "CC" },
    { label: "NIT", value: "NIT" },
    { label: "OTRO", value: "OTRO" },
  ]);
  const [documentType, setDocumentType] = useState("CC");
  const [documentNumber, setDocumentNumber] = useState(null);
  const [maskedValue, setMaskedValue] = useState("");
  const [unMaskedValue, setUnmaskedValue] = useState("");
  // ======== End Definitions =========

  // ======== Init Functions =========

  useEffect(() => {
    console.log(documentType);
  }, [documentType]);

  // ======== End Functions =========

  return (
    <SafeAreaView
      style={[themeStyle.container, { backgroundColor: theme.PRIMARY }]}
    >
      <ScrollView style={[themeStyle.safeAreaWrapper, themeStyle.containerEsp]}>
        <View>
          <Text style={[themeStyle.pageTitle, { marginTop: 50 }]}>
            Cuentenos
          </Text>
          <Text style={[themeStyle.pageTitle]}>acerca de usted</Text>
          <Text style={[themeStyle.paragraph, { marginTop: 10 }]}>
            Información personal:
          </Text>
          <View style={[{ marginTop: 20 }]}>
            <Text
              style={[themeStyle.captions, { color: theme.PRIMARY_TEXT_COLOR }]}
            >
              Documento de Identificación:
            </Text>
            <View
              style={[
                {
                  flexDirection: "row",
                  marginTop: 10,
                },
              ]}
            >
              <GroupDropDownInputForm
                name="documentNumber"
                labelDropdown="Documento: "
                placeholderDropdown="Tipo"
                itemsDropDown={documentTypes}
                setItemsDropDown={setDocumentTypes}
                valueDropdown={documentType}
                setValueDropdown={setDocumentType}
                valueTextInput={documentNumber}
                returnKeyType="done"
                keyboardType="number-pad"
                autoCapitalize="none"
                style={[{ width: 100, marginRight: 10 }]}
              />
              <TextInput
                autoCapitalize="none"
                name="documentNumber"
                placeholder="Nro documento"
              />
            </View>
          </View>

          {documentType === "CC" || documentType === "OTRO" ? (
            <>
              <View style={[{ marginTop: 20 }]}>
                <Text
                  style={[
                    themeStyle.captions,
                    { color: theme.PRIMARY_TEXT_COLOR },
                  ]}
                >
                  Nombres:
                </Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      marginTop: 10,
                    },
                  ]}
                >
                  <TextInput
                    autoCapitalize="words"
                    name="documentNumber"
                    placeholder="Nombres"
                  />
                </View>
              </View>
              <View style={[{ marginTop: 20 }]}>
                <Text
                  style={[
                    themeStyle.captions,
                    { color: theme.PRIMARY_TEXT_COLOR },
                  ]}
                >
                  Apellidos:
                </Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      marginTop: 10,
                    },
                  ]}
                >
                  <TextInput
                    autoCapitalize="words"
                    name="documentNumber"
                    placeholder="Apellidos"
                  />
                </View>
              </View>
              <View style={[{ marginTop: 20 }]}>
                <Text
                  style={[
                    themeStyle.captions,
                    { color: theme.PRIMARY_TEXT_COLOR },
                  ]}
                >
                  Fecha de nacimiento: (dd/mm/aaaa)
                </Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      marginTop: 10,
                    },
                  ]}
                >
                  <MaskedTextInput
                    mask="99/99/9999"
                    placeholder="31/12/2000"
                    onChangeText={(text, rawText) => {
                      setMaskedValue(text);
                      console.log(text);
                      setUnmaskedValue(rawText);
                    }}
                    style={styles.input}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={[{ marginTop: 20 }]}>
                <Text
                  style={[
                    themeStyle.captions,
                    { color: theme.PRIMARY_TEXT_COLOR },
                  ]}
                >
                  Razón Social:
                </Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      marginTop: 10,
                    },
                  ]}
                >
                  <TextInput
                    autoCapitalize="words"
                    name="documentNumber"
                    placeholder="Razón Social"
                  />
                </View>
              </View>
            </>
          )}

          <View style={[{ marginTop: 20 }]}>
            <Text
              style={[themeStyle.captions, { color: theme.PRIMARY_TEXT_COLOR }]}
            >
              Correo electrónico:
            </Text>
            <View
              style={[
                {
                  flexDirection: "row",
                  marginTop: 10,
                },
              ]}
            >
              <TextInput
                autoCapitalize="none"
                name="documentNumber"
                placeholder="Correo electrónico"
              />
            </View>
          </View>
          <View style={[{ marginTop: 20 }]}>
            <SolidButton text="Siguiente" disabled={false} />
            <TextButton text="Cerrar Sesión" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontFamily: theme.FONT_REGULAR,
    color: theme.PRIMARY_TEXT_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.GRAY,
  },
});

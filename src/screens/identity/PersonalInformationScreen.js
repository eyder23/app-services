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
import PersonalInformationForm from "../../components/identity/personal-information/PersonalInformationForm";
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
        <PersonalInformationForm />
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

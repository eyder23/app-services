import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
// ======== Custom Imports =========
// ======== Styles =========
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
// ======== Components =========
import PersonalInformationForm from "../../components/identity/personal-information/PersonalInformationForm";
// =================================

const PersonalInformationScreen = () => {
  // ======== Init Definitions =========

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

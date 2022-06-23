import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
// ======== Custom Imports =========
// ======== Styles =========
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
// ======== Components =========
import PersonalAddressForm from "../../components/identity/personal-address/PersonalAddressForm";
import MainHousingUnitComponent from "../../components/housing-unit/main-housing-unit/MainHousingUnitComponent";
// =================================

const PersonalAddressScreen = () => {
  // ======== Init Definitions =========

  // ======== End Functions =========
  return (
    <SafeAreaView
      style={[themeStyle.container, { backgroundColor: theme.PRIMARY }]}
    >
      <ScrollView style={[themeStyle.safeAreaWrapper, themeStyle.containerEsp]}>
        <MainHousingUnitComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalAddressScreen;

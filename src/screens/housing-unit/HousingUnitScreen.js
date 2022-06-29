import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
// ======== Custom Imports =========
// ======== Styles =========
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
// ======== Components =========
import PersonalAddressForm from "../../components/identity/personal-address/PersonalAddressForm";
import MainHousingUnitComponent from "../../components/housing-unit/main-housing-unit/MainHousingUnitComponent";
import { Loading } from "../../components/common/activity-indicator/Loading";
// =================================

const PersonalAddressScreen = () => {
  // ======== Init Definitions =========
  // ======== Init Functions =========
  const [actionProcess, setActionProcess] = useState(false);
  const handleActionProcess = (value) => {
    setActionProcess(value);
  };
  // ======== End Functions =========
  return (
    <SafeAreaView
      style={[themeStyle.container, { backgroundColor: theme.PRIMARY }]}
    >
      <ScrollView style={[themeStyle.safeAreaWrapper, themeStyle.containerEsp]}>
        <MainHousingUnitComponent handleActionProcess={handleActionProcess} />
        {actionProcess && <Loading />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalAddressScreen;

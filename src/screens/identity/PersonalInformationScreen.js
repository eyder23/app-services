import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
// ======== Custom Imports =========
// ======== Styles =========
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
// ======== Components =========
import PersonalInformationForm from "../../components/identity/personal-information/PersonalInformationForm";
import { Loading } from "../../components/common/activity-indicator/Loading";
// =================================

const PersonalInformationScreen = () => {
  // ======== Init Definitions =========
  // ======== Init Functions =========
  const [actionProcess, setActionProcess] = useState(false);
  const handleActionProcess = (value) => {
    setActionProcess(value);
  };

  return (
    <SafeAreaView
      style={[themeStyle.container, { backgroundColor: theme.PRIMARY }]}
    >
      <ScrollView style={[themeStyle.safeAreaWrapper, themeStyle.containerEsp]}>
        <PersonalInformationForm handleActionProcess={handleActionProcess} />
        {actionProcess && <Loading />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformationScreen;

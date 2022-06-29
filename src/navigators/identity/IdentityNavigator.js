import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

// ======== Custom Imports =========
// ======== Functions ===============
import { getCurrentUser } from "../../utils/functions/AppStatus";
// ======== Screens
import PersonalInformationScreen from "../../screens/identity/PersonalInformationScreen";
import PersonalAddressScreen from "../../screens/identity/PersonalAddressScreen";
import HousingUnitScreen from "../../screens/housing-unit/HousingUnitScreen";
// ======== Screens

const Stack = createNativeStackNavigator();
export default function IdentityNavigator() {
  const currentUser = getCurrentUser();
  console.log("x",currentUser);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {currentUser.personalInformation === null && (
        <Stack.Screen
          name="PersonalInformationScreen"
          component={PersonalInformationScreen}
        />
      )}
      {currentUser.personalInformation === 1 && (
        <Stack.Screen
          name="PersonalAddressScreen"
          component={PersonalAddressScreen}
        />
      )}
      {currentUser.personalInformation === 2 && (
        <Stack.Screen name="HousingUnitScreen" component={HousingUnitScreen} />
      )}
    </Stack.Navigator>
  );
}

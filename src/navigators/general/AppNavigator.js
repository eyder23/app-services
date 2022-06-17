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
import WelcomeScreen from "../../screens/intro/WelcomeScreen";
import AccessCodeRequestScreen from "../../screens/auth/AccessCodeRequestScreen";
import AccessCodeConfirmationScreen from "../../screens/auth/AccessCodeConfirmationScreen";
import PersonalInformationScreen from "../../screens/identity/PersonalInformationScreen";
import PersonalAddressScreen from "../../screens/identity/PersonalAddressScreen";
// ======== Screens

const StackNavigator = createNativeStackNavigator();

const Navigator = () => {
  const currentUser = getCurrentUser();
  console.log("currentUser", currentUser?.uid);
 
  return (
    <StackNavigator.Navigator>
      <>
        {currentUser == null ? (
          <>
            <StackNavigator.Screen
              options={{
                headerShown: false,
              }}
              name="WelcomeScreen"
              component={WelcomeScreen}
            />
            <StackNavigator.Screen
              options={{
                headerShown: false,
              }}
              name="AccessCodeRequestScreen"
              component={AccessCodeRequestScreen}
            />
            <StackNavigator.Screen
              options={{
                headerShown: false,
              }}
              name="AccessCodeConfirmationScreen"
              component={AccessCodeConfirmationScreen}
            />
          </>
        ) : (
          <>
            <StackNavigator.Screen
              options={{
                headerShown: false,
              }}
              name="PersonalInformationScreen"
              component={PersonalInformationScreen}
            />
            <StackNavigator.Screen
              options={{
                headerShown: false,
              }}
              name="PersonalAddressScreen"
              component={PersonalAddressScreen}
            />
          </>
        )}
      </>
    </StackNavigator.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
          <Navigator />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;

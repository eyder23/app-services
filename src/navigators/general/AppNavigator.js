import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

// ======== Custom Imports =========
// ======== Screens
import WelcomeScreen from "../../screens/intro/WelcomeScreen";
import AccessCodeRequestScreen from "../../screens/auth/AccessCodeRequestScreen";
import AccessCodeConfirmationScreen from "../../screens/auth/AccessCodeConfirmationScreen";
// ======== Storage
import { selectCurrentAppState } from "../../store/slices/appSlice";
// =================================

const StackNavigator = createNativeStackNavigator();

const Navigator = () => {
  const currentAppState = useSelector(selectCurrentAppState);

  return (
    <StackNavigator.Navigator>
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

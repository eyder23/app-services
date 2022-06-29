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
// ======== Screens

const Stack = createNativeStackNavigator();
export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen
        name="AccessCodeRequestScreen"
        component={AccessCodeRequestScreen}
      />
      <Stack.Screen
        name="AccessCodeConfirmationScreen"
        component={AccessCodeConfirmationScreen}
      />
    </Stack.Navigator>
  );
}

import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

// ======== Custom Imports =========
// ======== Functions ===============
import { getCurrentUser } from "../../utils/functions/AppStatus";
// ======== Custom Stack Navigators ========
import AuthNavigator from "../auth/AuthNavigator";
import IdentityNavigator from "../identity/IdentityNavigator";
import DrawerNavigator from "../main/DrawerNavigator";


const Stack = createNativeStackNavigator();

const Navigator = () => {
  const currentUser = getCurrentUser();
  console.log("currentUser", currentUser?.personalInformation);

  return (
    <Stack.Navigator>
      <>
        {currentUser == null ? (
          <Stack.Screen
            name="AuthNavigator"
            component={AuthNavigator}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            {(currentUser.personalInformation === null ||
              currentUser.personalInformation === 1 ||
              currentUser.personalInformation === 2) && (
              <Stack.Screen
                name="IdentityNavigator"
                component={IdentityNavigator}
                options={{
                  headerShown: false,
                }}
              />
            )}
            {currentUser.personalInformation === 3 && (
              <Stack.Screen
                name="DrawerNavigator"
                component={DrawerNavigator}
                options={{
                  headerShown: false,
                }}
              />
            )}
          </>
        )}
      </>
    </Stack.Navigator>
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

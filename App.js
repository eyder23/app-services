import React, { useState, useEffect } from "react";
import AppNavigator from "./src/navigators/general/AppNavigator";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

// ======== Custom Imports =========
import { store, persistor } from "./src/store/persistStore";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function App() {
  // ======== Const Definitions
  const [isReady, setIsReady] = useState(false);
  let [isLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  // ==================================================

  // ======== Function Definitions
  useEffect(() => {
    // Stop the Splash Screen from being hidden.
    const showSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    showSplashScreen();
    // You can do additional data fetching here.
    // Like a function that fetches my user from Firebase
  }, []);

  useEffect(() => {
    // Once our data is ready, hide the Splash Screen
    const hideSplashScreen = async () => {
      // await new Promise((resolve) => setTimeout(resolve, 10000));
      await SplashScreen.hideAsync();
      setIsReady(true);
    };

    if (isLoaded) hideSplashScreen();
  }, [isLoaded]);

  if (!isReady) return null;
  // ==================================================

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}

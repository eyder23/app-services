import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// ======== Custom Imports =========
// ======== Styles =========
import tw from "../../libs/tailwind/tailwind";
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
// ======== Components =========
import SolidButton from "../../components/common/button/SolidButton";
import LogOutButton from "../../components/common/button/LogOutButton";

// =================================
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  // ======== Init Definitions =========
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  // ======== End Definitions =========
  return (
    <SafeAreaView
      style={[themeStyle.container, { backgroundColor: theme.WHITE }]}
    >
      <ScrollView
        style={[themeStyle.safeAreaWrapper]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.ACCENT]}
            progressBackgroundColor={theme.PRIMARY}
          />
        }
      >
        <Text style={[themeStyle.titleApp]}>Homely</Text>
        <Text style={[themeStyle.pageTitle, tw`mt-3`]}>
          Expertos en Limpieza
        </Text>
        <LogOutButton text={"Cerrar sesión"} style={[tw`mt-5`]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

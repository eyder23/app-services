import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Flag from "react-native-round-flags";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native";
// ======== Custom Imports =========
// ======== Styles =========
import tw from "../../libs/tailwind/tailwind";
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
import useUser from "../../api/client/AccessControlClient";
// ======== Components =========
import KeyPadButton from "../../components/common/button/KeyPadButton";
import KeyPadButtonIcon from "../../components/common/button/KeyPadButtonIcon";
import SolidButton from "../../components/common/button/SolidButton";
import ErrorText from "../../components/common/text/ErrorText";

const AccessCodeRequestComponent = () => {
  // ======== Init Definitions =========
  const navigation = useNavigation();
  const { generateCodeAuth } = useUser();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [actionProcess, setActionProcess] = useState(false);
  const [actionLabel, setActionLabel] = useState("Siguiente");
  const [errorLabel, setErrorLabel] = useState("");
  // ======== End Definitions =========

  // ======== Init Functions =========
  const handlePressKeyPadButton = (key) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber(phoneNumber + key);
    }
  };
  const handlePressKeyDeletePadButton = () => {
    setPhoneNumber(phoneNumber.slice(0, -1));
  };

  const handlePressNextButton = async () => {
    setErrorLabel("");
    if (phoneNumber && phoneNumber.length === 10) {
      setActionProcess(true);
      setActionLabel("Procesando Datos");
      try {
        let user = {
          countryCodePhoneNumber: "57",
          phoneNumber: phoneNumber,
        };
        const response = await generateCodeAuth(user);
        if (response.success) {
          setActionProcess(false);
          setActionLabel("Siguiente");
          setPhoneNumber("");
          navigation.navigate("AccessCodeConfirmationScreen", {
            user: user,
          });
        } else {
          const { code, messageDeveloper, messageUser } = respService.apiError;
          setErrorLabel(messageUser);
          setActionProcess(false);
          setActionLabel("Siguiente");
        }
      } catch (err) {
        setActionProcess(false);
        setActionLabel("Siguiente");
        setErrorLabel(err.message);
      }
    }
  };
  // ======== End Functions =========

  return (
    <View>
      <View style={styles.phoneNumberContainer}>
        <Flag code="CO" style={styles.flag} />
        <Text style={[themeStyle.phoneNumber, { color: theme.GRAY }]}>+57</Text>
        <Text style={[themeStyle.phoneNumber, { marginLeft: 10 }]}>
          {/* 3208095046 */}
          {phoneNumber}
        </Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <View style={[styles.keyPadButtonContainer]}>
          <KeyPadButton
            text="1"
            disabled={phoneNumber.length === 10}
            onPress={() => {
              handlePressKeyPadButton(1);
            }}
          />
          <KeyPadButton
            text="2"
            disabled={phoneNumber.length === 10}
            onPress={() => {
              handlePressKeyPadButton(2);
            }}
          />
          <KeyPadButton
            text="3"
            disabled={phoneNumber.length === 10}
            onPress={() => {
              handlePressKeyPadButton(3);
            }}
          />
        </View>
        <View style={[styles.keyPadButtonContainer, { marginTop: 24 }]}>
          <KeyPadButton
            text="4"
            disabled={phoneNumber.length === 10}
            onPress={() => {
              handlePressKeyPadButton(4);
            }}
          />
          <KeyPadButton
            text="5"
            disabled={phoneNumber.length === 10}
            onPress={() => {
              handlePressKeyPadButton(5);
            }}
          />
          <KeyPadButton
            text="6"
            disabled={phoneNumber.length === 10}
            onPress={() => {
              handlePressKeyPadButton(6);
            }}
          />
        </View>
        <View style={[styles.keyPadButtonContainer, { marginTop: 24 }]}>
          <KeyPadButton
            text="7"
            disabled={phoneNumber.length === 10}
            onPress={() => {
              handlePressKeyPadButton(7);
            }}
          />
          <KeyPadButton
            text="8"
            disabled={phoneNumber.length === 10}
            onPress={() => {
              handlePressKeyPadButton(8);
            }}
          />
          <KeyPadButton
            text="9"
            disabled={phoneNumber.length === 10}
            onPress={() => {
              handlePressKeyPadButton(9);
            }}
          />
        </View>
        <View
          style={[
            styles.keyPadButtonContainer,
            { marginTop: 24, marginLeft: 150 },
          ]}
        >
          <KeyPadButton
            text="0"
            disabled={phoneNumber.length === 10}
            onPress={() => {
              handlePressKeyPadButton(0);
            }}
          />
          <KeyPadButtonIcon
            iconName="delete"
            onPress={() => {
              handlePressKeyDeletePadButton();
            }}
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <ErrorText text={errorLabel} />
        <SolidButton
          text={actionLabel}
          onPress={() => {
            handlePressNextButton();
          }}
          disabled={phoneNumber.length !== 10 || actionProcess}
        />
      </View>
    </View>
  );
};
export default AccessCodeRequestComponent;

const styles = StyleSheet.create({
  phoneNumberContainer: {
    marginTop: 40,
    flexDirection: "row",
  },
  keyPadButtonContainer: {
    marginLeft: 40,
    marginRight: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flag: {
    width: 32,
    height: 32,
  },
  span: {
    fontFamily: "Montserrat_600SemiBold",
    color: theme.ACCENT,
  },
});

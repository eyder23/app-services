import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
// import { SafeAreaView } from "react-native";
// ======== Custom Imports =========
// ======== Styles =========
import { setCurrentUser } from "../../store/slices/userSlice";
import theme from "../../constants/styles/theme.constant";
import themeStyle from "../../styles/general/theme.style";
import useUser from "../../api/client/AccessControlClient";
// ======== Components =========
import KeyPadButton from "../../components/common/button/KeyPadButton";
import KeyPadButtonIcon from "../../components/common/button/KeyPadButtonIcon";
import SolidButton from "../../components/common/button/SolidButton";
import ErrorText from "../../components/common/text/ErrorText";
// =================================

const AccessCodeConfirmationScreen = ({ route, navigation }) => {
  // ======== Init Definitions =========
  let userIn = null;
  if (route && route.params) {
    userIn = route.params.user;
  }
  const dispatch = useDispatch();
  const { validateCodeAuth, userLoginWithCustomToken, getUserByUid } =
    useUser();
  const [genCode, setGenCode] = useState("");
  const [actionProcess, setActionProcess] = useState(false);
  const [actionLabel, setActionLabel] = useState("Validar");
  const [errorLabel, setErrorLabel] = useState("");
  const [user, setUser] = useState(null);
  // ======== End Definitions =========

  // ======== Init Functions =========
  const handlePressKeyPadButton = (key) => {
    if (genCode.length < 6) {
      setGenCode(genCode + key);
    }
  };
  const handlePressKeyDeletePadButton = () => {
    setGenCode(genCode.slice(0, -1));
  };

  const handlePressNextButton = async () => {
    setErrorLabel("");
    if (genCode && genCode.length === 6) {
      setActionProcess(true);
      setActionLabel("Procesando Datos");
      try {
        let user = {
          genCode: genCode,
          countryCodePhoneNumber: "57",
          phoneNumber: userIn.phoneNumber,
          platformOS: Platform.OS,
        };
        const response = await validateCodeAuth(user);
        if (response.success) {
          setActionProcess(false);
          setActionLabel("Validar");
          setGenCode("");
          const initialToken = response.data;
          const respLogin = await userLoginWithCustomToken(initialToken);
          console.log(respLogin);
          if (respLogin.success) {
            const cleanData = JSON.stringify(respLogin.data.user);
            const cleanDataObject = JSON.parse(cleanData);
            const { lastLoginAt, createdAt, uid, stsTokenManager } =
              cleanDataObject;
            const { accessToken, apiKey, expirationTime, refreshToken } =
              stsTokenManager;
            let hasPersonalDataCompleted = false;
            const respUser = await getUserByUid(uid);
            let name = null;
            let email = null;
            if (respUser && respUser.success && respUser.data) {
              if (
                typeof respUser.data.name !== "undefined" &&
                typeof respUser.data.email !== "undefined"
              ) {
                hasPersonalDataCompleted = true;
                name = respUser.data.name;
                email = respUser.data.email;
              }
            }

            dispatch(
              setCurrentUser({
                displayName: name,
                lastLoginAt: lastLoginAt,
                createdAt: createdAt,
                uid: uid,
                email: email,
                initialToken: initialToken,
                accessToken: accessToken,
                apiKey: apiKey,
                expirationTime: expirationTime,
                refreshToken: refreshToken,
                hasPersonalDataCompleted: hasPersonalDataCompleted,
                countryCodePhoneNumber: userIn.countryCodePhoneNumber,
                phoneNumber: userIn.phoneNumber,
              })
            );
          }
        } else {
          const { code, messageDeveloper, messageUser } = response.apiError;
          setErrorLabel(messageUser);
          setActionProcess(false);
          setActionLabel("Validar");
        }
      } catch (err) {
        setActionProcess(false);
        setActionLabel("Validar");
        setErrorLabel(err.message);
      }
    }
  };
  // ======== End Functions =========

  return (
    <SafeAreaView
      style={[themeStyle.container, { backgroundColor: theme.PRIMARY }]}
    >
      <View style={[themeStyle.safeAreaWrapper, themeStyle.containerEsp]}>
        <View>
          <Text style={[themeStyle.pageTitle, { marginTop: 50 }]}>
            Ingrese el Código de Acceso
          </Text>
          <Text style={[themeStyle.paragraph, { marginTop: 10 }]}>
            Lo hemos enviado al número de teléfono{" "}
            <Text style={themeStyle.span}>
              {" "}
              {userIn.countryCodePhoneNumber} {userIn.phoneNumber}
            </Text>{" "}
            través de{" "}
            <Text style={themeStyle.span}>
              <FontAwesome name="whatsapp" size={15} color={theme.ACCENT} />{" "}
              WhatsApp
            </Text>
          </Text>
        </View>
        <View style={styles.accesCodeNumbersContainer}>
          <FontAwesome
            name="circle"
            size={32}
            color={genCode.length > 0 ? theme.ACCENT : theme.GRAY}
          />
          <FontAwesome
            name="circle"
            size={32}
            color={genCode.length > 1 ? theme.ACCENT : theme.GRAY}
          />
          <FontAwesome
            name="circle"
            size={32}
            color={genCode.length > 2 ? theme.ACCENT : theme.GRAY}
          />
          <FontAwesome
            name="circle"
            size={32}
            color={genCode.length > 3 ? theme.ACCENT : theme.GRAY}
          />
          <FontAwesome
            name="circle"
            size={32}
            color={genCode.length > 4 ? theme.ACCENT : theme.GRAY}
          />
          <FontAwesome
            name="circle"
            size={32}
            color={genCode.length > 5 ? theme.ACCENT : theme.GRAY}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={[styles.keyPadButtonContainer]}>
            <KeyPadButton
              text="1"
              disabled={genCode.length === 6}
              onPress={() => {
                handlePressKeyPadButton(1);
              }}
            />
            <KeyPadButton
              text="2"
              disabled={genCode.length === 6}
              onPress={() => {
                handlePressKeyPadButton(2);
              }}
            />
            <KeyPadButton
              text="3"
              disabled={genCode.length === 6}
              onPress={() => {
                handlePressKeyPadButton(3);
              }}
            />
          </View>
          <View style={[styles.keyPadButtonContainer, { marginTop: 24 }]}>
            <KeyPadButton
              text="4"
              disabled={genCode.length === 6}
              onPress={() => {
                handlePressKeyPadButton(4);
              }}
            />
            <KeyPadButton
              text="5"
              disabled={genCode.length === 6}
              onPress={() => {
                handlePressKeyPadButton(5);
              }}
            />
            <KeyPadButton
              text="6"
              disabled={genCode.length === 6}
              onPress={() => {
                handlePressKeyPadButton(6);
              }}
            />
          </View>
          <View style={[styles.keyPadButtonContainer, { marginTop: 24 }]}>
            <KeyPadButton
              text="7"
              disabled={genCode.length === 6}
              onPress={() => {
                handlePressKeyPadButton(7);
              }}
            />
            <KeyPadButton
              text="8"
              disabled={genCode.length === 6}
              onPress={() => {
                handlePressKeyPadButton(8);
              }}
            />
            <KeyPadButton
              text="9"
              disabled={genCode.length === 6}
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
              disabled={genCode.length === 6}
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
        <View style={{ marginTop: 40 }}>
          <ErrorText text={errorLabel} />
          <SolidButton
            text={actionLabel}
            onPress={() => {
              handlePressNextButton();
            }}
            disabled={genCode.length !== 6 || actionProcess}
          />
        </View>
        <View>
          <Text style={[themeStyle.captions]}>
            Al crear una cuenta recuerde que acepta nuestros{" "}
            <Text style={themeStyle.span}>Terminos & Condiciones</Text> y la{" "}
            <Text style={themeStyle.span}>Política de Privacidad de Datos</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccessCodeConfirmationScreen;

const styles = StyleSheet.create({
  accesCodeNumbersContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 70,
    marginRight: 70,
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

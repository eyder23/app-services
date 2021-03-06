import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
// import { SafeAreaView } from "react-native";
// ======== Custom Imports =========
// ======== Functions ===============
import {
  getCurrentUser,
  getUserToUpdate,
} from "../../utils/functions/AppStatus";
// ======== Services ===============
import { setCurrentUser } from "../../store/slices/userSlice";
import useUser from "../../api/client/AccessControlClient";
import useIdentityClient from "../../api/client/IdentityClient";
// ======== Styles =========
import theme from "../../constants/styles/theme.constant";
// ======== Components =========
import KeyPadButton from "../../components/common/button/KeyPadButton";
import KeyPadButtonIcon from "../../components/common/button/KeyPadButtonIcon";
import SolidButton from "../../components/common/button/SolidButton";
import ErrorText from "../../components/common/text/ErrorText";
// =================================

const AccessCodeConfirmationComponent = ({ userIn, handleActionProcess }) => {
  // ======== Init Definitions =========
  const dispatch = useDispatch();
  const currentUser = getCurrentUser();
  const { validateCodeAuth, userLoginWithCustomToken, getUserByUid } =
    useUser();
  const { getPersonById } = useIdentityClient();
  const [genCode, setGenCode] = useState("");
  const [actionProcess, setActionProcess] = useState(false);
  const [actionLabel, setActionLabel] = useState("Validar");
  const [errorLabel, setErrorLabel] = useState("");
  const [user, setUser] = useState(null);
  // ======== End Definitions =========

  // ======== Init Functions =========
  useEffect(() => {
    handleActionProcess(actionProcess);
  }, [actionProcess]);

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
        // console.log(response);
        if (response.success) {
          const initialToken = response.data;
          const respLogin = await userLoginWithCustomToken(initialToken);
          // console.log(respLogin);
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
            let _idPerson = null;
            let personalInformation = null;
            if (respUser && respUser.success && respUser.data) {
              _idPerson = respUser?.data?.person;
              const personResponse = await getPersonById(_idPerson);
              console.log(personResponse);
              if (
                personResponse &&
                personResponse.success &&
                personResponse.data
              ) {
                const person = personResponse.data;
                if (typeof person.documentType !== "undefined") {
                  console.log("ya tenemos la informacion personal");
                  personalInformation = 1;
                }
                if (typeof person.mainHousingUnit !== "undefined") {
                  console.log("ya tenemos unidad de vivienda asociada");
                  personalInformation = 3;
                }
              }
              if (
                typeof respUser.data.name !== "undefined" &&
                typeof respUser.data.email !== "undefined"
              ) {
                hasPersonalDataCompleted = true;
                name = respUser.data.name;
                email = respUser.data.email;
              }
            }

            setActionProcess(false);
            setActionLabel("Validar");
            setGenCode("");
            dispatch(
              setCurrentUser(
                getUserToUpdate(getCurrentUser, {
                  _idPerson: _idPerson,
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
                  personalInformation: personalInformation,
                })
              )
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
    <View>
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
      <View style={{ marginTop: 20 }}>
        <ErrorText text={errorLabel} />
        <SolidButton
          text={actionLabel}
          onPress={() => {
            handlePressNextButton();
          }}
          disabled={genCode.length !== 6 || actionProcess}
        />
      </View>
    </View>
  );
};

export default AccessCodeConfirmationComponent;

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

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaskedTextInput } from "react-native-mask-text";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
// ======== Custom Imports =========
// ======== Functions ===============
import {
  getCurrentUser,
  getUserToUpdate,
} from "../../../utils/functions/AppStatus";
import { validateDate } from "../../../utils/functions/AppDate";
// ======== Services ===============
import { setCurrentUser } from "../../../store/slices/userSlice";
import useIdentityClient from "../../../api/client/IdentityClient";
import useHousingUnitClient from "../../../api/client/HousingUnitClient";
// ======== Styles =========
import tw from "../../../libs/tailwind/tailwind";
import theme from "../../../constants/styles/theme.constant";
import themeStyle from "../../../styles/general/theme.style";
// ======== Components =========
import SolidButton from "../../common/button/SolidButton";
import GroupDropDownInputForm from "../../common/dropdown/GroupDropDownInputForm";
import TextInput from "../../common/input/TextInput";
import LogOutButton from "../../common/button/LogOutButton";
import ErrorText from "../../common/text/ErrorText";

// ======== Init Form Validations =========
// ======== End Form Validations =========
const mainButtonLabel = "Enviar";
// ======================================

const FamilyApartmentHouseForm = () => {
  // ======== Init Definitions =========
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentUser = getCurrentUser();
  const { updatePerson } = useIdentityClient();
  const { createHousingUnit } = useHousingUnitClient();
  const formikRef = useRef(null);
  // ======== Standard Definitions =========
  const [actionProcess, setActionProcess] = useState(true);
  const [actionLabel, setActionLabel] = useState(mainButtonLabel);
  const [errorLabel, setErrorLabel] = useState("");
  // ======== End Definitions =========
  useEffect(() => {
    setActionProcess(false);
  }, []);

  const handleSubmit = async (values) => {
    setErrorLabel("");
    setActionProcess(true);
    setActionLabel("Procesando Datos");
    try {
      values.address = currentUser._idAddress;
      const response = await createHousingUnit(values);
      if (response.success) {
        const mainHousingUnit = response.data._id;
        const responsePersonUpdate = await updatePerson({
          _id: currentUser._idPerson,
          mainHousingUnit: mainHousingUnit,
          housingUnitList: [mainHousingUnit],
        });
        if (responsePersonUpdate.success) {
          setErrorLabel("");
          setActionLabel(mainButtonLabel);
          setActionProcess(false);
          dispatch(
            setCurrentUser(
              getUserToUpdate(currentUser, {
                personalInformation: 3,
              })
            )
          );
        } else {
          const { code, messageDeveloper, messageUser } = response.apiError;
          setErrorLabel(messageUser);
          setActionProcess(false);
          setActionLabel(mainButtonLabel);
        }
      } else {
        const { code, messageDeveloper, messageUser } = response.apiError;
        setErrorLabel(messageUser);
        setActionProcess(false);
        setActionLabel(mainButtonLabel);
      }
    } catch (err) {
      setActionProcess(false);
      setActionLabel(mainButtonLabel);
      setErrorLabel(err.message);
    }
  };
  // ======== Init Functions =========
  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        type: "FAMILY_HOUSE",
        observations: "",
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <View>
          <View style={[{ marginTop: 25 }]}>
            <Text style={[themeStyle.captions, { color: theme.GRAY }]}>
              Si hay alguna indicación especial para ubicar su casa por favor
              indiquela a continuación.
            </Text>
          </View>
          <View style={[{ marginTop: 20 }]}>
            <Text style={[themeStyle.captions, { color: theme.GRAY }]}>
              Observaciones:
            </Text>
            <View
              style={[
                {
                  marginTop: 10,
                },
              ]}
            >
              <TextInput
                returnKeyType="done"
                keyboardType="default"
                autoCapitalize="sentences"
                name="observations"
                placeholder="Casa color amarillo, ingreso por el pasillo."
                onChangeText={handleChange("observations")}
                onBlur={handleBlur("observations")}
                value={values.observations}
                style={{
                  height: 120,
                  justifyContent: "flex-start",
                  textAlignVertical: "top",
                }}
                multiline={true}
                numberOfLines={6}
                blurOnSubmit={true}
              />
            </View>
          </View>

          <View style={[{ marginTop: 5 }]}>
            <ErrorText text={errorLabel} />
            <SolidButton
              text={actionLabel}
              onPress={handleSubmit}
              disabled={actionProcess}
            />
          </View>
          <View style={{ height: 40, backgroundColor: theme.WHITE }}></View>
        </View>
      )}
    </Formik>
  );
};

export default FamilyApartmentHouseForm;

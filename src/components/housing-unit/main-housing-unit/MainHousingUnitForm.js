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
// =================================

// ======== Init Form Validations =========
const registrationDateLenght = 10;
const personalInformationValidationSchema = yup.object().shape({
  documentNumber: yup
    .string()
    .required("Documento de identificación es requerido"),
  firstName: yup.string().required("Nombres son requeridos"),
  surname: yup.string().required("Apellidos son requeridos"),
  registrationDate: yup
    .string()
    .required("Fecha de nacimiento es requerida")
    .min(registrationDateLenght, `Fecha de nacimiento no es valida`)
    .max(registrationDateLenght, `Fecha de nacimiento no es valida`),
  email: yup
    .string()
    .email("Por favor ingrese un correo válido")
    .required("Correo electrónico es requerido"),
});
const businessInformationValidationSchema = yup.object().shape({
  documentNumber: yup
    .string()
    .required("Documento de identificación es requerido"),
  businessName: yup.string().required("Razón social es requerida"),
  email: yup
    .string()
    .email("Por favor ingrese un correo válido")
    .required("Correo electrónico es requerido"),
});

// ======== End Form Validations =========
const mainButtonLabel = "Siguiente";
// ======================================

const MainHousingUnitForm = () => {
  // ======== Init Definitions =========
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentUser = getCurrentUser();
  const { updatePerson } = useIdentityClient();
  const [schema, updateSchema] = useState(personalInformationValidationSchema);
  const [documentTypes, setDocumentTypes] = useState([
    { label: "CC", value: "CC" },
    { label: "NIT", value: "NIT" },
    { label: "OTRO", value: "OTRO" },
  ]);
  const formikRef = useRef(null);
  const [documentType, setDocumentType] = useState("CC");

  const [housingUnitActive, setHousingUnitActive] = useState(true);
  const [houseAptoActive, setHouseAptoActive] = useState(false);

  // ======== Standard Definitions =========
  const [actionProcess, setActionProcess] = useState(true);
  const [actionLabel, setActionLabel] = useState(mainButtonLabel);
  const [errorLabel, setErrorLabel] = useState("");
  // ======== End Definitions =========

  // ======== Init Functions =========
  useEffect(() => {
    formikRef.current?.setFieldValue("documentType", documentType);
    if (documentType === "CC" || documentType === "OTRO") {
      updateSchema(personalInformationValidationSchema);
      formikRef.current?.setFieldValue("businessName", "");
    } else {
      updateSchema(businessInformationValidationSchema);
    }
  }, [documentType]);

  const handleSubmit = async (values) => {
    setErrorLabel("");
    setActionProcess(true);
    setActionLabel("Procesando Datos");
    try {
      let flagContinue = true;
      if (documentType === "CC" || documentType === "OTRO") {
        // Formating registration date
        let formatedDate = values.registrationDate;
        formatedDate = formatedDate.replace(
          /^(\d{1,2}\/)(\d{1,2}\/)(\d{4})$/,
          "$2$1$3"
        );
        if (validateDate(formatedDate)) {
          values.registrationDate = formatedDate;
        } else {
          flagContinue = false;
          formikRef.current?.setFieldValue("registrationDate", "");
          setActionProcess(false);
          setActionLabel(mainButtonLabel);
          setErrorLabel("Formato fecha de nacimiento es incorrecto");
        }
      }
      if (flagContinue) {
        // Setting Id Person
        values._id = currentUser?._idPerson;
        const response = await updatePerson(values);
        if (response.success) {
          dispatch(
            setCurrentUser(
              getUserToUpdate(currentUser, {
                personalInformation: 1,
                email: values.email,
                displayName: values.firstName
                  ? values.firstName
                  : values.businessName,
              })
            )
          );
          formikRef.current?.setFieldValue("registrationDate", "");
          setErrorLabel("");
          setActionLabel(mainButtonLabel);
          setActionProcess(false);
          navigation.navigate("PersonalAddressScreen");
        } else {
          const { code, messageDeveloper, messageUser } = response.apiError;
          setErrorLabel(messageUser);
          setActionProcess(false);
          setActionLabel(mainButtonLabel);
        }
      }
    } catch (err) {
      setActionProcess(false);
      setActionLabel(mainButtonLabel);
      setErrorLabel(err.message);
    }
  };

  useEffect(() => {
    setActionProcess(false);
  }, []);

  // ======== End Functions =========
  return (
    <Formik
      innerRef={formikRef}
      validateOnMount={true}
      validationSchema={schema}
      initialValues={{
        documentType: "",
        documentNumber: "",
        firstName: "",
        surname: "",
        businessName: "",
        registrationDate: "",
        email: "",
      }}
      onSubmit={(values) => {
        console.log(JSON.stringify(values));
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
          <View style={{ marginTop: 42 }}>
            <Text style={[themeStyle.titleApp, tw`text-center bg-transparent`]}>
              Cuentenos donde vive
            </Text>

            <Text
              style={[
                themeStyle.pageTitle,
                { color: theme.ACCENT, marginTop: 40 },
              ]}
            >
              Unidad de vivienda:
            </Text>
          </View>
          <View style={[{ marginTop: 25 }]}>
            <Text
              style={[themeStyle.captions, { color: theme.PRIMARY_TEXT_COLOR }]}
            >
              Por favor escoja entre las siguientes opciones:
            </Text>
            <View
              style={[
                {
                  marginTop: 10,
                },
              ]}
            >
              <View style={[tw`flex flex-row`]}>
                <TouchableOpacity
                  onPress={() => {
                    setHousingUnitActive(true);
                    setHouseAptoActive(false);
                  }}
                  style={[
                    tw`w-1/2 h-14 `,
                    {
                      borderTopLeftRadius: 12,
                      borderWidth: 1,
                      borderColor: theme.PRIMARY,
                      backgroundColor: housingUnitActive
                        ? theme.PRIMARY
                        : theme.WHITE,
                    },
                  ]}
                >
                  <View>
                    <Text
                      style={[
                        tw`text-center`,
                        themeStyle.paragraph,
                        {
                          color: housingUnitActive
                            ? theme.WHITE
                            : theme.PRIMARY,
                          marginTop: 6,
                        },
                      ]}
                    >
                      Conjunto {"\n"} Residencial
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setHousingUnitActive(false);
                    setHouseAptoActive(true);
                  }}
                  style={[
                    tw`w-1/2 bg-white`,
                    {
                      borderTopRightRadius: 12,
                      borderWidth: 1,
                      borderColor: theme.PRIMARY,
                      backgroundColor: houseAptoActive
                        ? theme.PRIMARY
                        : theme.WHITE,
                    },
                  ]}
                >
                  <View>
                    <Text
                      style={[
                        tw`text-center`,
                        themeStyle.paragraph,
                        {
                          color: houseAptoActive ? theme.WHITE : theme.PRIMARY,
                          marginTop: 6,
                        },
                      ]}
                    >
                      Casa / Apto{"\n"}Familiar
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[{ marginTop: 20 }]}>
            <ErrorText text={errorLabel} />
            <SolidButton
              text={actionLabel}
              onPress={handleSubmit}
              disabled={!isValid || actionProcess}
            />
            <LogOutButton text="Cerrar Sesión" />
          </View>
          <View style={{ height: 40, backgroundColor: theme.WHITE }}></View>
        </View>
      )}
    </Formik>
  );
};

export default MainHousingUnitForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontFamily: theme.FONT_REGULAR,
    color: theme.PRIMARY_TEXT_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.GRAY,
  },
});

import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, StatusBar, View } from "react-native";
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
import SolidButton from "../../../components/common/button/SolidButton";
import GroupDropDownInputForm from "../../../components/common/dropdown/GroupDropDownInputForm";
import TextInput from "../../../components/common/input/TextInput";
import LogOutButton from "../../common/button/LogOutButton";
import ErrorText from "../../../components/common/text/ErrorText";
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

const PersonalInformationForm = () => {
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
              Cuentenos sobre usted
            </Text>

            <Text
              style={[
                themeStyle.pageTitle,
                { color: theme.ACCENT, marginTop: 40 },
              ]}
            >
              Información personal:
            </Text>
          </View>
          <View style={[{ marginTop: 25 }]}>
            <Text
              style={[themeStyle.captions, { color: theme.PRIMARY_TEXT_COLOR }]}
            >
              Documento de Identificación:{" "}
              <Text style={{ color: theme.ERROR }}>*</Text>
            </Text>
            <View
              style={[
                {
                  marginTop: 10,
                },
              ]}
            >
              <View
                style={[
                  {
                    flexDirection: "row",
                  },
                ]}
              >
                <GroupDropDownInputForm
                  name="documentType"
                  labelDropdown="Documento: "
                  placeholder={documentType}
                  itemsDropDown={documentTypes}
                  setItemsDropDown={setDocumentTypes}
                  valueDropdown={documentType}
                  setValueDropdown={setDocumentType}
                  valueTextInput={documentType}
                  returnKeyType="done"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  style={[{ width: 100, marginRight: 10 }]}
                />
                <TextInput
                  returnKeyType="done"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  name="documentNumber"
                  placeholder="Nro documento"
                  onChangeText={handleChange("documentNumber")}
                  onBlur={handleBlur("documentNumber")}
                  value={values.documentNumber}
                  style={
                    touched.documentNumber && errors.documentNumber
                      ? { borderColor: theme.ERROR }
                      : { borderColor: theme.GRAY }
                  }
                />
              </View>
            </View>
          </View>

          {documentType === "CC" || documentType === "OTRO" ? (
            <>
              <View style={[{ marginTop: 20 }]}>
                <Text
                  style={[
                    themeStyle.captions,
                    { color: theme.PRIMARY_TEXT_COLOR },
                  ]}
                >
                  Nombres: <Text style={{ color: theme.ERROR }}>*</Text>
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
                    autoCapitalize="words"
                    name="firstName"
                    placeholder="Nombres"
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                    style={
                      touched.firstName && errors.firstName
                        ? { borderColor: theme.ERROR }
                        : { borderColor: theme.GRAY }
                    }
                  />
                </View>
              </View>
              <View style={[{ marginTop: 20 }]}>
                <Text
                  style={[
                    themeStyle.captions,
                    { color: theme.PRIMARY_TEXT_COLOR },
                  ]}
                >
                  Apellidos: <Text style={{ color: theme.ERROR }}>*</Text>
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
                    autoCapitalize="words"
                    name="surname"
                    placeholder="Apellidos"
                    onChangeText={handleChange("surname")}
                    onBlur={handleBlur("surname")}
                    value={values.surname}
                    style={
                      touched.surname && errors.surname
                        ? { borderColor: theme.ERROR }
                        : { borderColor: theme.GRAY }
                    }
                  />
                </View>
              </View>
              <View style={[{ marginTop: 20 }]}>
                <Text
                  style={[
                    themeStyle.captions,
                    { color: theme.PRIMARY_TEXT_COLOR },
                  ]}
                >
                  Fecha de nacimiento: (dd/mm/aaaa){" "}
                  <Text style={{ color: theme.ERROR }}>*</Text>
                </Text>
                <View
                  style={[
                    {
                      marginTop: 10,
                    },
                  ]}
                >
                  <MaskedTextInput
                    mask="99/99/9999"
                    onChangeText={(text, rawText) => {
                      formikRef.current?.setFieldValue(
                        "registrationDate",
                        text
                      );
                    }}
                    style={[
                      styles.input,
                      touched.registrationDate && errors.registrationDate
                        ? { borderColor: theme.ERROR }
                        : { borderColor: theme.GRAY },
                    ]}
                    returnKeyType="done"
                    keyboardType="numeric"
                    name="registrationDate"
                    placeholder="31/12/2000"
                    onBlur={handleBlur("registrationDate")}
                    value={values.registrationDate}
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={[{ marginTop: 20 }]}>
                <Text
                  style={[
                    themeStyle.captions,
                    { color: theme.PRIMARY_TEXT_COLOR },
                  ]}
                >
                  Razón Social:
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
                    autoCapitalize="words"
                    name="businessName"
                    placeholder="Razón Social"
                    onChangeText={handleChange("businessName")}
                    onBlur={handleBlur("businessName")}
                    value={values.businessName}
                    style={
                      touched.businessName && errors.businessName
                        ? { borderColor: theme.ERROR }
                        : { borderColor: theme.GRAY }
                    }
                  />
                </View>
              </View>
            </>
          )}

          <View style={[{ marginTop: 20 }]}>
            <Text
              style={[themeStyle.captions, { color: theme.PRIMARY_TEXT_COLOR }]}
            >
              Correo electrónico: <Text style={{ color: theme.ERROR }}>*</Text>
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
                keyboardType="email-address"
                autoCapitalize="none"
                name="email"
                placeholder="Correo electrónico"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={
                  touched.email && errors.email
                    ? { borderColor: theme.ERROR }
                    : { borderColor: theme.GRAY }
                }
              />
            </View>
          </View>
          <View style={[{ marginTop: 20 }]}>
            <ErrorText text={errorLabel} />
            <SolidButton
              text={actionLabel}
              onPress={handleSubmit}
              disabled={!isValid || actionProcess}
            />
            <Text
              style={[
                themeStyle.captions,
                { color: theme.GRAY },
                tw`text-center`,
              ]}
            >
              ¡Para nosotros es muy importante conocerte!
            </Text>
          </View>
          <View style={{ height: 40, backgroundColor: theme.WHITE }}></View>
        </View>
      )}
    </Formik>
  );
};

export default PersonalInformationForm;

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

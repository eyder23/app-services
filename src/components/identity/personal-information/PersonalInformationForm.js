import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaskedTextInput } from "react-native-mask-text";
import { Formik } from "formik";
import * as yup from "yup";
// ======== Custom Imports =========
// ======== Styles =========
import tw from "../../../libs/tailwind/tailwind";
import theme from "../../../constants/styles/theme.constant";
import themeStyle from "../../../styles/general/theme.style";
// ======== Components =========
import SolidButton from "../../../components/common/button/SolidButton";
import GroupDropDownInputForm from "../../../components/common/dropdown/GroupDropDownInputForm";
import TextInput from "../../../components/common/input/TextInput";
import TextButton from "../../../components/common/button/TextButton";
import ErrorText from "../../../components/common/text/ErrorText";
// =================================

// ======== Init Form Validations =========
const personalInformationValidationSchema = yup.object().shape({
  documentNumber: yup
    .string()
    .required("Documento de identificación es requerido"),
  firstName: yup.string().required("Nombres son requeridos"),
  surname: yup.string().required("Apellidos son requeridos"),
  registrationDate: yup.string().required("Fecha de nacimiento es requerida"),
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
let defValidationSchema = personalInformationValidationSchema;
// ======== End Form Validations =========

const PersonalInformationForm = () => {
  // ======== Init Definitions =========
  const navigation = useNavigation();
  const [schema, updateSchema] = React.useState(
    personalInformationValidationSchema
  );
  const [documentTypes, setDocumentTypes] = useState([
    { label: "CC", value: "CC" },
    { label: "NIT", value: "NIT" },
    { label: "OTRO", value: "OTRO" },
  ]);
  const formikRef = useRef(null);
  const [documentType, setDocumentType] = useState("CC");
  const [documentNumber, setDocumentNumber] = useState(null);
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

  // ======== End Functions =========
  return (
    <Formik
      innerRef={formikRef}
      validateOnMount={false}
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
          <Text style={[themeStyle.pageTitle, { marginTop: 50 }]}>
            Cuentenos
          </Text>
          <Text style={[themeStyle.pageTitle]}>acerca de usted</Text>
          <Text style={[themeStyle.paragraph, { marginTop: 10 }]}>
            Información personal:
          </Text>
          <View style={[{ marginTop: 20 }]}>
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
                  placeholderDropdown="Tipo"
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
                />
              </View>
              {touched.documentNumber && errors.documentNumber && (
                <ErrorText text={errors.documentNumber} />
              )}
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
                  />
                  {touched.firstName && errors.firstName && (
                    <ErrorText text={errors.firstName} />
                  )}
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
                  />
                  {touched.surname && errors.surname && (
                    <ErrorText text={errors.surname} />
                  )}
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
                    style={styles.input}
                    returnKeyType="done"
                    keyboardType="numeric"
                    name="registrationDate"
                    placeholder="31/12/2000"
                    onBlur={handleBlur("registrationDate")}
                    value={values.registrationDate}
                  />
                  {touched.registrationDate && errors.registrationDate && (
                    <ErrorText text={errors.registrationDate} />
                  )}
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
                  />
                  {touched.businessName && errors.businessName && (
                    <ErrorText text={errors.businessName} />
                  )}
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
              />
              {touched.email && errors.email && (
                <ErrorText text={errors.email} />
              )}
            </View>
          </View>
          <View style={[{ marginTop: 20 }]}>
            <SolidButton
              text="Siguiente"
              onPress={handleSubmit}
              disabled={!isValid}
            />
            <TextButton text="Cerrar Sesión" />
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

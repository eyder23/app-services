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
import useLocation from "../../../api/client/LocationClient";
import useAddresClient from "../../../api/client/AddressClient";
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
const addressInformationValidationSchema = yup.object().shape({
  state: yup.string().required("Departamento es requerido"),
  city: yup.string().required("Ciudad es requerida"),
  neighborhood: yup.string().required("Barrio es requerido"),
  address: yup.string().required("Dirección es requerida"),
});

// ======== End Form Validations =========
const mainButtonLabel = "Siguiente";
let selectStateLabel = "Seleccione un Departamento";
let selectCityLabel = "Seleccione una Ciudad";
// ======================================

const PersonalInformationForm = ({ handleActionProcess }) => {
  // ======== Init Definitions =========
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentUser = getCurrentUser();
  const { updatePerson } = useIdentityClient();
  const { getCountryByCodeState, getCityByState, getStateByCountry } =
    useLocation();
  const { createAddress } = useAddresClient();
  const formikRef = useRef(null);

  const [countryList, setCountryList] = useState([]);
  const [countrySelected, setCountrySelected] = useState("");
  const [stateList, setStateList] = useState([]);
  const [stateSelected, setStateSelected] = useState("");
  const [cityList, setCityList] = useState([]);
  const [citySelected, setCitySelected] = useState("");

  // ======== Standard Definitions =========
  const [actionProcess, setActionProcess] = useState(true);
  const [actionLabel, setActionLabel] = useState(mainButtonLabel);
  const [errorLabel, setErrorLabel] = useState("");
  // ======== End Definitions =========

  // ======== Init Functions =========
  useEffect(() => {
    setActionProcess(false);
  }, []);
  useEffect(() => {
    handleActionProcess(actionProcess);
  }, [actionProcess]);

  useEffect(() => {
    const getCountryByCodeStateFunction = async () => {
      if (countryList.length === 0) {
        setErrorLabel("");
        setActionProcess(true);
        setActionLabel("Procesando Datos");
        try {
          const response = await getCountryByCodeState("CO", true);
          let _idCountry = null;
          if (response.success) {
            _idCountry = response?.data?.[0]._id;
            formikRef.current?.setFieldValue(
              "country",
              response?.data?.[0].nameEs
            );
            const responseState = await getStateByCountry(_idCountry, true);
            if (responseState.success) {
              let stateListTmp = [];
              for (let state of responseState.data) {
                let stateTmp = {
                  label: state?.name,
                  value: state._id,
                };
                stateListTmp.push(stateTmp);
              }
              setStateList(stateListTmp);
              setActionLabel(mainButtonLabel);
              setActionProcess(false);
            } else {
              const { code, messageDeveloper, messageUser } =
                responseState.apiError;
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
      }
    };
    getCountryByCodeStateFunction();
  }, []);

  useEffect(() => {
    const getCityByStateFunction = async () => {
      if (stateSelected && stateSelected.value) {
        setErrorLabel("");
        setActionProcess(true);
        setActionLabel("Procesando Datos");
        try {
          const response = await getCityByState(stateSelected.value, true);
          if (response.success) {
            let cityListTpm = [];
            for (let city of response.data) {
              let cityTmp = {
                label: city?.name,
                value: city._id,
              };
              cityListTpm.push(cityTmp);
            }
            setCityList(cityListTpm);
            setActionLabel(mainButtonLabel);
            setActionProcess(false);
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
      }
    };
    getCityByStateFunction();
  }, [stateSelected]);

  const handleSubmit = async (values) => {
    setErrorLabel("");
    setActionProcess(true);
    setActionLabel("Procesando Datos");
    try {
      const response = await createAddress(values);
      if (response.success) {
        const _idAddress = response.data._id;
        setErrorLabel("");
        setActionLabel(mainButtonLabel);
        setActionProcess(false);
        dispatch(
          setCurrentUser(
            getUserToUpdate(currentUser, {
              personalInformation: 2,
              _idAddress: _idAddress,
            })
          )
        );
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
  // ======== End Functions =========
  return (
    <Formik
      innerRef={formikRef}
      validateOnMount={true}
      validationSchema={addressInformationValidationSchema}
      initialValues={{
        country: "",
        state: "",
        city: "",
        neighborhood: "",
        address: "",
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
          <View style={{ marginTop: 42 }}>
            <Text style={[themeStyle.titleApp, tw`text-center bg-transparent`]}>
              En donde se encuentra
            </Text>

            <Text
              style={[
                themeStyle.pageTitle,
                { color: theme.ACCENT, marginTop: 40 },
              ]}
            >
              Dirección personal:
            </Text>
          </View>

          <View style={[{ marginTop: 25 }]}>
            <Text style={[themeStyle.captions, { color: theme.GRAY }]}>
              Departamento: <Text style={{ color: theme.ERROR }}>*</Text>
            </Text>
            <View
              style={[
                {
                  marginTop: 10,
                },
              ]}
            >
              <GroupDropDownInputForm
                loading={actionProcess}
                name="stateSelected"
                placeholder={selectStateLabel}
                itemsDropDown={stateList}
                setItemsDropDown={stateList}
                valueDropdown={stateSelected?.value}
                valueTextInput={stateSelected?.value}
                onSelectItem={(item) => {
                  setStateSelected(item);
                  formikRef.current?.setFieldValue("state", item?.label);
                }}
                zIndex={2000}
                zIndexInverse={1000}
              />
            </View>
          </View>
          <View style={[{ marginTop: 20 }]}>
            <Text style={[themeStyle.captions, { color: theme.GRAY }]}>
              Ciudad: <Text style={{ color: theme.ERROR }}>*</Text>
            </Text>
            <View
              style={[
                {
                  marginTop: 10,
                },
              ]}
            >
              <GroupDropDownInputForm
                loading={actionProcess}
                name="citySelected"
                placeholder={selectCityLabel}
                itemsDropDown={cityList}
                setItemsDropDown={cityList}
                valueDropdown={citySelected?.value}
                onSelectItem={(item) => {
                  setCitySelected(item);
                  formikRef.current?.setFieldValue("city", item?.label);
                }}
                valueTextInput={citySelected?.value}
                zIndex={1000}
                zIndexInverse={2000}
              />
            </View>
          </View>
          <View style={[{ marginTop: 20 }]}>
            <Text style={[themeStyle.captions, { color: theme.GRAY }]}>
              Barrio/Vereda/Corregimiento:{" "}
              <Text style={{ color: theme.ERROR }}>*</Text>
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
                name="neighborhood"
                placeholder="Barrio/Vereda/Corregimiento"
                onChangeText={handleChange("neighborhood")}
                onBlur={handleBlur("neighborhood")}
                value={values.neighborhood}
                style={
                  touched.neighborhood && errors.neighborhood
                    ? { borderColor: theme.ERROR }
                    : { borderColor: theme.GRAY }
                }
              />
            </View>
          </View>
          <View style={[{ marginTop: 20 }]}>
            <Text style={[themeStyle.captions, { color: theme.GRAY }]}>
              Dirección: <Text style={{ color: theme.ERROR }}>*</Text>
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
                name="address"
                placeholder="Dirección"
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
                style={
                  touched.address && errors.address
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
              Recuerde que luego puede editar la dirección donde desea recibir
              los servicios
            </Text>
          </View>
          <View style={{ height: 40, backgroundColor: theme.WHITE }}></View>
        </View>
      )}
    </Formik>
  );
};

export default PersonalInformationForm;

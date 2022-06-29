import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
// ======== Custom Imports =========
// ======== Functions ===============
// ======== Services ===============
// ======== Styles =========
import tw from "../../../libs/tailwind/tailwind";
import theme from "../../../constants/styles/theme.constant";
import themeStyle from "../../../styles/general/theme.style";
// ======== Components =========
import ResidentialComplexForm from "./ResidentialComplexForm";
import FamilyApartmentHouseForm from "./FamilyApartmentHouseForm";
import TextInput from "../../common/input/TextInput";
// ======================================

const MainHousingUnitForm = ({ handleActionProcess }) => {
  // ======== Init Definitions =========
  const [residentialComplexActive, setResidentialComplexActive] =
    useState(true);
  const [familyApartmentHouseActive, setFamilyApartmentHouseActive] =
    useState(false);

  // ======== Standard Definitions =========
  // ======== End Definitions =========

  // ======== Init Functions =========
  const handleActionProcessInside = (value) => {
    handleActionProcess(value);
  };
  // ======== End Functions =========
  return (
    <View>
      <View style={{ marginTop: 42 }}>
        <Text style={[themeStyle.titleApp, tw`text-center bg-transparent`]}>
          Cuentenos donde vive
        </Text>

        <Text
          style={[themeStyle.pageTitle, { color: theme.ACCENT, marginTop: 40 }]}
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
                setResidentialComplexActive(true);
                setFamilyApartmentHouseActive(false);
              }}
              style={[
                tw`w-1/2 h-14 `,
                {
                  borderTopLeftRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.PRIMARY,
                  backgroundColor: residentialComplexActive
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
                      color: residentialComplexActive
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
                setResidentialComplexActive(false);
                setFamilyApartmentHouseActive(true);
              }}
              style={[
                tw`w-1/2 bg-white`,
                {
                  borderTopRightRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.PRIMARY,
                  backgroundColor: familyApartmentHouseActive
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
                      color: familyApartmentHouseActive
                        ? theme.WHITE
                        : theme.PRIMARY,
                      marginTop: 6,
                    },
                  ]}
                >
                  Casa {"\n"}Familiar
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            {residentialComplexActive && (
              <ResidentialComplexForm
                handleActionProcessInside={handleActionProcessInside}
              />
            )}
            {familyApartmentHouseActive && (
              <FamilyApartmentHouseForm
                handleActionProcessInside={handleActionProcessInside}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MainHousingUnitForm;

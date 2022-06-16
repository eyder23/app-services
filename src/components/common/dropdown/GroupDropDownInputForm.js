import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../../../constants/styles/theme.constant";

export default function GroupDropDownInputForm({
  style,
  itemsDropDown,
  setItemsDropDown,
  valueDropdown,
  setValueDropdown,
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={style}>
      <DropDownPicker
        listMode="SCROLLVIEW"
        itemSeparator={true}
        open={open}
        setOpen={setOpen}
        value={valueDropdown}
        setValue={setValueDropdown}
        items={itemsDropDown}
        setItems={setItemsDropDown}
        dropDownContainerStyle={{
          backgroundColor: theme.GRAY_LIGHT,
          borderColor: theme.GRAY,
        }}
        textStyle={{
          fontFamily: theme.FONT_REGULAR,
          color: theme.PRIMARY_TEXT_COLOR,
          fontSize: 14,
        }}
        style={[
          {
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.GRAY,
          },
        ]}
      />
    </View>
  );
}

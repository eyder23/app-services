import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home1" component={TabNavigator} />
      <Drawer.Screen name="Contact1" component={ContactStackNavigator} />
    </Drawer.Navigator>
  );
}
